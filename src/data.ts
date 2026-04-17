export const SW = [
  { n: "Orange Smooth", h: "#F28C38" },
  { n: "Cognac", h: "#B5651D" },
  { n: "Dark Khaki", h: "#4A5548" },
  { n: "Light Blue", h: "#3AA0B5" },
  { n: "Violet", h: "#8B6AAD" },
  { n: "Orange Grain", h: "#E8602C" },
  { n: "Dark Purple", h: "#5C2D5E" },
  { n: "Black", h: "#1A1A1A" },
  { n: "Dark Grey", h: "#333333" },
  { n: "Ivory", h: "#F0E6D3" },
  { n: "Rosso", h: "#B22222" },
  { n: "Midnight", h: "#1A3A5C" }
];

export const TRIMS = [
  { id: "wood_m", n: "Матовое дерево" },
  { id: "wood_c", n: "Цвет дерева" },
  { id: "carbon", n: "Карбон" },
  { id: "leather", n: "Кожа в цвет салона" },
  { id: "custom", n: "Выбрать свою..." } // Custom button hook
];

export const ZG = [
  {
    g: "СИДЕНЬЯ",
    zones: [
      { id: "sb_d", l: "Сиденье водителя — центр" },
      { id: "sv_d", l: "Сиденье водителя — валики" },
      { id: "sb_p", l: "Сиденье пассажира — центр" },
      { id: "sv_p", l: "Сиденье пассажира — валики" },
      { id: "hr_d", l: "Подголовник водителя" },
      { id: "hr_p", l: "Подголовник пассажира" }
    ]
  },
  {
    g: "ДВЕРИ",
    zones: [
      { id: "du_l", l: "Дверь лев. — верх" },
      { id: "da_l", l: "Дверь лев. — акцент" },
      { id: "di_l", l: "Дверь лев. — основная" },
      { id: "dl_l", l: "Дверь лев. — низ" },
      { id: "dh_l", l: "Ручка левой двери" },
      { id: "du_r", l: "Дверь прав. — верх" },
      { id: "da_r", l: "Дверь прав. — акцент" },
      { id: "di_r", l: "Дверь прав. — основная" },
      { id: "dl_r", l: "Дверь прав. — низ" },
      { id: "dh_r", l: "Ручка правой двери" }
    ]
  },
  {
    g: "РУЛЬ",
    zones: [
      { id: "sw_t", l: "Руль — верх (обод)" },
      { id: "sw_s", l: "Руль — бока (обод)" },
      { id: "sw_b", l: "Руль — низ (обод)" },
      { id: "sw_sp", l: "Руль — спицы" },
      { id: "sw_c", l: "Руль — центр (airbag)" }
    ]
  },
  {
    g: "КОНСОЛЬ",
    zones: [
      { id: "sk", l: "Набалдашник КПП" },
      { id: "sbo", l: "Чехол КПП" },
      { id: "hh", l: "Ручка ручника" },
      { id: "hbo", l: "Чехол ручника" },
      { id: "arm", l: "Подлокотник" },
      { id: "con", l: "Тоннель" }
    ]
  },
  {
    g: "ТОРПЕДО",
    zones: [
      { id: "dt", l: "Торпедо — верх" },
      { id: "db", l: "Торпедо — низ" }
    ]
  },
  {
    g: "ПОЛ",
    zones: [
      { id: "mat_d", l: "Коврик водителя" },
      { id: "mat_p", l: "Коврик пассажира" },
      { id: "fw_d", l: "Колодец — водитель" },
      { id: "fw_p", l: "Колодец — пассажир" }
    ]
  },
  {
    g: "АКЦЕНТЫ",
    zones: [
      { id: "st", l: "Строчка (нить)" },
      { id: "pp", l: "Кант / окантовка" }
    ]
  }
];

export const AZ = ZG.flatMap(g => g.zones);
export const DEF: Record<string, string> = {};
AZ.forEach(z => (DEF[z.id] = "#1A1A1A"));
DEF.st = "#1A1A1A";
DEF.pp = "#1A1A1A";
DEF.mat_d = "#111111";
DEF.mat_p = "#111111";
// Default steering to black so it doesn't look weird if left uncolored
DEF.sw_t = "#1A1A1A";
DEF.sw_b = "#1A1A1A";
DEF.sw_s = "#1A1A1A";
DEF.sw_sp = "#8A8A8E"; // metal spokes by default
DEF.sw_c = "#1A1A1A"; // airbag pad

const P = (o: Record<string, string>) => ({ ...DEF, ...o });

export const PR = [
  { name: "Сток чёрный", colors: { ...DEF }, trim: "carbon" },
  {
    name: "Cognac Classic", colors: P({
      sb_d: "#B5651D", sb_p: "#B5651D", hr_d: "#B5651D", hr_p: "#B5651D",
      da_l: "#B5651D", da_r: "#B5651D", di_l: "#B5651D", di_r: "#B5651D",
      arm: "#B5651D", sw_s: "#B5651D", st: "#D4A574", pp: "#1A1A1A",
      hbo: "#B5651D", sbo: "#B5651D"
    }), trim: "wood_m"
  },
  {
    name: "Ferrari Rosso", colors: P({
      sb_d: "#B22222", sb_p: "#B22222", hr_d: "#B22222", hr_p: "#B22222",
      da_l: "#B22222", di_l: "#B22222", da_r: "#B22222", di_r: "#B22222",
      sk: "#B22222", hbo: "#B22222", arm: "#B22222", st: "#FFFFFF", pp: "#B22222",
      db: "#B22222", sw_s: "#B22222", sbo: "#B22222", dl_l: "#B22222", dl_r: "#B22222"
    }), trim: "carbon"
  },
  {
    name: "Ivory Swan", colors: P({
      sb_d: "#F0E6D3", sv_d: "#2A2A2A", sb_p: "#F0E6D3", sv_p: "#2A2A2A",
      hr_d: "#E8DCC8", hr_p: "#E8DCC8", da_l: "#F0E6D3", di_l: "#F0E6D3",
      da_r: "#F0E6D3", di_r: "#F0E6D3", arm: "#F0E6D3", st: "#8B7355", pp: "#1A1A1A",
      db: "#F0E6D3", hbo: "#F0E6D3", sbo: "#F0E6D3"
    }), trim: "wood_c"
  }
];

// High quality design palettes mapping Primary(P), Secondary(S), Base(B), Details/Stitch(D), Piping(Pi)
const PALS = [
  { P: "#8B4513", S: "#1A1A1A", B: "#1A1A1A", D: "#DEB887", Pi: "#1A1A1A", T: "Коричневая Классика" },
  { P: "#1B4965", S: "#0D1B2A", B: "#0D1B2A", D: "#5BC0BE", Pi: "#5BC0BE", T: "Темный Океан" },
  { P: "#8B0000", S: "#1A1A1A", B: "#1A1A1A", D: "#FFFFFF", Pi: "#8B0000", T: "Красная Строчка" },
  { P: "#4A5548", S: "#1A1A1A", B: "#1A1A1A", D: "#8B9A6B", Pi: "#1A1A1A", T: "Темный Хаки" },
  { P: "#C06030", S: "#2A2A2A", B: "#1A1A1A", D: "#E8A070", Pi: "#1A1A1A", T: "Терракота" },
  { P: "#E8602C", S: "#1A1A1A", B: "#1A1A1A", D: "#FFA07A", Pi: "#E8602C", T: "Оранжевый Спорт" },
  { P: "#F0E6D3", S: "#333333", B: "#1A1A1A", D: "#8B7355", Pi: "#1A1A1A", T: "Светлый Беж" }
];

export function genR() {
  const q = PALS[Math.floor(Math.random() * PALS.length)];
  const r = () => Math.random();
  const c = { ...DEF };

  // HARMONIOUS STYLES LOGIC (3 Main Architectures)
  const styleRandomizer = r();

  if (styleRandomizer > 0.6) {
    // 1. DUAL TONE (Primary centers, Dark bolsters, Primary trims)
    c.sb_d = q.P; c.sb_p = q.P;
    c.sv_d = q.S; c.sv_p = q.S;
    c.hr_d = q.P; c.hr_p = q.P;
    c.du_l = q.S; c.du_r = q.S;
    c.da_l = q.P; c.da_r = q.P;
    c.di_l = q.P; c.di_r = q.P;
    c.dl_l = q.S; c.dl_r = q.S;
    c.dh_l = q.S; c.dh_r = q.S;
    c.sw_s = q.P;
    c.sbo = q.P; c.hbo = q.P;
    c.arm = q.P;
    c.con = q.B; c.dt = q.B; c.db = q.P; // lower dash same as primary
  } else if (styleRandomizer > 0.3) {
    // 2. FULL PRIMARY (Almost full interior wrapped in Primary)
    c.sb_d = q.P; c.sb_p = q.P;
    c.sv_d = q.P; c.sv_p = q.P;
    c.hr_d = q.P; c.hr_p = q.P;
    c.du_l = q.B; c.du_r = q.B;
    c.da_l = q.P; c.da_r = q.P;
    c.di_l = q.P; c.di_r = q.P;
    c.dl_l = q.P; c.dl_r = q.P;
    c.dh_l = q.B; c.dh_r = q.B;
    c.sw_s = q.P;
    c.sbo = q.P; c.hbo = q.P; c.arm = q.P;
    c.con = q.P; c.dt = q.B; c.db = q.P;
  } else {
    // 3. SUBTLE GENTLEMAN (Mostly dark, accents are Primary)
    c.sb_d = q.P; c.sb_p = q.P;
    c.sv_d = q.B; c.sv_p = q.B;
    c.hr_d = q.B; c.hr_p = q.B;
    c.da_l = q.P; c.da_r = q.P;
    c.di_l = q.B; c.di_r = q.B;
    // rest stays dark
  }

  // ACCENTS AND STITCHING ALWAYS HARMONIOUS
  c.st = q.D;
  c.pp = r() > 0.5 ? q.Pi : q.B;
  c.sk = q.B; c.hh = q.B; // Knobs usually black/metal

  // Random Trim selection
  const trimOptions = TRIMS.filter(t => t.id !== "custom").map(t => t.id);
  const randomTrim = trimOptions[Math.floor(Math.random() * trimOptions.length)];

  return { colors: c, tag: q.T, trim: randomTrim };
}
