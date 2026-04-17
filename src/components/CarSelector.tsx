import React from 'react';
import { CAR_DATABASE, EXTERIOR_COLORS, type CarModel } from '../carDatabase';

interface CarSelectorProps {
    make: string;
    setMake: (v: string) => void;
    model: string;
    setModel: (v: string) => void;
    year: string;
    setYear: (v: string) => void;
    extColor: string;
    setExtColor: (v: string) => void;
}

export function CarSelector({ make, setMake, model, setModel, year, setYear, extColor, setExtColor }: CarSelectorProps) {
    const makes = CAR_DATABASE.map(m => m.name).sort();
    const selectedMake = CAR_DATABASE.find(m => m.name === make);
    const models: CarModel[] = selectedMake?.models || [];

    // unique model display names for the selected make
    const modelOptions = models.map(m => `${m.name} (${m.body})`);

    // find selected model object
    const selectedModelObj = models.find(m => `${m.name} (${m.body})` === model);

    // year range
    const years: number[] = [];
    if (selectedModelObj) {
        for (let y = selectedModelObj.years[1]; y >= selectedModelObj.years[0]; y--) {
            years.push(y);
        }
    }

    const handleMakeChange = (v: string) => {
        setMake(v);
        setModel('');
        setYear('');
    };

    const handleModelChange = (v: string) => {
        setModel(v);
        setYear('');
    };

    const selectStyle: React.CSSProperties = {
        width: '100%',
        minWidth: 0,
        padding: '10px 12px',
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border)',
        color: 'var(--text-main)',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.82rem',
        fontFamily: 'inherit',
        cursor: 'pointer',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10px center',
        paddingRight: '30px',
    };

    const labelStyle: React.CSSProperties = {
        fontSize: '0.65rem',
        letterSpacing: '1.5px',
        color: 'var(--text-dark)',
        marginBottom: '6px',
        display: 'block',
    };

    return (
        <div className="panel" style={{ padding: '16px', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <span style={{ fontSize: '1.1rem' }}>🚗</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '2px', color: 'var(--text-main)' }}>
                    ВЫБЕРИТЕ АВТО
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px' }}>
                {/* Make */}
                <div style={{ minWidth: 0 }}>
                    <label style={labelStyle}>МАРКА</label>
                    <select value={make} onChange={e => handleMakeChange(e.target.value)} style={selectStyle}>
                        <option value="">— Выберите —</option>
                        {makes.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>

                {/* Model */}
                <div style={{ minWidth: 0 }}>
                    <label style={labelStyle}>МОДЕЛЬ</label>
                    <select
                        value={model}
                        onChange={e => handleModelChange(e.target.value)}
                        disabled={!make}
                        style={{ ...selectStyle, opacity: make ? 1 : 0.4 }}
                    >
                        <option value="">— Выберите —</option>
                        {modelOptions.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>

                {/* Year */}
                <div style={{ minWidth: 0 }}>
                    <label style={labelStyle}>ГОД</label>
                    <select
                        value={year}
                        onChange={e => setYear(e.target.value)}
                        disabled={!model}
                        style={{ ...selectStyle, opacity: model ? 1 : 0.4 }}
                    >
                        <option value="">— Год —</option>
                        {years.map(y => <option key={y} value={String(y)}>{y}</option>)}
                    </select>
                </div>

                {/* Exterior Color */}
                <div style={{ minWidth: 0 }}>
                    <label style={labelStyle}>ЦВЕТ КУЗОВА</label>
                    <select
                        value={extColor}
                        onChange={e => setExtColor(e.target.value)}
                        disabled={!make}
                        style={{ ...selectStyle, opacity: make ? 1 : 0.4 }}
                    >
                        <option value="">— Цвет —</option>
                        {EXTERIOR_COLORS.map(c => (
                            <option key={c.name} value={c.name}>
                                {c.nameRu}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Preview line */}
            {make && (
                <div style={{
                    marginTop: '12px', padding: '8px 12px',
                    backgroundColor: 'var(--bg)', borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    fontSize: '0.78rem', color: 'var(--text-muted)',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    flexWrap: 'wrap', wordBreak: 'break-word'
                }}>
                    <span style={{ color: 'var(--text-dark)' }}>В промпте:</span>
                    <span className="mono" style={{ color: 'var(--accent)', minWidth: 0, overflowWrap: 'anywhere' }}>
                        {extColor ? `${extColor} ` : ''}{year ? `${year} ` : ''}{make}{model ? ` ${model}` : ''}{selectedModelObj ? ` ${selectedModelObj.type}` : ''}
                    </span>
                </div>
            )}
        </div>
    );
}
