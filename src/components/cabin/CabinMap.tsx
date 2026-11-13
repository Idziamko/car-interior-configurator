import React, { useEffect, useRef, useState } from 'react';
import { AZ } from '../../data';
import {
  cabinShapes, cabinCenters, doorShapes, seatShapes, wheelShapes, LIFT,
  DOOR_INSERT, SEAT_CENTERS, rr, circle, arc, ring,
} from './shapes';
import type { Shape } from './shapes';
import { StitchPattern, TrimPatterns } from './patterns';
import { bakeSvg } from './bake';
import type { BakeSpec } from './bake';

type Scene = 'cabin' | 'console' | 'door' | 'seat' | 'wheel';

interface Props {
  colors: Record<string, string>;
  activeZone: string | null;
  onZoneClick: (id: string) => void;
  trimId: string;
  trimColor: string;
  hasRear: boolean;
  stitchPattern: string;
  alcantaraZones: string[];
}

const ALC_MAP: Record<string, string[]> = {
  door_upper: ['du_l', 'du_r'],
  door_inserts: ['di_l', 'di_r'],
  dash_top: ['dt'],
  dash_full: ['dt', 'db'],
  steering: ['sw_s'],
  seat_centers: ['sb_d', 'sb_p', 'rs_b'],
  seat_bolsters: ['sv_d', 'sv_p', 'rs_v'],
  console: ['con'],
  armrest: ['arm'],
  shift_boot: ['sbo'],
};

const CONSOLE_IDS = ['sk', 'sbo', 'hh', 'hbo', 'arm', 'con'];

const TABS: { id: Scene; label: string }[] = [
  { id: 'cabin', label: 'Салон' },
  { id: 'door', label: 'Дверь' },
  { id: 'seat', label: 'Сиденье' },
  { id: 'wheel', label: 'Руль' },
  { id: 'console', label: 'Консоль' },
];

const LABELS: Record<string, string> = Object.fromEntries(AZ.map(z => [z.id, z.l]));
LABELS.trim = 'Декор торпедо';

type Home = { scene: Scene; side?: 'l' | 'r' | 'd' | 'p' };

function homeOf(id: string): Home {
  if (/^d[uaildh]_[lr]$/.test(id)) return { scene: 'door', side: id.slice(-1) as 'l' | 'r' };
  if (/^(sb|sv|hr)_[dp]$/.test(id)) return { scene: 'seat', side: id.slice(-1) as 'd' | 'p' };
  if (id === 'st' || id === 'pp') return { scene: 'seat' };
  if (id.startsWith('sw_')) return { scene: 'wheel' };
  if (CONSOLE_IDS.includes(id)) return { scene: 'console' };
  return { scene: 'cabin' };
}

const D = { pointerEvents: 'none' as const };

// static layers: baked into a bitmap once per scene and size, so colour changes never re-run filters
function Baked({ spec, sk }: { spec: BakeSpec; sk: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const specRef = useRef(spec);
  const [size, setSize] = useState<[number, number]>([0, 0]);

  useEffect(() => { specRef.current = spec; });

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ro = new ResizeObserver(([e]) => {
      const r = e.contentRect;
      setSize([Math.round(r.width), Math.round(r.height)]);
    });
    ro.observe(c);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const [w, h] = size;
    const c = ref.current;
    if (!c || !w || !h) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = Math.round(w * dpr);
    const H = Math.round(h * dpr);
    const url = URL.createObjectURL(new Blob([bakeSvg(specRef.current, W, H)], { type: 'image/svg+xml' }));
    const img = new Image();
    let dead = false;
    img.onload = () => {
      if (dead) return;
      c.width = W;
      c.height = H;
      const ctx = c.getContext('2d');
      ctx?.clearRect(0, 0, W, H);
      ctx?.drawImage(img, 0, 0, W, H);
      URL.revokeObjectURL(url);
    };
    img.src = url;
    return () => { dead = true; URL.revokeObjectURL(url); };
  }, [sk, size]);

  return <canvas ref={ref} className="cm-layer cm-baked" aria-hidden="true" />;
}

// ---------- live (cheap) layers ----------

function Defs({ uid, colors, stitchPattern, k }: { uid: string; colors: Record<string, string>; stitchPattern: string; k: number }) {
  return (
    <defs>
      <linearGradient id={`${uid}-chrome`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f2f3f6" />
        <stop offset="45%" stopColor="#9a9ea6" />
        <stop offset="55%" stopColor="#6d7179" />
        <stop offset="100%" stopColor="#c9ccd2" />
      </linearGradient>
      <linearGradient id={`${uid}-alu`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#c9cdd3" />
        <stop offset="100%" stopColor="#6f747c" />
      </linearGradient>
      <linearGradient id={`${uid}-piano`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2b2d33" />
        <stop offset="35%" stopColor="#0b0c0e" />
        <stop offset="100%" stopColor="#050506" />
      </linearGradient>
      <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3a4656" />
        <stop offset="55%" stopColor="#141a22" />
        <stop offset="100%" stopColor="#0b0e13" />
      </linearGradient>
      <linearGradient id={`${uid}-screen`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1f3550" />
        <stop offset="60%" stopColor="#0b1422" />
        <stop offset="100%" stopColor="#05080d" />
      </linearGradient>
      <linearGradient id={`${uid}-shell`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1a1c21" />
        <stop offset="100%" stopColor="#0c0d10" />
      </linearGradient>
      <TrimPatterns uid={uid} />
      <pattern id={`${uid}-grille`} width="7" height="7" patternUnits="userSpaceOnUse">
        <rect width="7" height="7" fill="#17181b" />
        <circle cx="3.5" cy="3.5" r="1.6" fill="#040405" />
      </pattern>
      <StitchPattern id={`${uid}-stitch`} kind={stitchPattern} color={colors.st || '#1A1A1A'} k={k} />
    </defs>
  );
}

function Selection({ shapes, active }: { shapes: Shape[]; active: string | null }) {
  if (!active) return null;
  const hit = shapes.filter(s => s.id === active);
  return (
    <g pointerEvents="none">
      {hit.map((s, i) => (
        <g key={i}>
          <path d={s.d} fill="rgba(255,255,255,0.08)" stroke="rgba(0,0,0,0.55)" strokeWidth={6} vectorEffect="non-scaling-stroke" />
          <path d={s.d} className="cz-sel" fill="none" stroke="#fff" strokeWidth={2.4} vectorEffect="non-scaling-stroke" />
        </g>
      ))}
    </g>
  );
}

type Rect = { x: number; y: number; w: number; h: number; r: number };

function Upholstery({ uid, rects, colors, stitchPattern, piping, pick }: {
  uid: string; rects: Rect[]; colors: Record<string, string>; stitchPattern: string; piping: number;
  pick?: (id: string) => void;
}) {
  const st = colors.st || '#1A1A1A';
  const pp = colors.pp || '#1A1A1A';
  const inset = piping * 2.6;
  const hasFill = !['none', 'baseball'].includes(stitchPattern);
  const hit = (id: string) => pick ? {
    pointerEvents: 'stroke' as const, stroke: 'transparent', strokeWidth: piping * 5, fill: 'none',
    style: { cursor: 'pointer' }, onClick: (e: React.MouseEvent) => { e.stopPropagation(); pick(id); },
  } : null;
  const dash = `${piping * 1.2} ${piping}`;
  return (
    <g>
      {rects.map((c, i) => {
        const outer = rr(c.x, c.y, c.w, c.h, c.r);
        const inner = rr(c.x + inset, c.y + inset, c.w - inset * 2, c.h - inset * 2, Math.max(4, c.r - inset));
        const inner2 = rr(c.x + inset * 1.7, c.y + inset * 1.7, c.w - inset * 3.4, c.h - inset * 3.4, Math.max(4, c.r - inset * 1.7));
        return (
          <g key={i}>
            {hasFill && <path d={inner} fill={`url(#${uid}-stitch)`} pointerEvents="none" />}
            <path d={inner} fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth={piping * 0.9} pointerEvents="none" transform={`translate(0,${piping * 0.25})`} />
            <path d={inner} fill="none" stroke={st} strokeWidth={piping * 0.45} strokeDasharray={dash} pointerEvents="none" />
            {stitchPattern === 'baseball' && (
              <path d={inner2} fill="none" stroke={st} strokeWidth={piping * 0.45} strokeDasharray={dash} pointerEvents="none" />
            )}
            <path d={outer} fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth={piping * 1.6} pointerEvents="none" />
            <path d={outer} fill="none" stroke={pp} strokeWidth={piping} pointerEvents="none" />
            <path d={outer} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={piping * 0.3} pointerEvents="none" transform={`translate(0,${-piping * 0.25})`} />
            {pick && <path d={inner} {...hit('st')} />}
            {pick && <path d={outer} {...hit('pp')} />}
          </g>
        );
      })}
    </g>
  );
}

function Vent({ x, y, w, h, uid }: { x: number; y: number; w: number; h: number; uid: string }) {
  const slats = [0.3, 0.5, 0.7].map(f => `M${x + 5},${y + h * f} H${x + w - 5}`).join(' ');
  return (
    <g {...D}>
      <path d={rr(x - 2, y - 2, w + 4, h + 4, 9)} fill={`url(#${uid}-chrome)`} opacity={0.55} />
      <path d={rr(x, y, w, h, 8)} fill="#060708" />
      <path d={slats} stroke="rgba(255,255,255,0.22)" strokeWidth={2} strokeLinecap="round" />
    </g>
  );
}

function Speaker({ cx, cy, r, uid }: { cx: number; cy: number; r: number; uid: string }) {
  return (
    <g {...D}>
      <path d={circle(cx, cy, r + r * 0.12)} fill={`url(#${uid}-chrome)`} opacity={0.6} />
      <path d={circle(cx, cy, r)} fill={`url(#${uid}-grille)`} />
      <path d={circle(cx, cy - r * 0.15, r * 0.95)} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={r * 0.08} />
    </g>
  );
}

interface SceneCfg {
  key: string;
  vb: string;
  k: number;
  s: number;
  flip?: string;
  shapes: Shape[];
  pre?: React.ReactNode;
  after?: Record<string, React.ReactNode>;
  post?: React.ReactNode;
}

export function CabinMap({ colors, activeZone, onZoneClick, trimId, trimColor, hasRear, stitchPattern, alcantaraZones }: Props) {
  const [scene, setScene] = useState<Scene>('cabin');
  const [doorSide, setDoorSide] = useState<'l' | 'r'>('l');
  const [seatSide, setSeatSide] = useState<'d' | 'p'>('d');

  const go = (h: Home) => {
    setScene(h.scene);
    if (h.scene === 'door' && (h.side === 'l' || h.side === 'r')) setDoorSide(h.side);
    if (h.scene === 'seat' && (h.side === 'd' || h.side === 'p')) setSeatSide(h.side);
  };

  const [seenZone, setSeenZone] = useState(activeZone);
  if (activeZone !== seenZone) {
    setSeenZone(activeZone);
    if (activeZone) go(homeOf(activeZone));
  }

  const pick = (id: string) => {
    go(homeOf(id));
    onZoneClick(id);
  };

  const uid = 'cm';
  const alcIds = alcantaraZones.flatMap(z => ALC_MAP[z] || []);
  const trimFill = ['carbon', 'wood_m', 'wood_c'].includes(trimId)
    ? `url(#${uid}-${trimId})`
    : trimId === 'custom' ? trimColor : colors.dt || '#1A1A1A';
  const st = colors.st || '#1A1A1A';

  const inScene = (id: string) => {
    if (scene === 'cabin') return true;
    const h = homeOf(id);
    if (h.scene !== scene) return id === 'st' || id === 'pp' ? scene === 'door' || scene === 'seat' || (id === 'st' && scene === 'wheel') : false;
    if (scene === 'door') return h.side === doorSide;
    if (scene === 'seat') return !h.side || h.side === seatSide;
    return true;
  };
  const label = activeZone && inScene(activeZone) ? LABELS[activeZone] : null;
  const isCabin = scene === 'cabin' || scene === 'console';

  let cfg: SceneCfg;
  if (isCabin) {
    const cabin = cabinShapes(hasRear);
    const H = cabin.H;
    const [Y0, Y1] = cabin.doorSpan;
    const seatDecor = (cx: number, inner: number) => (
      <g {...D}>
        <path d={`M${cx - 78},498 C${cx - 82},560 ${cx - 82},620 ${cx - 80},664 M${cx + 78},498 C${cx + 82},560 ${cx + 82},620 ${cx + 80},664 M${cx - 82},700 C${cx - 86},760 ${cx - 86},820 ${cx - 82},866 M${cx + 82},700 C${cx + 86},760 ${cx + 86},820 ${cx + 82},866`}
          stroke="rgba(0,0,0,0.32)" strokeWidth={3} fill="none" strokeLinecap="round" />
        <path d={`M${cx - 98},678 Q${cx},698 ${cx + 98},678`} stroke="rgba(0,0,0,0.45)" strokeWidth={8} fill="none" strokeLinecap="round" />
        <path d={rr(inner - 7, 698, 14, 38, 5)} fill="#0a0b0d" />
        <path d={rr(inner - 5, 700, 10, 12, 3)} fill={`url(#${uid}-chrome)`} />
      </g>
    );
    const doorDecor = (side: 'l' | 'r') => {
      const x = (v: number, w = 0) => (side === 'l' ? v : cabin.W - v - w);
      return (
        <g {...D}>
          <Speaker cx={x(59)} cy={Y1 - 72} r={11} uid={uid} />
          <path d={rr(x(58, 18), Y0 + 140, 18, 40, 7)} fill="#08090a" />
          <path d={rr(x(60, 14), Y0 + 146, 14, 26, 6)} fill={`url(#${uid}-chrome)`} />
          <path d={rr(x(58, 18), Y0 + 214, 18, 26, 5)} fill="#0b0c0e" />
          <path d={rr(x(61, 12), Y0 + 218, 12, 8, 2) + rr(x(61, 12), Y0 + 229, 12, 8, 2)} fill="#26282d" />
        </g>
      );
    };
    cfg = {
      key: `${scene}-${hasRear ? 4 : 2}`,
      vb: scene === 'console' ? '200 360 400 560' : `0 0 ${cabin.W} ${H}`,
      k: 0.55,
      s: 6,
      shapes: cabin.shapes,
      pre: (
        <g {...D}>
          <path d="M28,200 L4,186 C-2,182 -2,170 6,166 L30,162 Z M772,200 L796,186 C802,182 802,170 794,166 L770,162 Z" fill={`url(#${uid}-shell)`} stroke="rgba(255,255,255,0.1)" strokeWidth={2} />
          <path
            d={`M400,10 C612,10 742,38 772,110 L782,${H - 60} C782,${H - 22} 752,${H - 8} 700,${H - 8} L100,${H - 8} C48,${H - 8} 18,${H - 22} 18,${H - 60} L28,110 C58,38 188,10 400,10 Z`}
            fill={`url(#${uid}-shell)`} stroke="rgba(255,255,255,0.1)" strokeWidth={2}
          />
          <path d="M70,96 C150,38 650,38 730,96 L716,116 C640,70 160,70 84,116 Z" fill={`url(#${uid}-glass)`} />
          <path d="M150,64 L230,52 L180,104 L120,100 Z" fill="rgba(255,255,255,0.06)" />
        </g>
      ),
      after: {
        mat_d: (
          <g {...D}>
            <path d={rr(110, 374, 194, 112, 20)} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={3} />
            <path d={rr(146, 300, 34, 50, 8) + rr(196, 296, 44, 56, 9)} fill="#1a1b1f" stroke="#33353b" strokeWidth={2} />
            <path d={rr(258, 288, 22, 70, 7)} fill="#1a1b1f" stroke="#33353b" strokeWidth={2} />
            <path d="M150,312 H176 M150,324 H176 M150,336 H176 M200,310 H236 M200,322 H236 M200,334 H236" stroke="#3d4047" strokeWidth={2.5} strokeLinecap="round" />
          </g>
        ),
        mat_p: <path {...D} d={rr(496, 306, 194, 180, 22)} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={3} />,
        dt: (
          <g {...D}>
            <path d="M126,200 C124,140 290,136 288,200 C250,186 166,186 126,200 Z" fill="rgba(0,0,0,0.42)" />
            <path d="M140,190 C146,154 270,152 276,190" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={3} />
            <path d={rr(330, 112, 140, 66, 12)} fill="#030405" />
            <path d={rr(334, 116, 132, 58, 9)} fill={`url(#${uid}-screen)`} />
            <path d="M342,124 L402,124 L372,168 L342,168 Z" fill="rgba(255,255,255,0.05)" />
            <path d={rr(348, 154, 28, 8, 3) + rr(382, 154, 28, 8, 3) + rr(416, 154, 28, 8, 3)} fill="rgba(120,180,255,0.35)" />
            <path d="M190,116 Q400,100 610,116" fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth={5} strokeDasharray="3 4" />
            <Speaker cx={104} cy={172} r={10} uid={uid} />
            <Speaker cx={696} cy={172} r={10} uid={uid} />
          </g>
        ),
        db: (
          <g>
            <Vent x={66} y={252} w={58} h={32} uid={uid} />
            <Vent x={676} y={252} w={58} h={32} uid={uid} />
            <path {...D} d="M520,276 Q610,270 712,278" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth={3} />
            <path {...D} d={rr(642, 266, 30, 8, 4)} fill={`url(#${uid}-chrome)`} opacity={0.8} />
          </g>
        ),
        con: (
          <g>
            <Vent x={348} y={250} w={48} h={30} uid={uid} />
            <Vent x={404} y={250} w={48} h={30} uid={uid} />
            <g {...D}>
              <path d={rr(350, 302, 100, 64, 14)} fill="#0b0c0e" stroke="rgba(255,255,255,0.08)" strokeWidth={2} />
              <path d={circle(374, 334, 13) + circle(426, 334, 13)} fill={`url(#${uid}-chrome)`} />
              <path d={circle(374, 334, 9) + circle(426, 334, 9)} fill="#16171a" />
              <path d={rr(392, 316, 16, 8, 3) + rr(392, 330, 16, 8, 3) + rr(392, 344, 16, 8, 3)} fill="#2a2c31" />
              <path d={rr(356, 384, 88, 140, 32)} fill={`url(#${uid}-piano)`} stroke="rgba(255,255,255,0.1)" strokeWidth={2} />
              <path d="M366,396 C380,390 420,390 434,396" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={3} strokeLinecap="round" />
              <path d={rr(366, 536, 20, 12, 4) + rr(390, 536, 20, 12, 4) + rr(414, 536, 20, 12, 4)} fill="#1d1f23" stroke="rgba(255,255,255,0.08)" />
              <path d={circle(384, 694, 16) + circle(416, 694, 16)} fill={`url(#${uid}-chrome)`} opacity={0.55} />
              <path d={circle(384, 694, 13) + circle(416, 694, 13)} fill="#050506" />
            </g>
          </g>
        ),
        sk: <path {...D} d="M384,436 C390,428 410,428 416,436" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={3} strokeLinecap="round" />,
        arm: (
          <g {...D}>
            <path d="M352,774 Q400,766 448,774" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth={4} />
            <path d="M356,768 Q400,760 444,768" fill="none" stroke={st} strokeWidth={1.6} strokeDasharray="4 3" />
          </g>
        ),
        sv_d: seatDecor(207, 309),
        sv_p: seatDecor(593, 491),
        dh_l: doorDecor('l'),
        dh_r: doorDecor('r'),
        rs_v: (
          <g {...D}>
            <path d="M96,1146 Q400,1158 704,1146" stroke="rgba(0,0,0,0.4)" strokeWidth={7} fill="none" strokeLinecap="round" />
            <path d={rr(330, 1132, 12, 30, 4) + rr(458, 1132, 12, 30, 4)} fill="#0a0b0d" />
          </g>
        ),
        tr: (
          <g {...D}>
            <path d={rr(96, 1334, 608, 10, 4)} fill={`url(#${uid}-chrome)`} opacity={0.5} />
            {[[130, 1372], [670, 1372], [130, 1446], [670, 1446]].map(([x, y]) => (
              <path key={`${x}-${y}`} d={circle(x, y, 8)} fill="none" stroke={`url(#${uid}-chrome)`} strokeWidth={3} />
            ))}
          </g>
        ),
        sw_c: (
          <g {...D}>
            <path d={circle(207, 296, 11)} fill={`url(#${uid}-chrome)`} />
            <path d={circle(207, 296, 8)} fill="#15171b" />
          </g>
        ),
      },
      post: (
        <>
          <Upholstery uid={uid} rects={cabinCenters(hasRear)} colors={colors} stitchPattern={stitchPattern} piping={2.6} />
          <g {...D}>
            <path d={arc(207, 300, 83, 334, 386) + ' ' + arc(207, 300, 83, 154, 206)} fill="none" stroke={st} strokeWidth={1.4} strokeDasharray="3 2.5" />
            <path d={ring(207, 300, 92, 74, 266, 274)} fill={st} opacity={0.9} />
          </g>
          {scene === 'cabin' && (
            <g fill="transparent" className="cm-pad">
              <path d={circle(207, 300, 100)} onClick={() => setScene('wheel')} />
              <rect x={8} y={Y0} width={76} height={Y1 - Y0} onClick={() => go({ scene: 'door', side: 'l' })} />
              <rect x={716} y={Y0} width={76} height={Y1 - Y0} onClick={() => go({ scene: 'door', side: 'r' })} />
            </g>
          )}
        </>
      ),
    };
  } else if (scene === 'door') {
    cfg = {
      key: `door-${doorSide}`,
      vb: '0 0 1000 580',
      k: 1,
      s: 12,
      flip: doorSide === 'r' ? 'translate(1000,0) scale(-1,1)' : undefined,
      shapes: doorShapes(doorSide),
      pre: (
        <g {...D}>
          <path d="M100,80 L168,10 L862,10 C906,10 930,34 944,80 Z" fill={`url(#${uid}-glass)`} />
          <path d="M260,10 L340,10 L250,80 L170,80 Z" fill="rgba(255,255,255,0.07)" />
          <path d="M96,82 L946,82" stroke={`url(#${uid}-chrome)`} strokeWidth={4} />
        </g>
      ),
      after: {
        [`da_${doorSide}`]: (
          <g {...D}>
            <path d="M62,155 L946,155" stroke={st} strokeWidth={2.2} strokeDasharray="7 5" />
            <path d="M64,188 C420,194 700,190 942,184" fill="none" stroke={st} strokeWidth={2.2} strokeDasharray="7 5" />
          </g>
        ),
        [`di_${doorSide}`]: (
          <g {...D}>
            <path d={rr(784, 228, 124, 44, 22)} fill="rgba(0,0,0,0.55)" />
            <path d={rr(796, 236, 100, 28, 14)} fill={`url(#${uid}-chrome)`} />
            <path d="M70,376 L930,376" stroke="rgba(120,200,255,0.25)" strokeWidth={3} />
          </g>
        ),
        [`dh_${doorSide}`]: (
          <g {...D}>
            <ellipse cx={640} cy={378} rx={96} ry={16} fill="rgba(0,0,0,0.5)" />
            <path d={rr(752, 334, 120, 26, 11)} fill="#0b0c0e" stroke="rgba(255,255,255,0.12)" strokeWidth={2} />
            <path d={rr(764, 339, 44, 16, 7) + rr(816, 339, 44, 16, 7)} fill="#1e2024" stroke="rgba(255,255,255,0.08)" />
            <path d="M478,336 L878,332" stroke={st} strokeWidth={2} strokeDasharray="6 5" />
          </g>
        ),
        [`dl_${doorSide}`]: (
          <g {...D}>
            <path d="M352,428 L892,428 C902,428 906,438 902,448 L890,480 L364,480 Z" fill="rgba(0,0,0,0.45)" />
            <path d="M352,428 L892,428" stroke="rgba(255,255,255,0.12)" strokeWidth={3} />
            <Speaker cx={214} cy={466} r={56} uid={uid} />
          </g>
        ),
      },
      post: <Upholstery uid={uid} rects={[DOOR_INSERT]} colors={colors} stitchPattern="none" piping={5} pick={pick} />,
    };
  } else if (scene === 'seat') {
    cfg = {
      key: `seat-${seatSide}`,
      vb: '0 0 1000 780',
      k: 1.4,
      s: 14,
      shapes: seatShapes(seatSide),
      pre: (
        <g {...D}>
          <path d={rr(450, 140, 16, 40, 5) + rr(534, 140, 16, 40, 5)} fill={`url(#${uid}-chrome)`} />
          <path d={rr(300, 722, 400, 34, 10)} fill="#0a0b0c" />
          <path d={rr(286, 756, 428, 12, 6)} fill={`url(#${uid}-alu)`} opacity={0.6} />
          <path d={rr(772, 640, 74, 18, 9)} fill="#111216" stroke="rgba(255,255,255,0.08)" />
        </g>
      ),
      after: {
        [`sv_${seatSide}#1`]: (
          <g {...D}>
            <path d="M372,200 C360,300 356,420 360,540 M628,200 C640,300 644,420 640,540" stroke="rgba(0,0,0,0.3)" strokeWidth={5} fill="none" strokeLinecap="round" />
            <path d="M346,254 Q500,240 654,254" stroke="rgba(0,0,0,0.25)" strokeWidth={4} fill="none" />
          </g>
        ),
        [`sv_${seatSide}#2`]: (
          <path {...D} d="M300,578 C290,620 288,680 298,718 M700,578 C710,620 712,680 702,718" stroke="rgba(0,0,0,0.3)" strokeWidth={5} fill="none" strokeLinecap="round" />
        ),
      },
      post: <Upholstery uid={uid} rects={SEAT_CENTERS} colors={colors} stitchPattern={stitchPattern} piping={6} pick={pick} />,
    };
  } else {
    const cx = 500, cy = 380, R = 320;
    const buttons = (x: number) => (
      <g {...D}>
        <path d={rr(x - 46, cy - 26, 40, 22, 8) + rr(x + 6, cy - 26, 40, 22, 8) + rr(x - 46, cy + 4, 40, 22, 8) + rr(x + 6, cy + 4, 40, 22, 8)} fill="#0c0d10" stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} />
        <path d={`M${x - 32},${cy - 15} h12 M${x + 20},${cy - 15} h12 M${x - 26},${cy + 9} v12 M${x + 26},${cy + 9} v12`} stroke="rgba(255,255,255,0.4)" strokeWidth={2} strokeLinecap="round" />
      </g>
    );
    cfg = {
      key: 'wheel',
      vb: '0 0 1000 780',
      k: 1,
      s: 14,
      shapes: wheelShapes(cx, cy, R, 66),
      pre: (
        <g {...D}>
          <path d={rr(420, 560, 160, 240, 40)} fill="#0a0b0d" />
          <path d={rr(118, 318, 46, 120, 18) + rr(836, 318, 46, 120, 18)} fill={`url(#${uid}-alu)`} />
        </g>
      ),
      after: {
        sw_sp: <g>{buttons(cx - 168)}{buttons(cx + 168)}</g>,
        sw_c: (
          <g {...D}>
            <path d={circle(cx, cy - 10, 34)} fill={`url(#${uid}-chrome)`} />
            <path d={circle(cx, cy - 10, 26)} fill="#15171b" />
            <path d={circle(cx, cy - 10, 26)} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={2} />
          </g>
        ),
      },
      post: (
        <g {...D}>
          <path d={arc(cx, cy, 287, 334, 386) + ' ' + arc(cx, cy, 287, 154, 206)} fill="none" stroke={st} strokeWidth={3} strokeDasharray="9 6" />
          <path d={arc(cx, cy, 287, 212, 328) + ' ' + arc(cx, cy, 287, 32, 148)} fill="none" stroke={st} strokeWidth={2} strokeDasharray="7 7" opacity={0.7} />
          <path d={ring(cx, cy, R, R - 66, 266, 274)} fill={st} />
        </g>
      ),
    };
  }

  const { shapes, after = {} } = cfg;
  const first = shapes.findIndex(s => LIFT.has(s.id));
  const cut = first < 0 ? shapes.length : first;
  const seen: Record<string, number> = {};
  const zones = shapes.map((s, i) => {
    seen[s.id] = (seen[s.id] || 0) + 1;
    const n = seen[s.id];
    const fill = s.id === 'trim' ? trimFill : colors[s.id] || '#1A1A1A';
    return (
      <React.Fragment key={`${s.id}-${i}`}>
        <g className="czg">
          <path d={s.d} className="cz" style={{ fill }} onClick={e => { e.stopPropagation(); pick(s.id); }} />
          {s.pad && (
            <path d={s.d} fill="none" stroke="transparent" strokeWidth={s.pad} vectorEffect="non-scaling-stroke"
              pointerEvents="stroke" onClick={e => { e.stopPropagation(); pick(s.id); }} />
          )}
          <path d={s.d} className="cz-hover" />
        </g>
        {after[`${s.id}#${n}`] ?? (n === 1 ? after[s.id] : null)}
      </React.Fragment>
    );
  });
  const staticKey = `${cfg.key}|${cfg.vb}`;

  const sideSeg = scene === 'door'
    ? { value: doorSide, opts: [['l', 'Левая'], ['r', 'Правая']] as const, set: (v: string) => setDoorSide(v as 'l' | 'r') }
    : scene === 'seat'
      ? { value: seatSide, opts: [['d', 'Водитель'], ['p', 'Пассажир']] as const, set: (v: string) => setSeatSide(v as 'd' | 'p') }
      : null;

  const accents = scene === 'door' || scene === 'seat'
    ? [{ id: 'st', label: 'Строчка' }, { id: 'pp', label: 'Кант' }]
    : scene === 'wheel' ? [{ id: 'st', label: 'Строчка' }] : [];

  return (
    <div className={`cm${hasRear ? ' cm-rear' : ''}`}>
      <div className="cm-top">
        {scene !== 'cabin' ? (
          <button className="cm-back" onClick={() => setScene('cabin')} aria-label="Весь салон">
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" aria-hidden="true">
              <path d="M7.5 1.5L1.5 7.5L7.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Салон</span>
          </button>
        ) : <span />}
        {label && <span key={activeZone} className={`cm-label${scene === 'cabin' ? ' wide' : ''}`}>{label}</span>}
        {sideSeg ? (
          <div className="cm-seg">
            {sideSeg.opts.map(([v, t]) => (
              <button key={v} className={sideSeg.value === v ? 'on' : ''} onClick={() => sideSeg.set(v)}>{t}</button>
            ))}
          </div>
        ) : <span />}
      </div>

      <div key={cfg.key} className="cm-scene">
        <div className="cm-stack">
          <svg viewBox={cfg.vb} preserveAspectRatio="xMidYMid meet" className="cm-layer cm-live">
            <Defs uid={uid} colors={colors} stitchPattern={stitchPattern} k={cfg.k} />
            <g transform={cfg.flip}>
              {cfg.pre}
              {zones.slice(0, cut)}
            </g>
          </svg>
          <Baked sk={`lift|${staticKey}`} spec={{ kind: 'lift', vb: cfg.vb, flip: cfg.flip, shapes, s: cfg.s, alc: [] }} />
          <svg viewBox={cfg.vb} preserveAspectRatio="xMidYMid meet" className="cm-layer cm-live">
            <g transform={cfg.flip}>
              {zones.slice(cut)}
              {cfg.post}
            </g>
          </svg>
          <Baked sk={`shade|${staticKey}|${alcIds.join()}`} spec={{ kind: 'shade', vb: cfg.vb, flip: cfg.flip, shapes, s: cfg.s, alc: alcIds }} />
          <svg viewBox={cfg.vb} preserveAspectRatio="xMidYMid meet" className="cm-layer cm-sel" aria-hidden="true">
            <g transform={cfg.flip}>
              <Selection shapes={shapes} active={activeZone} />
            </g>
          </svg>
        </div>
      </div>

      {accents.length > 0 && (
        <div className="cm-accents">
          {accents.map(a => (
            <button key={a.id} className={activeZone === a.id ? 'on' : ''} onClick={() => pick(a.id)}>
              <i style={{ background: colors[a.id] || '#1A1A1A' }} />
              {a.label}
            </button>
          ))}
        </div>
      )}

      <nav className="cm-tabs" aria-label="Вид">
        {TABS.map(t => (
          <button key={t.id} className={scene === t.id ? 'on' : ''} onClick={() => setScene(t.id)}>
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
