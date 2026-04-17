import { SW } from '../data';

interface SkinSamplesProps {
    onSelectCallback?: (hex: string) => void;
    activeZone: string | null;
}

export function SkinSamples({ onSelectCallback, activeZone }: SkinSamplesProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px', color: 'var(--text-main)', paddingLeft: '4px' }}>
                ОБРАЗЦЫ КОЖИ
            </span>
            <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '8px', WebkitOverflowScrolling: 'touch' }}>
                {/* Custom color tile — native picker */}
                <label
                    title={activeZone ? 'Выбрать произвольный цвет для зоны' : 'Сначала выбери зону'}
                    style={{
                        flexShrink: 0,
                        width: '120px',
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden',
                        cursor: activeZone ? 'pointer' : 'not-allowed',
                        border: '1.5px dashed var(--accent)',
                        opacity: activeZone ? 1 : 0.5,
                        transition: 'all 0.2s',
                        position: 'relative'
                    }}
                >
                    <input
                        type="color"
                        disabled={!activeZone}
                        onChange={(e) => onSelectCallback && onSelectCallback(e.target.value)}
                        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: activeZone ? 'pointer' : 'not-allowed' }}
                    />
                    <div style={{
                        height: '48px',
                        background: 'linear-gradient(135deg, #F28C38, #B22222, #3AA0B5, #8B6AAD)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.4rem', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.6)'
                    }}>🎨</div>
                    <div style={{
                        padding: '8px',
                        backgroundColor: 'var(--card-hover)',
                    }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)' }}>Свой цвет</div>
                        <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>пипетка / HEX</div>
                    </div>
                </label>

                {SW.map((sw, i) => (
                    <div
                        key={i}
                        onClick={() => onSelectCallback && onSelectCallback(sw.h)}
                        style={{
                            flexShrink: 0,
                            width: '120px',
                            borderRadius: 'var(--radius-sm)',
                            overflow: 'hidden',
                            cursor: activeZone ? 'pointer' : 'default',
                            border: '1px solid var(--border)',
                            opacity: activeZone ? 1 : 0.6,
                            transition: 'all 0.2s',
                            transform: activeZone ? 'scale(1)' : 'scale(0.98)'
                        }}
                    >
                        <div style={{ height: '48px', backgroundColor: sw.h, borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}></div>
                        <div style={{
                            padding: '8px',
                            backgroundColor: 'var(--card-hover)',
                            borderBottomLeftRadius: '6px',
                            borderBottomRightRadius: '6px',
                            borderTop: 'none'
                        }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-main)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{sw.n}</div>
                            <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>{sw.h.toUpperCase()}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
