import { useState } from 'react';
import { zonesFor } from '../data';
import { Chevron } from './ui/icons';

interface Props {
  colors: Record<string, string>;
  activeZone: string | null;
  setActiveZone: (id: string) => void;
  hasRear: boolean;
}

const title = (g: string) => g.charAt(0) + g.slice(1).toLowerCase();

export function ZoneList({ colors, activeZone, setActiveZone, hasRear }: Props) {
  const groups = zonesFor(hasRear);
  const [open, setOpen] = useState<Record<string, boolean>>({ [groups[0].g]: true });
  const activeGroup = groups.find(g => g.zones.some(z => z.id === activeZone))?.g;

  const [seen, setSeen] = useState(activeGroup);
  if (activeGroup !== seen) {
    setSeen(activeGroup);
    if (activeGroup && !open[activeGroup]) setOpen(o => ({ ...o, [activeGroup]: true }));
  }

  return (
    <div className="group">
      {groups.map(g => {
        const isOpen = !!open[g.g];
        const uniq = [...new Set(g.zones.map(z => (colors[z.id] || '#1A1A1A').toUpperCase()))];
        return (
          <div key={g.g} className={`disclosure${isOpen ? ' open' : ''}`}>
            <button className="row row-btn" onClick={() => setOpen(o => ({ ...o, [g.g]: !isOpen }))} aria-expanded={isOpen}>
              <span className="row-title">{title(g.g)}</span>
              <span className="dots">
                {uniq.slice(0, 5).map(c => <i key={c} style={{ background: c }} />)}
              </span>
              <span className="row-meta">{g.zones.length}</span>
              <Chevron size={14} className="row-chev" />
            </button>
            <div className="disclosure-body">
              <div>
                {g.zones.map(z => {
                  const c = (colors[z.id] || '#1A1A1A').toUpperCase();
                  const on = activeZone === z.id;
                  return (
                    <button key={z.id} id={`zone-${z.id}`} className={`row row-btn sub${on ? ' on' : ''}`} onClick={() => setActiveZone(z.id)}>
                      <i className="zone-dot" style={{ background: c }} />
                      <span className="row-title">{z.l}</span>
                      <span className="row-meta mono">{c}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
