export function StitchPattern({ id, kind, color, k }: { id: string; kind: string; color: string; k: number }) {
  const line = { stroke: color, strokeWidth: 1.3, strokeDasharray: '3 2.4', fill: 'none' };
  const tf = `scale(${k})`;
  switch (kind) {
    case 'diamond':
      return (
        <pattern id={id} width="34" height="34" patternUnits="userSpaceOnUse" patternTransform={tf}>
          <path d="M0,0 L34,34 M34,0 L0,34" {...line} />
          {[[0, 0], [34, 0], [0, 34], [34, 34], [17, 17]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={1.8} fill={color} />)}
        </pattern>
      );
    case 'fine_diamond':
      return (
        <pattern id={id} width="15" height="15" patternUnits="userSpaceOnUse" patternTransform={tf}>
          <path d="M0,0 L15,15 M15,0 L0,15" {...line} strokeWidth={0.9} strokeDasharray="2 1.6" />
        </pattern>
      );
    case 'honeycomb': {
      const r = 12, w = r * Math.sqrt(3), h = 3 * r;
      const hex = (cx: number, cy: number) =>
        `M${cx},${cy - r} L${cx + w / 2},${cy - r / 2} L${cx + w / 2},${cy + r / 2} L${cx},${cy + r} L${cx - w / 2},${cy + r / 2} L${cx - w / 2},${cy - r / 2} Z`;
      return (
        <pattern id={id} width={w} height={h} patternUnits="userSpaceOnUse" patternTransform={tf}>
          <path d={[hex(0, 0), hex(w, 0), hex(w / 2, 1.5 * r), hex(0, 3 * r), hex(w, 3 * r)].join(' ')} {...line} strokeWidth={1.1} />
        </pattern>
      );
    }
    case 'horiz_pleats':
    case 'vert_pleats':
      return (
        <pattern id={id} width="40" height="24" patternUnits="userSpaceOnUse"
          patternTransform={`${tf}${kind === 'vert_pleats' ? ' rotate(90)' : ''}`}>
          <path d="M0,13 H40" stroke="rgba(0,0,0,0.35)" strokeWidth={4} />
          <path d="M0,11 H40" {...line} />
        </pattern>
      );
    case 'square_grid':
      return (
        <pattern id={id} width="28" height="28" patternUnits="userSpaceOnUse" patternTransform={tf}>
          <path d="M0,0 H28 M0,0 V28" {...line} />
        </pattern>
      );
    case 'chevron':
      return (
        <pattern id={id} width="32" height="16" patternUnits="userSpaceOnUse" patternTransform={tf}>
          <path d="M0,13 L16,3 L32,13" {...line} />
        </pattern>
      );
    case 'perforated':
      return (
        <pattern id={id} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform={tf}>
          <circle cx="3.5" cy="3.5" r="1.1" fill="rgba(0,0,0,0.5)" />
        </pattern>
      );
    default:
      return null;
  }
}

export function TrimPatterns({ uid }: { uid: string }) {
  return (
    <>
      <pattern id={`${uid}-carbon`} width="14" height="14" patternUnits="userSpaceOnUse">
        <rect width="14" height="14" fill="#0e0e10" />
        <path d="M0,7 L7,0 L14,7 L7,14 Z" fill="#1e1e22" />
        <path d="M0,0 L14,14 M14,0 L0,14" stroke="#2a2a30" strokeWidth="0.6" />
      </pattern>
      <pattern id={`${uid}-wood_m`} width="80" height="28" patternUnits="userSpaceOnUse">
        <rect width="80" height="28" fill="#2c1a10" />
        <path d="M0,6 Q20,4 40,6 T80,6" stroke="#3a2418" strokeWidth="1.2" fill="none" opacity="0.7" />
        <path d="M0,14 Q25,12 50,14 T80,14" stroke="#1f120a" strokeWidth="0.8" fill="none" opacity="0.8" />
        <path d="M0,22 Q15,20 35,22 T80,22" stroke="#3a2418" strokeWidth="1" fill="none" opacity="0.6" />
      </pattern>
      <pattern id={`${uid}-wood_c`} width="80" height="28" patternUnits="userSpaceOnUse">
        <rect width="80" height="28" fill="#8b5a2b" />
        <path d="M0,6 Q20,4 40,6 T80,6" stroke="#6b3e18" strokeWidth="1.2" fill="none" opacity="0.8" />
        <path d="M0,14 Q25,12 50,14 T80,14" stroke="#a06e3d" strokeWidth="0.8" fill="none" opacity="0.7" />
        <path d="M0,22 Q15,20 35,22 T80,22" stroke="#5a321a" strokeWidth="1" fill="none" opacity="0.6" />
      </pattern>
    </>
  );
}
