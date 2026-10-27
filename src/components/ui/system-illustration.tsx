// Original conceptual architecture; not an ESSCOM installation or product representation.
export function SystemIllustration() {
  return (
    <div className="system-illustration">
      <div className="illustration-label">
        <span /> A CONNECTED ENVIRONMENT
      </div>
      <svg
        viewBox="0 0 620 460"
        fill="none"
        role="img"
        aria-labelledby="system-title system-description"
      >
        <title id="system-title">Connected building concept</title>
        <desc id="system-description">
          An architectural illustration connecting surveillance, access control,
          and queue management within a contemporary building. Illustrative
          only.
        </desc>
        <defs>
          <pattern
            id="ground-grid"
            width="42"
            height="24"
            patternUnits="userSpaceOnUse"
            patternTransform="matrix(1 .5 -1 .5 310 50)"
          >
            <path d="M42 0H0V24" stroke="#214260" strokeWidth=".7" />
          </pattern>
          <linearGradient
            id="glass"
            x1="200"
            y1="100"
            x2="380"
            y2="360"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#234D6C" />
            <stop offset="1" stopColor="#102E49" />
          </linearGradient>
        </defs>
        <path d="M22 265 310 100 604 270 312 440Z" fill="url(#ground-grid)" />
        <path
          d="m91 300 213-122 224 130-215 124Z"
          fill="#102B46"
          stroke="#31526C"
        />
        <path
          d="m119 292 185-107 195 113-186 108Z"
          fill="#183B56"
          stroke="#47677E"
        />
        <path
          d="M158 167 317 75 471 164 312 256Z"
          fill="#34566D"
          stroke="#6B8798"
        />
        <path d="M158 167v157l154 89V256Z" fill="#173A56" stroke="#58768C" />
        <path
          d="M312 256 471 164v157l-159 92Z"
          fill="url(#glass)"
          stroke="#648396"
        />
        <path
          d="M180 153 317 74 450 151 313 230Z"
          fill="#213E56"
          stroke="#8AA0AC"
        />
        <path
          d="m204 155 111-64 111 64-111 64Z"
          fill="#15354F"
          stroke="#4C6D84"
        />
        <path d="m250 136 64-37 70 41-64 37Z" fill="#2E536C" stroke="#718A9B" />
        <path d="m250 136 70 41v25l-70-41Z" fill="#1B3C56" stroke="#476A83" />
        <path d="m320 177 64-37v25l-64 37Z" fill="#234A66" stroke="#476A83" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <path
              d={`M${174 + i * 33} ${190 + i * 19}v105l21 12V${202 + i * 19}Z`}
              fill="#244F6C"
              stroke="#4B708A"
            />
            <path
              d={`M${329 + i * 33} ${265 - i * 19}v106l21-12V${253 - i * 19}Z`}
              fill="#2B5973"
              stroke="#567A90"
            />
          </g>
        ))}
        <path
          d="m158 217 154 89 159-92M158 268l154 89 159-92"
          stroke="#8BA2AE"
          strokeWidth="3"
        />
        <path d="M312 256v157" stroke="#B1C2C9" strokeWidth="3" />
        <path d="m276 345 24 14v47l-24-14Z" fill="#081D33" stroke="#7D9AAC" />
        <path d="m324 365 28-16v45l-28 16Z" fill="#0A243B" stroke="#7D9AAC" />
        <path
          d="m121 318 38-22m302 30 37-21M282 420l30 17 40-23"
          stroke="#698399"
        />
        <path
          d="M192 204H99v-61H54M343 350h159v-37h61M387 237h126v-97h48"
          stroke="#06B6D4"
          strokeWidth="1.5"
          strokeDasharray="4 5"
        />
        {[
          [192, 204],
          [343, 350],
          [387, 237],
        ].map(([x, y]) => (
          <g key={x}>
            <circle cx={x} cy={y} r="12" fill="#06B6D4" fillOpacity=".12" />
            <circle
              cx={x}
              cy={y}
              r="5"
              fill="#0B1F3A"
              stroke="#5DE3F3"
              strokeWidth="2"
            />
          </g>
        ))}
        <rect
          x="23"
          y="113"
          width="123"
          height="40"
          rx="5"
          fill="#12324C"
          stroke="#3D667F"
        />
        <path d="m39 130 8-5 9 5v10H39Z" stroke="#62DAE9" />
        <circle cx="47" cy="133" r="3" stroke="#62DAE9" />
        <text
          x="66"
          y="138"
          fill="#D4E4EC"
          fontSize="11"
          fontFamily="Inter Variable, sans-serif"
        >
          Surveillance
        </text>
        <rect
          x="458"
          y="111"
          width="133"
          height="40"
          rx="5"
          fill="#12324C"
          stroke="#3D667F"
        />
        <rect x="471" y="123" width="13" height="17" rx="2" stroke="#62DAE9" />
        <path d="M475 128h5m-5 4h5" stroke="#62DAE9" />
        <text
          x="494"
          y="136"
          fill="#D4E4EC"
          fontSize="11"
          fontFamily="Inter Variable, sans-serif"
        >
          Access control
        </text>
        <rect
          x="472"
          y="297"
          width="125"
          height="40"
          rx="5"
          fill="#12324C"
          stroke="#3D667F"
        />
        <path d="M486 309h13m-13 6h13m-13 6h8" stroke="#62DAE9" />
        <text
          x="507"
          y="322"
          fill="#D4E4EC"
          fontSize="11"
          fontFamily="Inter Variable, sans-serif"
        >
          Queue systems
        </text>
      </svg>
      <p className="illustration-caption">
        <span>BUILT AROUND YOUR ENVIRONMENT</span>
        <span>Concept illustration</span>
      </p>
    </div>
  );
}
