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
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '2px', color: 'var(--text-main)' }}>
                        АЛЬКАНТАРА
                    </span>
                </div>
                {selected.length > 0 && (
                    <button
                        onClick={onClear}
                        style={{
                            padding: '4px 10px',
                            borderRadius: '4px',
                            border: '1px solid var(--border)',
                            backgroundColor: 'transparent',
                            color: 'var(--text-muted)',
                            fontSize: '0.7rem',
                            cursor: 'pointer',
                        }}
                    >
                        Сбросить
                    </button>
                )}
            </div>

            <p style={{ fontSize: '0.7rem', color: 'var(--text-dark)', marginBottom: '10px' }}>
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
                                border: isActive ? '1.5px solid white' : '1px solid var(--border)',
                                backgroundColor: isActive ? '#1a1a1c' : 'var(--card-hover)',
                                color: isActive ? 'white' : 'var(--text-muted)',
                                fontSize: '0.75rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.15s',
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
