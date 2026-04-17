import { useState } from 'react';
import { PR, AZ, genR, TRIMS } from './data';
import { SkinSamples } from './components/SkinSamples';
import { RightPanel } from './components/RightPanel';
import { CarInteriorSVG } from './components/CarInteriorSVG';
import { AIPrompt } from './components/AIPrompt';

function App() {
  const [colors, setColors] = useState<Record<string, string>>(PR[0].colors);
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [trimId, setTrimId] = useState<string>('carbon');
  const [trimColor, setTrimColor] = useState<string>('#8B5A2B');
  const [randomTag, setRandomTag] = useState<string | null>(null);

  const handleSelectSwatchGlobal = (hex: string) => {
    if (activeZone) {
      setColors(prev => ({ ...prev, [activeZone]: hex }));
    }
  };

  const doRandom = () => {
    const r = genR();
    setColors(r.colors);
    setTrimId(r.trim);
    setRandomTag(r.tag);
  };

  const getPromptText = () => {
    const h = (id: string) => (colors[id] || "#1A1A1A").toUpperCase();
    const trimN = (TRIMS.find(t => t.id === trimId) || TRIMS[0]).n;
    const u = [...new Set(AZ.map(z => h(z.id)))].length;
    return [
      `Photorealistic interior of BMW Z4 E85 roadster, custom leather upholstery.`,
      `Camera: from open driver's door, 3/4 overhead, full cabin visible. ${u} colors, premium leather & alcantara.`,
      `SEATS — Driver base: ${h("sb_d")}, bolsters: ${h("sv_d")}, headrest: ${h("hr_d")}. Passenger base: ${h("sb_p")}, bolsters: ${h("sv_p")}, headrest: ${h("hr_p")}. Quilted centers.`,
      `DOORS — L upper: ${h("du_l")}, accent: ${h("da_l")}, main: ${h("di_l")}, kick: ${h("dl_l")}, handle: ${h("dh_l")}. R upper: ${h("du_r")}, accent: ${h("da_r")}, main: ${h("di_r")}, kick: ${h("dl_r")}, handle: ${h("dh_r")}.`,
      `STEERING — Top: ${h("sw_t")}, sides: ${h("sw_s")}, bottom: ${h("sw_b")}. OEM 3-spoke.`,
      `CONTROLS — Shift knob: ${h("sk")}, boot: ${h("sbo")}. Handbrake: ${h("hh")}, boot: ${h("hbo")}. Armrest: ${h("arm")}. Tunnel: ${h("con")}.`,
      `DASHBOARD — Upper: ${h("dt")}, lower: ${h("db")}. Trim: ${trimN}. OEM Z4 E85.`,
      `FLOOR — Mats: ${h("mat_d")}, ${h("mat_p")}. Footwells: ${h("fw_d")}, ${h("fw_p")}.`,
      `ACCENTS — Stitching: ${h("st")}. Piping: ${h("pp")}.`,
      `Studio lighting, 8K, detailed leather texture. All OEM controls visible.`
    ].join("\n\n");
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="app-header">
        <div className="header-top">
          <div>
            <h1 className="title-main">BMW Z4 E85</h1>
            <p className="title-sub">ВИЗУАЛИЗАТОР ПЕРЕТЯЖКИ САЛОНА</p>
          </div>
          <div className="header-actions">
            <button onClick={doRandom} className="random-btn">
              🎲 Случайная комбинация
            </button>
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

      {/* SKIN SAMPLES */}
      <section className="skin-section">
        <SkinSamples activeZone={activeZone} onSelectCallback={handleSelectSwatchGlobal} />
      </section>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <div className="left-column" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* SVG Visualizer */}
          <div className="svg-wrapper">
            <CarInteriorSVG colors={colors} activeZone={activeZone} onZoneClick={setActiveZone} trimId={trimId} trimColor={trimColor} />
          </div>
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

      {/* AI Prompt — always at bottom on mobile and desktop */}
      <section className="prompt-section">
        <AIPrompt promptText={getPromptText()} />
      </section>
    </div>
  );
}

export default App;
