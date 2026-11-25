/* ====================================================================
   STORYBOOK ILLUSTRATED KIDS — Cohesive Flat-Vector Preschool Art
   Zero gradients — pure solid crisp colors matching Hero & Programs.
   ==================================================================== */

export function AboutPlayKids({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Colorful Pinwheel Kid on Left */}
      <g transform="translate(10, 28)">
        {/* Pinwheel stick */}
        <line x1="20" y1="68" x2="20" y2="24" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" />
        {/* 4-blade flat solid pinwheel */}
        <path d="M20,24 L8,14 L20,10 Z" fill="#ef4444" />
        <path d="M20,24 L30,12 L34,24 Z" fill="#f59e0b" />
        <path d="M20,24 L32,34 L20,38 Z" fill="#22c55e" />
        <path d="M20,24 L10,36 L6,24 Z" fill="#0ea5e9" />
        <circle cx="20" cy="24" r="3" fill="#ffffff" />

        {/* Kid body */}
        <circle cx="52" cy="36" r="16" fill="#fed7aa" />
        <path d="M36,34 Q42,14 56,16 Q68,18 68,34 Q60,24 52,25 Q42,25 36,34 Z" fill="#1e293b" />
        <circle cx="47" cy="36" r="2" fill="#1e293b" />
        <circle cx="57" cy="36" r="2" fill="#1e293b" />
        <path d="M48,43 Q52,47 56,43" stroke="#9a3412" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <circle cx="42" cy="40" r="3" fill="#fca5a5" opacity="0.7" />
        <circle cx="62" cy="40" r="3" fill="#fca5a5" opacity="0.7" />
        {/* Outfit */}
        <rect x="38" y="53" width="28" height="36" rx="8" fill="#0ea5e9" />
        <rect x="40" y="85" width="10" height="22" rx="4" fill="#1e3a8a" />
        <rect x="54" y="85" width="10" height="22" rx="4" fill="#1e3a8a" />
        <ellipse cx="44" cy="109" rx="7" ry="4.5" fill="#f97316" />
        <ellipse cx="60" cy="109" rx="7" ry="4.5" fill="#f97316" />
        {/* Arm holding pinwheel */}
        <path d="M39,60 Q28,64 20,56" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M66,60 Q76,50 82,42" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>

      {/* Joyful Jumping Kid on Right with Balloon */}
      <g transform="translate(116, 16)">
        {/* Solid Red Balloon */}
        <line x1="78" y1="68" x2="86" y2="26" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 2" />
        <ellipse cx="86" cy="18" rx="13" ry="16" fill="#f43f5e" />
        <circle cx="81" cy="12" r="3" fill="#fda4af" />

        {/* Kid Face & Hair */}
        <circle cx="42" cy="42" r="16" fill="#fed7aa" />
        <path d="M26,40 Q32,20 44,22 Q58,22 58,40 Q50,28 42,29 Q34,29 26,40 Z" fill="#92400e" />
        <circle cx="23" cy="40" r="6" fill="#92400e" />
        <circle cx="61" cy="40" r="6" fill="#92400e" />
        <circle cx="37" cy="42" r="2" fill="#1e293b" />
        <circle cx="47" cy="42" r="2" fill="#1e293b" />
        <circle cx="42" cy="49" r="3" fill="#e11d48" />
        <circle cx="32" cy="46" r="3" fill="#fca5a5" opacity="0.7" />
        <circle cx="52" cy="46" r="3" fill="#fca5a5" opacity="0.7" />
        {/* Yellow Sunny Dress */}
        <path d="M28,59 L56,59 L62,96 L22,96 Z" fill="#facc15" />
        <rect x="30" y="96" width="9" height="18" rx="4" fill="#fed7aa" />
        <rect x="45" y="96" width="9" height="18" rx="4" fill="#fed7aa" />
        <ellipse cx="34" cy="116" rx="7" ry="4" fill="#22c55e" />
        <ellipse cx="50" cy="116" rx="7" ry="4" fill="#22c55e" />
        {/* Arms */}
        <path d="M29,64 Q16,54 12,46" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M55,64 Q70,68 78,66" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  )
}

export function ProgramsHeaderKids({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 180 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Kid holding giant green & orange crayons */}
      <g transform="translate(22, 18) rotate(-8)">
        <rect x="0" y="18" width="16" height="66" rx="4" fill="#22c55e" />
        <polygon points="0,18 8,2 16,18" fill="#15803d" />
        <rect x="0" y="30" width="16" height="8" fill="#166534" />
      </g>
      <g transform="translate(132, 16) rotate(10)">
        <rect x="0" y="18" width="16" height="66" rx="4" fill="#f97316" />
        <polygon points="0,18 8,2 16,18" fill="#c2410c" />
        <rect x="0" y="30" width="16" height="8" fill="#ea580c" />
      </g>

      {/* Center Smiling Child */}
      <g transform="translate(56, 22)">
        <circle cx="34" cy="28" r="18" fill="#fed7aa" />
        <path d="M16,26 Q24,6 36,8 Q52,8 52,26 Q42,16 34,17 Q24,17 16,26 Z" fill="#78350f" />
        {/* Purple cap */}
        <path d="M17,18 Q34,4 51,18 Z" fill="#a855f7" />
        <rect x="16" y="15" width="38" height="5" rx="2.5" fill="#7e22ce" />
        {/* Eyes & Smile */}
        <circle cx="28" cy="29" r="2.2" fill="#1e293b" />
        <circle cx="40" cy="29" r="2.2" fill="#1e293b" />
        <path d="M29,36 Q34,40 39,36" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="23" cy="34" r="3.2" fill="#fca5a5" opacity="0.7" />
        <circle cx="45" cy="34" r="3.2" fill="#fca5a5" opacity="0.7" />
        {/* Shirt */}
        <rect x="18" y="47" width="32" height="36" rx="8" fill="#0ea5e9" />
        <path d="M18,52 L-4,56" stroke="#fed7aa" strokeWidth="7" strokeLinecap="round" />
        <path d="M50,52 L72,56" stroke="#fed7aa" strokeWidth="7" strokeLinecap="round" />
      </g>
    </svg>
  )
}

export function GalleryCameraKids({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 210 135"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Left Child with Toy Instant Camera */}
      <g transform="translate(14, 18)">
        <circle cx="40" cy="28" r="17" fill="#fed7aa" />
        <path d="M23,26 Q32,8 42,10 Q56,10 57,26 Q48,16 40,17 Q30,17 23,26 Z" fill="#92400e" />
        <circle cx="20" cy="24" r="6.5" fill="#92400e" />
        <circle cx="60" cy="24" r="6.5" fill="#92400e" />
        <circle cx="34" cy="28" r="2" fill="#1e293b" />
        <circle cx="46" cy="28" r="2" fill="#1e293b" />
        <path d="M36,35 Q40,38 44,35" stroke="#9a3412" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Green Shirt */}
        <rect x="24" y="46" width="32" height="42" rx="8" fill="#22c55e" />
        {/* Camera held in front */}
        <rect x="25" y="54" width="30" height="22" rx="5" fill="#f43f5e" />
        <circle cx="40" cy="65" r="6.5" fill="#ffffff" />
        <circle cx="40" cy="65" r="4" fill="#1e293b" />
        <rect x="46" y="56" width="5" height="3.5" rx="1" fill="#fde047" />
        {/* Arms */}
        <path d="M24,52 Q16,62 25,65" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M56,52 Q64,62 55,65" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>

      {/* Right Child Making Peace Sign + Balloon */}
      <g transform="translate(108, 12)">
        {/* Sunny Yellow Balloon */}
        <line x1="70" y1="62" x2="78" y2="24" stroke="#94a3b8" strokeWidth="2" />
        <ellipse cx="78" cy="18" rx="12" ry="15" fill="#fbbf24" />
        <circle cx="74" cy="12" r="2.5" fill="#fef08a" />

        <circle cx="36" cy="36" r="17" fill="#fed7aa" />
        <path d="M19,35 Q28,16 38,18 Q52,18 53,35 Q44,25 36,26 Q26,26 19,35 Z" fill="#1e293b" />
        <circle cx="31" cy="36" r="2" fill="#1e293b" />
        <circle cx="41" cy="36" r="2" fill="#1e293b" />
        <path d="M32,43 Q36,47 40,43" stroke="#9a3412" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <circle cx="26" cy="40" r="3" fill="#fca5a5" opacity="0.7" />
        <circle cx="46" cy="40" r="3" fill="#fca5a5" opacity="0.7" />
        {/* Orange Dungarees */}
        <rect x="20" y="54" width="32" height="40" rx="8" fill="#f97316" />
        <rect x="24" y="54" width="24" height="12" rx="3" fill="#ffffff" />
        <path d="M20,60 Q10,48 8,38" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M52,60 Q64,66 70,62" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  )
}

export function TestimonialsKidsBanner({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Left Child Holding Gold Star */}
      <g transform="translate(18, 22)">
        <circle cx="32" cy="28" r="16" fill="#fed7aa" />
        <path d="M16,27 Q22,9 34,11 Q46,11 48,27 Q40,18 32,19 Q24,19 16,27 Z" fill="#78350f" />
        <circle cx="27" cy="28" r="2" fill="#1e293b" />
        <circle cx="37" cy="28" r="2" fill="#1e293b" />
        <path d="M28,34 Q32,38 36,34" stroke="#9a3412" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <rect x="18" y="45" width="28" height="38" rx="8" fill="#a855f7" />
        <path d="M18,52 L6,40" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round" />
        {/* Bright Solid Gold Star */}
        <polygon points="6,24 9,31 16,32 11,37 12,44 6,40 0,44 1,37 -4,32 3,31" fill="#f59e0b" />
      </g>

      {/* Center Pennant Banner */}
      <path d="M74,28 Q120,42 166,28" stroke="#1e293b" strokeWidth="2.5" fill="none" />
      <polygon points="82,31 94,34 86,48" fill="#ef4444" />
      <polygon points="104,35 116,36 109,50" fill="#fbbf24" />
      <polygon points="126,36 138,35 131,50" fill="#22c55e" />
      <polygon points="148,33 160,30 154,46" fill="#0ea5e9" />

      {/* Right Child Cheering */}
      <g transform="translate(154, 20)">
        <circle cx="32" cy="30" r="16" fill="#fed7aa" />
        <path d="M16,28 Q24,10 34,12 Q46,12 48,28 Q40,19 32,20 Q24,20 16,28 Z" fill="#1e293b" />
        <circle cx="14" cy="28" r="6" fill="#1e293b" />
        <circle cx="50" cy="28" r="6" fill="#1e293b" />
        <circle cx="27" cy="30" r="2" fill="#1e293b" />
        <circle cx="37" cy="30" r="2" fill="#1e293b" />
        <circle cx="32" cy="37" r="3" fill="#f43f5e" />
        <rect x="18" y="47" width="28" height="38" rx="8" fill="#0ea5e9" />
        <path d="M46,54 L60,40" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round" />
        {/* Heart Balloon */}
        <circle cx="62" cy="32" r="8" fill="#f43f5e" />
      </g>
    </svg>
  )
}

export function ContactMapKids({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Left Explorer Kid with Backpack & Map */}
      <g transform="translate(18, 22)">
        {/* Backpack straps / bag peeking */}
        <rect x="10" y="50" width="16" height="28" rx="6" fill="#ea580c" />
        <circle cx="36" cy="30" r="16" fill="#fed7aa" />
        <path d="M20,28 Q26,10 38,12 Q50,12 52,28 Q44,18 36,20 Q28,20 20,28 Z" fill="#92400e" />
        <circle cx="31" cy="30" r="2" fill="#1e293b" />
        <circle cx="41" cy="30" r="2" fill="#1e293b" />
        <path d="M32,37 Q36,40 40,37" stroke="#9a3412" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <circle cx="26" cy="34" r="3" fill="#fca5a5" opacity="0.7" />
        <circle cx="46" cy="34" r="3" fill="#fca5a5" opacity="0.7" />
        {/* Green Polo */}
        <rect x="21" y="47" width="30" height="38" rx="8" fill="#22c55e" />
        {/* Holding folded Map */}
        <polygon points="48,54 68,48 68,72 48,78" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <path d="M53,58 L63,63 L56,69" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="62" cy="56" r="3" fill="#ef4444" />
      </g>

      {/* Right Friendly Kid Posting a Letter */}
      <g transform="translate(118, 20)">
        <circle cx="40" cy="30" r="16" fill="#fed7aa" />
        <path d="M24,28 Q30,10 42,12 Q54,12 56,28 Q48,18 40,20 Q32,20 24,28 Z" fill="#78350f" />
        <circle cx="35" cy="30" r="2" fill="#1e293b" />
        <circle cx="45" cy="30" r="2" fill="#1e293b" />
        <path d="M36,37 Q40,40 44,37" stroke="#9a3412" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <circle cx="30" cy="34" r="3" fill="#fca5a5" opacity="0.7" />
        <circle cx="50" cy="34" r="3" fill="#fca5a5" opacity="0.7" />
        {/* Coral Dress / Top */}
        <rect x="25" y="47" width="30" height="38" rx="8" fill="#f43f5e" />
        {/* Holding Crisp White & Blue Envelope */}
        <g transform="translate(4, 52) rotate(-10)">
          <rect x="0" y="0" width="26" height="18" rx="3" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" />
          <path d="M0,2 L13,11 L26,2" stroke="#0ea5e9" strokeWidth="2" fill="none" />
        </g>
        <path d="M26,56 L16,60" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round" />
        <path d="M55,56 L68,44" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round" />
      </g>
    </svg>
  )
}

export function StorybookCloud({ variant = 'white', className = '' }) {
  if (variant === 'dashed') {
    return (
      <svg
        className={className}
        viewBox="0 0 160 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M28,74 Q12,74 12,58 Q12,38 38,38 Q46,14 76,14 Q106,14 118,36 Q146,32 148,54 Q150,74 126,74 Z"
          fill="#e0f2fe"
          stroke="#38bdf8"
          strokeWidth="3"
          strokeDasharray="6 4"
        />
      </svg>
    )
  }

  if (variant === 'sunny') {
    return (
      <svg
        className={className}
        viewBox="0 0 160 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M28,74 Q12,74 12,58 Q12,38 38,38 Q46,14 76,14 Q106,14 118,36 Q146,32 148,54 Q150,74 126,74 Z"
          fill="#fef9c3"
          stroke="#fbbf24"
          strokeWidth="3"
        />
      </svg>
    )
  }

  return (
    <svg
      className={className}
      viewBox="0 0 180 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Clean Flat Storybook Cloud with Soft Bottom Sky Shadow Crescent */}
      <path
        d="M32,82 Q12,82 12,63 Q12,41 42,41 Q52,14 86,14 Q118,14 132,39 Q164,34 168,58 Q170,82 142,82 Z"
        fill="#ffffff"
        stroke="#bae6fd"
        strokeWidth="3.5"
      />
      <path
        d="M30,74 Q88,78 148,74 Q142,80 34,80 Z"
        fill="#e0f2fe"
      />
    </svg>
  )
}

export function RainbowSlideKid({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 110 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Playful Breeze Speed Lines Behind Sliding Child */}
      <line x1="6" y1="34" x2="22" y2="34" stroke="#fde047" strokeWidth="3" strokeLinecap="round" />
      <line x1="2" y1="48" x2="18" y2="48" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
      <line x1="10" y1="64" x2="24" y2="64" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />

      {/* Flying Flutter Scarf */}
      <path d="M38,44 Q20,38 14,48 Q22,52 38,50 Z" fill="#f43f5e" />

      {/* Sliding Child Seated Facing Forward-Right */}
      {/* Outstretched Legs Sliding Forward */}
      <path d="M50,74 L82,78" stroke="#0284c7" strokeWidth="11" strokeLinecap="round" />
      <path d="M46,80 L76,86" stroke="#0369a1" strokeWidth="10" strokeLinecap="round" />
      {/* Bright Red & White Sneakers */}
      <ellipse cx="86" cy="79" rx="7" ry="5" fill="#ed1c24" />
      <ellipse cx="80" cy="88" rx="7" ry="5" fill="#f97316" />

      {/* Bright Sunny Sweater Torso Leaning Slightly Back on Slide */}
      <g transform="rotate(-12 48 60)">
        <rect x="34" y="45" width="26" height="32" rx="10" fill="#fbbf24" stroke="#ea580c" strokeWidth="2" />
      </g>

      {/* Cheering Raised Arms ("Wheee!") */}
      <path d="M42,48 Q30,30 24,22" stroke="#fed7aa" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M55,48 Q68,30 74,22" stroke="#fed7aa" strokeWidth="7" strokeLinecap="round" fill="none" />
      <circle cx="24" cy="21" r="4" fill="#fdba74" />
      <circle cx="74" cy="21" r="4" fill="#fdba74" />

      {/* Joyful Face & Playful Baseball Cap */}
      <circle cx="48" cy="29" r="15" fill="#fed7aa" />
      <path d="M33,27 Q36,12 52,13 Q62,15 62,27 Q54,20 46,21 Q38,21 33,27 Z" fill="#78350f" />
      {/* Colorful Sky-Blue Cap */}
      <path d="M33,22 Q46,9 61,20 Z" fill="#0ea5e9" />
      <rect x="46" y="18" width="20" height="4.5" rx="2.2" fill="#0284c7" />
      {/* Big Happy Eyes & Smile */}
      <circle cx="52" cy="28" r="2" fill="#1e293b" />
      <circle cx="59" cy="27" r="2" fill="#1e293b" />
      <circle cx="53" cy="27" r="0.8" fill="#ffffff" />
      <circle cx="60" cy="26" r="0.8" fill="#ffffff" />
      <path d="M52,34 Q57,38 61,33" stroke="#b45309" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="48" cy="33" r="3" fill="#fca5a5" opacity="0.75" />
    </svg>
  )
}

