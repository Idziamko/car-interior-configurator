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

// ========== PROCEDURAL RANDOMIZER ==========

// Funny name parts for generated palettes
const ADJ = [
  "Дерзкий", "Бархатный", "Ледяной", "Пьяный", "Сонный", "Яростный",
  "Тихий", "Дымный", "Шёлковый", "Медный", "Огненный", "Лунный",
  "Закатный", "Штормовой", "Угольный", "Нежный", "Хищный", "Мятный",
  "Янтарный", "Космический", "Рваный", "Пыльный", "Острый", "Брутальный",
  "Сумеречный", "Утренний", "Пряный", "Туманный", "Мрачный", "Блестящий",
  "Солёный", "Кислотный", "Ночной", "Полярный", "Стальной", "Бешеный",
  "Тёплый", "Холодный", "Голодный", "Жадный", "Ласковый", "Грозный",
];
const NOUN = [
  "Закат", "Феникс", "Волк", "Бриз", "Шторм", "Гром",
  "Лев", "Призрак", "Ястреб", "Вулкан", "Океан", "Пепел",
  "Клинок", "Сокол", "Рассвет", "Каньон", "Титан", "Кедр",
  "Шёпот", "Рокот", "Обсидиан", "Базальт", "Туман", "Блюз",
  "Джаз", "Виски", "Графит", "Малахит", "Оникс", "Агат",
  "Ветер", "Асфальт", "Бархан", "Коралл", "Мох", "Опал",
  "Кофе", "Имбирь", "Мёд", "Сапфир", "Руби", "Дождь",
];

function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s));
  l = Math.max(0, Math.min(100, l));
  const s1 = s / 100, l1 = l / 100;
  const a = s1 * Math.min(l1, 1 - l1);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l1 - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

export function genR() {
  const r = () => Math.random();

  // Generate base hue and derive harmonious palette
  const hue = Math.floor(r() * 360);
  const sat = 30 + Math.floor(r() * 45);  // 30-75%
  const litP = 25 + Math.floor(r() * 30); // 25-55% primary lightness

  const primary = hslToHex(hue, sat, litP);
  const secondary = hslToHex(hue + 15, sat * 0.4, 12 + Math.floor(r() * 8));
  const base = hslToHex(hue, 5, 10);
  const detail = hslToHex(hue + (r() > 0.5 ? 30 : -30), sat * 0.8, litP + 25);
  const piping = r() > 0.5 ? hslToHex(hue + 180, sat * 0.6, litP) : base;

  const c = { ...DEF };
  const style = r();

  if (style > 0.6) {
    // DUAL TONE
    c.sb_d = primary; c.sb_p = primary;
    c.sv_d = secondary; c.sv_p = secondary;
    c.hr_d = primary; c.hr_p = primary;
    c.du_l = secondary; c.du_r = secondary;
    c.da_l = primary; c.da_r = primary;
    c.di_l = primary; c.di_r = primary;
    c.dl_l = secondary; c.dl_r = secondary;
    c.dh_l = secondary; c.dh_r = secondary;
    c.sw_s = primary;
    c.sbo = primary; c.hbo = primary;
    c.arm = primary;
    c.con = base; c.dt = base; c.db = primary;
  } else if (style > 0.3) {
    // FULL WRAP
    c.sb_d = primary; c.sb_p = primary;
    c.sv_d = primary; c.sv_p = primary;
    c.hr_d = primary; c.hr_p = primary;
    c.du_l = base; c.du_r = base;
    c.da_l = primary; c.da_r = primary;
    c.di_l = primary; c.di_r = primary;
    c.dl_l = primary; c.dl_r = primary;
    c.dh_l = base; c.dh_r = base;
    c.sw_s = primary;
    c.sbo = primary; c.hbo = primary; c.arm = primary;
    c.con = primary; c.dt = base; c.db = primary;
  } else {
    // SUBTLE ACCENTS
    c.sb_d = primary; c.sb_p = primary;
    c.sv_d = base; c.sv_p = base;
    c.hr_d = base; c.hr_p = base;
    c.da_l = primary; c.da_r = primary;
    c.di_l = base; c.di_r = base;
  }

  c.st = detail;
  c.pp = r() > 0.5 ? piping : base;
  c.sk = base; c.hh = base;

  // Random trim
  const trimOptions = TRIMS.filter(t => t.id !== "custom").map(t => t.id);
  const trim = trimOptions[Math.floor(r() * trimOptions.length)];

  // Funny name
  const adj = ADJ[Math.floor(r() * ADJ.length)];
  const noun = NOUN[Math.floor(r() * NOUN.length)];
  const tag = `${adj} ${noun}`;

  return { colors: c, tag, trim };
}

