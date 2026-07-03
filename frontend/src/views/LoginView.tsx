import { useEffect, useRef } from 'react';
import './LoginView.css';
import LoginButton from "../components/ui/LoginButton";


interface StarConfig {
  top: string;
  left: string;
  size: number;
  delay: string;
  color: string;
  dur: string;
}

const STAR_CONFIGS: StarConfig[] = [
  { top: '13%', left: '33%', size: 3, delay: '0s',   color: '#8B5CF6', dur: '3.2s' },
  { top: '20%', left: '70%', size: 2, delay: '0.4s', color: '#ffffff', dur: '2.8s' },
  { top: '44%', left: '37%', size: 2, delay: '0.9s', color: '#6366F1', dur: '3.5s' },
  { top: '67%', left: '41%', size: 3, delay: '1.4s', color: '#8B5CF6', dur: '4s'   },
  { top: '76%', left: '77%', size: 2, delay: '0.7s', color: '#ffffff', dur: '2.6s' },
  { top: '28%', left: '83%', size: 2, delay: '1.1s', color: '#6366F1', dur: '3.8s' },
  { top: '53%', left: '91%', size: 3, delay: '0.2s', color: '#8B5CF6', dur: '3.1s' },
  { top: '9%',  left: '58%', size: 2, delay: '1.7s', color: '#ffffff', dur: '2.9s' },
  { top: '86%', left: '53%', size: 2, delay: '0.6s', color: '#6366F1', dur: '3.4s' },
  { top: '38%', left: '65%', size: 2, delay: '1.9s', color: '#8B5CF6', dur: '4.2s' },
  { top: '60%', left: '30%', size: 2, delay: '0.3s', color: '#ffffff', dur: '3.0s' },
  { top: '5%',  left: '80%', size: 3, delay: '1.3s', color: '#6366F1', dur: '2.7s' },
];

export default function LoginView() {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;


    container.innerHTML = '';

    STAR_CONFIGS.forEach((s) => {
      const el = document.createElement('div');
      el.className = 'sf-star';
      el.style.top = s.top;
      el.style.left = s.left;
      el.style.width = `${s.size}px`;
      el.style.height = `${s.size}px`;
      el.style.background = s.color;
      el.style.opacity = '0.15';
      el.style.animationDelay = s.delay;
      el.style.animationDuration = s.dur;
      container.appendChild(el);
    });

    return () => {
      if (container) container.innerHTML = '';
    };
  }, []);

  return (
    <div className="skillforge-login-root">


      <div className="sf-bg-layer">
        <div className="sf-glow-orb" />
        <div className="sf-glow-orb-2" />
        <div className="sf-grid-overlay" />
        <div className="sf-stars" ref={starsRef} />

        <div className="sf-contour-lines">
          <svg
            viewBox="0 0 600 400"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            <defs>
              <linearGradient id="sf-contour-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'rgba(147,51,234,0.55)' }} />
                <stop offset="100%" style={{ stopColor: 'transparent' }} />
              </linearGradient>
            </defs>
            <path
              d="M600,360 Q480,310 350,325 Q220,340 100,380 Q50,400 0,420"
              stroke="url(#sf-contour-grad)"
              strokeWidth="1"
              fill="none"
              opacity="0.7"
            />
            <path
              d="M600,315 Q460,265 325,280 Q195,298 80,340 Q35,360 0,380"
              stroke="url(#sf-contour-grad)"
              strokeWidth="1"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M600,270 Q450,222 305,238 Q162,256 55,298 Q15,318 0,340"
              stroke="url(#sf-contour-grad)"
              strokeWidth="1"
              fill="none"
              opacity="0.45"
            />
            <path
              d="M600,225 Q440,180 290,197 Q148,216 42,258"
              stroke="url(#sf-contour-grad)"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M600,182 Q430,140 275,158 Q134,177 30,218"
              stroke="url(#sf-contour-grad)"
              strokeWidth="1"
              fill="none"
              opacity="0.18"
            />
          </svg>
        </div>
      </div>


      <a href="#" className="sf-logo-top">
        <svg
          className="sf-logo-icon-sm"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="sf-logo-sm-grad"
              x1="8"
              y1="4"
              x2="34"
              y2="38"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#a855f7" />
              <stop offset="1" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          <path
            d="M26 4L8 22H20L16 38L34 20H22L26 4Z"
            fill="url(#sf-logo-sm-grad)"
            stroke="rgba(168,85,247,0.5)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
        <div className="sf-logo-wordmark">
          <span className="sf-logo-skill">Skill</span>
          <span className="sf-logo-forge">Forge</span>
        </div>
      </a>


      <div className="sf-page">
        <div className="sf-container">


          <div className="sf-left">
            <div>
              <h1 className="sf-hero-headline">
                <span className="sf-line1">Forge better skills.</span>
                <span className="sf-line2">Build your future.</span>
              </h1>
              <p className="sf-hero-desc">
                AI-powered curricula tailored to your goals and experience level.
              </p>
            </div>

            <div className="sf-features">

     
              <div className="sf-feature">
                <div className="sf-feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </div>
                <div>
                  <p className="sf-feature-title">Personalized Learning</p>
                  <p className="sf-feature-desc">Curricula tailored to your goals and background.</p>
                </div>
              </div>


              <div className="sf-feature">
                <div className="sf-feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                  </svg>
                </div>
                <div>
                  <p className="sf-feature-title">Structured Roadmaps</p>
                  <p className="sf-feature-desc">
                    Step-by-step learning paths from beginner to advanced.
                  </p>
                </div>
              </div>


              <div className="sf-feature">
                <div className="sf-feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                    <path d="M5 17l.75 2.25L8 20l-2.25.75L5 23l-.75-2.25L2 20l2.25-.75L5 17z" />
                    <path d="M19 2l.75 2.25L22 5l-2.25.75L19 8l-.75-2.25L16 5l2.25-.75L19 2z" />
                  </svg>
                </div>
                <div>
                  <p className="sf-feature-title">AI-Powered Generation</p>
                  <p className="sf-feature-desc">
                    Planner → Critic → Architect curriculum pipeline.
                  </p>
                </div>
              </div>

            </div>
          </div>

 
          <div className="sf-right">
            <div className="sf-auth-card">

            
              <svg
                className="sf-card-logo"
                viewBox="0 0 90 90"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="sf-card-logo-grad"
                    x1="20"
                    y1="10"
                    x2="70"
                    y2="80"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#a855f7" />
                    <stop offset="1" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                <path
                  d="M55 10L20 45H40L35 80L70 45H50L55 10Z"
                  fill="url(#sf-card-logo-grad)"
                  stroke="rgba(168,85,247,0.65)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>

              <h2 className="sf-card-title">Welcome to SkillForge</h2>

                <p className="sf-card-sub">
                Sign in to generate personalized curricula and continue your learning journey.
                </p>

                

                <div
                id="real-google-button"
                style={{
                  transform: "scale(1.25)",
                  transformOrigin: "center",
                }}
                >
                <LoginButton />
                </div>





      
              <div className="sf-security-footer">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <span>Secure. Private. Your data is never shared.</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
