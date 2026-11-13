import { useCallback, useEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { PR, SW, genR, zonesFor, AZ } from './data';
import { CAMERA_ANGLES, CAR_DATABASE, ALCANTARA_ZONES, STITCH_PATTERNS, EXTERIOR_COLORS, hasRearAccess } from './carDatabase';
import { CabinMap } from './components/cabin/CabinMap';
import { AIPrompt } from './components/AIPrompt';
import { CarSelector } from './components/CarSelector';
import { CameraAngleSelector } from './components/CameraAngle';
import { ColorSheet } from './components/ColorSheet';
import { ZoneList } from './components/ZoneList';
import { TrimPicker, StitchPicker, AlcantaraPicker } from './components/Materials';
import { Island } from './components/ui/Island';
import type { IslandMsg } from './components/ui/Island';
import { Dice, Check, Copy, Car, Sparkles, Sun, Moon, Auto } from './components/ui/icons';

const LABELS: Record<string, string> = Object.fromEntries(AZ.map(z => [z.id, z.l]));
const COLOR_NAMES = new Map(SW.map(s => [s.h.toUpperCase(), s.n]));

function Section({ title, footer, action, children }: {
  title: string; footer?: ReactNode; action?: ReactNode; children: ReactNode;
}) {
  return (
    <section className="section">
      <div className="section-head">
        <h2>{title}</h2>
        {action}
      </div>
      {children}
      {footer && <p className="section-foot">{footer}</p>}
    </section>
  );
}

type Theme = 'auto' | 'light' | 'dark';
const THEMES: Theme[] = ['auto', 'light', 'dark'];
const THEME_NAMES: Record<Theme, string> = { auto: 'Как в системе', light: 'Светлая', dark: 'Тёмная' };

function readTheme(): Theme {
  try {
    const t = localStorage.getItem('theme');
    return t === 'light' || t === 'dark' ? t : 'auto';
  } catch {
    return 'auto';
  }
}

function App() {
  const [colors, setColors] = useState<Record<string, string>>(PR[0].colors);
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [trimId, setTrimId] = useState<string>('carbon');
  const [trimColor, setTrimColor] = useState<string>('#8B5A2B');
  const [randomTag, setRandomTag] = useState<string | null>(null);
  const [preset, setPreset] = useState<number | null>(0);

  const [carMake, setCarMake] = useState<string>('BMW');
  const [carModel, setCarModel] = useState<string>('Z4 (E85)');
  const [carYear, setCarYear] = useState<string>('2006');
  const [extColor, setExtColor] = useState<string>('');
  const [cameraAngle, setCameraAngle] = useState<string>('driver_door');
  const [alcantaraZones, setAlcantaraZones] = useState<string[]>([]);
  const [stitchPattern, setStitchPattern] = useState<string>('diamond');

  const [msg, setMsg] = useState<IslandMsg | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>(readTheme);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const apply = () => {
      const t = theme === 'auto' ? (mq.matches ? 'light' : 'dark') : theme;
      document.documentElement.dataset.theme = t;
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'light' ? '#f2f2f7' : '#000000');
    };
    apply();
    try { localStorage.setItem('theme', theme); } catch { /* private mode */ }
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [theme]);

  const notify = useCallback((m: Omit<IslandMsg, 'key'>) => setMsg({ ...m, key: Date.now() }), []);
  const clearMsg = useCallback(() => setMsg(null), []);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 56);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    if (activeZone !== 'trim') return;
    document.getElementById('sec-trim')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [activeZone]);

  const modelObj = CAR_DATABASE.find(m => m.name === carMake)?.models.find(m => `${m.name} (${m.body})` === carModel);
  const carType = modelObj?.type || null;
  const hasRear = hasRearAccess(carType);
  const zones = zonesFor(hasRear).flatMap(g => g.zones);

  const changeModel = (v: string) => {
    setCarModel(v);
    const md = CAR_DATABASE.find(m => m.name === carMake)?.models.find(m => `${m.name} (${m.body})` === v);
    if (!md) return;
    const rear = hasRearAccess(md.type);
    notify({
      icon: <Car size={18} />,
      title: `${carMake} ${md.name}`,
      sub: rear !== hasRear ? (rear ? 'Добавлены задний ряд и багажник' : 'Только передний ряд') : `${md.body} · ${md.type}`,
    });
  };

  const setZoneColor = (id: string, hex: string) => {
    setColors(prev => ({ ...prev, [id]: hex }));
    setPreset(null);
    notify({ color: hex, title: LABELS[id] || id, sub: COLOR_NAMES.get(hex.toUpperCase()) || hex.toUpperCase() });
  };

  const doRandom = () => {
    const r = genR();
    setColors(r.colors);
    setTrimId(r.trim);
    setRandomTag(r.tag);
    setPreset(null);
    notify({ icon: <Sparkles size={18} />, title: r.tag, sub: 'Случайная палитра' });
  };

  const applyPreset = (i: number) => {
    setColors(PR[i].colors);
    setTrimId(PR[i].trim);
    setRandomTag(null);
    setPreset(i);
    notify({ color: PR[i].colors.sb_d, title: PR[i].name, sub: 'Пресет применён' });
  };

  const getCarDesc = () => {
    if (!carMake) return 'car';
    const ext = EXTERIOR_COLORS.find(c => c.name === extColor);
    let desc = '';
    if (ext) desc += `${ext.name} `;
    if (carYear) desc += `${carYear} `;
    desc += carMake;
    if (modelObj) desc += ` ${modelObj.name} ${modelObj.body} ${modelObj.type}`;
    return desc.trim();
  };

  const getPromptText = () => {
    const h = (id: string) => (colors[id] || '#1A1A1A').toUpperCase();
    const trimEn = trimId === 'carbon' ? 'carbon fiber' : trimId === 'wood_m' ? 'matte dark wood' : trimId === 'wood_c' ? 'walnut wood' : trimId === 'leather' ? 'leather-wrapped' : `custom color ${trimColor}`;
    const u = [...new Set(zones.map(z => h(z.id)))].length;
    const cam = CAMERA_ANGLES.find(a => a.id === cameraAngle)?.prompt || CAMERA_ANGLES[0].prompt;
    const alc = alcantaraZones.map(id => ALCANTARA_ZONES.find(z => z.id === id)?.promptText).filter(Boolean);
    const st = STITCH_PATTERNS.find(p => p.id === stitchPattern);

    return [
      `Photorealistic interior of ${getCarDesc()}, custom leather upholstery.`,
      `${cam} ${u} distinct colors used, premium leather & alcantara materials.`,
      `SEATS — Driver: base ${h('sb_d')}, bolsters ${h('sv_d')}, headrest ${h('hr_d')}. Passenger: base ${h('sb_p')}, bolsters ${h('sv_p')}, headrest ${h('hr_p')}.`,
      `DOORS — Left: upper panel ${h('du_l')}, accent strip ${h('da_l')}, main insert ${h('di_l')}, kick panel ${h('dl_l')}, handle ${h('dh_l')}. Right: upper panel ${h('du_r')}, accent strip ${h('da_r')}, main insert ${h('di_r')}, kick panel ${h('dl_r')}, handle ${h('dh_r')}.`,
      `STEERING WHEEL — Top rim ${h('sw_t')}, side grips ${h('sw_s')}, bottom rim ${h('sw_b')}, spokes ${h('sw_sp')}, center airbag pad ${h('sw_c')}. Factory steering wheel shape for this model.`,
      `CENTER CONSOLE — Shift knob ${h('sk')}, shift boot ${h('sbo')}, handbrake handle ${h('hh')}, handbrake boot ${h('hbo')}, armrest lid ${h('arm')}, tunnel cover ${h('con')}.`,
      `DASHBOARD — Upper dashboard ${h('dt')}, lower dashboard ${h('db')}. Trim inlays: ${trimEn}.`,
      `FLOOR — Driver mat ${h('mat_d')}, passenger mat ${h('mat_p')}. Driver footwell ${h('fw_d')}, passenger footwell ${h('fw_p')}.`,
      hasRear ? `REAR ROW — Bench center panels ${h('rs_b')}, bench bolsters/sides ${h('rs_v')}, rear headrests ${h('rhr')}, rear floor mats ${h('rmat')}. Rear door cards match the front doors.` : null,
      hasRear ? `TRUNK / CARGO AREA — carpet and side trim ${h('tr')}.` : null,
      `ACCENTS — Contrast stitching thread ${h('st')}. Piping/welting ${h('pp')}.`,
      st ? `STITCHING / QUILTING PATTERN: ${st.promptText}. The pattern must be consistent across all seats (front and rear where present).` : null,
      alc.length ? `ALCANTARA SUEDE APPLIED to: ${alc.join('; ')}. Matte fuzzy suede texture (not leather) with subtle directional nap, visibly distinct from the smooth leather on adjacent panels.` : null,
      'Studio lighting, 8K resolution, hyper-detailed leather grain texture, all factory controls and gauges visible.',
    ].filter(Boolean).join('\n\n');
  };

  const cycleTheme = () => {
    const next = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
    setTheme(next);
    const icon = next === 'light' ? <Sun size={18} /> : next === 'dark' ? <Moon size={18} /> : <Auto size={18} />;
    notify({ icon, title: `Тема: ${THEME_NAMES[next].toLowerCase()}` });
  };

  const presetsRow = (
    <div className="presets" role="group" aria-label="Пресеты">
      {PR.map((p, i) => (
        <button key={p.name} className={`preset${preset === i ? ' on' : ''}`} onClick={() => applyPreset(i)}>
          <i style={{ background: `linear-gradient(135deg, ${p.colors.sb_d} 50%, ${p.colors.sv_d} 50%)` }} />
          {p.name}
        </button>
      ))}
      {randomTag && (
        <span className="preset ghost">
          <Sparkles size={14} />
          {randomTag}
        </span>
      )}
    </div>
  );

  const headerModel = carModel ? carModel.split(' (')[0] : '';
  const subtitle = [modelObj?.body, carYear, modelObj?.type].filter(Boolean).join(' · ');
  const uniq = [...new Set(zones.map(z => (colors[z.id] || '#1A1A1A').toUpperCase()))].length;

  return (
    <div className="app" style={{ '--glow': colors.sb_d || '#1A1A1A' } as CSSProperties}>
      <Island msg={msg} onDone={clearMsg} />

      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <span className="nav-title">{carMake} {headerModel}{subtitle && <small>{subtitle}</small>}</span>
        <div className="nav-actions">
          <button className="glass-btn icon" onClick={cycleTheme} aria-label={`Тема: ${THEME_NAMES[theme]}`} title={`Тема: ${THEME_NAMES[theme]}`}>
            {theme === 'light' ? <Sun size={19} /> : theme === 'dark' ? <Moon size={19} /> : <Auto size={19} />}
          </button>
          <button className="glass-btn" onClick={doRandom}>
            <Dice size={18} />
            <span>Случайно</span>
          </button>
        </div>
      </nav>

      <header className="hero">
        <p className="eyebrow">Конфигуратор салона</p>
        <h1>{carMake || 'Авто'} <span>{headerModel}</span></h1>
        {subtitle && <p className="hero-sub">{subtitle}</p>}
        {presetsRow}
      </header>

      <main className="layout">
        <section className="stage-col">
          <div className="stage">
            <CabinMap
              colors={colors} activeZone={activeZone} onZoneClick={setActiveZone}
              trimId={trimId} trimColor={trimColor} hasRear={hasRear}
              stitchPattern={stitchPattern} alcantaraZones={alcantaraZones}
            />
          </div>
          <ColorSheet
            zoneId={activeZone}
            label={activeZone ? LABELS[activeZone] || '' : ''}
            colors={colors}
            onChange={setZoneColor}
            onClose={() => setActiveZone(null)}
          />
        </section>

        <section className="settings">
          <div className="desk-only">
            <Section title="Пресеты">{presetsRow}</Section>
          </div>
          <Section title="Автомобиль">
            <CarSelector
              make={carMake} setMake={setCarMake}
              model={carModel} setModel={changeModel}
              year={carYear} setYear={setCarYear}
              extColor={extColor} setExtColor={setExtColor}
            />
          </Section>

          <Section
            title="Ракурс"
            footer={hasRear ? 'Ракурс уходит в промпт для генерации.' : 'Ракурсы задних сидений и багажника появятся у 4-дверных машин.'}
          >
            <div className="group pad-y">
              <CameraAngleSelector selected={cameraAngle} onSelect={setCameraAngle} carType={carType} />
            </div>
          </Section>

          <div id="sec-trim">
            <Section title="Декор торпедо">
              <div className="group pad">
                <TrimPicker trimId={trimId} setTrimId={setTrimId} trimColor={trimColor} setTrimColor={setTrimColor} dashColor={colors.dt || '#1A1A1A'} />
              </div>
            </Section>
          </div>

          <Section title="Строчка">
            <div className="group pad-y">
              <StitchPicker selected={stitchPattern} onSelect={setStitchPattern} seat={colors.sb_d || '#1A1A1A'} thread={colors.st || '#888'} />
            </div>
          </Section>

          <Section
            title="Алькантара"
            action={alcantaraZones.length > 0 && <button className="link-btn" onClick={() => setAlcantaraZones([])}>Сбросить</button>}
          >
            <div className="group pad">
              <AlcantaraPicker
                selected={alcantaraZones}
                onToggle={id => setAlcantaraZones(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])}
              />
            </div>
          </Section>

          <Section title="Цвета деталей" footer={`${zones.length} деталей · ${uniq} цветов`}>
            <ZoneList colors={colors} activeZone={activeZone} setActiveZone={setActiveZone} hasRear={hasRear} />
          </Section>

          <Section title="Промпт" footer="Вставьте в Nano Banana или другую нейросеть.">
            <AIPrompt
              promptText={getPromptText()}
              onCopied={ok => notify(ok
                ? { icon: <Check size={18} strokeWidth={2.6} />, title: 'Промпт скопирован', sub: 'Можно вставлять в Nano Banana' }
                : { icon: <Copy size={18} />, title: 'Не получилось скопировать', sub: 'Выделите текст вручную' })}
            />
          </Section>
        </section>
      </main>
    </div>
  );
}

export default App;
