import { SW } from '../data';

interface SkinSamplesProps {
    onSelectCallback?: (hex: string) => void;
    activeZone: string | null;
}

export function SkinSamples({ onSelectCallback, activeZone }: SkinSamplesProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10.5px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                color: 'var(--ink-3)',
                paddingLeft: '4px',
                textTransform: 'uppercase',
            }}>
                Образцы кожи
            </span>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', WebkitOverflowScrolling: 'touch' }}>
                {/* Custom picker tile */}
                <label
                    title={activeZone ? 'Выбрать произвольный цвет для зоны' : 'Сначала выбери зону'}
                    style={{
                        flexShrink: 0,
                        width: '140px',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        cursor: activeZone ? 'pointer' : 'not-allowed',
                        border: '1.5px dashed var(--accent)',
                        background: 'var(--accent-soft)',
                        boxShadow: activeZone ? 'var(--accent-glow)' : 'var(--shadow-sm)',
                        opacity: activeZone ? 1 : 0.5,
                        transition: 'all 0.25s var(--ease)',
                        position: 'relative',
                    }}
                >
                    <input
                        type="color"
                        disabled={!activeZone}
                        onChange={(e) => onSelectCallback && onSelectCallback(e.target.value)}
                        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: activeZone ? 'pointer' : 'not-allowed' }}
                    />
                    <div style={{
                        height: '64px',
                        background: 'linear-gradient(135deg, #FF6A2B, #B22222, #5AB4D0, #8B6AAD)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.5rem', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                        position: 'relative',
                    }}>
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'radial-gradient(120% 80% at 30% 20%, rgba(255,255,255,0.2), transparent 50%)',
                            pointerEvents: 'none',
                        }} />
                        🎨
                    </div>
                    <div style={{ padding: '12px 14px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-2)' }}>Свой цвет</div>
                        <div className="mono" style={{ fontSize: '10.5px', color: 'var(--ink-3)', marginTop: '3px' }}>пипетка / HEX</div>
                    </div>
                </label>

                {SW.map((sw, i) => (
                    <div
                        key={i}
                        onClick={() => onSelectCallback && onSelectCallback(sw.h)}
                        className="skin"
                        style={{
                            flexShrink: 0,
                            width: '140px',
                            borderRadius: 'var(--radius-md)',
                            overflow: 'hidden',
                            cursor: activeZone ? 'pointer' : 'default',
                            border: '1px solid var(--line)',
                            background: 'var(--surface-2)',
                            opacity: activeZone ? 1 : 0.6,
                            transition: 'all 0.25s var(--ease)',
                            transform: activeZone ? 'scale(1)' : 'scale(0.98)',
                        }}
                    >
                        <div style={{ height: '64px', backgroundColor: sw.h, position: 'relative' }}>
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'radial-gradient(120% 80% at 30% 20%, rgba(255,255,255,0.18), transparent 50%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.2))',
                                mixBlendMode: 'overlay',
                                pointerEvents: 'none',
                            }} />
                        </div>
                        <div style={{ padding: '12px 14px' }}>
                            <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{sw.n}</div>
                            <div className="mono" style={{ fontSize: '10.5px', color: 'var(--ink-3)', marginTop: '3px' }}>{sw.h.toUpperCase()}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
