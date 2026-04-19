import { CAMERA_ANGLES, hasRearAccess } from '../carDatabase';
import { useEffect } from 'react';

interface CameraAngleProps {
    selected: string;
    onSelect: (id: string) => void;
    carType?: string | null;
}

export function CameraAngleSelector({ selected, onSelect, carType }: CameraAngleProps) {
    const rearAllowed = hasRearAccess(carType || undefined);
    const visibleAngles = CAMERA_ANGLES.filter(a => !a.requires4Door || rearAllowed);

    // If current selection is a rear angle but the car is 2-door, fall back to driver_door
    useEffect(() => {
        if (!visibleAngles.some(a => a.id === selected)) {
            onSelect(visibleAngles[0]?.id || 'driver_door');
        }
    }, [carType, selected, visibleAngles, onSelect]);

    return (
        <div className="panel" style={{ padding: '16px', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '1.1rem' }}>📸</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '2px', color: 'var(--text-main)' }}>
                    РАКУРС КАМЕРЫ
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '6px' }}>
                {visibleAngles.map(a => {
                    const isActive = selected === a.id;
                    return (
                        <button
                            key={a.id}
                            onClick={() => onSelect(a.id)}
                            style={{
                                padding: '10px 8px',
                                borderRadius: 'var(--radius-sm)',
                                border: isActive ? '1px solid rgba(255, 106, 43, 0.55)' : '1px solid var(--line)',
                                background: isActive ? 'var(--accent-soft)' : 'var(--surface-2)',
                                color: isActive ? 'var(--accent-2)' : 'var(--ink-2)',
                                boxShadow: isActive ? 'var(--accent-glow)' : 'var(--shadow-sm)',
                                fontSize: '0.78rem',
                                fontWeight: isActive ? 600 : 500,
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s var(--ease)',
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

            {!rearAllowed && (
                <p style={{ fontSize: '0.7rem', color: 'var(--text-dark)', marginTop: '8px' }}>
                    Ракурсы с задних сидений скрыты — у этой модели только 2 двери.
                </p>
            )}
        </div>
    );
}
