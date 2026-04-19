import { ALCANTARA_ZONES } from '../carDatabase';

interface AlcantaraSelectorProps {
    selected: string[];
    onToggle: (id: string) => void;
    onClear: () => void;
}

export function AlcantaraSelector({ selected, onToggle, onClear }: AlcantaraSelectorProps) {
    return (
        <div className="panel" style={{ padding: '16px', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.1rem' }}>🧶</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '2px', color: 'var(--ink)' }}>
                        АЛЬКАНТАРА
                    </span>
                </div>
                {selected.length > 0 && (
                    <button
                        onClick={onClear}
                        style={{
                            padding: '4px 10px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--line)',
                            backgroundColor: 'transparent',
                            color: 'var(--ink-3)',
                            fontSize: '0.7rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s var(--ease)',
                        }}
                    >
                        Сбросить
                    </button>
                )}
            </div>

            <p style={{ fontSize: '0.7rem', color: 'var(--ink-3)', marginBottom: '10px' }}>
                Выбери где будет алькантара (можно несколько)
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '6px' }}>
                {ALCANTARA_ZONES.map(z => {
                    const isActive = selected.includes(z.id);
                    return (
                        <button
                            key={z.id}
                            onClick={() => onToggle(z.id)}
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
                            }}
                        >
                            {z.nameRu}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
