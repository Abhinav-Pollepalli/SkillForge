from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from backend.llm.gemini import GeminiLLM
from backend.services.planner import PlannerService
from backend.services.critic import CriticService
from backend.services.architect import ArchitectService
import psycopg
from google.oauth2 import id_token
from google.auth.transport import requests
from dotenv import load_dotenv
load_dotenv()
import jwt
from backend.database import get_db_connection
import logging
from datetime import datetime, timedelta, timezone
JWT_SECRET = os.getenv("JWT_SECRET_KEY")

if not JWT_SECRET:
    raise RuntimeError("JWT_SECRET_KEY environment variable is not set")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)

logger = logging.getLogger(__name__)

MAX_GENERATIONS = 20
def create_access_token(user_id: int) -> str:
    payload = {
        "user_id": user_id,
        "iat": datetime.now(timezone.utc),
        "exp": datetime.now(timezone.utc) + timedelta(hours=24),
    }

    token = jwt.encode(
        payload,
        JWT_SECRET,
        algorithm="HS256"
    )

    return token

def verify_access_token(token: str):
    try:
        payload = jwt.decode(
            token,
            JWT_SECRET,
            algorithms=["HS256"]
        )

        return payload

    except jwt.ExpiredSignatureError:
        logger.warning("Token has expired")
        raise HTTPException(
            status_code=401,
            detail="Token has expired"
        )

    except jwt.InvalidTokenError:
        logger.warning("Invalid token")
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

def get_current_user_id(request: Request):
    auth_header = request.headers.get("Authorization")

    if auth_header is None:
        logger.warning("Missing authorization header")
        raise HTTPException(
            status_code=401,
            detail="Missing authorization header"
        )

    token = auth_header.replace("Bearer ", "")

    payload = verify_access_token(token)

    return payload["user_id"] 
    
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
	    "https://getskillforge.org",
        "https://www.getskillforge.org",
    ],
    allow_credentials=True,
    allow_methods=[
        "GET",
        "POST",
        "DELETE",
        "PUT",
    ],
    allow_headers=[
        "Authorization",
        "Content-Type",
    ],
)
class GoogleAuthRequest(BaseModel):
    credential: str


class CurriculumRequest(BaseModel):
    topic:str
    experience_level:str


@app.get("/health")
def health():
    return {
        "status": "ok"
    }


@app.get("/curriculum")
def get_all_curriculums(request: Request):
    user_id = get_current_user_id(request)
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, topic, experience_level, curriculum_json, created_at, saved
                    FROM curriculum
                    WHERE user_id = %s
                    ORDER BY created_at DESC
                    """,
                    (user_id,)
                )

                rows = cur.fetchall()

                curriculums = []

                for row in rows:
                    curriculums.append(
                        {
                            "id": row[0],
                            "topic": row[1],
                            "level": row[2],
                            "curriculum": row[3],
                            "generatedAt": row[4].isoformat(),
                            "saved": row[5],
                        }
                    )

                return curriculums

    except Exception:
        logger.exception("Failed to load curriculum history")
        raise HTTPException(
            status_code=500,
            detail="Failed to load curriculum history"
        )

    
@app.post("/curriculum")
def user_details(
    x: CurriculumRequest,
    request: Request
):
    user_id = get_current_user_id(request)

    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT curriculum_generations
                    FROM users
                    WHERE id = %s
                    """,
                    (user_id,)
                )

                generations = cur.fetchone()[0]

                if generations >= 20:
                    raise HTTPException(
                        status_code=403,
                        detail="You have reached the lifetime generation limit."
                    )

    except HTTPException:
        raise

    except Exception:
        logger.exception("Failed to check curriculum generation limit")
        raise HTTPException(
            status_code=500,
            detail="Failed to verify generation limit"
        )

    return orchestration(
        x.topic,
        x.experience_level,
        user_id
    )


@app.delete("/curriculum/{id}")
def delete_curriculum(id:int, request: Request):
    user_id = get_current_user_id(request)
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "DELETE FROM curriculum WHERE id=%s AND user_id=%s;",
                    (id, user_id)
                )

                row_count = cur.rowcount

                if row_count == 0:
                    logger.warning(
                        "User %s attempted to delete nonexistent curriculum %s",
                        user_id,
                        id,
                    )
                    raise HTTPException(
                        status_code=404,
                        detail="Curriculum not found"
                    )

                conn.commit()
                logger.info(
                    "User %s deleted curriculum %s",
                    user_id,
                    id,
                )

    except HTTPException:
        raise

    except Exception:
        logger.exception("Failed to delete curriculum")
        raise HTTPException(
            status_code=500,
            detail="Failed to delete curriculum"
        )

    return "Your curriculum has been successfully deleted"
    

@app.delete("/curriculum")
def delete_all_curriculums(request:Request):
    user_id = get_current_user_id(request)
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE
                    FROM curriculum
                    WHERE user_id = %s;
                    """,
                    (user_id,)
                )

                conn.commit()
                logger.info(
                    "User %s deleted all curriculums",
                    user_id,
                )

    except HTTPException:
        raise

    except Exception:
        logger.exception("Failed to delete curriculums")
        raise HTTPException(
            status_code=500,
            detail="Failed to delete curriculums"
        )

    return {
        "message": "All curriculums successfully deleted"
    }

@app.put("/curriculum/{id}/save")
def save_curriculum(id: int, request: Request):
    user_id = get_current_user_id(request)
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE curriculum
                    SET saved = TRUE
                    WHERE id = %s AND user_id = %s
                    """,
                    (id, user_id)
                )

                row_count = cur.rowcount

                if row_count == 0:
                    logger.warning(
                        "User %s attempted to save nonexistent curriculum %s",
                        user_id,
                        id,
                    )
                    raise HTTPException(
                        status_code=404,
                        detail="Curriculum not found"
                    )

                conn.commit()
                logger.info(
                    "User %s saved curriculum %s",
                    user_id,
                    id,
                )

    except HTTPException:
        raise

    except Exception:
        logger.exception("Failed to save curriculum")
        raise HTTPException(
            status_code=500,
            detail="Failed to save curriculum"
        )

    return {"message": "Curriculum saved successfully"}

@app.put("/curriculum/{id}/unsave")
def unsave_curriculum(id: int, request: Request):
    user_id = get_current_user_id(request)
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE curriculum
                    SET saved = FALSE
                    WHERE id = %s AND user_id = %s
                    """,
                    (id, user_id)
                )

                row_count = cur.rowcount

                if row_count == 0:
                    logger.warning(
                        "User %s attempted to unsave nonexistent curriculum %s",
                        user_id,
                        id,
                    )
                    raise HTTPException(
                        status_code=404,
                        detail="Curriculum not found"
                    )

                conn.commit()
                logger.info(
                    "User %s unsaved curriculum %s",
                    user_id,
                    id,
                )

    except HTTPException:
        raise

    except Exception:
        logger.exception("Failed to unsave curriculum")
        raise HTTPException(
            status_code=500,
            detail="Failed to unsave curriculum"
        )

    return {"message": "Curriculum unsaved successfully"}

@app.get("/me")
def get_me(request: Request):
    user_id = get_current_user_id(request)

    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, google_id, email, name, curriculum_generations
                    FROM users
                    WHERE id = %s
                    """,
                    (user_id,)
                )

                user = cur.fetchone()

                if user is None:
                    logger.warning("User not found")
                    raise HTTPException(
                        status_code=404,
                        detail="User not found"
                    )

                return {
                    "id": user[0],
                    "google_id": user[1],
                    "email": user[2],
                    "name": user[3],
                    "curriculum_generations": user[4],
                    "remaining_generations": max(
                        0,
                        MAX_GENERATIONS - user[4]
                    ),
                    "max_generations": MAX_GENERATIONS,
                }

    except HTTPException:
        raise

    except Exception:
        logger.exception("Failed to retrieve user")
        raise HTTPException(
            status_code=500,
            detail="Failed to retrieve user"
        )

@app.post("/auth/google")
def google_login(request: GoogleAuthRequest):

    try:
        user_info = id_token.verify_oauth2_token(
            request.credential,
            requests.Request(),
            os.getenv("GOOGLE_CLIENT_ID")
        )
    except Exception:
        logger.warning("Invalid Google Token received")
        raise HTTPException(
            status_code=401,
            detail="Invalid Google token"
        )

    google_id = user_info["sub"]
    email = user_info["email"]
    name = user_info["name"]

    try:
       with get_db_connection() as conn:
            with conn.cursor() as cur:

                cur.execute(
                    """
                    SELECT id, google_id, email, name
                    FROM users
                    WHERE google_id = %s
                    """,
                    (google_id,)
                )

                user = cur.fetchone()


                if user is None:
                    cur.execute(
                        """
                        INSERT INTO users (
                            google_id,
                            email,
                            name
                        )
                        VALUES (%s, %s, %s)
                        RETURNING id, google_id, email, name
                        """,
                        (
                            google_id,
                            email,
                            name,
                        )
                    )

                    user = cur.fetchone()

                    conn.commit()
                    logger.info(
                        "New user created: %s",
                        email,
                    )
                else:
                    logger.info(
                        "Existing user logged in: %s",
                        email,
                    )

                token = create_access_token(user[0])

                return {
                    "token": token,
                    "user": {
                        "id": user[0],
                        "google_id": user[1],
                        "email": user[2],
                        "name": user[3],
                    }
                }

    except HTTPException:
        raise

    except Exception:
        logger.exception("Unexpected error during Google authentication")
        raise

        

def orchestration(atopic: str, aexperience_level: str, user_id: int):
    topic = atopic

    experience_level = aexperience_level

    api_key = os.getenv(
        "GEMINI_API_KEY"
    )

    if not api_key:
        logger.error("AI service not configured")
        raise HTTPException(
            status_code=500,
            detail="AI service is not configured."
        )

    llm = GeminiLLM( 
        api_key=api_key
    )

    planner = PlannerService(
    llm=llm
    )

    critic = CriticService(
        llm=llm
    )

    architect = ArchitectService(
        llm=llm
    )

    logger.info(
        "User %s requested curriculum: topic='%s', level='%s'",
        user_id,
        topic,
        experience_level,
    )

    try:
        planner_output = planner.generate(
            topic=topic,
            experience_level=experience_level,
        )

        critic_output = critic.review(
            planner_output
        )


        curriculum = architect.build(
            planner_output,
            critic_output,
        )
        logger.info(
            "Curriculum generated successfully for user %s",
            user_id,
        )
    except ValueError as e:
        logger.warning(
            "Curriculum generation failed for user=%s topic='%s': %s",
            user_id,
            topic,
            str(e),
        )

        raise HTTPException(
            status_code=503,
            detail=str(e)
        )

    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO curriculum(
                        topic,
                        experience_level,
                        curriculum_json,
                        created_at,
                        user_id
                    )
                    VALUES(%s, %s, %s, NOW(), %s)
                    RETURNING id
                    """,
                    (
                        topic,
                        experience_level,
                        curriculum.model_dump_json(),
                        user_id
                    )
                )
                curriculum_id = cur.fetchone()[0]

                cur.execute(
                    """
                    UPDATE users
                    SET curriculum_generations = curriculum_generations + 1
                    WHERE id = %s
                    """,
                    (user_id,)
                )

                conn.commit()

                logger.info(
                    "Curriculum saved for user %s",
                    user_id,
                )


    except Exception:
        logger.exception("Failed to save curriculum")
        raise HTTPException(
            status_code=500,
            detail="Failed to save curriculum"
        )
    
    
    
    response = curriculum.model_dump()
    response["id"] = curriculum_id
    return response

 



