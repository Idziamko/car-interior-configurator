import { TRIMS } from '../data';
import { ALCANTARA_ZONES, STITCH_PATTERNS } from '../carDatabase';
import { StitchPattern, TrimPatterns } from './cabin/patterns';
import { Check } from './ui/icons';

const splitName = (s: string) => {
  const m = s.match(/^(.*?)\s*\((.*)\)\s*$/);
  return m ? [m[1], m[2]] : [s, ''];
};

export function TrimPicker({ trimId, setTrimId, trimColor, setTrimColor, dashColor }: {
  trimId: string; setTrimId: (v: string) => void; trimColor: string; setTrimColor: (v: string) => void; dashColor: string;
}) {
  const fill = (id: string) =>
    id === 'leather' ? dashColor : id === 'custom' ? trimColor : `url(#tp-${id})`;
  return (
    <div className="tiles">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs><TrimPatterns uid="tp" /></defs>
      </svg>
      {TRIMS.map(t => {
        const on = trimId === t.id;
        const label = t.id === 'custom' ? 'Свой цвет' : t.n;
        const body = (
          <>
            <span className="tile-img round">
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <circle cx="24" cy="24" r="24" fill={fill(t.id)} />
                <circle cx="24" cy="24" r="23.5" fill="none" stroke="rgba(255,255,255,0.14)" />
              </svg>
              {on && <span className="tile-check"><Check size={12} strokeWidth={3} /></span>}
            </span>
            <span className="tile-label">{label}</span>
          </>
        );
        if (t.id === 'custom') {
          return (
            <label key={t.id} className={`tile${on ? ' on' : ''}`} onClick={() => setTrimId('custom')}>
              {body}
              <input type="color" value={trimColor} onChange={e => { setTrimColor(e.target.value); setTrimId('custom'); }} />
            </label>
          );
        }
        return (
          <button key={t.id} className={`tile${on ? ' on' : ''}`} onClick={() => setTrimId(t.id)}>
            {body}
          </button>
        );
      })}
    </div>
  );
}

export function StitchPicker({ selected, onSelect, seat, thread }: {
  selected: string; onSelect: (v: string) => void; seat: string; thread: string;
}) {
  return (
    <div className="tiles scroll">
      {STITCH_PATTERNS.map(p => {
        const on = selected === p.id;
        const [name, sub] = splitName(p.nameRu);
        const pid = `sp-${p.id}`;
        const flat = p.id === 'none' || p.id === 'baseball';
        return (
          <button key={p.id} className={`tile wide${on ? ' on' : ''}`} onClick={() => onSelect(p.id)} title={p.nameRu}>
            <span className="tile-img">
              <svg viewBox="0 0 72 72" aria-hidden="true">
                <defs><StitchPattern id={pid} kind={p.id} color={thread} k={0.8} /></defs>
                <rect width="72" height="72" rx="16" fill={seat} />
                {!flat && <rect width="72" height="72" rx="16" fill={`url(#${pid})`} />}
                <rect x="6" y="6" width="60" height="60" rx="11" fill="none" stroke={thread} strokeWidth="1.4" strokeDasharray="3.5 2.6" />
                {p.id === 'baseball' && <rect x="11" y="11" width="50" height="50" rx="8" fill="none" stroke={thread} strokeWidth="1.4" strokeDasharray="3.5 2.6" />}
                <rect width="72" height="72" rx="16" fill="url(#tile-sheen)" />
              </svg>
              {on && <span className="tile-check"><Check size={12} strokeWidth={3} /></span>}
            </span>
            <span className="tile-label">{name}</span>
            {sub && <span className="tile-sub">{sub}</span>}
          </button>
        );
      })}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="tile-sheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.14" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.28" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function AlcantaraPicker({ selected, onToggle }: { selected: string[]; onToggle: (id: string) => void }) {
  return (
    <div className="capsules">
      {ALCANTARA_ZONES.map(z => {
        const on = selected.includes(z.id);
        return (
          <button key={z.id} className={`capsule${on ? ' on' : ''}`} aria-pressed={on} onClick={() => onToggle(z.id)}>
            {on && <Check size={13} strokeWidth={2.6} />}
            {z.nameRu}
          </button>
        );
      })}
    </div>
  );
}
