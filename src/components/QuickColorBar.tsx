import { SW, ZG } from '../data';

interface QuickColorBarProps {
    activeZone: string | null;
    colors: Record<string, string>;
    onColorChange: (zoneId: string, hex: string) => void;
}

export function QuickColorBar({ activeZone, colors, onColorChange }: QuickColorBarProps) {
    if (!activeZone) return null;

    // find zone label
    const zone = ZG.flatMap(g => g.zones).find(z => z.id === activeZone);
    if (!zone) return null;

    const currentColor = colors[activeZone] || '#1A1A1A';

    // used colors in interior (unique)
    const usedColors = [...new Set(Object.values(colors).map(c => c.toUpperCase()))];

    // recommended swatches
    const recColors = SW.map(s => s.h.toUpperCase());

    // merge: used first, then recommended (skip duplicates)
    const allColors = [...usedColors];
    recColors.forEach(c => {
        if (!allColors.includes(c)) allColors.push(c);
    });

    return (
        <div style={{
            padding: '12px 16px',
            backgroundColor: 'var(--card)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
        }}>
            {/* Zone name + current color */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{
                    width: '28px', height: '28px', borderRadius: '6px',
                    backgroundColor: currentColor,
                    border: '2px solid white',
                    flexShrink: 0,
                }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {zone.l}
                </span>
                <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dark)', marginLeft: 'auto' }}>
                    {currentColor.toUpperCase()}
                </span>
            </div>

            {/* Color swatches row */}
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', alignItems: 'center' }}>
                {allColors.map((c, i) => {
                    const isSelected = currentColor.toUpperCase() === c;
                    return (
                        <button
                            key={`qc-${i}`}
                            onClick={() => onColorChange(activeZone, c)}
                            title={c}
                            style={{
                                width: '28px', height: '28px', borderRadius: '5px',
                                backgroundColor: c,
                                border: isSelected ? '2.5px solid white' : '1.5px solid var(--border)',
                                cursor: 'pointer',
                                transition: 'all 0.12s',
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                fontSize: '11px', color: 'white', textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                                transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                            }}
                        >
                            {isSelected && '✓'}
                        </button>
                    );
                })}

                {/* Native color picker */}
                <div style={{
                    width: '28px', height: '28px', borderRadius: '5px',
                    border: '1.5px dashed var(--accent)',
                    position: 'relative', overflow: 'hidden',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    cursor: 'pointer', flexShrink: 0,
                }}>
                    <span style={{ fontSize: '14px', pointerEvents: 'none' }}>🎨</span>
                    <input
                        type="color"
                        value={currentColor}
                        onChange={e => onColorChange(activeZone, e.target.value)}
                        style={{
                            position: 'absolute', inset: '-10px',
                            width: '50px', height: '50px',
                            opacity: 0, cursor: 'pointer',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
