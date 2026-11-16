/** Decorative diagrams accompanying the four product selection steps. */
export function SelectionIllustration({ step }: { step: number }) {
  const metal = `selection-metal-${step}`;
  const shade = `selection-shade-${step}`;
  return (
    <svg
      className="selection-illustration"
      viewBox="0 0 320 180"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={metal}
          x1="75"
          y1="30"
          x2="245"
          y2="155"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset=".48" stopColor="#aaa" />
          <stop offset="1" stopColor="#303030" />
        </linearGradient>
        <linearGradient
          id={shade}
          x1="160"
          y1="40"
          x2="160"
          y2="165"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#999" stopOpacity=".35" />
          <stop offset="1" stopColor="#111" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="148" rx="112" ry="22" fill={`url(#${shade})`} />
      {step === 0 && (
        <>
          <rect
            x="44"
            y="45"
            width="105"
            height="100"
            rx="8"
            fill={`url(#${shade})`}
            stroke="#777"
          />
          {[65, 89, 113].map((x) => (
            <rect
              key={x}
              x={x}
              y="63"
              width="12"
              height="64"
              rx="6"
              fill={`url(#${metal})`}
            />
          ))}
          <rect
            x="171"
            y="45"
            width="105"
            height="100"
            rx="8"
            fill={`url(#${shade})`}
            stroke="#777"
          />
          {[0, 1, 2].flatMap((row) =>
            [0, 1, 2].map((col) => (
              <circle
                key={`${row}-${col}`}
                cx={195 + col * 28}
                cy={68 + row * 27}
                r="8"
                fill={`url(#${metal})`}
              />
            )),
          )}
        </>
      )}
      {step === 1 && (
        <>
          <path
            d="m65 112 95-44 95 44-95 44-95-44Z"
            fill="#222"
            stroke="#666"
          />
          <path d="m65 91 95-44 95 44-95 44-95-44Z" fill="#555" stroke="#999" />
          <path
            d="m65 70 95-44 95 44-95 44-95-44Z"
            fill={`url(#${metal})`}
            stroke="#ddd"
          />
          <path
            d="m90 70 70-32 48 22M105 78l70-32"
            stroke="#fff"
            strokeOpacity=".45"
          />
        </>
      )}
      {step === 2 && (
        <>
          <path
            d="m42 130 94-90h139l-94 105H42Z"
            fill={`url(#${shade})`}
            stroke="#777"
          />
          <path
            d="m88 145 94-105m-46 105 94-105M73 100h142m-118-28h144"
            stroke="#555"
          />
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`m${115 + i * 17} 127 59-65`}
              stroke={`url(#${metal})`}
              strokeWidth="8"
              strokeLinecap="round"
            />
          ))}
          <path
            d="M57 62V35h30m-30 0 36 34"
            stroke="#eee"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {step === 3 && (
        <>
          <rect
            x="91"
            y="49"
            width="138"
            height="89"
            rx="7"
            fill={`url(#${shade})`}
            stroke="#888"
          />
          {[70, 94, 118].map((y) => (
            <rect
              key={y}
              x="108"
              y={y}
              width="104"
              height="8"
              rx="4"
              fill={`url(#${metal})`}
            />
          ))}
          <path
            d="M91 32h138M91 25v14m138-14v14M251 49v89m-7-89h14m-14 89h14"
            stroke="#bbb"
            strokeWidth="1.5"
          />
          <circle cx="235" cy="136" r="21" fill="#161616" stroke="#bbb" />
          <path
            d="m226 136 6 6 12-13"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}
