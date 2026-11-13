import { CAR_DATABASE, EXTERIOR_COLORS, type CarModel } from '../carDatabase';
import { Chevron } from './ui/icons';

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

function Row({ title, value, placeholder, children, onChange, disabled, swatch }: {
  title: string; value: string; placeholder: string; children: React.ReactNode;
  onChange: (v: string) => void; disabled?: boolean; swatch?: string;
}) {
  return (
    <label className={`row row-select${disabled ? ' disabled' : ''}`}>
      <span className="row-title">{title}</span>
      <span className="row-value">
        {swatch && <i className="row-swatch" style={{ background: swatch }} />}
        {value || placeholder}
      </span>
      <Chevron size={14} className="row-chev" />
      <select value={value} onChange={e => onChange(e.target.value)} disabled={disabled} aria-label={title}>
        {children}
      </select>
    </label>
  );
}

export function CarSelector({ make, setMake, model, setModel, year, setYear, extColor, setExtColor }: CarSelectorProps) {
  const makes = CAR_DATABASE.map(m => m.name).sort();
  const models: CarModel[] = CAR_DATABASE.find(m => m.name === make)?.models || [];
  const modelObj = models.find(m => `${m.name} (${m.body})` === model);
  const years: number[] = [];
  if (modelObj) for (let y = modelObj.years[1]; y >= modelObj.years[0]; y--) years.push(y);
  const ext = EXTERIOR_COLORS.find(c => c.name === extColor);

  return (
    <div className="group">
      <Row title="Марка" value={make} placeholder="Выбрать" onChange={v => { setMake(v); setModel(''); setYear(''); }}>
        <option value="">Выбрать</option>
        {makes.map(m => <option key={m} value={m}>{m}</option>)}
      </Row>
      <Row title="Модель" value={model} placeholder="Выбрать" disabled={!make} onChange={v => { setModel(v); setYear(''); }}>
        <option value="">Выбрать</option>
        {models.map(m => {
          const k = `${m.name} (${m.body})`;
          return <option key={k} value={k}>{k}</option>;
        })}
      </Row>
      <Row title="Год" value={year} placeholder="Любой" disabled={!modelObj} onChange={setYear}>
        <option value="">Любой</option>
        {years.map(y => <option key={y} value={String(y)}>{y}</option>)}
      </Row>
      <Row title="Цвет кузова" value={ext?.nameRu || ''} placeholder="Не важен" swatch={ext?.hex} onChange={setExtColor}>
        <option value="">Не важен</option>
        {EXTERIOR_COLORS.map(c => <option key={c.name} value={c.name}>{c.nameRu}</option>)}
      </Row>
    </div>
  );
}
