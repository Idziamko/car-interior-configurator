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
  const [isLandscape, setIsLandscape] = useState(false);

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

  // Toggle landscape mode
  const toggleLandscape = () => {
    const next = !isLandscape;
    setIsLandscape(next);

    // Try to lock screen orientation on mobile
    try {
      const sl = screen.orientation as any;
      if (next) {
        sl?.lock?.('landscape').catch(() => {});
      } else {
        sl?.unlock?.();
      }
    } catch (_) { /* not supported */ }
  };

  // Listen for orientation changes to sync state
  useEffect(() => {
    const handler = () => {
      if (screen.orientation?.type?.includes('portrait')) {
        setIsLandscape(false);
      }
    };
    screen.orientation?.addEventListener?.('change', handler);
    return () => screen.orientation?.removeEventListener?.('change', handler);
  }, []);

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

  // Car subtitle
  const carSubtitle = (() => {
    const selectedMake = CAR_DATABASE.find(m => m.name === carMake);
    const selectedModelObj = selectedMake?.models.find(m => `${m.name} (${m.body})` === carModel);
    if (!carMake) return null;
    let parts = [carMake];
    if (selectedModelObj) parts.push(`${selectedModelObj.name} ${selectedModelObj.body}`);
    if (carYear) parts.push(carYear);
    if (selectedModelObj) parts.push(selectedModelObj.type);
    return parts.join(' · ');
  })();

  return (
    <div className={`app-container ${isLandscape ? 'landscape-mode' : ''}`}>
      {/* HEADER — compact */}
      <header className="app-header">
        <div className="header-top">
          <div>
            <h1 className="title-main">{headerTitle}</h1>
            <p className="title-sub">ВИЗУАЛИЗАТОР ПЕРЕТЯЖКИ САЛОНА</p>
          </div>
          <div className="header-actions">
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button onClick={doRandom} className="random-btn">
                🎲 Случайная
              </button>
              <button onClick={toggleLandscape} className="layout-toggle-btn">
                {isLandscape ? '📱 Верт.' : '📐 Гориз.'}
              </button>
            </div>
            {randomTag && <p style={{ fontSize: '0.78rem', color: 'var(--text-dark)' }}>«<span style={{ color: 'var(--text-muted)' }}>{randomTag}</span>»</p>}
          </div>
        </div>

        {/* Preset buttons */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {PR.map((p, i) => (
            <button key={i} onClick={() => { setColors(p.colors); setTrimId(p.trim); setRandomTag(null); }} className="preset-btn">
              {p.name}
            </button>
          ))}
        </div>
      </header>

      {/* ====== MAIN LAYOUT ====== */}
      <main className="main-content">
        {/* LEFT: SVG + quick bar (always first, sticky) */}
        <div className="left-column">
          <div className="svg-wrapper">
            <CarInteriorSVG colors={colors} activeZone={activeZone} onZoneClick={setActiveZone} trimId={trimId} trimColor={trimColor} />
          </div>
          {/* Car model label under SVG */}
          {carSubtitle && (
            <div style={{
              textAlign: 'center', padding: '6px 12px',
              fontSize: '0.72rem', letterSpacing: '1.5px',
              color: 'var(--text-dark)', fontWeight: 600,
            }}>
              {carSubtitle}
            </div>
          )}
          {/* Quick Color Bar */}
          <QuickColorBar activeZone={activeZone} colors={colors} onColorChange={handleQuickColor} />
        </div>

        {/* RIGHT: all settings */}
        <div className="right-column">
          {/* Car Selector */}
          <CarSelector
            make={carMake} setMake={setCarMake}
            model={carModel} setModel={setCarModel}
            year={carYear} setYear={setCarYear}
            extColor={extColor} setExtColor={setExtColor}
          />

          {/* Camera Angle */}
          <CameraAngleSelector selected={cameraAngle} onSelect={setCameraAngle} />

          {/* Skin Samples */}
          <SkinSamples activeZone={activeZone} onSelectCallback={handleSelectSwatchGlobal} />

          {/* Detail Accordions */}
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

          {/* AI Prompt */}
          <AIPrompt promptText={getPromptText()} />
        </div>
      </main>
    </div>
  );
}

export default App;
