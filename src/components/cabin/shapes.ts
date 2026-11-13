export interface Shape {
  id: string;
  d: string;
  shade?: 'pillow' | 'flat' | 'none';
  pad?: number;
  texture?: 'leather' | 'carpet' | 'none';
}

export const rr = (x: number, y: number, w: number, h: number, r: number) => {
  const k = Math.min(r, w / 2, h / 2);
  return `M${x + k},${y} H${x + w - k} A${k},${k} 0 0 1 ${x + w},${y + k} V${y + h - k} A${k},${k} 0 0 1 ${x + w - k},${y + h} H${x + k} A${k},${k} 0 0 1 ${x},${y + h - k} V${y + k} A${k},${k} 0 0 1 ${x + k},${y} Z`;
};

export const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r},${cy} a${r},${r} 0 1,0 ${2 * r},0 a${r},${r} 0 1,0 ${-2 * r},0 Z`;

const pt = (cx: number, cy: number, r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
};

// annular sector, angles in degrees, clockwise, 0 = 3 o'clock
export const ring = (cx: number, cy: number, R: number, r: number, a0: number, a1: number) => {
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M${pt(cx, cy, R, a0)} A${R},${R} 0 ${large} 1 ${pt(cx, cy, R, a1)} L${pt(cx, cy, r, a1)} A${r},${r} 0 ${large} 0 ${pt(cx, cy, r, a0)} Z`;
};

export const arc = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M${pt(cx, cy, r, a0)} A${r},${r} 0 ${large} 1 ${pt(cx, cy, r, a1)}`;
};

export const LIFT = new Set([
  'sv_d', 'sv_p', 'hr_d', 'hr_p', 'con', 'sbo', 'hbo', 'arm', 'dt',
  'du_l', 'du_r', 'rs_v', 'rhr', 'sw_t', 'sw_s', 'sw_b', 'sw_sp', 'sw_c', 'dh_l', 'dh_r',
]);

export function wheelShapes(cx: number, cy: number, R: number, t: number): Shape[] {
  const r = R - t;
  const s = (k: number) => R * k;
  const spokes = [
    `M${cx - s(0.28)},${cy - s(0.14)} C${cx - s(0.5)},${cy - s(0.12)} ${cx - r + 6},${cy - s(0.1)} ${cx - r + 2},${cy - s(0.06)} L${cx - r + 2},${cy + s(0.16)} C${cx - s(0.6)},${cy + s(0.2)} ${cx - s(0.42)},${cy + s(0.26)} ${cx - s(0.28)},${cy + s(0.2)} Z`,
    `M${cx + s(0.28)},${cy - s(0.14)} C${cx + s(0.5)},${cy - s(0.12)} ${cx + r - 6},${cy - s(0.1)} ${cx + r - 2},${cy - s(0.06)} L${cx + r - 2},${cy + s(0.16)} C${cx + s(0.6)},${cy + s(0.2)} ${cx + s(0.42)},${cy + s(0.26)} ${cx + s(0.28)},${cy + s(0.2)} Z`,
    `M${cx - s(0.17)},${cy + s(0.26)} C${cx - s(0.14)},${cy + s(0.5)} ${cx - s(0.12)},${cy + r - 20} ${cx - s(0.1)},${cy + r - 2} L${cx + s(0.1)},${cy + r - 2} C${cx + s(0.12)},${cy + r - 20} ${cx + s(0.14)},${cy + s(0.5)} ${cx + s(0.17)},${cy + s(0.26)} Z`,
  ].join(' ');
  const pad = `M${cx - s(0.34)},${cy - s(0.2)} C${cx - s(0.34)},${cy - s(0.34)} ${cx - s(0.22)},${cy - s(0.36)} ${cx},${cy - s(0.36)} C${cx + s(0.22)},${cy - s(0.36)} ${cx + s(0.34)},${cy - s(0.34)} ${cx + s(0.34)},${cy - s(0.2)} L${cx + s(0.3)},${cy + s(0.14)} C${cx + s(0.28)},${cy + s(0.3)} ${cx + s(0.16)},${cy + s(0.34)} ${cx},${cy + s(0.34)} C${cx - s(0.16)},${cy + s(0.34)} ${cx - s(0.28)},${cy + s(0.3)} ${cx - s(0.3)},${cy + s(0.14)} Z`;
  return [
    { id: 'sw_sp', d: spokes, shade: 'flat', texture: 'none' },
    { id: 'sw_t', d: ring(cx, cy, R, r, 210, 330), shade: 'pillow', texture: 'leather' },
    { id: 'sw_s', d: ring(cx, cy, R + t * 0.06, r - t * 0.08, 328, 392), shade: 'pillow', texture: 'leather' },
    { id: 'sw_s', d: ring(cx, cy, R + t * 0.06, r - t * 0.08, 148, 212), shade: 'pillow', texture: 'leather' },
    { id: 'sw_b', d: ring(cx, cy, R, r, 30, 150), shade: 'pillow', texture: 'leather' },
    { id: 'sw_c', d: pad, shade: 'pillow', texture: 'leather' },
  ];
}

export function cabinShapes(hasRear: boolean) {
  const W = 800;
  const H = hasRear ? 1500 : 980;
  const shapes: Shape[] = [];
  const add = (id: string, d: string, shade: Shape['shade'] = 'flat', texture: Shape['texture'] = 'leather', pad?: number) =>
    shapes.push({ id, d, shade, texture, pad });
  const mx = (x: number, w: number) => W - x - w;

  add('fw_d', rr(84, 248, 246, 664, 26), 'none', 'carpet');
  add('fw_p', rr(470, 248, 246, 664, 26), 'none', 'carpet');
  add('mat_d', rr(104, 368, 206, 124, 24), 'flat', 'carpet');
  add('mat_p', rr(490, 300, 206, 192, 26), 'flat', 'carpet');

  add('dt', 'M56,218 C54,150 120,98 400,94 C680,98 746,150 744,218 C640,198 520,191 400,191 C280,191 160,198 56,218 Z', 'pillow');
  add('db', 'M58,242 C182,219 282,212 400,212 C518,212 618,219 742,242 L742,300 C700,294 640,290 560,290 L470,292 L330,292 L240,290 C160,290 100,294 58,300 Z');
  add('trim', 'M56,220 C182,197 282,190 400,190 C518,190 618,197 744,220 L742,242 C618,219 518,212 400,212 C282,212 182,219 58,242 Z', 'none', 'none');

  add('con', 'M336,250 C336,238 464,238 464,250 L470,892 C470,914 330,914 330,892 Z');
  add('sbo', 'M372,412 C372,402 428,402 428,412 L434,500 C434,512 366,512 366,500 Z', 'pillow');
  add('sk', circle(400, 444, 21), 'pillow', 'leather', 18);
  add('hbo', rr(381, 566, 38, 100, 17), 'pillow');
  add('hh', rr(390, 572, 20, 62, 10), 'flat', 'leather', 16);
  add('arm', 'M352,736 C352,722 448,722 448,736 L452,880 C452,898 348,898 348,880 Z', 'pillow');

  const Y0 = 250;
  const Y1 = hasRear ? 860 : 900;
  const door = (side: 'l' | 'r') => {
    const X = (x: number, w: number) => (side === 'l' ? x : mx(x, w));
    add(`du_${side}`, rr(X(22, 22), Y0, 22, Y1 - Y0, 10), 'pillow');
    add(`da_${side}`, rr(X(44, 10), Y0 + 40, 10, Y1 - Y0 - 170, 5));
    add(`di_${side}`, rr(X(54, 22), Y0 + 40, 22, Y1 - Y0 - 170, 9), 'pillow');
    add(`dl_${side}`, rr(X(42, 34), Y1 - 124, 34, 124, 10), 'flat', 'carpet');
    add(`dh_${side}`, rr(X(54, 26), Y0 + 200, 26, 120, 12), 'pillow');
    if (hasRear) {
      add(`du_${side}`, rr(X(22, 22), 880, 22, 300, 10), 'pillow');
      add(`di_${side}`, rr(X(44, 32), 920, 32, 220, 10), 'pillow');
    }
  };
  door('l');
  door('r');

  const seat = (cx: number, s: 'd' | 'p') => {
    add(`sv_${s}`, `M${cx - 96},502 C${cx - 98},478 ${cx - 84},464 ${cx - 58},462 L${cx + 58},462 C${cx + 84},464 ${cx + 98},478 ${cx + 96},502 L${cx + 100},640 C${cx + 101},660 ${cx + 96},671 ${cx + 86},678 C${cx + 101},690 ${cx + 107},712 ${cx + 105},742 L${cx + 99},852 C${cx + 97},874 ${cx + 80},886 ${cx + 56},888 L${cx - 56},888 C${cx - 80},886 ${cx - 97},874 ${cx - 99},852 L${cx - 105},742 C${cx - 107},712 ${cx - 101},690 ${cx - 86},678 C${cx - 96},671 ${cx - 101},660 ${cx - 100},640 Z`, 'pillow');
    add(`sb_${s}`, rr(cx - 56, 482, 112, 184, 30), 'pillow');
    add(`sb_${s}`, rr(cx - 54, 692, 108, 176, 30), 'pillow');
    add(`hr_${s}`, `M${cx - 50},884 C${cx - 50},874 ${cx - 40},870 ${cx - 26},870 L${cx + 26},870 C${cx + 40},870 ${cx + 50},874 ${cx + 50},884 L${cx + 48},924 C${cx + 47},936 ${cx + 38},942 ${cx + 26},942 L${cx - 26},942 C${cx - 38},942 ${cx - 47},936 ${cx - 48},924 Z`, 'pillow');
  };
  seat(207, 'd');
  seat(593, 'p');

  if (hasRear) {
    add('rmat', rr(100, 950, 220, 64, 20) + rr(480, 950, 220, 64, 20), 'flat', 'carpet');
    add('rs_v', 'M90,1046 C90,1026 110,1016 140,1016 L660,1016 C690,1016 710,1026 710,1046 L704,1252 C702,1270 690,1280 670,1280 L130,1280 C110,1280 98,1270 96,1252 Z', 'pillow');
    add('rs_b', rr(126, 1032, 196, 110, 26), 'pillow');
    add('rs_b', rr(130, 1150, 190, 112, 26), 'pillow');
    add('rs_b', rr(478, 1032, 196, 110, 26), 'pillow');
    add('rs_b', rr(480, 1150, 190, 112, 26), 'pillow');
    add('rs_b', rr(346, 1040, 108, 214, 22), 'pillow');
    add('rhr', rr(172, 1268, 106, 48, 20), 'pillow');
    add('rhr', rr(522, 1268, 106, 48, 20), 'pillow');
    add('rhr', rr(362, 1272, 76, 40, 16), 'pillow');
    add('tr', 'M96,1334 L704,1334 L704,1442 C704,1464 686,1478 664,1478 L136,1478 C114,1478 96,1464 96,1442 Z', 'flat', 'carpet');
  }

  shapes.push(...wheelShapes(207, 300, 92, 18));

  return { W, H, shapes, doorSpan: [Y0, Y1] as const };
}

export function cabinCenters(hasRear: boolean) {
  const c = [
    { id: 'sb_d', x: 151, y: 482, w: 112, h: 184, r: 30 },
    { id: 'sb_d', x: 153, y: 692, w: 108, h: 176, r: 30 },
    { id: 'sb_p', x: 537, y: 482, w: 112, h: 184, r: 30 },
    { id: 'sb_p', x: 539, y: 692, w: 108, h: 176, r: 30 },
  ];
  if (hasRear) {
    c.push(
      { id: 'rs_b', x: 126, y: 1032, w: 196, h: 110, r: 26 },
      { id: 'rs_b', x: 130, y: 1150, w: 190, h: 112, r: 26 },
      { id: 'rs_b', x: 478, y: 1032, w: 196, h: 110, r: 26 },
      { id: 'rs_b', x: 480, y: 1150, w: 190, h: 112, r: 26 },
      { id: 'rs_b', x: 346, y: 1040, w: 108, h: 214, r: 22 },
    );
  }
  return c;
}

export function doorShapes(side: 'l' | 'r'): Shape[] {
  return [
    { id: `dl_${side}`, d: 'M62,392 L938,392 L918,500 C912,528 888,544 858,544 L150,544 C104,544 78,526 70,492 Z', shade: 'flat', texture: 'carpet' },
    { id: `di_${side}`, d: 'M60,194 C420,200 700,196 944,190 L938,392 L62,392 Z', shade: 'pillow', texture: 'leather' },
    { id: `da_${side}`, d: 'M58,150 L948,150 L944,190 C700,196 420,200 60,194 Z', shade: 'flat', texture: 'leather', pad: 14 },
    { id: `du_${side}`, d: 'M58,150 C56,112 74,82 112,76 L900,76 C934,78 952,100 950,130 L948,150 Z', shade: 'pillow', texture: 'leather' },
    { id: `dh_${side}`, d: 'M468,330 L880,326 C906,326 918,342 912,362 L900,392 C896,404 884,410 870,410 L500,410 C478,410 464,396 466,376 Z', shade: 'pillow', texture: 'leather' },
  ];
}

export const DOOR_INSERT = { x: 120, y: 220, w: 640, h: 96, r: 30 };

export function seatShapes(s: 'd' | 'p'): Shape[] {
  return [
    {
      id: `hr_${s}`,
      d: 'M420,44 C420,26 438,18 460,18 L540,18 C562,18 580,26 580,44 L586,122 C587,142 574,152 556,152 L444,152 C426,152 413,142 414,122 Z',
      shade: 'pillow', texture: 'leather',
    },
    {
      id: `sv_${s}`,
      d: 'M352,192 C352,174 370,166 394,166 L606,166 C630,166 648,174 648,192 L654,250 C702,268 718,302 714,352 L702,522 C700,542 686,550 666,550 L334,550 C314,550 300,542 298,522 L286,352 C282,302 298,268 346,250 Z',
      shade: 'pillow', texture: 'leather',
    },
    {
      id: `sv_${s}`,
      d: 'M262,560 L738,560 C768,564 786,592 780,628 L768,692 C762,716 744,728 718,728 L282,728 C256,728 238,716 232,692 L220,628 C214,592 232,564 262,560 Z',
      shade: 'pillow', texture: 'leather',
    },
    { id: `sb_${s}`, d: rr(380, 188, 240, 350, 34), shade: 'pillow', texture: 'leather' },
    { id: `sb_${s}`, d: rr(334, 572, 332, 146, 30), shade: 'pillow', texture: 'leather' },
  ];
}

export const SEAT_CENTERS = [
  { x: 380, y: 188, w: 240, h: 350, r: 34 },
  { x: 334, y: 572, w: 332, h: 146, r: 30 },
];
