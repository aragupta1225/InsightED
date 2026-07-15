export const LogoIcon = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 120 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Golden arc - Top right of the bulb */}
    <path d="M 50 15 C 80 15 100 35 105 60 C 105 50 95 20 60 10 C 60 10 50 15 50 15 Z" fill="#C89B3C" />
    
    {/* Navy Base Bulb Shape & Threads */}
    <path d="M 50 15 C 20 25 10 55 15 80 C 20 100 35 110 40 120 L 70 120 C 75 110 90 95 90 75 C 90 65 85 50 75 45 C 65 40 55 55 45 65 C 35 75 25 65 30 50 C 35 35 50 25 60 30" stroke="#1B2541" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 40 128 L 70 128" stroke="#1B2541" strokeWidth="8" strokeLinecap="round" />
    <path d="M 45 138 L 65 138" stroke="#1B2541" strokeWidth="8" strokeLinecap="round" />
    
    {/* Golden Human Figure Inside */}
    {/* Head */}
    <circle cx="55" cy="45" r="7" fill="#C89B3C" />
    {/* Body / Swoosh reaching out up to the right edge */}
    <path d="M 40 65 C 50 75 60 70 70 55 C 80 40 95 30 105 20 C 100 35 90 45 75 60 C 65 70 50 85 30 65" fill="#C89B3C" />
  </svg>
);
