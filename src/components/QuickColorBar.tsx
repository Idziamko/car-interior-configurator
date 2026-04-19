import { SW, ZG } from '../data';

interface QuickColorBarProps {
    activeZone: string | null;
    colors: Record<string, string>;
    onColorChange: (zoneId: string, hex: string) => void;
}

export function QuickColorBar({ activeZone, colors, onColorChange }: QuickColorBarProps) {
    if (!activeZone) return null;

    const zone = ZG.flatMap(g => g.zones).find(z => z.id === activeZone);
    if (!zone) return null;

    const currentColor = colors[activeZone] || '#1A1A1A';

    const usedColors = [...new Set(Object.values(colors).map(c => c.toUpperCase()))];
    const recColors = SW.map(s => s.h.toUpperCase());
    const allColors = [...usedColors];
    recColors.forEach(c => { if (!allColors.includes(c)) allColors.push(c); });

    return (
        <div className="qcb" style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: 'var(--shadow-sm)'
        }}>
            {/* Zone name + current color */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{
                    width: '36px', height: '36px', borderRadius: '12px',
                    backgroundColor: currentColor,
                    border: '1px solid var(--line-glow)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 6px rgba(0,0,0,0.4)',
                    flexShrink: 0,
                }} />
                <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)', flex: 1 }}>
                    {zone.l}
                </span>
                <span className="mono" style={{ fontSize: '12px', color: 'var(--ink-3)' }}>
                    {currentColor.toUpperCase()}
                </span>
            </div>

            {/* Swatches */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                {allColors.map((c, i) => {
                    const isSelected = currentColor.toUpperCase() === c;
                    return (
                        <button
                            key={`qc-${i}`}
                            onClick={() => onColorChange(activeZone, c)}
                            title={c}
                            style={{
                                width: '34px', height: '34px', borderRadius: '10px',
                                backgroundColor: c,
                                border: isSelected ? '2px solid var(--accent)' : '1px solid var(--line-strong)',
                                boxShadow: isSelected
                                    ? '0 0 0 1px var(--accent-soft), inset 0 1px 0 rgba(255,255,255,0.15)'
                                    : 'inset 0 1px 0 rgba(255,255,255,0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.2s var(--ease)',
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                fontSize: '12px', color: 'white', textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                                transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                            }}
                        >
                            {isSelected && '✓'}
                        </button>
                    );
                })}

                {/* Native color picker */}
                <div style={{
                    width: '34px', height: '34px', borderRadius: '10px',
                    border: '1.5px dashed var(--accent)',
                    position: 'relative', overflow: 'hidden',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    cursor: 'pointer', flexShrink: 0,
                    background: 'var(--accent-soft)',
                    boxShadow: 'var(--accent-glow), inset 0 1px 0 rgba(255,255,255,0.1)',
                    transition: 'all 0.2s var(--ease)',
                }}>
                    <span style={{ fontSize: '14px', pointerEvents: 'none' }}>🎨</span>
                    <input
                        type="color"
                        value={currentColor}
                        onChange={e => onColorChange(activeZone, e.target.value)}
                        style={{ position: 'absolute', inset: '-10px', width: '60px', height: '60px', opacity: 0, cursor: 'pointer' }}
                    />
                </div>
            </div>
        </div>
    );
}
