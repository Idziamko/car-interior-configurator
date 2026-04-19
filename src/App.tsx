import { useState, useEffect } from 'react';
import { PR, AZ, genR } from './data';
import { CAMERA_ANGLES, CAR_DATABASE, ALCANTARA_ZONES, STITCH_PATTERNS } from './carDatabase';
import { RightPanel } from './components/RightPanel';
import { CarInteriorSVG } from './components/CarInteriorSVG';
import { AIPrompt } from './components/AIPrompt';
import { CarSelector } from './components/CarSelector';
import { CameraAngleSelector } from './components/CameraAngle';
import { QuickColorBar } from './components/QuickColorBar';
import { AlcantaraSelector } from './components/AlcantaraSelector';
import { StitchSelector } from './components/StitchSelector';

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

  // Alcantara (multi-select) + stitch pattern (single-select)
  const [alcantaraZones, setAlcantaraZones] = useState<string[]>([]);
  const [stitchPattern, setStitchPattern] = useState<string>('diamond');

  // Layout: false = vertical (mobile default), true = horizontal (50/50)
  const [isHorizontal, setIsHorizontal] = useState(false);

  // Desktop is always horizontal; mobile persists user choice
  useEffect(() => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    if (isDesktop) { setIsHorizontal(true); return; }
    const saved = localStorage.getItem('layout_h');
    if (saved === '1') setIsHorizontal(true);
  }, []);
  useEffect(() => {
    localStorage.setItem('layout_h', isHorizontal ? '1' : '0');
    document.body.classList.toggle('layout-hz', isHorizontal);
    return () => { document.body.classList.remove('layout-hz'); };
  }, [isHorizontal]);

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

  const getCameraPrompt = () => {
    return CAMERA_ANGLES.find(a => a.id === cameraAngle)?.prompt || CAMERA_ANGLES[0].prompt;
  };

  const getAlcantaraPrompt = () => {
    if (alcantaraZones.length === 0) return null;
    const parts = alcantaraZones
      .map(id => ALCANTARA_ZONES.find(z => z.id === id)?.promptText)
      .filter(Boolean);
    return `ALCANTARA SUEDE APPLIED to: ${parts.join('; ')}. Matte fuzzy suede texture (not leather) with subtle directional nap, visibly distinct from the smooth leather on adjacent panels.`;
  };

  const getStitchPrompt = () => {
    const s = STITCH_PATTERNS.find(p => p.id === stitchPattern);
    if (!s) return null;
    return `STITCHING / QUILTING PATTERN: ${s.promptText}. The pattern must be consistent across all seats (front and rear where present).`;
  };

  const getPromptText = () => {
    const h = (id: string) => (colors[id] || "#1A1A1A").toUpperCase();

    const trimEn = trimId === 'carbon' ? 'carbon fiber' : trimId === 'wood_m' ? 'matte dark wood' : trimId === 'wood_c' ? 'walnut wood' : trimId === 'leather' ? 'leather-wrapped' : `custom color ${trimColor}`;
    const u = [...new Set(AZ.map(z => h(z.id)))].length;
    const carDesc = getCarDesc();
    const camPrompt = getCameraPrompt();
    const alcLine = getAlcantaraPrompt();
    const stitchLine = getStitchPrompt();

    const lines = [
      `Photorealistic interior of ${carDesc}, custom leather upholstery.`,
      `${camPrompt} ${u} distinct colors used, premium leather & alcantara materials.`,
      `SEATS — Driver: base ${h("sb_d")}, bolsters ${h("sv_d")}, headrest ${h("hr_d")}. Passenger: base ${h("sb_p")}, bolsters ${h("sv_p")}, headrest ${h("hr_p")}.`,
      `DOORS — Left: upper panel ${h("du_l")}, accent strip ${h("da_l")}, main insert ${h("di_l")}, kick panel ${h("dl_l")}, handle ${h("dh_l")}. Right: upper panel ${h("du_r")}, accent strip ${h("da_r")}, main insert ${h("di_r")}, kick panel ${h("dl_r")}, handle ${h("dh_r")}.`,
      `STEERING WHEEL — Top rim ${h("sw_t")}, side grips ${h("sw_s")}, bottom rim ${h("sw_b")}, spokes ${h("sw_sp")}, center airbag pad ${h("sw_c")}. OEM 3-spoke design.`,
      `CENTER CONSOLE — Shift knob ${h("sk")}, shift boot ${h("sbo")}, handbrake handle ${h("hh")}, handbrake boot ${h("hbo")}, armrest lid ${h("arm")}, tunnel cover ${h("con")}.`,
      `DASHBOARD — Upper dashboard ${h("dt")}, lower dashboard ${h("db")}. Trim inlays: ${trimEn}.`,
      `FLOOR — Driver mat ${h("mat_d")}, passenger mat ${h("mat_p")}. Driver footwell ${h("fw_d")}, passenger footwell ${h("fw_p")}.`,
      `ACCENTS — Contrast stitching thread ${h("st")}. Piping/welting ${h("pp")}.`,
      stitchLine,
      alcLine,
      `Studio lighting, 8K resolution, hyper-detailed leather grain texture, all factory controls and gauges visible.`
    ].filter(Boolean);

    return lines.join("\n\n");
  };

  // ===== HEADER TITLE — split into brand + model for serif styling =====
  const headerBrand = carMake || 'Car';
  const headerModel = carModel ? carModel.split(' (')[0] : '';

  const carSubtitle = (() => {
    const mk = CAR_DATABASE.find(m => m.name === carMake);
    const md = mk?.models.find(m => `${m.name} (${m.body})` === carModel);
    if (!carMake) return 'Upholstery Visualizer';
    const parts = ['Upholstery Visualizer'];
    if (md) parts.push(`${md.body}`);
    if (carYear) parts.push(carYear);
    if (md) parts.push(md.type);
    return parts.join(' · ');
  })();

  return (
    <div className="app-root">
      {/* HEADER */}
      <header className="app-header">
        <div className="header-top">
          <div>
            <h1 className="title-main">
              {headerBrand} {headerModel && <em>{headerModel}</em>}
            </h1>
            <p className="title-sub">{carSubtitle}</p>
          </div>
          <div className="header-actions">
            <button onClick={doRandom} className="btn btn-primary">✦ Рандом</button>
            <div className="seg">
              <button className={!isHorizontal ? 'on' : ''} onClick={() => setIsHorizontal(false)}>Vertical</button>
              <button className={isHorizontal ? 'on' : ''} onClick={() => setIsHorizontal(true)}>Horizontal</button>
            </div>
          </div>
        </div>
        {randomTag && (
          <p style={{ fontSize: '12.5px', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
            Палитра · <span style={{ color: 'var(--accent-2)' }}>{randomTag}</span>
          </p>
        )}
        <div className="presets-row">
          {PR.map((p, i) => (
            <button
              key={i}
              onClick={() => { setColors(p.colors); setTrimId(p.trim); setRandomTag(null); }}
              className="chip"
            >
              {p.name}
            </button>
          ))}
        </div>
      </header>

      {/* ===== MAIN ===== */}
      {(() => {
        const svgBlock = (
          <>
            <div className="svg-wrapper">
              <CarInteriorSVG colors={colors} activeZone={activeZone} onZoneClick={setActiveZone} trimId={trimId} trimColor={trimColor} />
            </div>
            {carSubtitle && <div className="car-subtitle">{carSubtitle}</div>}
            {!isHorizontal && (
              <QuickColorBar activeZone={activeZone} colors={colors} onColorChange={handleQuickColor} />
            )}
          </>
        );

        const miniPalette = (
          <div className="panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {AZ.map(z => (
                <div key={z.id} title={z.l} onClick={() => setActiveZone(z.id)} style={{
                  width: '24px', height: '24px', borderRadius: '7px',
                  backgroundColor: colors[z.id] || '#1A1A1A',
                  border: activeZone === z.id ? '2px solid var(--accent)' : '1px solid var(--line-strong)',
                  boxShadow: activeZone === z.id ? '0 0 0 1px var(--accent-soft)' : 'inset 0 1px 0 rgba(255,255,255,0.1)',
                  cursor: 'pointer', transition: 'all 0.15s var(--ease)'
                }} />
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-3)', letterSpacing: '0.08em' }}>
              {AZ.length} зон · {[...new Set(AZ.map(z => (colors[z.id] || '#1A1A1A').toUpperCase()))].length} уникальных
            </p>
          </div>
        );

        const settingsBlock = (
          <>
            {isHorizontal && (
              <QuickColorBar activeZone={activeZone} colors={colors} onColorChange={handleQuickColor} />
            )}
            <CarSelector
              make={carMake} setMake={setCarMake}
              model={carModel} setModel={setCarModel}
              year={carYear} setYear={setCarYear}
              extColor={extColor} setExtColor={setExtColor}
            />
            <CameraAngleSelector selected={cameraAngle} onSelect={setCameraAngle} carType={(() => {
              const mk = CAR_DATABASE.find(m => m.name === carMake);
              const md = mk?.models.find(m => `${m.name} (${m.body})` === carModel);
              return md?.type || null;
            })()} />
            <AlcantaraSelector
              selected={alcantaraZones}
              onToggle={(id) => setAlcantaraZones(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])}
              onClear={() => setAlcantaraZones([])}
            />
            <StitchSelector selected={stitchPattern} onSelect={setStitchPattern} />
            <RightPanel colors={colors} setColors={setColors} activeZone={activeZone} setActiveZone={setActiveZone} trimId={trimId} setTrimId={setTrimId} trimColor={trimColor} setTrimColor={setTrimColor} />
            {miniPalette}
            <AIPrompt promptText={getPromptText()} />
          </>
        );

        if (isHorizontal) {
          return (
            <div className="main-wrap hz">
              <div className="col-left">{svgBlock}</div>
              <div className="col-right">{settingsBlock}</div>
            </div>
          );
        }
        return (
          <div className="main-wrap vt">
            {svgBlock}
            {settingsBlock}
          </div>
        );
      })()}
    </div>
  );
}

export default App;
