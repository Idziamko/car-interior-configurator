import { STITCH_PATTERNS } from '../carDatabase';

interface StitchSelectorProps {
    selected: string;
    onSelect: (id: string) => void;
}

export function StitchSelector({ selected, onSelect }: StitchSelectorProps) {
    return (
        <div className="panel" style={{ padding: '16px', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '1.1rem' }}>💠</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '2px', color: 'var(--ink)' }}>
                    РИСУНОК ПРОШИВКИ
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '6px' }}>
                {STITCH_PATTERNS.map(p => {
                    const isActive = selected === p.id;
                    return (
                        <button
                            key={p.id}
                            onClick={() => onSelect(p.id)}
                            style={{
                                padding: '10px 8px',
                                borderRadius: 'var(--radius-sm)',
                                border: isActive ? '1px solid rgba(47, 179, 122, 0.55)' : '1px solid var(--line)',
                                background: isActive ? 'var(--accent-soft)' : 'var(--surface-2)',
                                color: isActive ? 'var(--accent-2)' : 'var(--ink-2)',
                                boxShadow: isActive ? 'var(--accent-glow)' : 'var(--shadow-sm)',
                                fontSize: '0.75rem',
                                fontWeight: isActive ? 600 : 500,
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s var(--ease)',
                                lineHeight: 1.25,
                            }}
                        >
                            {p.nameRu}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
