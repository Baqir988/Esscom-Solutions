import type { EquipmentVisual } from "@/types/solution";

// Original generic category illustrations. No manufacturer design, specification, or installation is implied.
export function EquipmentIllustration({
  variant,
  label,
}: {
  variant: EquipmentVisual;
  label: string;
}) {
  return (
    <svg
      className="equipment-illustration"
      viewBox="0 0 400 280"
      width="400"
      height="280"
      fill="none"
      role="img"
      aria-label={`${label} — conceptual equipment illustration`}
    >
      <path d="M30 226H370M64 248H336" stroke="#d9e4ef" />
      <ellipse cx="205" cy="229" rx="132" ry="14" fill="#dce6f0" />
      <g stroke="#0B1F3A" strokeWidth="2" strokeLinejoin="round">
        {variant === "camera" && (
          <>
            <path d="M99 93h144l20 21H80Z" fill="#e4edf7" />
            <path d="M80 114h183v21H80Z" fill="#fff" />
            <path d="M93 135c0 60 143 60 157 0" fill="#b7ccdf" />
            <path d="M121 138c9 39 95 40 109 0" fill="#0B1F3A" />
            <ellipse cx="175" cy="151" rx="19" ry="14" fill="#2563EB" />
            <ellipse cx="175" cy="151" rx="8" ry="6" fill="#06B6D4" />
            <path d="M240 186h94v39h-94z" fill="#fff" />
            <path d="M253 198h42m-42 9h30" stroke="#8a9fb6" />
            <circle cx="320" cy="204" r="3" fill="#06B6D4" stroke="none" />
            <path
              d="M174 74V57h128v116"
              stroke="#2563EB"
              strokeDasharray="5 5"
            />
          </>
        )}
        {variant === "biometric" && (
          <>
            <path d="m140 45 120 12v169l-120-12z" fill="#b9ccdf" />
            <path d="M130 45h120v169H130z" fill="#fff" />
            <rect x="144" y="61" width="92" height="67" rx="3" fill="#0B1F3A" />
            <circle cx="190" cy="84" r="11" stroke="#7ddce7" />
            <path d="M170 113c0-19 40-19 40 0" stroke="#7ddce7" />
            <rect
              x="163"
              y="142"
              width="54"
              height="54"
              rx="6"
              fill="#eaf1f9"
              stroke="#b9ccdf"
            />
            <path
              d="M176 175v-9c0-18 28-18 28 0v14m-21 3v-16c0-8 14-8 14 0v18m-7-20v24"
              stroke="#2563EB"
              strokeLinecap="round"
            />
            <path
              d="M86 74H59v126h47M282 91h48v93h-48"
              stroke="#a0b6cc"
              strokeDasharray="4 5"
            />
            <circle cx="329" cy="184" r="5" fill="#06B6D4" stroke="none" />
          </>
        )}
        {variant === "rfid" && (
          <>
            <rect
              x="112"
              y="56"
              width="100"
              height="160"
              rx="10"
              fill="#0B1F3A"
            />
            <rect x="125" y="70" width="74" height="32" rx="3" fill="#dfeef5" />
            <path
              d="M144 127q26-19 50 0m-42 10q18-12 34 0m-26 11q10-6 18 0"
              stroke="#7ddce7"
              strokeLinecap="round"
            />
            <circle cx="169" cy="162" r="3" fill="#7ddce7" stroke="none" />
            <path d="M136 186h51" stroke="#536e8b" />
            <rect
              x="231"
              y="145"
              width="100"
              height="65"
              rx="6"
              transform="rotate(-12 231 145)"
              fill="#fff"
            />
            <path d="m249 163 55-12m-51 26 24-5" stroke="#2563EB" />
            <circle cx="299" cy="182" r="8" fill="#eaf1f9" stroke="#06B6D4" />
          </>
        )}
        {variant === "queue" && (
          <>
            <path d="m91 102 62 8 15 116H74Z" fill="#fff" />
            <path d="m91 102 8-37h48l6 45Z" fill="#e4edf7" />
            <path d="M104 77h31v22h-31z" fill="#2563EB" stroke="none" />
            <path d="M96 135h43" strokeWidth="5" />
            <path d="M103 138v37h28v-37" fill="#fff" />
            <path d="M110 148h14m-14 8h10" stroke="#a0b6cc" />
            <rect
              x="194"
              y="54"
              width="144"
              height="89"
              rx="5"
              fill="#0B1F3A"
            />
            <path d="M208 83h116" stroke="#456078" />
            <text x="210" y="74" fill="#b9ccdf" stroke="none" fontSize="9">
              TICKET
            </text>
            <text x="282" y="74" fill="#b9ccdf" stroke="none" fontSize="9">
              COUNTER
            </text>
            <text
              x="210"
              y="115"
              fill="#7ddce7"
              stroke="none"
              fontSize="25"
              fontFamily="monospace"
            >
              024
            </text>
            <text
              x="292"
              y="115"
              fill="#fff"
              stroke="none"
              fontSize="25"
              fontFamily="monospace"
            >
              02
            </text>
            <path d="M265 144v72m-31 8h65" strokeWidth="6" />
            <path
              d="M155 125h22V97h16"
              stroke="#2563EB"
              strokeDasharray="3 4"
            />
          </>
        )}
        {variant === "pos" && (
          <>
            <path d="m99 64 138 9-9 104-138-9Z" fill="#0B1F3A" />
            <path d="m111 78 113 6-7 78-113-6Z" fill="#eaf1f9" />
            <path d="m119 96 57 3m-58 12 53 3m-54 12 47 3" stroke="#a0b6cc" />
            <path d="m189 99 24 1-3 43-24-1Z" fill="#2563EB" stroke="none" />
            <path d="m154 174-4 34h42l-10-33M128 214h87" strokeWidth="5" />
            <path d="M250 173h78v48h-78z" fill="#fff" />
            <path d="M260 185h57" strokeWidth="4" />
            <path d="M266 183v-36h44v36" fill="#fff" />
            <path d="M275 156h25m-25 9h18" stroke="#a0b6cc" />
            <path d="M65 184v35m-10 3h23" strokeWidth="5" />
            <path d="m49 161 32 9-7 19-32-9Z" fill="#2563EB" />
          </>
        )}
        {variant === "display" && (
          <>
            <rect
              x="81"
              y="59"
              width="243"
              height="143"
              rx="6"
              fill="#0B1F3A"
            />
            <path d="M92 70h221v121H92z" fill="#eaf1f9" stroke="none" />
            <path d="M105 83h91v95h-91z" fill="#2563EB" stroke="none" />
            <path
              d="m116 157 19-29 21 10 26-34"
              stroke="#7ddce7"
              strokeWidth="4"
            />
            <circle cx="125" cy="102" r="8" fill="#fff" stroke="none" />
            <path
              d="M212 89h85m-85 14h68m-68 32h85m-85 13h75m-75 13h54"
              stroke="#8aa4be"
            />
            <path d="M183 203v18m39-18v18m-59 6h79" strokeWidth="5" />
            <path
              d="M48 89V38h48m242 166h20v-42"
              stroke="#06B6D4"
              strokeDasharray="4 5"
            />
          </>
        )}
      </g>
      <circle cx="52" cy="51" r="4" fill="#06B6D4" />
      <path d="M341 47h12m-6-6v12" stroke="#a8bdd1" />
    </svg>
  );
}
