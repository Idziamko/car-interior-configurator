import { SW } from '../data';
import { Check, Xmark } from './ui/icons';

const isLight = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 165;
};

interface Props {
  zoneId: string | null;
  label: string;
  colors: Record<string, string>;
  onChange: (id: string, hex: string) => void;
  onClose: () => void;
}

export function ColorSheet({ zoneId, label, colors, onChange, onClose }: Props) {
  if (!zoneId || zoneId === 'trim') return null;
  const current = (colors[zoneId] || '#1A1A1A').toUpperCase();
  const names = new Map(SW.map(s => [s.h.toUpperCase(), s.n]));
  const used = [...new Set(Object.values(colors).map(c => c.toUpperCase()))];
  const all = [...used, ...SW.map(s => s.h.toUpperCase()).filter(c => !used.includes(c))];

  return (
    <div className="sheet" role="dialog" aria-label={label}>
      <div className="sheet-grab" />
      <div className="sheet-head">
        <span className="sheet-dot" style={{ background: current }} />
        <div className="sheet-title">
          <b>{label}</b>
          <small>{names.get(current) || current}</small>
        </div>
        <button className="icon-btn" onClick={onClose} aria-label="Закрыть"><Xmark size={16} /></button>
      </div>
      <div className="swatches">
        {all.map(c => (
          <button
            key={c}
            className={`swatch${c === current ? ' on' : ''}`}
            style={{ background: c, color: isLight(c) ? '#000' : '#fff' }}
            onClick={() => onChange(zoneId, c)}
            title={names.get(c) || c}
            aria-label={names.get(c) || c}
          >
            {c === current && <Check size={15} strokeWidth={2.6} />}
          </button>
        ))}
        <label className="swatch swatch-custom" title="Свой цвет">
          <input type="color" value={current.toLowerCase()} onChange={e => onChange(zoneId, e.target.value.toUpperCase())} />
        </label>
      </div>
    </div>
  );
}
