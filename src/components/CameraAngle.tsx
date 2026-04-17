import { CAMERA_ANGLES } from '../carDatabase';

interface CameraAngleProps {
    selected: string;
    onSelect: (id: string) => void;
}

export function CameraAngleSelector({ selected, onSelect }: CameraAngleProps) {
    return (
        <div className="panel" style={{ padding: '16px', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '1.1rem' }}>📸</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '2px', color: 'var(--text-main)' }}>
                    РАКУРС КАМЕРЫ
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '6px' }}>
                {CAMERA_ANGLES.map(a => {
                    const isActive = selected === a.id;
                    return (
                        <button
                            key={a.id}
                            onClick={() => onSelect(a.id)}
                            style={{
                                padding: '10px 8px',
                                borderRadius: 'var(--radius-sm)',
                                border: isActive ? '1.5px solid white' : '1px solid var(--border)',
                                backgroundColor: isActive ? '#1a1a1c' : 'var(--card-hover)',
                                color: isActive ? 'white' : 'var(--text-muted)',
                                fontSize: '0.78rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.15s',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '4px',
                            }}
                        >
                            <span style={{ fontSize: '1.2rem' }}>{a.icon}</span>
                            <span>{a.nameRu}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
