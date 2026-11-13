import type { Shape } from './shapes';
import { LIFT } from './shapes';

export interface BakeSpec {
  kind: 'lift' | 'shade';
  vb: string;
  flip?: string;
  shapes: Shape[];
  s: number;
  alc: string[];
}

const puff = (id: string, s: number, dark: number, light: number) => `
<filter id="${id}" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
  <feGaussianBlur in="SourceAlpha" stdDeviation="${s}" result="b"/>
  <feOffset in="b" dy="${-s * 0.8}" result="up"/>
  <feComposite in="SourceAlpha" in2="up" operator="out" result="bot"/>
  <feFlood flood-color="#000" flood-opacity="${dark}"/>
  <feComposite in2="bot" operator="in" result="shadow"/>
  <feOffset in="b" dy="${s * 0.8}" result="down"/>
  <feComposite in="SourceAlpha" in2="down" operator="out" result="top"/>
  <feFlood flood-color="#fff" flood-opacity="${light}"/>
  <feComposite in2="top" operator="in" result="hi"/>
  <feComposite in="SourceAlpha" in2="b" operator="arithmetic" k2="1" k3="-1" result="edge"/>
  <feFlood flood-color="#000" flood-opacity="${dark * 0.8}"/>
  <feComposite in2="edge" operator="in" result="rim"/>
  <feMerge><feMergeNode in="rim"/><feMergeNode in="shadow"/><feMergeNode in="hi"/></feMerge>
</filter>`;

const speckles = (id: string, freq: number, size: number, dark: number, light: number) => `
<filter id="${id}-f" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="2" seed="5" stitchTiles="stitch" result="n"/>
  <feColorMatrix in="n" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${-dark * 2} 0 0 0 ${dark}" result="d"/>
  <feColorMatrix in="n" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  ${light * 2} 0 0 0 ${-light}" result="l"/>
  <feMerge><feMergeNode in="d"/><feMergeNode in="l"/></feMerge>
</filter>
<pattern id="${id}" width="${size}" height="${size}" patternUnits="userSpaceOnUse">
  <rect width="${size}" height="${size}" filter="url(#${id}-f)"/>
</pattern>`;

function liftBody(spec: BakeSpec) {
  const paths = spec.shapes.filter(s => LIFT.has(s.id)).map(s => `<path d="${s.d}" fill="#000"/>`).join('');
  return `<defs><filter id="l" x="-20%" y="-20%" width="140%" height="150%">
    <feGaussianBlur stdDeviation="${spec.s * 1.1}"/><feOffset dy="${spec.s * 1.2}"/>
    <feComponentTransfer><feFuncA type="linear" slope="0.7"/></feComponentTransfer></filter></defs>
    <g${spec.flip ? ` transform="${spec.flip}"` : ''} filter="url(#l)">${paths}</g>`;
}

function shadeBody(spec: BakeSpec) {
  const { shapes, s } = spec;
  const suede = new Set(spec.alc);
  const masks: string[] = [];
  const body: string[] = [];
  shapes.forEach((sh, i) => {
    const isSuede = suede.has(sh.id);
    const tex = isSuede ? 'suede' : sh.texture;
    const p = sh.shade === 'none' ? null : sh.shade === 'pillow' && !isSuede ? 'p' : 'f';
    if (!p && (!tex || tex === 'none')) return;
    const later = shapes.slice(i + 1).map(o => `<path d="${o.d}" fill="#000"/>`).join('');
    let mask = '';
    if (later) {
      masks.push(`<mask id="m${i}" maskUnits="userSpaceOnUse" x="-3000" y="-3000" width="8000" height="8000"><rect x="-3000" y="-3000" width="8000" height="8000" fill="#fff"/>${later}</mask>`);
      mask = ` mask="url(#m${i})"`;
    }
    body.push(`<g${mask}>${tex && tex !== 'none' ? `<path d="${sh.d}" fill="url(#${tex})"/>` : ''}${p ? `<path d="${sh.d}" fill="#000" filter="url(#${p})"/>` : ''}</g>`);
  });
  return `<defs>${puff('p', s, 0.5, 0.2)}${puff('f', s * 0.45, 0.38, 0.14)}
    ${speckles('leather', 1.5, 160, 0.16, 0.07)}${speckles('carpet', 2.8, 110, 0.34, 0.12)}${speckles('suede', 1.1, 140, 0.42, 0.16)}
    ${masks.join('')}</defs><g${spec.flip ? ` transform="${spec.flip}"` : ''}>${body.join('')}</g>`;
}

export function bakeSvg(spec: BakeSpec, w: number, h: number) {
  const inner = spec.kind === 'lift' ? liftBody(spec) : shadeBody(spec);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${spec.vb}" preserveAspectRatio="xMidYMid meet" overflow="visible">${inner}</svg>`;
}
