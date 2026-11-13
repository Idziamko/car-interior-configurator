import { useEffect } from 'react';
import type { ReactNode } from 'react';

export interface IslandMsg {
  key: number;
  title: string;
  sub?: string;
  color?: string;
  icon?: ReactNode;
}

export function Island({ msg, onDone }: { msg: IslandMsg | null; onDone: () => void }) {
  useEffect(() => {
    if (!msg) return;
    const t = window.setTimeout(onDone, 2600);
    return () => window.clearTimeout(t);
  }, [msg, onDone]);

  return (
    <div className="island-wrap" aria-live="polite">
      <div className={`island${msg ? ' open' : ''}`}>
        {msg && (
          <div key={msg.key} className="island-row">
            <span className="island-lead">
              {msg.icon ?? <i style={{ background: msg.color || '#30D158' }} />}
            </span>
            <span className="island-text">
              <b>{msg.title}</b>
              {msg.sub && <small>{msg.sub}</small>}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
