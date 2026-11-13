import { useEffect } from 'react';
import { CAMERA_ANGLES, hasRearAccess } from '../carDatabase';

interface CameraAngleProps {
  selected: string;
  onSelect: (id: string) => void;
  carType?: string | null;
}

type Cam = { x: number; y: number; dir?: number; fov?: number; top?: boolean };

const CAMS: Record<string, (rear: boolean) => Cam> = {
  driver_door: () => ({ x: 10, y: 74, dir: 0, fov: 70 }),
  bird_eye: rear => ({ x: 60, y: rear ? 92 : 80, top: true }),
  driver_pov: () => ({ x: 45, y: 74, dir: -90, fov: 46 }),
  passenger_door: () => ({ x: 110, y: 74, dir: 180, fov: 70 }),
  rear_seat: () => ({ x: 60, y: 116, dir: -90, fov: 64 }),
  cabin_overview: rear => ({ x: 60, y: rear ? 104 : 96, dir: -90, fov: 96 }),
  front_to_rear: () => ({ x: 60, y: 72, dir: 90, fov: 70 }),
  wide_front: () => ({ x: 60, y: 40, dir: 90, fov: 96 }),
  trunk_open: () => ({ x: 60, y: 172, dir: -90, fov: 60 }),
  trunk_in: () => ({ x: 60, y: 142, dir: -90, fov: 74 }),
};

function cone(c: Cam, len = 56) {
  const a0 = ((c.dir! - c.fov! / 2) * Math.PI) / 180;
  const a1 = ((c.dir! + c.fov! / 2) * Math.PI) / 180;
  const p = (a: number) => `${(c.x + len * Math.cos(a)).toFixed(1)},${(c.y + len * Math.sin(a)).toFixed(1)}`;
  return `M${c.x},${c.y} L${p(a0)} A${len},${len} 0 0 1 ${p(a1)} Z`;
}

function Diagram({ id, rear, on }: { id: string; rear: boolean; on: boolean }) {
  const c = (CAMS[id] || CAMS.driver_door)(rear);
  const bodyH = rear ? 160 : 128;
  const gid = `cone-${id}`;
  return (
    <svg viewBox="0 0 120 184" className="angle-svg" aria-hidden="true">
      <defs>
        <radialGradient id={gid} cx={c.x} cy={c.y} r="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--tint)" stopOpacity={on ? 0.9 : 0.6} />
          <stop offset="100%" stopColor="var(--tint)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="27" y="12" width="66" height={bodyH} rx="22" className="ad-body" />
      <path d="M33,44 Q60,34 87,44" className="ad-line" />
      <rect x="35" y="62" width="21" height="28" rx="7" className="ad-seat" />
      <rect x="64" y="62" width="21" height="28" rx="7" className="ad-seat" />
      {rear && <rect x="35" y="104" width="50" height="22" rx="7" className="ad-seat" />}
      {rear && <path d="M33,140 H87" className="ad-line" />}
      {c.top ? (
        <g>
          <circle cx={c.x} cy={c.y} r="30" className="ad-ring" />
          <circle cx={c.x} cy={c.y} r="18" className="ad-ring" />
        </g>
      ) : (
        <path d={cone(c)} fill={`url(#${gid})`} />
      )}
      <circle cx={c.x} cy={c.y} r="5.5" className="ad-cam" />
    </svg>
  );
}

export function CameraAngleSelector({ selected, onSelect, carType }: CameraAngleProps) {
  const rear = hasRearAccess(carType || undefined);
  const visible = CAMERA_ANGLES.filter(a => !a.requires4Door || rear);

  useEffect(() => {
    if (!visible.some(a => a.id === selected)) onSelect(visible[0]?.id || 'driver_door');
  }, [carType, selected, visible, onSelect]);

  return (
    <div className="angles" role="radiogroup" aria-label="Ракурс">
      {visible.map(a => {
        const on = selected === a.id;
        return (
          <button key={a.id} role="radio" aria-checked={on} className={`angle${on ? ' on' : ''}`} onClick={() => onSelect(a.id)}>
            <Diagram id={a.id} rear={rear} on={on} />
            <span>{a.nameRu}</span>
          </button>
        );
      })}
    </div>
  );
}
