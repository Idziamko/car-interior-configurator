import { useState, useEffect } from 'react';
import { PR, AZ, genR } from './data';
import { CAMERA_ANGLES, CAR_DATABASE } from './carDatabase';
import { SkinSamples } from './components/SkinSamples';
import { RightPanel } from './components/RightPanel';
import { CarInteriorSVG } from './components/CarInteriorSVG';
import { AIPrompt } from './components/AIPrompt';
import { CarSelector } from './components/CarSelector';
import { CameraAngleSelector } from './components/CameraAngle';
import { QuickColorBar } from './components/QuickColorBar';

function App() {
  const [colors, setColors] = useState<Record<string, string>>(PR[0].colors);
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [trimId, setTrimId] = useState<string>('carbon');
  const [trimColor, setTrimColor] = useState<string>('#8B5A2B');
  const [randomTag, setRandomTag] = useState<string | null>(null);

  // Car selector
  const [carMake, setCarMake] = useState<string>('BMW');
  const [carModel, setCarModel] = useState<string>('Z4 (E85)');
  const [carYear, setCarYear] = useState<string>('2006');
  const [extColor, setExtColor] = useState<string>('');

  // Camera angle
  const [cameraAngle, setCameraAngle] = useState<string>('driver_door');

  // Layout: false = vertical (mobile default), true = horizontal (50/50)
  const [isHorizontal, setIsHorizontal] = useState(false);

  // Persist layout
  useEffect(() => {
    const saved = localStorage.getItem('layout_h');
    if (saved === '1') setIsHorizontal(true);
  }, []);
  useEffect(() => {
    localStorage.setItem('layout_h', isHorizontal ? '1' : '0');
  }, [isHorizontal]);

  const handleSelectSwatchGlobal = (hex: string) => {
    if (activeZone) {
      setColors(prev => ({ ...prev, [activeZone]: hex }));
    }
  };

  const handleQuickColor = (zoneId: string, hex: string) => {
    setColors(prev => ({ ...prev, [zoneId]: hex }));
  };

  const doRandom = () => {
    const r = genR();
    setColors(r.colors);
    setTrimId(r.trim);
    setRandomTag(r.tag);
  };

  // ===== CAR DESCRIPTION FOR PROMPT =====
  const getCarDesc = () => {
    const selectedMake = CAR_DATABASE.find(m => m.name === carMake);
    const selectedModelObj = selectedMake?.models.find(m => `${m.name} (${m.body})` === carModel);
    if (!carMake) return 'car';
    let desc = '';
    if (extColor) desc += `${extColor} `;
    if (carYear) desc += `${carYear} `;
    desc += carMake;
    if (selectedModelObj) desc += ` ${selectedModelObj.name} ${selectedModelObj.body} ${selectedModelObj.type}`;
    return desc.trim();
  };

  // ===== CAMERA PROMPT =====
  const getCameraPrompt = () => {
    return CAMERA_ANGLES.find(a => a.id === cameraAngle)?.prompt || CAMERA_ANGLES[0].prompt;
  };

  // ===== FULL PROMPT — every detail included =====
  const getPromptText = () => {
    const h = (id: string) => (colors[id] || "#1A1A1A").toUpperCase();

    const trimEn = trimId === 'carbon' ? 'carbon fiber' : trimId === 'wood_m' ? 'matte dark wood' : trimId === 'wood_c' ? 'walnut wood' : trimId === 'leather' ? 'leather-wrapped' : `custom color ${trimColor}`;
    const u = [...new Set(AZ.map(z => h(z.id)))].length;
    const carDesc = getCarDesc();
    const camPrompt = getCameraPrompt();

    return [
      `Photorealistic interior of ${carDesc}, custom leather upholstery.`,
      `${camPrompt}. ${u} distinct colors used, premium leather & alcantara materials.`,
      `SEATS — Driver: base ${h("sb_d")}, bolsters ${h("sv_d")}, headrest ${h("hr_d")}. Passenger: base ${h("sb_p")}, bolsters ${h("sv_p")}, headrest ${h("hr_p")}. Quilted diamond-stitched centers.`,
      `DOORS — Left: upper panel ${h("du_l")}, accent strip ${h("da_l")}, main insert ${h("di_l")}, kick panel ${h("dl_l")}, handle ${h("dh_l")}. Right: upper panel ${h("du_r")}, accent strip ${h("da_r")}, main insert ${h("di_r")}, kick panel ${h("dl_r")}, handle ${h("dh_r")}.`,
      `STEERING WHEEL — Top rim ${h("sw_t")}, side grips ${h("sw_s")}, bottom rim ${h("sw_b")}, spokes ${h("sw_sp")}, center airbag pad ${h("sw_c")}. OEM 3-spoke design.`,
      `CENTER CONSOLE — Shift knob ${h("sk")}, shift boot ${h("sbo")}, handbrake handle ${h("hh")}, handbrake boot ${h("hbo")}, armrest lid ${h("arm")}, tunnel cover ${h("con")}.`,
      `DASHBOARD — Upper dashboard ${h("dt")}, lower dashboard ${h("db")}. Trim inlays: ${trimEn}.`,
      `FLOOR — Driver mat ${h("mat_d")}, passenger mat ${h("mat_p")}. Driver footwell ${h("fw_d")}, passenger footwell ${h("fw_p")}.`,
      `ACCENTS — Contrast stitching thread ${h("st")}. Piping/welting ${h("pp")}.`,
      `Studio lighting, 8K resolution, hyper-detailed leather grain texture, all factory controls and gauges visible.`
    ].join("\n\n");
  };

  // ===== HEADER TITLE =====
  const headerTitle = carMake
    ? `${carMake}${carModel ? ' ' + carModel.split(' (')[0] : ''}`
    : 'КОНФИГУРАТОР';

  const carSubtitle = (() => {
    const mk = CAR_DATABASE.find(m => m.name === carMake);
    const md = mk?.models.find(m => `${m.name} (${m.body})` === carModel);
    if (!carMake) return null;
    const parts = [carMake];
    if (md) parts.push(`${md.name} ${md.body}`);
    if (carYear) parts.push(carYear);
    if (md) parts.push(md.type);
    return parts.join(' · ');
  })();

  // ===== RENDER =====
  return (
    <div className="app-root">
      {/* HEADER */}
      <header className="app-header">
        <div className="header-top">
          <div>
            <h1 className="title-main">{headerTitle}</h1>
            <p className="title-sub">ВИЗУАЛИЗАТОР ПЕРЕТЯЖКИ САЛОНА</p>
          </div>
          <div className="header-actions">
            <button onClick={doRandom} className="random-btn">🎲 Случайная</button>
            <button onClick={() => setIsHorizontal(h => !h)} className="toggle-btn">
              {isHorizontal ? '📱 Вертикально' : '📐 Горизонтально'}
            </button>
          </div>
        </div>
        {randomTag && <p style={{ fontSize: '0.78rem', color: 'var(--text-dark)' }}>Палитра: «<span style={{ color: 'var(--text-muted)' }}>{randomTag}</span>»</p>}
        <div className="presets-row">
          {PR.map((p, i) => (
            <button key={i} onClick={() => { setColors(p.colors); setTrimId(p.trim); setRandomTag(null); }} className="preset-btn">{p.name}</button>
          ))}
        </div>
      </header>

      {/* ===== MAIN ===== */}
      <div className={`main-wrap ${isHorizontal ? 'hz' : 'vt'}`}>

        {/* --- LEFT: always SVG + quick bar + subtitle --- */}
        <div className="col-left">
          <div className="svg-wrapper">
            <CarInteriorSVG colors={colors} activeZone={activeZone} onZoneClick={setActiveZone} trimId={trimId} trimColor={trimColor} />
          </div>
          {carSubtitle && (
            <div className="car-subtitle">{carSubtitle}</div>
          )}
          <QuickColorBar activeZone={activeZone} colors={colors} onColorChange={handleQuickColor} />
        </div>

        {/* --- RIGHT: all settings --- */}
        <div className="col-right">
          <CarSelector
            make={carMake} setMake={setCarMake}
            model={carModel} setModel={setCarModel}
            year={carYear} setYear={setCarYear}
            extColor={extColor} setExtColor={setExtColor}
          />
          <CameraAngleSelector selected={cameraAngle} onSelect={setCameraAngle} />
          <SkinSamples activeZone={activeZone} onSelectCallback={handleSelectSwatchGlobal} />
          <RightPanel colors={colors} setColors={setColors} activeZone={activeZone} setActiveZone={setActiveZone} trimId={trimId} setTrimId={setTrimId} trimColor={trimColor} setTrimColor={setTrimColor} />

          {/* Mini palette */}
          <div className="panel" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {AZ.map(z => (
                <div key={z.id} title={z.l} onClick={() => setActiveZone(z.id)} style={{
                  width: '22px', height: '22px', borderRadius: '5px',
                  backgroundColor: colors[z.id] || '#1A1A1A',
                  border: activeZone === z.id ? '2px solid white' : '1.5px solid #1a1a1c',
                  cursor: 'pointer', transition: 'all 0.15s'
                }} />
              ))}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dark)' }}>
              {AZ.length} зон · {[...new Set(AZ.map(z => (colors[z.id] || '#1A1A1A').toUpperCase()))].length} уникальных цветов
            </p>
          </div>

          {/* AI Prompt */}
          <AIPrompt promptText={getPromptText()} />
        </div>
      </div>
    </div>
  );
}

export default App;
