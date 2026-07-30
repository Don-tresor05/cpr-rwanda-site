import type { SVGProps } from "react";

export function ChurchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Roof */}
      <path d="M12 2L3 9h3v11h12V9h3L12 2z" />
      {/* Cross on top */}
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="10.5" y1="3.5" x2="13.5" y2="3.5" />
      {/* Door */}
      <rect x="9.5" y="15" width="5" height="5" rx="1" />
      {/* Window */}
      <circle cx="12" cy="11" r="1.5" />
    </svg>
  );
}

export function SchoolIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Book base */}
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      {/* Book spine detail */}
      <line x1="6.5" y1="2" x2="6.5" y2="17" />
      {/* Book pages */}
      <path d="M10 6h6" />
      <path d="M10 9h4" />
      <path d="M10 12h5" />
      {/* Roof on top */}
      <path d="M8 2L12 -1L16 2" />
    </svg>
  );
}

export function RadioTowerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Tower/pole */}
      <line x1="12" y1="2" x2="12" y2="22" />
      {/* Cross bar */}
      <line x1="8" y1="8" x2="16" y2="8" />
      {/* Signal waves */}
      <path d="M5 5a10 10 0 0 1 14 0" />
      <path d="M7.5 8.5a7 7 0 0 1 9 0" />
      <path d="M9.5 12a4 4 0 0 1 5 0" />
      {/* Mic element at top */}
      <circle cx="12" cy="4" r="1.5" />
    </svg>
  );
}

export function ServiceRibbonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Ribbon left */}
      <path d="M12 22l-5-4v-4l5 2 5-2v4l-5 4z" />
      {/* Ribbon right */}
      <path d="M12 16l-5-2v-4l5 2 5-2v4l-5 2z" />
      {/* Badge circle */}
      <circle cx="12" cy="6" r="4" />
      {/* Star in badge */}
      <path d="M12 3.5l.9 1.8 2 .3-1.45 1.4.34 2-1.79-.94-1.79.94.34-2L9.1 5.6l2-.3z" />
    </svg>
  );
}
