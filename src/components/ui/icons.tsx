import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 20): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
});

export const Dice = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="8.5" cy="8.5" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="15.5" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="8.5" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="8.5" cy="15.5" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const Chevron = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M9.5 5.5 16 12l-6.5 6.5" /></svg>
);

export const ChevronDown = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M5.5 9.5 12 16l6.5-6.5" /></svg>
);

export const Xmark = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M7 7l10 10M17 7 7 17" /></svg>
);

export const Check = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M5 12.5 10 17.5 19 7" /></svg>
);

export const Copy = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="8.5" y="8.5" width="11" height="11" rx="3" />
    <path d="M15.5 8.5V7a2.5 2.5 0 0 0-2.5-2.5H7A2.5 2.5 0 0 0 4.5 7v6A2.5 2.5 0 0 0 7 15.5h1.5" />
  </svg>
);

export const Sparkles = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3.5c.6 3.6 2.4 5.4 6 6-3.6.6-5.4 2.4-6 6-.6-3.6-2.4-5.4-6-6 3.6-.6 5.4-2.4 6-6Z" />
    <path d="M18.5 15.5c.3 1.6 1 2.3 2.5 2.5-1.5.3-2.2 1-2.5 2.5-.3-1.5-1-2.2-2.5-2.5 1.5-.2 2.2-.9 2.5-2.5Z" />
  </svg>
);

export const Car = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 15.5v-3l1.8-4.6A2 2 0 0 1 7.7 6.5h8.6a2 2 0 0 1 1.9 1.4L20 12.5v3" />
    <rect x="3" y="12.5" width="18" height="5" rx="1.8" />
    <path d="M6 17.5v1.5M18 17.5v1.5" />
    <circle cx="7" cy="15" r=".6" fill="currentColor" />
    <circle cx="17" cy="15" r=".6" fill="currentColor" />
  </svg>
);

export const Camera = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 8.5A2 2 0 0 1 6 6.5h1.8l1.4-2h5.6l1.4 2H18a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
    <circle cx="12" cy="12.5" r="3.4" />
  </svg>
);

export const Palette = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3.5a8.5 8.5 0 0 0 0 17c1.2 0 1.8-.8 1.8-1.7 0-1.2-1-1.6-1-2.6 0-1 .8-1.7 1.8-1.7h2.1a3.8 3.8 0 0 0 3.8-3.8C20.5 6.6 16.7 3.5 12 3.5Z" />
    <circle cx="7.6" cy="11.5" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="10" cy="7.6" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="14.6" cy="7.6" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export const Swatch = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4.5 4.5h6v12a3 3 0 0 1-6 0Z" />
    <path d="m10.5 8 4.2-4.2 4.3 4.3-8.5 8.4" />
    <path d="M13.5 19.5h6v-6h-2.6" />
  </svg>
);

export const Text = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M5 6.5h14M5 11h14M5 15.5h9" />
  </svg>
);

export const Sun = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
  </svg>
);

export const Moon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M19.5 14.6A7.8 7.8 0 0 1 9.4 4.5a7.8 7.8 0 1 0 10.1 10.1Z" />
  </svg>
);

export const Auto = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 4v16a8 8 0 0 0 0-16Z" fill="currentColor" stroke="none" />
  </svg>
);
