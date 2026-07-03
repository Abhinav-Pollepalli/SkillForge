CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    google_id VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    curriculum_generations INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE curriculum (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    topic VARCHAR(255) NOT NULL,
    experience_level VARCHAR(255) NOT NULL,
    curriculum_json JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id INTEGER NOT NULL,
    saved BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT curriculum_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);

CREATE INDEX idx_curriculum_user_id
ON curriculum(user_id);

CREATE INDEX idx_curriculum_saved
ON curriculum(saved);