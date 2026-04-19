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
            const group = ZG.find(g => g.zones.some(z => z.id === activeZone));
            if (group) {
                setOpenGroups(prev => ({ ...prev, [group.g]: true }));
            }
        }
    }, [activeZone]);

    // Desktop horizontal: auto-scroll the right column to the active zone
    React.useEffect(() => {
        if (!activeZone) return;
        if (typeof window === 'undefined') return;
        if (window.innerWidth < 1024) return;
        const t = window.setTimeout(() => {
            const el = document.getElementById(`zone-${activeZone}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 80);
        return () => window.clearTimeout(t);
    }, [activeZone, openGroups]);

    const toggleGroup = (g: string) => {
        setOpenGroups(prev => ({ ...prev, [g]: !prev[g] }));
    };

    const handleColorChange = (zoneId: string, hex: string) => {
        setColors(prev => ({ ...prev, [zoneId]: hex }));
    };

    // ===== inline reusable styles =====
    const panelHeadStyle = (isOpen: boolean): React.CSSProperties => ({
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 18px', cursor: 'pointer',
        borderBottom: isOpen ? '1px solid var(--line)' : 'none',
        transition: 'background 0.2s var(--ease)',
    });
    const panelLabelStyle: React.CSSProperties = {
        fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500,
        letterSpacing: '0.18em', color: 'var(--ink)', textTransform: 'uppercase',
    };
    const panelMetaStyle: React.CSSProperties = {
        fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-3)',
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* ============ TRIM ============ */}
            <div className="panel" style={{ overflow: 'visible' }}>
                <div onClick={() => toggleGroup('TRIM')} style={panelHeadStyle(openGroups['TRIM'])}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: 'var(--ink-4)', fontSize: '14px', width: '16px', display: 'flex', justifyContent: 'center' }}>
                            {openGroups['TRIM'] ? '↓' : '›'}
                        </span>
                        <span style={panelLabelStyle}>Декор торпедо</span>
                    </div>
                    <span style={panelMetaStyle}>{TRIMS.find((t: any) => t.id === trimId)?.n || 'Выбрано'}</span>
                </div>

                {openGroups['TRIM'] && (
                    <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            {TRIMS.map((t: any) => (
                                <button
                                    key={t.id}
                                    onClick={() => setTrimId(t.id)}
                                    style={{
                                        padding: '12px',
                                        border: trimId === t.id ? '1.5px solid var(--accent)' : '1px solid var(--line-strong)',
                                        backgroundColor: trimId === t.id ? 'var(--accent-soft)' : 'var(--surface-2)',
                                        color: trimId === t.id ? 'var(--accent-2)' : 'var(--ink-2)',
                                        borderRadius: 'var(--radius-sm)',
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s var(--ease)',
                                        minHeight: '44px',
                                    }}
                                >
                                    {t.n}
                                </button>
                            ))}
                        </div>
                        {trimId === 'custom' && (
                            <div style={{
                                marginTop: '4px', padding: '12px 14px',
                                backgroundColor: 'var(--bg-elev)', border: '1px solid var(--line)',
                                borderRadius: 'var(--radius-sm)',
                                display: 'flex', alignItems: 'center', gap: '10px',
                            }}>
                                <span style={{ fontSize: '12px', color: 'var(--ink-3)' }}>Цвет кожи торпедо</span>
                                <input
                                    type="text"
                                    value={trimColor.toUpperCase()}
                                    onChange={(e) => { if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) setTrimColor(e.target.value); }}
                                    className="mono"
                                    style={{ width: '100px', padding: '6px 8px', fontSize: '12px', background: 'var(--surface)', border: '1px solid var(--line-strong)', color: 'var(--ink)', borderRadius: '8px', minHeight: '32px' }}
                                />
                                <div style={{ width: '32px', height: '32px', position: 'relative', overflow: 'hidden', borderRadius: '10px', border: '1px solid var(--line-glow)' }}>
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

            {/* ============ ZONES ============ */}
            {ZG.map((group: any) => {
                const isOpen = openGroups[group.g];
                const groupColors = group.zones.map((z: any) => colors[z.id]?.toUpperCase() || '#1A1A1A');
                const uniqueColors = [...new Set(groupColors)] as string[];

                return (
                    <div key={group.g} className="panel" style={{ overflow: 'visible' }}>
                        <div onClick={() => toggleGroup(group.g)} style={panelHeadStyle(isOpen)}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ color: 'var(--ink-4)', fontSize: '14px', width: '16px', display: 'flex', justifyContent: 'center' }}>
                                    {isOpen ? '↓' : '›'}
                                </span>
                                <span style={panelLabelStyle}>{group.g}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ display: 'flex', gap: '3px' }}>
                                    {uniqueColors.slice(0, 6).map((c, i) => (
                                        <div key={i} style={{ width: '14px', height: '14px', background: c, borderRadius: '5px', border: '1px solid var(--line-strong)' }} />
                                    ))}
                                </div>
                                <span style={panelMetaStyle}>{uniqueColors.length} цв.</span>
                            </div>
                        </div>

                        {isOpen && (
                            <div style={{ padding: '8px 6px' }}>
                                {group.zones.map((zone: any) => {
                                    const isActive = activeZone === zone.id;
                                    const zoneColor = colors[zone.id] || '#1A1A1A';
                                    const isPopoverOpen = openPopover === zone.id;

                                    return (
                                        <div key={zone.id} id={`zone-${zone.id}`} style={{ position: 'relative' }}>
                                            <div
                                                onClick={() => setActiveZone(zone.id)}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: '12px',
                                                    padding: '12px 14px',
                                                    borderRadius: 'var(--radius-sm)',
                                                    background: isActive ? 'var(--bg-elev)' : 'transparent',
                                                    boxShadow: isActive ? 'inset 2px 0 0 var(--accent)' : 'none',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.15s var(--ease)',
                                                }}
                                            >
                                                <div style={{
                                                    width: '28px', height: '28px', borderRadius: '10px',
                                                    backgroundColor: zoneColor,
                                                    border: '1px solid var(--line-strong)',
                                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 4px rgba(0,0,0,0.4)',
                                                    flexShrink: 0,
                                                }} />
                                                <span style={{
                                                    flex: 1, fontSize: '14px',
                                                    color: isActive ? 'var(--ink)' : 'var(--ink-2)',
                                                    fontWeight: isActive ? 600 : 500,
                                                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                }}>
                                                    {zone.l}
                                                </span>
                                                <span className="mono" style={{
                                                    minWidth: '76px', fontSize: '11.5px',
                                                    color: 'var(--ink-3)', textAlign: 'right',
                                                }}>
                                                    {zoneColor.toUpperCase()}
                                                </span>
                                                <div
                                                    onClick={(e) => { e.stopPropagation(); setOpenPopover(isPopoverOpen ? null : zone.id); setActiveZone(zone.id); }}
                                                    style={{
                                                        width: '28px', height: '28px', borderRadius: '10px',
                                                        border: '1px solid var(--line-glow)',
                                                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                                                        backgroundColor: zoneColor, cursor: 'pointer',
                                                    }}
                                                >
                                                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', textShadow: '0 0 2px black' }}>▾</span>
                                                </div>
                                            </div>

                                            {/* ===== Popover palette ===== */}
                                            {isPopoverOpen && (
                                                <div style={{
                                                    margin: '4px 8px 8px',
                                                    padding: '14px 16px',
                                                    background: 'var(--bg-elev)',
                                                    border: '1px solid var(--line-strong)',
                                                    borderRadius: 'var(--radius-md)',
                                                }}>
                                                    {/* Used in interior */}
                                                    <div style={{ marginBottom: '14px' }}>
                                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-3)', display: 'block', marginBottom: '8px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Используются в салоне</span>
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                            {[...new Set(Object.values(colors).map(c => c.toUpperCase()))].map((c: string, i: number) => {
                                                                const on = zoneColor.toUpperCase() === c;
                                                                return (
                                                                    <button
                                                                        key={`used-${i}`}
                                                                        onClick={() => { handleColorChange(zone.id, c); setOpenPopover(null); }}
                                                                        style={{
                                                                            width: '34px', height: '34px', borderRadius: '10px',
                                                                            backgroundColor: c,
                                                                            border: on ? '2px solid var(--accent)' : '1px solid var(--line-strong)',
                                                                            boxShadow: on ? '0 0 0 1px var(--accent-soft)' : 'inset 0 1px 0 rgba(255,255,255,0.12)',
                                                                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                                                                            color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                                                                            fontSize: '13px', transition: 'all 0.2s var(--ease)',
                                                                            transform: on ? 'scale(1.08)' : 'scale(1)',
                                                                        }}
                                                                    >
                                                                        {on && '✓'}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>

                                                    {/* Recommended */}
                                                    <div style={{ marginBottom: '14px' }}>
                                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-3)', display: 'block', marginBottom: '8px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Рекомендованные</span>
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                            {SW.map((sw: any, i: number) => {
                                                                const on = zoneColor.toUpperCase() === sw.h.toUpperCase();
                                                                return (
                                                                    <button
                                                                        key={`sw-${i}`}
                                                                        onClick={() => { handleColorChange(zone.id, sw.h); setOpenPopover(null); }}
                                                                        style={{
                                                                            width: '34px', height: '34px', borderRadius: '10px',
                                                                            backgroundColor: sw.h,
                                                                            border: on ? '2px solid var(--accent)' : '1px solid var(--line-strong)',
                                                                            boxShadow: on ? '0 0 0 1px var(--accent-soft)' : 'inset 0 1px 0 rgba(255,255,255,0.12)',
                                                                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                                                                            color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                                                                            fontSize: '13px', transition: 'all 0.2s var(--ease)',
                                                                            transform: on ? 'scale(1.08)' : 'scale(1)',
                                                                        }}
                                                                    >
                                                                        {on && '✓'}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>

                                                    {/* Custom */}
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
                                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Свой</span>
                                                        <input
                                                            type="text"
                                                            value={zoneColor.toUpperCase()}
                                                            onChange={(e) => {
                                                                if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) handleColorChange(zone.id, e.target.value);
                                                            }}
                                                            className="mono"
                                                            style={{ width: '96px', padding: '6px 10px', fontSize: '12px', background: 'var(--bg)', border: '1px solid var(--line-strong)', color: 'var(--ink)', borderRadius: '8px', minHeight: '32px' }}
                                                        />
                                                        <div style={{ width: '30px', height: '30px', position: 'relative', overflow: 'hidden', borderRadius: '9px', border: '1px solid var(--line-glow)' }}>
                                                            <input
                                                                type="color"
                                                                value={zoneColor}
                                                                onChange={(e) => handleColorChange(zone.id, e.target.value)}
                                                                style={{ position: 'absolute', inset: '-10px', width: '55px', height: '55px', padding: '0', border: 'none', background: 'none', cursor: 'pointer' }}
                                                            />
                                                        </div>
                                                        <span onClick={() => setOpenPopover(null)} style={{ fontSize: '11.5px', color: 'var(--ink-3)', cursor: 'pointer', marginLeft: 'auto', fontFamily: 'var(--font-mono)' }}>
                                                            ✕
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
