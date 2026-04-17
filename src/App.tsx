import { useState, useEffect } from 'react';
import { PR, AZ, genR, TRIMS } from './data';
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

  // Car selector state
  const [carMake, setCarMake] = useState<string>('BMW');
  const [carModel, setCarModel] = useState<string>('Z4 (E85)');
  const [carYear, setCarYear] = useState<string>('2006');
  const [extColor, setExtColor] = useState<string>('');

  // Camera angle
  const [cameraAngle, setCameraAngle] = useState<string>('driver_door');

  // Layout toggle
  const [layoutMode, setLayoutMode] = useState<'vertical' | 'horizontal'>(() => {
    return (localStorage.getItem('layout_mode') as 'vertical' | 'horizontal') || 'vertical';
  });

  useEffect(() => {
    localStorage.setItem('layout_mode', layoutMode);
  }, [layoutMode]);

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

  // Build car description for prompt
  const getCarDesc = () => {
    const selectedMake = CAR_DATABASE.find(m => m.name === carMake);
    const selectedModelObj = selectedMake?.models.find(m => `${m.name} (${m.body})` === carModel);

    if (!carMake) return 'car';

    let desc = '';
    if (extColor) desc += `${extColor} `;
    if (carYear) desc += `${carYear} `;
    desc += carMake;
    if (selectedModelObj) {
      desc += ` ${selectedModelObj.name} ${selectedModelObj.body} ${selectedModelObj.type}`;
    }
    return desc.trim();
  };

  // Build camera angle prompt
  const getCameraPrompt = () => {
    const angle = CAMERA_ANGLES.find(a => a.id === cameraAngle);
    return angle?.prompt || CAMERA_ANGLES[0].prompt;
  };

  const getPromptText = () => {
    const h = (id: string) => (colors[id] || "#1A1A1A").toUpperCase();
    const trimN = (TRIMS.find(t => t.id === trimId) || TRIMS[0]).n;
    const u = [...new Set(AZ.map(z => h(z.id)))].length;
    const carDesc = getCarDesc();
    const cameraPrompt = getCameraPrompt();

    return [
      `Photorealistic interior of ${carDesc}, custom leather upholstery.`,
      `${cameraPrompt}. ${u} colors, premium leather & alcantara.`,
      `SEATS — Driver base: ${h("sb_d")}, bolsters: ${h("sv_d")}, headrest: ${h("hr_d")}. Passenger base: ${h("sb_p")}, bolsters: ${h("sv_p")}, headrest: ${h("hr_p")}. Quilted centers.`,
      `DOORS — L upper: ${h("du_l")}, accent: ${h("da_l")}, main: ${h("di_l")}, kick: ${h("dl_l")}, handle: ${h("dh_l")}. R upper: ${h("du_r")}, accent: ${h("da_r")}, main: ${h("di_r")}, kick: ${h("dl_r")}, handle: ${h("dh_r")}.`,
      `STEERING — Top: ${h("sw_t")}, sides: ${h("sw_s")}, bottom: ${h("sw_b")}, spokes: ${h("sw_sp")}, center/airbag: ${h("sw_c")}. OEM 3-spoke.`,
      `CONTROLS — Shift knob: ${h("sk")}, boot: ${h("sbo")}. Handbrake: ${h("hh")}, boot: ${h("hbo")}. Armrest: ${h("arm")}. Tunnel: ${h("con")}.`,
      `DASHBOARD — Upper: ${h("dt")}, lower: ${h("db")}. Trim: ${trimN}. OEM.`,
      `FLOOR — Mats: ${h("mat_d")}, ${h("mat_p")}. Footwells: ${h("fw_d")}, ${h("fw_p")}.`,
      `ACCENTS — Stitching: ${h("st")}. Piping: ${h("pp")}.`,
      `Studio lighting, 8K, detailed leather texture. All OEM controls visible.`
    ].join("\n\n");
  };

  // Dynamic header title
  const headerTitle = carMake
    ? `${carMake}${carModel ? ' ' + carModel.split(' (')[0] : ''}`
    : 'КОНФИГУРАТОР';

  const isHorizontal = layoutMode === 'horizontal';

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="app-header">
        <div className="header-top">
          <div>
            <h1 className="title-main">{headerTitle}</h1>
            <p className="title-sub">ВИЗУАЛИЗАТОР ПЕРЕТЯЖКИ САЛОНА</p>
          </div>
          <div className="header-actions">
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button onClick={doRandom} className="random-btn">
                🎲 Случайная комбинация
              </button>
              <button
                onClick={() => setLayoutMode(m => m === 'vertical' ? 'horizontal' : 'vertical')}
                className="layout-toggle-btn"
                title={isHorizontal ? 'Вертикальный вид' : 'Горизонтальный вид'}
              >
                {isHorizontal ? '📱' : '📐'} {isHorizontal ? 'Верт.' : 'Гориз.'}
              </button>
            </div>
            {randomTag && <p style={{ fontSize: '0.8rem', color: 'var(--text-dark)' }}>Палитра: <span style={{ color: 'var(--text-muted)' }}>«{randomTag}»</span></p>}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
          {PR.map((p, i) => (
            <button key={i} onClick={() => { setColors(p.colors); setTrimId(p.trim); setRandomTag(null); }} style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--card)',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              transition: 'all 0.15s'
            }}>
              {p.name}
            </button>
          ))}
        </div>
      </header>

      {/* CAR SELECTOR + CAMERA ANGLE */}
      <section style={{ padding: '16px var(--pad-x) 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <CarSelector
          make={carMake} setMake={setCarMake}
          model={carModel} setModel={setCarModel}
          year={carYear} setYear={setCarYear}
          extColor={extColor} setExtColor={setExtColor}
        />
        <CameraAngleSelector selected={cameraAngle} onSelect={setCameraAngle} />
      </section>

      {/* SKIN SAMPLES */}
      <section className="skin-section">
        <SkinSamples activeZone={activeZone} onSelectCallback={handleSelectSwatchGlobal} />
      </section>

      {/* MAIN CONTENT */}
      <main className={`main-content ${isHorizontal ? 'layout-horizontal' : 'layout-vertical'}`}>
        <div className="left-column">
          {/* SVG Visualizer */}
          <div className="svg-wrapper sticky-svg">
            <CarInteriorSVG colors={colors} activeZone={activeZone} onZoneClick={setActiveZone} trimId={trimId} trimColor={trimColor} />
          </div>
          {/* Quick Color Bar — right under SVG */}
          <QuickColorBar activeZone={activeZone} colors={colors} onColorChange={handleQuickColor} />
        </div>

        <div className="right-column" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Accordions */}
          <RightPanel colors={colors} setColors={setColors} activeZone={activeZone} setActiveZone={setActiveZone} trimId={trimId} setTrimId={setTrimId} trimColor={trimColor} setTrimColor={setTrimColor} />

          {/* Palette Grid */}
          <div className="panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {AZ.map(z => (
                <div
                  key={z.id}
                  title={z.l}
                  onClick={() => setActiveZone(z.id)}
                  style={{
                    width: '24px', height: '24px', borderRadius: '5px',
                    backgroundColor: colors[z.id] || '#1A1A1A',
                    border: activeZone === z.id ? '2px solid white' : '1.5px solid #1a1a1c',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                />
              ))}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dark)', marginTop: '8px' }}>
              {AZ.length} зон · {[...new Set(AZ.map(z => (colors[z.id] || '#1A1A1A').toUpperCase()))].length} уникальных цветов
            </p>
          </div>
        </div>
      </main>

      {/* AI Prompt */}
      <section className="prompt-section">
        <AIPrompt promptText={getPromptText()} />
      </section>
    </div>
  );
}

export default App;
