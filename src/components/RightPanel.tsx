import React from 'react';
import { ZG, SW, TRIMS } from '../data';

interface RightPanelProps {
    colors: Record<string, string>;
    setColors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    activeZone: string | null;
    setActiveZone: (id: string | null) => void;
    trimId: string;
    setTrimId: (id: string) => void;
    trimColor: string;
    setTrimColor: (c: string) => void;
}

export function RightPanel({ colors, setColors, activeZone, setActiveZone, trimId, setTrimId, trimColor, setTrimColor }: RightPanelProps) {
    const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>({
        'СИДЕНЬЯ': true,
        'TRIM': true
    });
    const [openPopover, setOpenPopover] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (activeZone) {
            // Find which group contains this activeZone and open it
            const group = ZG.find(g => g.zones.some(z => z.id === activeZone));
            if (group) {
                setOpenGroups(prev => ({ ...prev, [group.g]: true }));
            }
        }
    }, [activeZone]);

    const toggleGroup = (g: string) => {
        setOpenGroups(prev => ({ ...prev, [g]: !prev[g] }));
    };

    const handleColorChange = (zoneId: string, hex: string) => {
        setColors(prev => ({ ...prev, [zoneId]: hex }));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* 1. TRIM SECTION */}
            <div className="panel" style={{ overflow: 'visible', borderRadius: 'var(--radius-sm)' }}>
                <div
                    onClick={() => toggleGroup('TRIM')}
                    style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '14px 16px', cursor: 'pointer',
                        borderBottom: openGroups['TRIM'] ? '1px solid var(--border)' : 'none',
                        backgroundColor: openGroups['TRIM'] ? 'var(--card-hover)' : 'transparent',
                        borderTopLeftRadius: 'var(--radius-sm)', borderTopRightRadius: 'var(--radius-sm)',
                        borderBottomLeftRadius: openGroups['TRIM'] ? '0' : 'var(--radius-sm)', borderBottomRightRadius: openGroups['TRIM'] ? '0' : 'var(--radius-sm)',
                        transition: 'background 0.15s'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: 'var(--text-dark)', fontSize: '14px', width: '16px', display: 'flex', justifyContent: 'center' }}>
                            {openGroups['TRIM'] ? '▾' : '›'}
                        </span>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '2px', color: openGroups['TRIM'] ? 'var(--text-main)' : 'var(--text-dark)' }}>
                            ДЕКОР ТОРПЕДО
                        </span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dark)' }}>{TRIMS.find((t: any) => t.id === trimId)?.n || 'Выбрано'}</span>
                </div>

                {openGroups['TRIM'] && (
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            {TRIMS.map((t: any) => (
                                <button
                                    key={t.id}
                                    onClick={() => setTrimId(t.id)}
                                    style={{
                                        padding: '10px',
                                        border: trimId === t.id ? '1.5px solid white' : '1px solid var(--border-active)',
                                        backgroundColor: trimId === t.id ? '#1a1a1c' : 'var(--card-hover)',
                                        color: trimId === t.id ? 'white' : 'var(--text-muted)',
                                        borderRadius: 'var(--radius-sm)',
                                        fontSize: '0.8rem',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s'
                                    }}
                                >
                                    {t.n}
                                </button>
                            ))}
                        </div>
                        {trimId === 'custom' && (
                            <div style={{
                                marginTop: '4px', padding: '10px 12px',
                                backgroundColor: 'var(--bg)', border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '10px'
                            }}>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Цвет кожи торпедо</span>
                                <input
                                    type="text"
                                    value={trimColor.toUpperCase()}
                                    onChange={(e) => { if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) setTrimColor(e.target.value); }}
                                    className="mono"
                                    style={{ width: '90px', padding: '4px 6px', fontSize: '0.8rem', backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: '4px' }}
                                />
                                <div style={{ width: '30px', height: '26px', position: 'relative', overflow: 'hidden', borderRadius: '4px', border: '1px solid var(--border)' }}>
                                    <input
                                        type="color"
                                        value={trimColor}
                                        onChange={(e) => setTrimColor(e.target.value)}
                                        style={{ position: 'absolute', inset: '-10px', width: '55px', height: '55px', padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 2. ZONES SECTIONS */}
            {ZG.map((group: any) => {
                const isOpen = openGroups[group.g];
                // Calculate unique colors in this group
                const groupColors = group.zones.map((z: any) => colors[z.id]?.toUpperCase() || '#1A1A1A');
                const uniqueColors = [...new Set(groupColors)] as string[];

                return (
                    <div key={group.g} className="panel" style={{ overflow: 'visible', borderRadius: 'var(--radius-sm)' }}>
                        <div
                            onClick={() => toggleGroup(group.g)}
                            style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '14px 16px', cursor: 'pointer',
                                borderBottom: isOpen ? '1px solid var(--border)' : 'none',
                                backgroundColor: isOpen ? 'var(--card-hover)' : 'transparent',
                                borderTopLeftRadius: 'var(--radius-sm)', borderTopRightRadius: 'var(--radius-sm)',
                                borderBottomLeftRadius: isOpen ? '0' : 'var(--radius-sm)', borderBottomRightRadius: isOpen ? '0' : 'var(--radius-sm)',
                                transition: 'background 0.15s'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ color: 'var(--text-dark)', fontSize: '14px', width: '16px', display: 'flex', justifyContent: 'center' }}>
                                    {isOpen ? '▾' : '›'}
                                </span>
                                <span style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '2px', color: isOpen ? 'var(--text-main)' : 'var(--text-dark)' }}>
                                    {group.g}
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ display: 'flex', gap: '3px', marginRight: '6px' }}>
                                    {uniqueColors.slice(0, 6).map((c, i) => (
                                        <div key={i} style={{ width: '12px', height: '12px', backgroundColor: c, borderRadius: '3px', border: '1px solid var(--border)' }} />
                                    ))}
                                </div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-dark)' }}>{uniqueColors.length} цв.</span>
                            </div>
                        </div>

                        {isOpen && (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', padding: '10px 16px', borderBottom: '1px solid #0e0e10', fontSize: '0.75rem', color: 'var(--text-dark)' }}>
                                    <div style={{ width: '24px' }}></div>
                                    <div style={{ flex: 1, paddingLeft: '10px', letterSpacing: '1px' }}>ЗОНА</div>
                                    <div style={{ width: '80px', letterSpacing: '1px', textAlign: 'right', paddingRight: '14px' }}>HEX</div>
                                    <div style={{ width: '24px' }}></div>
                                </div>

                                {group.zones.map((zone: any) => {
                                    const isActive = activeZone === zone.id;
                                    const zoneColor = colors[zone.id] || '#1A1A1A';
                                    const isPopoverOpen = openPopover === zone.id;

                                    return (
                                        <div key={zone.id} id={`zone-${zone.id}`} style={{ position: 'relative' }}>
                                            <div
                                                onClick={() => setActiveZone(zone.id)}
                                                style={{
                                                    display: 'flex', alignItems: 'center', padding: '10px 16px',
                                                    backgroundColor: isActive ? '#141416' : 'transparent',
                                                    cursor: 'pointer',
                                                    borderLeft: isActive ? '3px solid white' : '3px solid transparent',
                                                    borderBottom: '1px solid #0e0e10',
                                                    transition: 'background 0.1s'
                                                }}
                                            >
                                                <div style={{ width: '24px', height: '24px', backgroundColor: zoneColor, borderRadius: '6px', border: '1.5px solid var(--border)', flexShrink: 0 }} />
                                                <span style={{ flex: 1, paddingLeft: '10px', fontSize: '0.85rem', color: isActive ? 'var(--text-main)' : 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {zone.l}
                                                </span>
                                                <span className="mono" style={{ minWidth: '70px', fontSize: '0.75rem', color: 'var(--text-dark)', textAlign: 'right', paddingRight: '14px' }}>
                                                    {zoneColor.toUpperCase()}
                                                </span>

                                                <div
                                                    onClick={(e) => { e.stopPropagation(); setOpenPopover(isPopoverOpen ? null : zone.id); setActiveZone(zone.id); }}
                                                    style={{
                                                        width: '24px', height: '24px', borderRadius: '6px', border: '1.5px solid var(--text-dark)',
                                                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                                                        backgroundColor: zoneColor, cursor: 'pointer', position: 'relative'
                                                    }}
                                                >
                                                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textShadow: '0 0 2px black' }}>▾</span>
                                                </div>
                                            </div>

                                            {/* POPUP PALETTE */}
                                            {isPopoverOpen && (
                                                <div style={{
                                                    padding: '14px 16px 14px 44px', backgroundColor: '#101012', borderLeft: '3px solid var(--border)', borderBottom: '1px solid #0e0e10'
                                                }}>
                                                    
                                                    {/* USED COLORS IN INTERIOR */}
                                                    <div style={{ marginBottom: '14px' }}>
                                                        <span style={{ fontSize: '0.65rem', color: 'var(--text-dark)', display: 'block', marginBottom: '8px', letterSpacing: '1px' }}>ИСПОЛЬЗУЮТСЯ В САЛОНЕ</span>
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                            {[...new Set(Object.values(colors).map(c => c.toUpperCase()))].map((c: string, i: number) => (
                                                                <button
                                                                    key={`used-${i}`}
                                                                    onClick={() => { handleColorChange(zone.id, c); setOpenPopover(null); }}
                                                                    style={{
                                                                        width: '32px', height: '32px', borderRadius: '6px',
                                                                        backgroundColor: c,
                                                                        border: zoneColor.toUpperCase() === c ? '2.5px solid white' : '1.5px solid var(--border)',
                                                                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                                                                        color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.8)', fontSize: '13px', transition: 'all 0.15s'
                                                                    }}
                                                                >
                                                                    {zoneColor.toUpperCase() === c && '✓'}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* RECOMMENDED PALETTE */}
                                                    <div style={{ marginBottom: '14px' }}>
                                                        <span style={{ fontSize: '0.65rem', color: 'var(--text-dark)', display: 'block', marginBottom: '8px', letterSpacing: '1px' }}>РЕКОМЕНДОВАННЫЕ</span>
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                            {SW.map((sw: any, i: number) => (
                                                                <button
                                                                    key={`sw-${i}`}
                                                                    onClick={() => { handleColorChange(zone.id, sw.h); setOpenPopover(null); }}
                                                                    style={{
                                                                        width: '32px', height: '32px', borderRadius: '6px',
                                                                        backgroundColor: sw.h,
                                                                        border: zoneColor.toUpperCase() === sw.h.toUpperCase() ? '2.5px solid white' : '1.5px solid var(--border)',
                                                                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                                                                        color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.8)', fontSize: '13px', transition: 'all 0.15s'
                                                                    }}
                                                                >
                                                                    {zoneColor.toUpperCase() === sw.h.toUpperCase() && '✓'}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* CUSTOM COLOR PICKER */}
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '10px', borderTop: '1px solid var(--border-active)' }}>
                                                        <span style={{ fontSize: '0.65rem', color: 'var(--text-dark)', letterSpacing: '1px' }}>СВОЙ ЦВЕТ</span>
                                                        <input
                                                            type="text"
                                                            value={zoneColor.toUpperCase()}
                                                            onChange={(e) => {
                                                                if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) handleColorChange(zone.id, e.target.value);
                                                            }}
                                                            className="mono"
                                                            style={{ width: '80px', padding: '4px 6px', fontSize: '0.8rem', backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: '4px' }}
                                                        />
                                                        <div style={{ width: '28px', height: '26px', position: 'relative', overflow: 'hidden', borderRadius: '4px', border: '1px solid var(--border)' }}>
                                                            <input
                                                                type="color"
                                                                value={zoneColor}
                                                                onChange={(e) => handleColorChange(zone.id, e.target.value)}
                                                                style={{ position: 'absolute', inset: '-10px', width: '50px', height: '50px', padding: '0', border: 'none', background: 'none', cursor: 'pointer' }}
                                                            />
                                                        </div>
                                                        <span onClick={() => setOpenPopover(null)} style={{ fontSize: '0.75rem', color: 'var(--text-dark)', cursor: 'pointer', marginLeft: 'auto' }}>
                                                            ✕ закрыть
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
