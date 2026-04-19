// ========== CAR DATABASE ==========
// Local database of popular car makes, models with body codes and year ranges.

export interface CarModel {
  name: string;       // e.g. "3 Series"
  body: string;       // e.g. "E46" or "5th gen"
  type: string;       // sedan, coupe, SUV, etc.
  years: [number, number]; // [from, to]
}

export interface CarMake {
  name: string;
  models: CarModel[];
}

export const CAR_DATABASE: CarMake[] = [
  {
    name: "BMW",
    models: [
      { name: "3 Series", body: "E30", type: "sedan/coupe", years: [1982, 1994] },
      { name: "3 Series", body: "E36", type: "sedan/coupe", years: [1990, 2000] },
      { name: "3 Series", body: "E46", type: "sedan/coupe", years: [1998, 2006] },
      { name: "3 Series", body: "E90/E92", type: "sedan/coupe", years: [2005, 2013] },
      { name: "3 Series", body: "F30/F32", type: "sedan/coupe", years: [2012, 2019] },
      { name: "3 Series", body: "G20/G22", type: "sedan/coupe", years: [2019, 2026] },
      { name: "5 Series", body: "E34", type: "sedan", years: [1988, 1996] },
      { name: "5 Series", body: "E39", type: "sedan", years: [1995, 2004] },
      { name: "5 Series", body: "E60", type: "sedan", years: [2003, 2010] },
      { name: "5 Series", body: "F10", type: "sedan", years: [2010, 2017] },
      { name: "5 Series", body: "G30", type: "sedan", years: [2017, 2024] },
      { name: "7 Series", body: "E38", type: "sedan", years: [1994, 2001] },
      { name: "7 Series", body: "E65", type: "sedan", years: [2001, 2008] },
      { name: "7 Series", body: "F01", type: "sedan", years: [2008, 2015] },
      { name: "7 Series", body: "G11", type: "sedan", years: [2015, 2022] },
      { name: "X5", body: "E53", type: "SUV", years: [1999, 2006] },
      { name: "X5", body: "E70", type: "SUV", years: [2006, 2013] },
      { name: "X5", body: "F15", type: "SUV", years: [2013, 2018] },
      { name: "X5", body: "G05", type: "SUV", years: [2018, 2026] },
      { name: "X3", body: "E83", type: "SUV", years: [2003, 2010] },
      { name: "X3", body: "F25", type: "SUV", years: [2010, 2017] },
      { name: "X3", body: "G01", type: "SUV", years: [2017, 2025] },
      { name: "Z4", body: "E85", type: "roadster", years: [2002, 2008] },
      { name: "Z4", body: "E89", type: "roadster", years: [2009, 2016] },
      { name: "Z4", body: "G29", type: "roadster", years: [2018, 2026] },
      { name: "M3", body: "E46", type: "coupe/sedan", years: [2000, 2006] },
      { name: "M3", body: "E90/E92", type: "coupe/sedan", years: [2007, 2013] },
      { name: "M3", body: "F80", type: "sedan", years: [2014, 2018] },
      { name: "M3", body: "G80", type: "sedan", years: [2020, 2026] },
      { name: "M5", body: "E39", type: "sedan", years: [1998, 2003] },
      { name: "M5", body: "E60", type: "sedan", years: [2005, 2010] },
      { name: "M5", body: "F10", type: "sedan", years: [2011, 2016] },
      { name: "M5", body: "F90", type: "sedan", years: [2017, 2024] },
      { name: "4 Series", body: "F32/F33", type: "coupe/cabrio", years: [2013, 2020] },
      { name: "4 Series", body: "G22/G23", type: "coupe/cabrio", years: [2020, 2026] },
      { name: "X6", body: "E71", type: "SUV coupe", years: [2008, 2014] },
      { name: "X6", body: "F16", type: "SUV coupe", years: [2014, 2019] },
      { name: "X6", body: "G06", type: "SUV coupe", years: [2019, 2026] },
      { name: "1 Series", body: "E87", type: "hatchback", years: [2004, 2011] },
      { name: "1 Series", body: "F20/F21", type: "hatchback", years: [2011, 2019] },
      { name: "1 Series", body: "F40", type: "hatchback", years: [2019, 2026] },
      { name: "2 Series", body: "F22/F23", type: "coupe/cabrio", years: [2014, 2021] },
      { name: "2 Series", body: "G42", type: "coupe", years: [2021, 2026] },
      { name: "6 Series", body: "E24", type: "coupe", years: [1976, 1989] },
      { name: "6 Series", body: "E63/E64", type: "coupe/cabrio", years: [2003, 2010] },
      { name: "6 Series", body: "F06/F12/F13", type: "coupe/cabrio/GC", years: [2011, 2018] },
      { name: "6 Series GT", body: "G32", type: "gran turismo", years: [2017, 2024] },
      { name: "8 Series", body: "E31", type: "coupe", years: [1989, 1999] },
      { name: "8 Series", body: "G14/G15/G16", type: "coupe/cabrio/GC", years: [2018, 2026] },
      { name: "Z3", body: "E36/7", type: "roadster/coupe", years: [1995, 2002] },
      { name: "Z8", body: "E52", type: "roadster", years: [2000, 2003] },
      { name: "X1", body: "E84", type: "SUV", years: [2009, 2015] },
      { name: "X1", body: "F48", type: "SUV", years: [2015, 2022] },
      { name: "X1", body: "U11", type: "SUV", years: [2022, 2026] },
      { name: "X7", body: "G07", type: "SUV", years: [2019, 2026] },
      { name: "M2", body: "F87", type: "coupe", years: [2016, 2021] },
      { name: "M2", body: "G87", type: "coupe", years: [2023, 2026] },
      { name: "M4", body: "F82", type: "coupe", years: [2014, 2020] },
      { name: "M4", body: "G82", type: "coupe", years: [2021, 2026] },
      { name: "3 Series", body: "E21", type: "sedan/coupe", years: [1975, 1983] },
      { name: "5 Series", body: "E12", type: "sedan", years: [1972, 1981] },
      { name: "5 Series", body: "E28", type: "sedan", years: [1981, 1988] },
      { name: "7 Series", body: "E23", type: "sedan", years: [1977, 1987] },
      { name: "7 Series", body: "E32", type: "sedan", years: [1986, 1994] },
      { name: "M5", body: "E28", type: "sedan", years: [1984, 1988] },
      { name: "M5", body: "E34", type: "sedan", years: [1988, 1995] },
      { name: "M3", body: "E30", type: "coupe/sedan", years: [1986, 1991] },
      { name: "M3", body: "E36", type: "coupe/sedan", years: [1992, 1999] },
      { name: "2002", body: "E10", type: "coupe", years: [1968, 1976] },
      { name: "X2", body: "F39", type: "SUV", years: [2018, 2023] },
      { name: "X4", body: "F26", type: "SUV coupe", years: [2014, 2018] },
      { name: "X4", body: "G02", type: "SUV coupe", years: [2018, 2026] },
      { name: "iX", body: "I20", type: "SUV/EV", years: [2022, 2026] },
      { name: "i3", body: "I01", type: "hatchback/EV", years: [2013, 2022] },
      { name: "i4", body: "G26", type: "GC/EV", years: [2022, 2026] },
      { name: "i8", body: "I12", type: "coupe/hybrid", years: [2014, 2020] },
    ]
  },
  {
    name: "Mercedes-Benz",
    models: [
      { name: "190E", body: "W201", type: "sedan", years: [1982, 1993] },
      { name: "C-Class", body: "W202", type: "sedan", years: [1993, 2000] },
      { name: "C-Class", body: "W203", type: "sedan", years: [2000, 2007] },
      { name: "C-Class", body: "W204", type: "sedan", years: [2007, 2014] },
      { name: "C-Class", body: "W205", type: "sedan/coupe", years: [2014, 2021] },
      { name: "C-Class", body: "W206", type: "sedan", years: [2021, 2026] },
      { name: "E-Class", body: "W123", type: "sedan/wagon", years: [1975, 1986] },
      { name: "E-Class", body: "W124", type: "sedan/wagon/coupe", years: [1984, 1996] },
      { name: "E-Class", body: "W210", type: "sedan", years: [1995, 2003] },
      { name: "E-Class", body: "W211", type: "sedan", years: [2002, 2009] },
      { name: "E-Class", body: "W212", type: "sedan", years: [2009, 2016] },
      { name: "E-Class", body: "W213", type: "sedan/coupe", years: [2016, 2023] },
      { name: "E-Class", body: "W214", type: "sedan", years: [2023, 2026] },
      { name: "S-Class", body: "W116", type: "sedan", years: [1972, 1980] },
      { name: "S-Class", body: "W126", type: "sedan/coupe", years: [1979, 1991] },
      { name: "S-Class", body: "W140", type: "sedan", years: [1991, 1998] },
      { name: "S-Class", body: "W220", type: "sedan", years: [1998, 2005] },
      { name: "S-Class", body: "W221", type: "sedan", years: [2005, 2013] },
      { name: "S-Class", body: "W222", type: "sedan", years: [2013, 2020] },
      { name: "S-Class", body: "W223", type: "sedan", years: [2020, 2026] },
      { name: "CLA", body: "C117", type: "coupe", years: [2013, 2019] },
      { name: "CLA", body: "C118", type: "coupe", years: [2019, 2026] },
      { name: "GLE", body: "W166", type: "SUV", years: [2015, 2019] },
      { name: "GLE", body: "V167", type: "SUV", years: [2019, 2026] },
      { name: "G-Class", body: "W463", type: "SUV", years: [1990, 2018] },
      { name: "G-Class", body: "W463A", type: "SUV", years: [2018, 2026] },
      { name: "AMG GT", body: "C190", type: "coupe", years: [2014, 2024] },
      { name: "SL", body: "R231", type: "roadster", years: [2012, 2020] },
      { name: "SL", body: "R232", type: "roadster", years: [2022, 2026] },
      { name: "SLK/SLC", body: "R170", type: "roadster", years: [1996, 2004] },
      { name: "SLK", body: "R171", type: "roadster", years: [2004, 2011] },
      { name: "SLK/SLC", body: "R172", type: "roadster", years: [2011, 2020] },
      { name: "CLS", body: "C218", type: "coupe", years: [2010, 2018] },
      { name: "CLS", body: "C257", type: "coupe", years: [2018, 2026] },
      { name: "GLC", body: "X253", type: "SUV", years: [2015, 2022] },
      { name: "GLC", body: "X254", type: "SUV", years: [2022, 2026] },
      { name: "GLA", body: "X156", type: "SUV", years: [2013, 2020] },
      { name: "GLA", body: "H247", type: "SUV", years: [2020, 2026] },
      { name: "GLB", body: "X247", type: "SUV", years: [2019, 2026] },
      { name: "GLS", body: "X166", type: "SUV", years: [2015, 2019] },
      { name: "GLS", body: "X167", type: "SUV", years: [2019, 2026] },
      { name: "ML-Class", body: "W163", type: "SUV", years: [1997, 2005] },
      { name: "ML-Class", body: "W164", type: "SUV", years: [2005, 2011] },
      { name: "ML-Class", body: "W166", type: "SUV", years: [2011, 2015] },
      { name: "Vito/Viano", body: "W639", type: "van", years: [2003, 2014] },
      { name: "V-Class", body: "W447", type: "van", years: [2014, 2026] },
      { name: "Sprinter", body: "W906", type: "van", years: [2006, 2018] },
      { name: "Sprinter", body: "W907", type: "van", years: [2018, 2026] },
      { name: "SL", body: "R107", type: "roadster", years: [1971, 1989] },
      { name: "SL", body: "R129", type: "roadster", years: [1989, 2001] },
      { name: "SL", body: "R230", type: "roadster", years: [2001, 2011] },
      { name: "CL", body: "C215", type: "coupe", years: [1999, 2006] },
      { name: "CL", body: "C216", type: "coupe", years: [2006, 2014] },
      { name: "EQS", body: "V297", type: "sedan/EV", years: [2021, 2026] },
      { name: "EQE", body: "V295", type: "sedan/EV", years: [2022, 2026] },
    ]
  },
  {
    name: "Audi",
    models: [
      { name: "A3", body: "8L", type: "hatchback", years: [1996, 2003] },
      { name: "A3", body: "8P", type: "hatchback", years: [2003, 2013] },
      { name: "A3", body: "8V", type: "sedan/hatchback", years: [2012, 2020] },
      { name: "A3", body: "8Y", type: "sedan", years: [2020, 2026] },
      { name: "A4", body: "B5", type: "sedan/avant", years: [1994, 2001] },
      { name: "A4", body: "B6", type: "sedan/avant", years: [2000, 2006] },
      { name: "A4", body: "B7", type: "sedan/avant", years: [2004, 2009] },
      { name: "A4", body: "B8", type: "sedan/avant", years: [2008, 2016] },
      { name: "A4", body: "B9", type: "sedan/avant", years: [2015, 2024] },
      { name: "A6", body: "C5", type: "sedan/avant", years: [1997, 2004] },
      { name: "A6", body: "C6", type: "sedan/avant", years: [2004, 2011] },
      { name: "A6", body: "C7", type: "sedan/avant", years: [2011, 2018] },
      { name: "A6", body: "C8", type: "sedan/avant", years: [2018, 2026] },
      { name: "A8", body: "D2", type: "sedan", years: [1994, 2002] },
      { name: "A8", body: "D3", type: "sedan", years: [2002, 2010] },
      { name: "A8", body: "D4", type: "sedan", years: [2010, 2018] },
      { name: "A8", body: "D5", type: "sedan", years: [2017, 2026] },
      { name: "Q5", body: "8R", type: "SUV", years: [2008, 2017] },
      { name: "Q5", body: "FY", type: "SUV", years: [2017, 2026] },
      { name: "Q7", body: "4L", type: "SUV", years: [2005, 2015] },
      { name: "Q7", body: "4M", type: "SUV", years: [2015, 2026] },
      { name: "TT", body: "8N", type: "coupe", years: [1998, 2006] },
      { name: "TT", body: "8J", type: "coupe", years: [2006, 2014] },
      { name: "TT", body: "8S", type: "coupe", years: [2014, 2024] },
      { name: "RS6", body: "C7 Avant", type: "avant", years: [2013, 2018] },
      { name: "RS6", body: "C8 Avant", type: "avant", years: [2019, 2026] },
      { name: "A5", body: "B8", type: "coupe/sportback", years: [2007, 2016] },
      { name: "A5", body: "B9", type: "coupe/sportback", years: [2016, 2026] },
      { name: "A7", body: "4G", type: "sportback", years: [2010, 2018] },
      { name: "A7", body: "4K", type: "sportback", years: [2018, 2026] },
      { name: "Q2", body: "GA", type: "SUV", years: [2016, 2026] },
      { name: "Q3", body: "8U", type: "SUV", years: [2011, 2018] },
      { name: "Q3", body: "F3", type: "SUV", years: [2018, 2026] },
      { name: "Q8", body: "4M", type: "SUV coupe", years: [2018, 2026] },
      { name: "e-tron", body: "GE", type: "SUV/EV", years: [2018, 2023] },
      { name: "Q8 e-tron", body: "GE facelift", type: "SUV/EV", years: [2023, 2026] },
      { name: "e-tron GT", body: "F83", type: "sedan/EV", years: [2021, 2026] },
      { name: "R8", body: "42", type: "coupe", years: [2006, 2015] },
      { name: "R8", body: "4S", type: "coupe", years: [2015, 2024] },
      { name: "80", body: "B3/B4", type: "sedan/wagon", years: [1986, 1996] },
      { name: "100", body: "C3", type: "sedan/wagon", years: [1982, 1991] },
      { name: "100", body: "C4", type: "sedan/wagon", years: [1990, 1994] },
      { name: "RS3", body: "8V", type: "sedan/hatch", years: [2015, 2020] },
      { name: "RS3", body: "8Y", type: "sedan/hatch", years: [2021, 2026] },
      { name: "RS4", body: "B7", type: "avant", years: [2006, 2008] },
      { name: "RS4", body: "B8", type: "avant", years: [2012, 2015] },
      { name: "RS4", body: "B9", type: "avant", years: [2017, 2024] },
      { name: "RS Q3", body: "F3", type: "SUV", years: [2020, 2026] },
      { name: "SQ5", body: "FY", type: "SUV", years: [2017, 2026] },
    ]
  },
  {
    name: "Volkswagen",
    models: [
      { name: "Golf", body: "Mk4", type: "hatchback", years: [1997, 2003] },
      { name: "Golf", body: "Mk5", type: "hatchback", years: [2003, 2009] },
      { name: "Golf", body: "Mk6", type: "hatchback", years: [2008, 2013] },
      { name: "Golf", body: "Mk7", type: "hatchback", years: [2012, 2020] },
      { name: "Golf", body: "Mk8", type: "hatchback", years: [2019, 2026] },
      { name: "Passat", body: "B5", type: "sedan/wagon", years: [1996, 2005] },
      { name: "Passat", body: "B6", type: "sedan/wagon", years: [2005, 2010] },
      { name: "Passat", body: "B7", type: "sedan/wagon", years: [2010, 2015] },
      { name: "Passat", body: "B8", type: "sedan/wagon", years: [2014, 2024] },
      { name: "Tiguan", body: "5N", type: "SUV", years: [2007, 2016] },
      { name: "Tiguan", body: "AD1", type: "SUV", years: [2016, 2026] },
      { name: "Touareg", body: "7L", type: "SUV", years: [2002, 2010] },
      { name: "Touareg", body: "7P", type: "SUV", years: [2010, 2018] },
      { name: "Touareg", body: "CR", type: "SUV", years: [2018, 2026] },
      { name: "Golf", body: "Mk2", type: "hatchback", years: [1983, 1992] },
      { name: "Golf", body: "Mk3", type: "hatchback", years: [1991, 1997] },
      { name: "Jetta", body: "Mk5", type: "sedan", years: [2005, 2010] },
      { name: "Jetta", body: "Mk6", type: "sedan", years: [2010, 2018] },
      { name: "Jetta", body: "Mk7", type: "sedan", years: [2018, 2026] },
      { name: "Polo", body: "Mk4", type: "hatchback", years: [2001, 2009] },
      { name: "Polo", body: "Mk5", type: "hatchback", years: [2009, 2017] },
      { name: "Polo", body: "Mk6", type: "hatchback", years: [2017, 2026] },
      { name: "Scirocco", body: "Mk3", type: "coupe", years: [2008, 2017] },
      { name: "Beetle", body: "A5", type: "hatchback", years: [2011, 2019] },
      { name: "Phaeton", body: "3D", type: "sedan", years: [2002, 2016] },
      { name: "Arteon", body: "3H", type: "fastback", years: [2017, 2024] },
      { name: "ID.3", body: "MEB", type: "hatchback/EV", years: [2020, 2026] },
      { name: "ID.4", body: "MEB", type: "SUV/EV", years: [2020, 2026] },
      { name: "ID.7", body: "MEB", type: "sedan/EV", years: [2023, 2026] },
      { name: "Transporter", body: "T5", type: "van", years: [2003, 2015] },
      { name: "Transporter", body: "T6", type: "van", years: [2015, 2026] },
    ]
  },
  {
    name: "Skoda",
    models: [
      { name: "Octavia", body: "Mk1 (1U)", type: "sedan/wagon", years: [1996, 2010] },
      { name: "Octavia", body: "Mk2 (1Z)", type: "sedan/wagon", years: [2004, 2013] },
      { name: "Octavia", body: "Mk3 (5E)", type: "sedan/wagon", years: [2013, 2020] },
      { name: "Octavia", body: "Mk4 (NX)", type: "sedan/wagon", years: [2020, 2026] },
      { name: "Superb", body: "B5 (3U)", type: "sedan", years: [2001, 2008] },
      { name: "Superb", body: "B6 (3T)", type: "sedan/wagon", years: [2008, 2015] },
      { name: "Superb", body: "B8 (3V)", type: "sedan/wagon", years: [2015, 2024] },
      { name: "Superb", body: "Mk4 (NP)", type: "sedan/wagon", years: [2024, 2026] },
      { name: "Fabia", body: "Mk1 (6Y)", type: "hatchback", years: [1999, 2007] },
      { name: "Fabia", body: "Mk2 (5J)", type: "hatchback", years: [2007, 2014] },
      { name: "Fabia", body: "Mk3 (NJ)", type: "hatchback", years: [2014, 2021] },
      { name: "Fabia", body: "Mk4 (PJ)", type: "hatchback", years: [2021, 2026] },
      { name: "Rapid", body: "NH", type: "sedan/liftback", years: [2012, 2020] },
      { name: "Yeti", body: "5L", type: "SUV", years: [2009, 2017] },
      { name: "Karoq", body: "NU", type: "SUV", years: [2017, 2026] },
      { name: "Kodiaq", body: "NS", type: "SUV", years: [2016, 2024] },
      { name: "Kodiaq", body: "Mk2 (NM)", type: "SUV", years: [2024, 2026] },
      { name: "Kamiq", body: "NW", type: "SUV", years: [2019, 2026] },
      { name: "Scala", body: "NW", type: "hatchback", years: [2019, 2026] },
      { name: "Enyaq", body: "MEB", type: "SUV/EV", years: [2020, 2026] },
      { name: "Felicia", body: "791", type: "hatchback/pickup", years: [1994, 2001] },
    ]
  },
  {
    name: "Porsche",
    models: [
      { name: "911", body: "996", type: "coupe", years: [1997, 2006] },
      { name: "911", body: "997", type: "coupe", years: [2004, 2012] },
      { name: "911", body: "991", type: "coupe", years: [2011, 2019] },
      { name: "911", body: "992", type: "coupe", years: [2019, 2026] },
      { name: "Cayenne", body: "9PA", type: "SUV", years: [2002, 2010] },
      { name: "Cayenne", body: "92A", type: "SUV", years: [2010, 2018] },
      { name: "Cayenne", body: "9YA", type: "SUV", years: [2018, 2026] },
      { name: "Panamera", body: "970", type: "sedan", years: [2009, 2016] },
      { name: "Panamera", body: "971", type: "sedan", years: [2016, 2026] },
      { name: "Macan", body: "95B", type: "SUV", years: [2014, 2026] },
      { name: "Boxster/Cayman", body: "987", type: "roadster/coupe", years: [2004, 2012] },
      { name: "Boxster/Cayman", body: "981", type: "roadster/coupe", years: [2012, 2016] },
      { name: "Boxster/Cayman", body: "718", type: "roadster/coupe", years: [2016, 2026] },
      { name: "Taycan", body: "J1", type: "sedan/EV", years: [2019, 2026] },
      { name: "911 Turbo", body: "930", type: "coupe", years: [1975, 1989] },
      { name: "928", body: "928", type: "coupe", years: [1977, 1995] },
      { name: "911", body: "964", type: "coupe", years: [1989, 1994] },
      { name: "911", body: "993", type: "coupe", years: [1993, 1998] },
      { name: "944", body: "944", type: "coupe", years: [1982, 1991] },
      { name: "968", body: "968", type: "coupe", years: [1991, 1995] },
      { name: "924", body: "924", type: "coupe", years: [1976, 1988] },
      { name: "Boxster", body: "986", type: "roadster", years: [1996, 2004] },
      { name: "Carrera GT", body: "980", type: "coupe", years: [2003, 2007] },
      { name: "918 Spyder", body: "918", type: "roadster", years: [2013, 2015] },
    ]
  },
  {
    name: "Chevrolet",
    models: [
      { name: "Camaro", body: "4th gen", type: "coupe", years: [1993, 2002] },
      { name: "Camaro", body: "5th gen", type: "coupe", years: [2009, 2015] },
      { name: "Camaro", body: "6th gen", type: "coupe", years: [2016, 2024] },
      { name: "Corvette", body: "C5", type: "coupe", years: [1997, 2004] },
      { name: "Corvette", body: "C6", type: "coupe", years: [2005, 2013] },
      { name: "Corvette", body: "C7", type: "coupe", years: [2014, 2019] },
      { name: "Corvette", body: "C8", type: "coupe", years: [2020, 2026] },
      { name: "Tahoe", body: "GMT900", type: "SUV", years: [2007, 2014] },
      { name: "Tahoe", body: "K2XX", type: "SUV", years: [2015, 2020] },
      { name: "Tahoe", body: "T1XX", type: "SUV", years: [2021, 2026] },
      { name: "Silverado", body: "K2XX", type: "pickup", years: [2014, 2019] },
      { name: "Silverado", body: "T1XX", type: "pickup", years: [2019, 2026] },
      { name: "Aveo", body: "T200", type: "sedan/hatch", years: [2002, 2008] },
      { name: "Aveo", body: "T250", type: "sedan/hatch", years: [2008, 2011] },
      { name: "Aveo", body: "T300", type: "sedan/hatch", years: [2011, 2020] },
      { name: "Lacetti", body: "J200", type: "sedan/hatch/wagon", years: [2002, 2013] },
      { name: "Cruze", body: "J300", type: "sedan/hatch", years: [2008, 2016] },
      { name: "Cruze", body: "J400", type: "sedan", years: [2016, 2019] },
      { name: "Niva", body: "2123", type: "SUV", years: [2002, 2020] },
      { name: "Captiva", body: "C100", type: "SUV", years: [2006, 2018] },
      { name: "Epica", body: "V250", type: "sedan", years: [2006, 2012] },
      { name: "Lanos", body: "T100", type: "sedan", years: [1997, 2017] },
      { name: "Spark", body: "M300", type: "hatchback", years: [2009, 2015] },
      { name: "Spark", body: "M400", type: "hatchback", years: [2015, 2022] },
      { name: "Malibu", body: "9th gen", type: "sedan", years: [2016, 2024] },
      { name: "Trailblazer", body: "GMT360", type: "SUV", years: [2001, 2009] },
      { name: "Suburban", body: "GMT900", type: "SUV", years: [2007, 2014] },
      { name: "Suburban", body: "K2UC", type: "SUV", years: [2015, 2020] },
      { name: "Suburban", body: "T1XX", type: "SUV", years: [2021, 2026] },
      { name: "Impala", body: "10th gen", type: "sedan", years: [2014, 2020] },
      { name: "Blazer", body: "K3", type: "SUV", years: [2019, 2026] },
      { name: "Equinox", body: "3rd gen", type: "SUV", years: [2018, 2025] },
      { name: "Monte Carlo", body: "6th gen", type: "coupe", years: [2000, 2007] },
    ]
  },
  {
    name: "Ford",
    models: [
      { name: "Mustang", body: "S197", type: "coupe", years: [2005, 2014] },
      { name: "Mustang", body: "S550", type: "coupe", years: [2015, 2023] },
      { name: "Mustang", body: "S650", type: "coupe", years: [2024, 2026] },
      { name: "Focus", body: "Mk2", type: "hatchback", years: [2004, 2011] },
      { name: "Focus", body: "Mk3", type: "hatchback", years: [2011, 2018] },
      { name: "Focus", body: "Mk4", type: "hatchback", years: [2018, 2025] },
      { name: "F-150", body: "12th gen", type: "pickup", years: [2009, 2014] },
      { name: "F-150", body: "13th gen", type: "pickup", years: [2015, 2020] },
      { name: "F-150", body: "14th gen", type: "pickup", years: [2021, 2026] },
      { name: "Explorer", body: "5th gen", type: "SUV", years: [2011, 2019] },
      { name: "Explorer", body: "6th gen", type: "SUV", years: [2020, 2026] },
    ]
  },
  {
    name: "Toyota",
    models: [
      { name: "Camry", body: "XV40", type: "sedan", years: [2006, 2011] },
      { name: "Camry", body: "XV50", type: "sedan", years: [2011, 2017] },
      { name: "Camry", body: "XV70", type: "sedan", years: [2017, 2026] },
      { name: "Supra", body: "A80", type: "coupe", years: [1993, 2002] },
      { name: "Supra", body: "A90", type: "coupe", years: [2019, 2026] },
      { name: "Land Cruiser", body: "J100", type: "SUV", years: [1998, 2007] },
      { name: "Land Cruiser", body: "J200", type: "SUV", years: [2007, 2021] },
      { name: "Land Cruiser", body: "J300", type: "SUV", years: [2021, 2026] },
      { name: "RAV4", body: "XA40", type: "SUV", years: [2013, 2018] },
      { name: "RAV4", body: "XA50", type: "SUV", years: [2019, 2026] },
      { name: "Corolla", body: "E170", type: "sedan", years: [2013, 2019] },
      { name: "Corolla", body: "E210", type: "sedan", years: [2019, 2026] },
      { name: "86/GR86", body: "ZN6/ZN8", type: "coupe", years: [2012, 2026] },
      { name: "MR2", body: "SW20", type: "coupe", years: [1989, 1999] },
      { name: "Celica", body: "T230", type: "coupe", years: [1999, 2006] },
      { name: "Prius", body: "XW20", type: "hatchback", years: [2003, 2009] },
      { name: "Prius", body: "XW30", type: "hatchback", years: [2009, 2015] },
      { name: "Prius", body: "XW50", type: "hatchback", years: [2015, 2022] },
      { name: "Hilux", body: "AN120", type: "pickup", years: [2015, 2026] },
    ]
  },
  {
    name: "Honda",
    models: [
      { name: "Civic", body: "8th gen", type: "sedan/coupe", years: [2005, 2011] },
      { name: "Civic", body: "9th gen", type: "sedan/coupe", years: [2011, 2015] },
      { name: "Civic", body: "10th gen", type: "sedan/coupe", years: [2016, 2021] },
      { name: "Civic", body: "11th gen", type: "sedan", years: [2021, 2026] },
      { name: "Accord", body: "8th gen", type: "sedan", years: [2008, 2012] },
      { name: "Accord", body: "9th gen", type: "sedan", years: [2013, 2017] },
      { name: "Accord", body: "10th gen", type: "sedan", years: [2018, 2026] },
      { name: "CR-V", body: "4th gen", type: "SUV", years: [2012, 2017] },
      { name: "CR-V", body: "5th gen", type: "SUV", years: [2017, 2023] },
      { name: "S2000", body: "AP1/AP2", type: "roadster", years: [1999, 2009] },
      { name: "NSX", body: "NA1/NA2", type: "coupe", years: [1990, 2005] },
      { name: "NSX", body: "NC1", type: "coupe", years: [2016, 2022] },
      { name: "Integra Type R", body: "DC5", type: "coupe", years: [2001, 2006] },
      { name: "Prelude", body: "BB5-BB9", type: "coupe", years: [1996, 2001] },
    ]
  },
  {
    name: "Nissan",
    models: [
      { name: "GT-R", body: "R35", type: "coupe", years: [2007, 2026] },
      { name: "350Z", body: "Z33", type: "coupe", years: [2002, 2009] },
      { name: "370Z", body: "Z34", type: "coupe", years: [2009, 2020] },
      { name: "Z", body: "Z (RZ34)", type: "coupe", years: [2023, 2026] },
      { name: "Skyline", body: "R32", type: "coupe/sedan", years: [1989, 1994] },
      { name: "Skyline", body: "R33", type: "coupe/sedan", years: [1993, 1998] },
      { name: "Skyline", body: "R34", type: "coupe/sedan", years: [1998, 2002] },
      { name: "Silvia", body: "S13", type: "coupe", years: [1988, 1994] },
      { name: "Silvia", body: "S14", type: "coupe", years: [1993, 1998] },
      { name: "Silvia", body: "S15", type: "coupe", years: [1999, 2002] },
      { name: "Patrol", body: "Y62", type: "SUV", years: [2010, 2026] },
      { name: "Qashqai", body: "J11", type: "SUV", years: [2014, 2021] },
      { name: "Qashqai", body: "J12", type: "SUV", years: [2021, 2026] },
    ]
  },
  {
    name: "Lexus",
    models: [
      { name: "IS", body: "XE20", type: "sedan", years: [2005, 2013] },
      { name: "IS", body: "XE30", type: "sedan", years: [2013, 2026] },
      { name: "GS", body: "S190", type: "sedan", years: [2005, 2012] },
      { name: "GS", body: "L10", type: "sedan", years: [2012, 2020] },
      { name: "LS", body: "UCF30 (LS430)", type: "sedan", years: [2000, 2006] },
      { name: "LS", body: "XF40", type: "sedan", years: [2006, 2017] },
      { name: "LS", body: "XF50", type: "sedan", years: [2017, 2026] },
      { name: "SC", body: "UZZ40 (SC430)", type: "coupe/cabrio", years: [2001, 2010] },
      { name: "NX", body: "AZ10", type: "SUV", years: [2014, 2021] },
      { name: "NX", body: "AZ20", type: "SUV", years: [2021, 2026] },
      { name: "ES", body: "XV40", type: "sedan", years: [2006, 2012] },
      { name: "ES", body: "XV60", type: "sedan", years: [2012, 2018] },
      { name: "ES", body: "XZ10", type: "sedan", years: [2018, 2026] },
      { name: "RX", body: "AL10", type: "SUV", years: [2009, 2015] },
      { name: "RX", body: "AL20", type: "SUV", years: [2015, 2022] },
      { name: "RX", body: "AL30", type: "SUV", years: [2022, 2026] },
      { name: "LC", body: "URZ100", type: "coupe", years: [2017, 2026] },
      { name: "LX", body: "J200", type: "SUV", years: [2008, 2021] },
      { name: "LX", body: "J300", type: "SUV", years: [2022, 2026] },
    ]
  },
  {
    name: "Mazda",
    models: [
      { name: "MX-5/Miata", body: "NA", type: "roadster", years: [1989, 1997] },
      { name: "MX-5/Miata", body: "NB", type: "roadster", years: [1998, 2005] },
      { name: "MX-5/Miata", body: "NC", type: "roadster", years: [2005, 2015] },
      { name: "MX-5/Miata", body: "ND", type: "roadster", years: [2015, 2026] },
      { name: "3", body: "BK", type: "sedan/hatch", years: [2003, 2009] },
      { name: "3", body: "BL", type: "sedan/hatch", years: [2009, 2013] },
      { name: "3", body: "BM/BN", type: "sedan/hatch", years: [2013, 2019] },
      { name: "3", body: "BP", type: "sedan/hatch", years: [2019, 2026] },
      { name: "6", body: "GG", type: "sedan", years: [2002, 2008] },
      { name: "6", body: "GH", type: "sedan", years: [2008, 2013] },
      { name: "6", body: "GJ/GL", type: "sedan", years: [2012, 2023] },
      { name: "CX-3", body: "DK", type: "SUV", years: [2015, 2022] },
      { name: "CX-30", body: "DM", type: "SUV", years: [2019, 2026] },
      { name: "CX-5", body: "KE", type: "SUV", years: [2012, 2017] },
      { name: "CX-5", body: "KF", type: "SUV", years: [2017, 2026] },
      { name: "CX-7", body: "ER", type: "SUV", years: [2006, 2012] },
      { name: "CX-9", body: "TB", type: "SUV", years: [2006, 2015] },
      { name: "CX-9", body: "TC", type: "SUV", years: [2016, 2023] },
      { name: "CX-60", body: "KH", type: "SUV", years: [2022, 2026] },
      { name: "CX-90", body: "KK", type: "SUV", years: [2023, 2026] },
      { name: "RX-7", body: "FD", type: "coupe", years: [1992, 2002] },
      { name: "RX-8", body: "SE3P", type: "coupe", years: [2003, 2012] },
      { name: "323", body: "BG", type: "sedan/hatch", years: [1989, 1994] },
      { name: "626", body: "GE", type: "sedan", years: [1992, 1997] },
      { name: "626", body: "GF", type: "sedan", years: [1997, 2002] },
    ]
  },
  {
    name: "Subaru",
    models: [
      { name: "Impreza WRX/STI", body: "GD", type: "sedan", years: [2000, 2007] },
      { name: "Impreza WRX/STI", body: "GR/GV", type: "sedan/hatch", years: [2007, 2014] },
      { name: "WRX", body: "VA", type: "sedan", years: [2015, 2021] },
      { name: "WRX", body: "VB", type: "sedan", years: [2022, 2026] },
      { name: "BRZ", body: "ZC6", type: "coupe", years: [2012, 2020] },
      { name: "BRZ", body: "ZD8", type: "coupe", years: [2021, 2026] },
      { name: "Forester", body: "SJ", type: "SUV", years: [2013, 2018] },
      { name: "Forester", body: "SK", type: "SUV", years: [2019, 2026] },
    ]
  },
  {
    name: "Mitsubishi",
    models: [
      { name: "Lancer Evolution", body: "Evo VII-IX", type: "sedan", years: [2001, 2007] },
      { name: "Lancer Evolution", body: "Evo X", type: "sedan", years: [2007, 2016] },
      { name: "Outlander", body: "GF", type: "SUV", years: [2013, 2021] },
      { name: "Outlander", body: "GN", type: "SUV", years: [2022, 2026] },
      { name: "Pajero/Montero", body: "V80", type: "SUV", years: [2006, 2021] },
    ]
  },
  {
    name: "Dodge",
    models: [
      { name: "Challenger", body: "LC", type: "coupe", years: [2008, 2024] },
      { name: "Charger", body: "LD", type: "sedan", years: [2011, 2024] },
      { name: "Durango", body: "WD", type: "SUV", years: [2011, 2026] },
      { name: "Viper", body: "VX", type: "coupe", years: [2013, 2017] },
    ]
  },
  {
    name: "Lamborghini",
    models: [
      { name: "Huracán", body: "LP610-640", type: "coupe", years: [2014, 2024] },
      { name: "Aventador", body: "LP700-780", type: "coupe", years: [2011, 2022] },
      { name: "Urus", body: "Mk1", type: "SUV", years: [2018, 2026] },
      { name: "Gallardo", body: "LP560", type: "coupe", years: [2003, 2014] },
    ]
  },
  {
    name: "Ferrari",
    models: [
      { name: "458 Italia", body: "F142", type: "coupe", years: [2009, 2015] },
      { name: "488 GTB", body: "F142M", type: "coupe", years: [2015, 2020] },
      { name: "F8 Tributo", body: "F142MFL", type: "coupe", years: [2020, 2024] },
      { name: "Roma", body: "F169", type: "coupe", years: [2020, 2026] },
      { name: "296 GTB", body: "F171", type: "coupe", years: [2022, 2026] },
      { name: "SF90", body: "F173", type: "coupe", years: [2020, 2026] },
    ]
  },
  {
    name: "Land Rover",
    models: [
      { name: "Range Rover", body: "L322", type: "SUV", years: [2002, 2012] },
      { name: "Range Rover", body: "L405", type: "SUV", years: [2012, 2022] },
      { name: "Range Rover", body: "L460", type: "SUV", years: [2022, 2026] },
      { name: "Range Rover Sport", body: "L320", type: "SUV", years: [2005, 2013] },
      { name: "Range Rover Sport", body: "L494", type: "SUV", years: [2013, 2022] },
      { name: "Range Rover Sport", body: "L461", type: "SUV", years: [2022, 2026] },
      { name: "Defender", body: "L663", type: "SUV", years: [2020, 2026] },
      { name: "Discovery", body: "L462", type: "SUV", years: [2017, 2026] },
    ]
  },
  {
    name: "Jaguar",
    models: [
      { name: "F-Type", body: "X152", type: "coupe/roadster", years: [2013, 2024] },
      { name: "XE", body: "X760", type: "sedan", years: [2015, 2024] },
      { name: "XF", body: "X250", type: "sedan", years: [2008, 2015] },
      { name: "XF", body: "X260", type: "sedan", years: [2015, 2024] },
      { name: "XJ", body: "X351", type: "sedan", years: [2010, 2019] },
    ]
  },
  {
    name: "Volvo",
    models: [
      { name: "S60", body: "2nd gen", type: "sedan", years: [2010, 2018] },
      { name: "S60", body: "3rd gen", type: "sedan", years: [2019, 2026] },
      { name: "S90", body: "2nd gen", type: "sedan", years: [2016, 2026] },
      { name: "XC60", body: "SPA", type: "SUV", years: [2017, 2026] },
      { name: "XC90", body: "SPA", type: "SUV", years: [2015, 2026] },
      { name: "V60", body: "SPA", type: "wagon", years: [2018, 2026] },
    ]
  },
  {
    name: "Hyundai",
    models: [
      { name: "Genesis Coupe", body: "BK", type: "coupe", years: [2009, 2016] },
      { name: "Tucson", body: "NX4", type: "SUV", years: [2021, 2026] },
      { name: "Santa Fe", body: "TM", type: "SUV", years: [2019, 2026] },
      { name: "Sonata", body: "DN8", type: "sedan", years: [2019, 2026] },
      { name: "Elantra N", body: "CN7", type: "sedan", years: [2021, 2026] },
      { name: "Ioniq 5", body: "NE", type: "EV", years: [2022, 2026] },
    ]
  },
  {
    name: "Kia",
    models: [
      { name: "Stinger", body: "CK", type: "sedan", years: [2017, 2024] },
      { name: "Sportage", body: "NQ5", type: "SUV", years: [2022, 2026] },
      { name: "EV6", body: "CV", type: "EV", years: [2022, 2026] },
      { name: "K5/Optima", body: "DL3", type: "sedan", years: [2020, 2026] },
    ]
  },
  {
    name: "Tesla",
    models: [
      { name: "Model S", body: "Refresh", type: "sedan", years: [2012, 2026] },
      { name: "Model 3", body: "Highland", type: "sedan", years: [2017, 2026] },
      { name: "Model X", body: "Refresh", type: "SUV", years: [2015, 2026] },
      { name: "Model Y", body: "Juniper", type: "SUV", years: [2020, 2026] },
    ]
  },
  {
    name: "Genesis",
    models: [
      { name: "G70", body: "IK", type: "sedan", years: [2018, 2026] },
      { name: "G80", body: "RG3", type: "sedan", years: [2020, 2026] },
      { name: "G90", body: "RS4", type: "sedan", years: [2022, 2026] },
      { name: "GV70", body: "JK1", type: "SUV", years: [2022, 2026] },
      { name: "GV80", body: "JX1", type: "SUV", years: [2020, 2026] },
    ]
  },
  {
    name: "Maserati",
    models: [
      { name: "Ghibli", body: "M157", type: "sedan", years: [2013, 2024] },
      { name: "Quattroporte", body: "M156", type: "sedan", years: [2013, 2024] },
      { name: "Levante", body: "M161", type: "SUV", years: [2016, 2024] },
      { name: "GranTurismo", body: "M175", type: "coupe", years: [2023, 2026] },
      { name: "MC20", body: "M240", type: "coupe", years: [2021, 2026] },
    ]
  },
  {
    name: "Alfa Romeo",
    models: [
      { name: "Giulia", body: "952", type: "sedan", years: [2016, 2026] },
      { name: "Stelvio", body: "949", type: "SUV", years: [2017, 2026] },
      { name: "Tonale", body: "965", type: "SUV", years: [2022, 2026] },
      { name: "4C", body: "960", type: "coupe", years: [2013, 2020] },
      { name: "147", body: "937", type: "hatchback", years: [2000, 2010] },
      { name: "156", body: "932", type: "sedan/wagon", years: [1997, 2007] },
      { name: "159", body: "939", type: "sedan/wagon", years: [2005, 2011] },
      { name: "Giulietta", body: "940", type: "hatchback", years: [2010, 2020] },
      { name: "GT", body: "937", type: "coupe", years: [2003, 2010] },
      { name: "GTV/Spider", body: "916", type: "coupe/roadster", years: [1995, 2006] },
      { name: "MiTo", body: "955", type: "hatchback", years: [2008, 2018] },
      { name: "Brera", body: "939", type: "coupe", years: [2005, 2010] },
      { name: "8C Competizione", body: "8C", type: "coupe", years: [2007, 2010] },
    ]
  },
  {
    name: "Infiniti",
    models: [
      { name: "G35/G37", body: "V36", type: "sedan/coupe", years: [2007, 2015] },
      { name: "Q50", body: "V37", type: "sedan", years: [2014, 2026] },
      { name: "Q60", body: "CV37", type: "coupe", years: [2017, 2024] },
      { name: "Q70", body: "Y51", type: "sedan", years: [2013, 2019] },
      { name: "QX80", body: "Z62", type: "SUV", years: [2010, 2024] },
      { name: "QX80", body: "Z63", type: "SUV", years: [2025, 2026] },
      { name: "QX70/FX", body: "S51", type: "SUV", years: [2008, 2017] },
      { name: "QX50", body: "J50", type: "SUV", years: [2007, 2017] },
      { name: "QX50", body: "P71A", type: "SUV", years: [2017, 2026] },
      { name: "QX60", body: "L50", type: "SUV", years: [2013, 2020] },
      { name: "QX60", body: "L51", type: "SUV", years: [2021, 2026] },
      { name: "QX55", body: "J56", type: "SUV coupe", years: [2021, 2026] },
      { name: "QX30", body: "H15", type: "SUV", years: [2016, 2019] },
      { name: "FX35/45", body: "S50", type: "SUV", years: [2002, 2008] },
      { name: "M35/45", body: "Y50", type: "sedan", years: [2004, 2010] },
    ]
  },
  {
    name: "Opel",
    models: [
      { name: "Astra", body: "G", type: "hatchback", years: [1998, 2004] },
      { name: "Astra", body: "H", type: "hatchback", years: [2004, 2010] },
      { name: "Astra", body: "J", type: "hatchback", years: [2009, 2015] },
      { name: "Astra", body: "K", type: "hatchback", years: [2015, 2021] },
      { name: "Astra", body: "L", type: "hatchback", years: [2021, 2026] },
      { name: "Corsa", body: "C", type: "hatchback", years: [2000, 2006] },
      { name: "Corsa", body: "D", type: "hatchback", years: [2006, 2014] },
      { name: "Corsa", body: "E", type: "hatchback", years: [2014, 2019] },
      { name: "Corsa", body: "F", type: "hatchback", years: [2019, 2026] },
      { name: "Insignia", body: "A", type: "sedan/wagon", years: [2008, 2017] },
      { name: "Insignia", body: "B", type: "sedan/wagon", years: [2017, 2022] },
      { name: "Vectra", body: "B", type: "sedan", years: [1995, 2002] },
      { name: "Vectra", body: "C", type: "sedan", years: [2002, 2008] },
      { name: "Omega", body: "B", type: "sedan", years: [1993, 2003] },
      { name: "Zafira", body: "B", type: "MPV", years: [2005, 2014] },
      { name: "Mokka", body: "A", type: "SUV", years: [2012, 2019] },
      { name: "Mokka", body: "B", type: "SUV", years: [2020, 2026] },
      { name: "Grandland", body: "A", type: "SUV", years: [2017, 2024] },
    ]
  },
  {
    name: "Peugeot",
    models: [
      { name: "206", body: "T1", type: "hatchback", years: [1998, 2012] },
      { name: "207", body: "A7", type: "hatchback", years: [2006, 2014] },
      { name: "208", body: "A9", type: "hatchback", years: [2012, 2019] },
      { name: "208", body: "P21", type: "hatchback", years: [2019, 2026] },
      { name: "307", body: "T5", type: "hatchback", years: [2001, 2008] },
      { name: "308", body: "T7", type: "hatchback", years: [2007, 2013] },
      { name: "308", body: "T9", type: "hatchback", years: [2013, 2021] },
      { name: "308", body: "P51", type: "hatchback", years: [2021, 2026] },
      { name: "406", body: "8", type: "sedan", years: [1995, 2004] },
      { name: "407", body: "6", type: "sedan/coupe", years: [2004, 2010] },
      { name: "508", body: "W2", type: "sedan", years: [2010, 2018] },
      { name: "508", body: "R8", type: "sedan/SW", years: [2018, 2026] },
      { name: "2008", body: "A94", type: "SUV", years: [2013, 2019] },
      { name: "2008", body: "P24", type: "SUV", years: [2019, 2026] },
      { name: "3008", body: "T84", type: "SUV", years: [2009, 2016] },
      { name: "3008", body: "P84", type: "SUV", years: [2016, 2024] },
      { name: "5008", body: "P87", type: "SUV", years: [2017, 2024] },
      { name: "RCZ", body: "T75", type: "coupe", years: [2010, 2015] },
    ]
  },
  {
    name: "Renault",
    models: [
      { name: "Megane", body: "II", type: "hatchback", years: [2002, 2009] },
      { name: "Megane", body: "III", type: "hatchback", years: [2008, 2016] },
      { name: "Megane", body: "IV", type: "hatchback", years: [2016, 2024] },
      { name: "Clio", body: "III", type: "hatchback", years: [2005, 2012] },
      { name: "Clio", body: "IV", type: "hatchback", years: [2012, 2019] },
      { name: "Clio", body: "V", type: "hatchback", years: [2019, 2026] },
      { name: "Logan", body: "L90", type: "sedan", years: [2004, 2012] },
      { name: "Logan", body: "2nd gen", type: "sedan", years: [2012, 2022] },
      { name: "Sandero", body: "1st gen", type: "hatchback", years: [2007, 2012] },
      { name: "Sandero", body: "2nd gen", type: "hatchback", years: [2012, 2020] },
      { name: "Duster", body: "1st gen", type: "SUV", years: [2010, 2017] },
      { name: "Duster", body: "2nd gen", type: "SUV", years: [2017, 2024] },
      { name: "Kaptur/Captur", body: "J5/J6", type: "SUV", years: [2013, 2026] },
      { name: "Laguna", body: "II", type: "sedan/hatch", years: [2000, 2007] },
      { name: "Laguna", body: "III", type: "sedan/hatch", years: [2007, 2015] },
      { name: "Scenic", body: "II", type: "MPV", years: [2003, 2009] },
      { name: "Koleos", body: "HY", type: "SUV", years: [2008, 2016] },
      { name: "Koleos", body: "HZG", type: "SUV", years: [2016, 2024] },
      { name: "Arkana", body: "LJL", type: "SUV coupe", years: [2019, 2026] },
    ]
  },
  {
    name: "Citroen",
    models: [
      { name: "C3", body: "II", type: "hatchback", years: [2009, 2016] },
      { name: "C3", body: "III", type: "hatchback", years: [2016, 2024] },
      { name: "C4", body: "I", type: "hatchback", years: [2004, 2010] },
      { name: "C4", body: "II", type: "hatchback", years: [2010, 2018] },
      { name: "C4", body: "III", type: "hatchback", years: [2020, 2026] },
      { name: "C5", body: "X7", type: "sedan", years: [2008, 2017] },
      { name: "C5 X", body: "E43", type: "fastback", years: [2022, 2026] },
      { name: "C6", body: "X6", type: "sedan", years: [2005, 2012] },
      { name: "C-Elysée", body: "DD", type: "sedan", years: [2012, 2022] },
      { name: "DS3", body: "A55", type: "hatchback", years: [2009, 2019] },
      { name: "DS4", body: "N", type: "hatchback", years: [2011, 2018] },
      { name: "Xsara", body: "N", type: "hatchback", years: [1997, 2006] },
      { name: "Berlingo", body: "K9", type: "MPV", years: [2018, 2026] },
      { name: "C3 Aircross", body: "A88", type: "SUV", years: [2017, 2026] },
      { name: "C5 Aircross", body: "A84", type: "SUV", years: [2017, 2026] },
    ]
  },
  {
    name: "Fiat",
    models: [
      { name: "500", body: "312", type: "hatchback", years: [2007, 2024] },
      { name: "500", body: "332 (e)", type: "hatchback/EV", years: [2020, 2026] },
      { name: "Panda", body: "169", type: "hatchback", years: [2003, 2012] },
      { name: "Panda", body: "319", type: "hatchback", years: [2012, 2026] },
      { name: "Punto", body: "188", type: "hatchback", years: [1999, 2010] },
      { name: "Punto", body: "199", type: "hatchback", years: [2005, 2018] },
      { name: "Bravo", body: "198", type: "hatchback", years: [2007, 2014] },
      { name: "Tipo", body: "356", type: "sedan/hatch/wagon", years: [2015, 2026] },
      { name: "500X", body: "334", type: "SUV", years: [2014, 2024] },
      { name: "500L", body: "330", type: "MPV", years: [2012, 2022] },
      { name: "Ducato", body: "250", type: "van", years: [2006, 2026] },
      { name: "Doblo", body: "263", type: "MPV", years: [2009, 2022] },
      { name: "Albea", body: "178", type: "sedan", years: [2002, 2012] },
    ]
  },
  {
    name: "Mini",
    models: [
      { name: "Cooper", body: "R50/R53", type: "hatchback", years: [2001, 2006] },
      { name: "Cooper", body: "R56", type: "hatchback", years: [2006, 2014] },
      { name: "Cooper", body: "F56", type: "hatchback", years: [2014, 2024] },
      { name: "Cooper", body: "F66", type: "hatchback", years: [2024, 2026] },
      { name: "Countryman", body: "R60", type: "SUV", years: [2010, 2017] },
      { name: "Countryman", body: "F60", type: "SUV", years: [2017, 2024] },
      { name: "Countryman", body: "U25", type: "SUV", years: [2024, 2026] },
      { name: "Clubman", body: "R55", type: "wagon", years: [2007, 2014] },
      { name: "Clubman", body: "F54", type: "wagon", years: [2015, 2024] },
      { name: "Paceman", body: "R61", type: "SUV coupe", years: [2012, 2016] },
      { name: "Convertible", body: "F57", type: "cabrio", years: [2016, 2024] },
    ]
  },
  {
    name: "Lada",
    models: [
      { name: "Niva", body: "2121", type: "SUV", years: [1977, 2026] },
      { name: "Niva Travel", body: "2123", type: "SUV", years: [2020, 2026] },
      { name: "Samara", body: "2108/2109", type: "hatchback", years: [1984, 2013] },
      { name: "2101-2107", body: "Classic", type: "sedan", years: [1970, 2012] },
      { name: "Priora", body: "2170", type: "sedan/hatch", years: [2007, 2018] },
      { name: "Kalina", body: "1118", type: "sedan/hatch", years: [2004, 2018] },
      { name: "Granta", body: "2190", type: "sedan/hatch", years: [2011, 2026] },
      { name: "Vesta", body: "GFL", type: "sedan/wagon", years: [2015, 2026] },
      { name: "XRAY", body: "GAB", type: "hatchback", years: [2015, 2022] },
      { name: "Largus", body: "R90", type: "wagon/van", years: [2012, 2026] },
    ]
  },
  {
    name: "UAZ",
    models: [
      { name: "Patriot", body: "3163", type: "SUV", years: [2005, 2026] },
      { name: "Hunter", body: "315195", type: "SUV", years: [2003, 2026] },
      { name: "469", body: "469", type: "SUV", years: [1972, 2011] },
      { name: "Buhanka", body: "452", type: "van", years: [1965, 2026] },
      { name: "Pickup", body: "23632", type: "pickup", years: [2008, 2026] },
    ]
  },
  {
    name: "GAZ",
    models: [
      { name: "Volga", body: "3110", type: "sedan", years: [1997, 2005] },
      { name: "Volga", body: "31105", type: "sedan", years: [2004, 2009] },
      { name: "Volga Siber", body: "Siber", type: "sedan", years: [2008, 2010] },
      { name: "Volga", body: "24", type: "sedan", years: [1970, 1992] },
      { name: "Volga", body: "21", type: "sedan", years: [1956, 1970] },
      { name: "Chaika", body: "GAZ-13", type: "sedan", years: [1959, 1981] },
      { name: "Chaika", body: "GAZ-14", type: "sedan", years: [1977, 1988] },
      { name: "Gazelle", body: "3302", type: "van/pickup", years: [1994, 2026] },
    ]
  },
  {
    name: "Daewoo",
    models: [
      { name: "Nexia", body: "N100", type: "sedan", years: [1995, 2008] },
      { name: "Matiz", body: "M100/M150", type: "hatchback", years: [1998, 2015] },
      { name: "Lanos", body: "T100", type: "sedan", years: [1997, 2002] },
      { name: "Espero", body: "KLEJ", type: "sedan", years: [1990, 1999] },
      { name: "Nubira", body: "J100", type: "sedan/wagon", years: [1997, 2002] },
      { name: "Leganza", body: "V100", type: "sedan", years: [1997, 2002] },
    ]
  },
  {
    name: "SsangYong",
    models: [
      { name: "Rexton", body: "Y200", type: "SUV", years: [2001, 2017] },
      { name: "Rexton", body: "Y400", type: "SUV", years: [2017, 2026] },
      { name: "Kyron", body: "Kyron", type: "SUV", years: [2005, 2014] },
      { name: "Actyon", body: "C100/C200", type: "SUV", years: [2005, 2020] },
      { name: "Tivoli", body: "X100", type: "SUV", years: [2015, 2026] },
    ]
  },
  {
    name: "Chery",
    models: [
      { name: "Tiggo 7 Pro", body: "T1E", type: "SUV", years: [2020, 2026] },
      { name: "Tiggo 8 Pro", body: "T18", type: "SUV", years: [2020, 2026] },
      { name: "Tiggo 4 Pro", body: "T19", type: "SUV", years: [2018, 2026] },
      { name: "Arrizo 8", body: "M1E", type: "sedan", years: [2022, 2026] },
    ]
  },
  {
    name: "Geely",
    models: [
      { name: "Coolray", body: "SX11", type: "SUV", years: [2018, 2026] },
      { name: "Atlas", body: "NL-3", type: "SUV", years: [2016, 2023] },
      { name: "Atlas Pro", body: "FX11", type: "SUV", years: [2020, 2026] },
      { name: "Tugella", body: "FY11", type: "SUV coupe", years: [2019, 2026] },
      { name: "Monjaro", body: "KX11", type: "SUV", years: [2021, 2026] },
      { name: "Emgrand", body: "EC7/SS11", type: "sedan", years: [2009, 2026] },
    ]
  },
  {
    name: "Haval",
    models: [
      { name: "Jolion", body: "B01", type: "SUV", years: [2020, 2026] },
      { name: "F7", body: "B06", type: "SUV", years: [2018, 2026] },
      { name: "F7x", body: "B06FL", type: "SUV coupe", years: [2019, 2026] },
      { name: "Dargo", body: "B03", type: "SUV", years: [2020, 2026] },
      { name: "H6", body: "B01", type: "SUV", years: [2011, 2026] },
      { name: "H9", body: "H9", type: "SUV", years: [2015, 2026] },
    ]
  },
  {
    name: "Jeep",
    models: [
      { name: "Grand Cherokee", body: "WK", type: "SUV", years: [2005, 2010] },
      { name: "Grand Cherokee", body: "WK2", type: "SUV", years: [2011, 2021] },
      { name: "Grand Cherokee", body: "WL", type: "SUV", years: [2021, 2026] },
      { name: "Cherokee", body: "KL", type: "SUV", years: [2014, 2023] },
      { name: "Wrangler", body: "JK", type: "SUV", years: [2007, 2018] },
      { name: "Wrangler", body: "JL", type: "SUV", years: [2018, 2026] },
      { name: "Compass", body: "MP", type: "SUV", years: [2017, 2026] },
      { name: "Renegade", body: "BU", type: "SUV", years: [2014, 2026] },
      { name: "Gladiator", body: "JT", type: "pickup", years: [2020, 2026] },
    ]
  },
  {
    name: "Acura",
    models: [
      { name: "TL", body: "UA6-9", type: "sedan", years: [2003, 2014] },
      { name: "TLX", body: "UB", type: "sedan", years: [2014, 2020] },
      { name: "TLX", body: "UB7", type: "sedan", years: [2020, 2026] },
      { name: "MDX", body: "YD2", type: "SUV", years: [2006, 2013] },
      { name: "MDX", body: "YD3", type: "SUV", years: [2013, 2020] },
      { name: "MDX", body: "YD4", type: "SUV", years: [2021, 2026] },
      { name: "RDX", body: "TB3/TB4", type: "SUV", years: [2012, 2018] },
      { name: "RDX", body: "TC1/TC2", type: "SUV", years: [2018, 2026] },
      { name: "NSX", body: "NC1", type: "coupe", years: [2016, 2022] },
    ]
  },
];

// ========== EXTERIOR COLORS ==========
export const EXTERIOR_COLORS = [
  { name: "Black", nameRu: "Чёрный", hex: "#1A1A1A" },
  { name: "White", nameRu: "Белый", hex: "#F5F5F5" },
  { name: "Silver", nameRu: "Серебристый", hex: "#C0C0C0" },
  { name: "Grey", nameRu: "Серый", hex: "#6B6B6B" },
  { name: "Red", nameRu: "Красный", hex: "#CC2222" },
  { name: "Blue", nameRu: "Синий", hex: "#2244AA" },
  { name: "Dark Blue", nameRu: "Тёмно-синий", hex: "#1A2A4A" },
  { name: "Green", nameRu: "Зелёный", hex: "#2A6A3A" },
  { name: "Yellow", nameRu: "Жёлтый", hex: "#E8C820" },
  { name: "Orange", nameRu: "Оранжевый", hex: "#E86A20" },
  { name: "Brown", nameRu: "Коричневый", hex: "#6B3A1E" },
  { name: "Burgundy", nameRu: "Бордовый", hex: "#6A1A2A" },
  { name: "Gold", nameRu: "Золотистый", hex: "#B8960C" },
  { name: "Beige", nameRu: "Бежевый", hex: "#D2B48C" },
  { name: "Pearl White", nameRu: "Перламутровый белый", hex: "#F0EAE2" },
  { name: "Graphite", nameRu: "Графитовый", hex: "#3A3A3E" },
];

// ========== CAMERA ANGLES ==========
export interface CameraAngle {
  id: string;
  nameRu: string;
  icon: string;
  prompt: string;
  requires4Door?: boolean;
}

export const CAMERA_ANGLES: CameraAngle[] = [
  {
    id: "driver_door",
    nameRu: "От двери водителя",
    icon: "🚪",
    prompt: "Camera positioned outside the car at the open driver's door, 3/4 overhead angle looking inward into the cabin. Driver's door fully open at about 70 degrees — the door card interior (upper trim, armrest, speaker grille, door handle pull, kick panel) is prominently visible in the foreground. Behind the door: full driver's seat with visible base, bolsters and headrest, the steering wheel centered in the cabin, full dashboard and instrument cluster, center console with shift knob, pedal box at the floor, door sill scuff plate. No occupants, keys out of the ignition, seat belt retracted. Natural daylight from the open door, sharp focus on upholstery stitching, leather grain and material textures."
  },
  {
    id: "bird_eye",
    nameRu: "Вид сверху (сквозь крышу)",
    icon: "🔭",
    prompt: "Orthographic top-down bird's-eye view with the roof and headliner digitally removed (cutaway). Entire cabin visible from directly above as a floor plan: both front seats showing the full top surfaces — seat bases, bolsters, headrests and the quilting pattern clearly readable from above; rear bench visible if the car has one; center console with shift knob, cupholders, armrest lid, storage; full dashboard top surface including instrument cluster and infotainment screen; steering wheel seen from directly above showing spokes and center pad; door cards on both sides with armrests and speakers; carpet / floor mats in all footwells; pedals visible in the driver footwell. Symmetric composition, even diffuse studio lighting, no hard shadows."
  },
  {
    id: "driver_pov",
    nameRu: "От первого лица (водитель)",
    icon: "🧑‍✈️",
    prompt: "First-person POV from the driver's seat — NO hands, NO arms, NO body parts, NO driver visible, as if an invisible driver. Eye-level view looking straight ahead. Composition: steering wheel occupies the lower third of the frame (spokes, rim, center airbag badge clearly visible); full instrument cluster visible through the top of the wheel; upper dashboard with air vents across the middle; infotainment screen to the right; windshield fills the upper half showing an empty, soft, out-of-focus environment (no road, no cars, no people); side window on the left with A-pillar trim; rearview mirror at the top center; center console and gear shifter to the right of the wheel; door card partially visible on the left. Realistic shallow depth of field — dashboard and wheel in sharp focus, outside world blurred."
  },
  {
    id: "passenger_door",
    nameRu: "От двери пассажира",
    icon: "🚶",
    prompt: "Camera positioned outside at the open front passenger door, 3/4 angle looking across the cabin toward the driver's side. Passenger door fully open — door card interior (upper panel, armrest, speaker, handle, kick panel) prominent in the foreground. Passenger seat in full view. Across the cabin: full dashboard spanning the frame (glovebox on the passenger side visible in front), center console between the seats with shift knob and tunnel, driver's seat on the far side. The steering wheel is on the FAR side of the cabin (left-hand-drive assumption) — partially visible in the distance, NOT centered in the frame. Passenger footwell with carpet/mat visible. Focus on passenger-side upholstery, door trim, glovebox handle and dashboard stitching."
  },
  {
    id: "rear_seat",
    nameRu: "С задних сидений вперёд",
    icon: "🔙",
    prompt: "Camera positioned on the rear bench at head height, centered, looking forward toward the front of the cabin. Visible: backs of both front seat headrests dominating the middle of the frame, backs of both front seats with map pockets / rear entertainment screens if present, B-pillar trim with seatbelts on both sides, headliner and sun visors above, rear of the center console / tunnel with rear air vents and USB ports between the seats, dashboard top and infotainment visible between and above the headrests, windshield in the distance showing a blurred empty environment. Rear door cards visible at the edges of the frame with their armrests and speakers.",
    requires4Door: true
  },
  {
    id: "front_to_rear",
    nameRu: "На задние сидения",
    icon: "↩️",
    prompt: "Camera positioned between the two front seats at head height, facing backward toward the rear of the cabin. Full rear bench visible filling the frame: rear seat base, bolsters, all headrests, quilting/stitching pattern clearly readable on rear seat centers. Rear door cards on both sides with armrests, handles and speakers. Rear footwell with carpet and floor mats. B-pillars with rear seatbelts. Rear window / parcel shelf in the background, headliner above. Center rear armrest visible between the two rear seats (folded up flush or folded down with cupholders). Sharp focus on rear seat upholstery, stitching, and the door card inserts.",
    requires4Door: true
  },
  {
    id: "wide_front",
    nameRu: "Панорама спереди",
    icon: "📐",
    prompt: "Wide-angle view from just inside the front windshield looking backward into the cabin. Symmetric composition centered on the cabin axis: both front seats visible with full backrests, bolsters and headrests; full curvature of the dashboard across the bottom of the frame; both door cards on the sides with armrests and speakers; center console and tunnel between the seats with shift knob, cupholders and armrest; steering wheel centered in the lower third; full instrument cluster visible. Shallow depth of field with the front seats in critical focus, rear cabin softly blurred."
  },
];

// ========== ALCANTARA ZONES (multi-select) ==========
export interface AlcantaraZone {
  id: string;
  nameRu: string;
  promptText: string;
}

export const ALCANTARA_ZONES: AlcantaraZone[] = [
  { id: "roof", nameRu: "Потолок", promptText: "the entire headliner / roof lining" },
  { id: "pillars", nameRu: "Стойки (A/B/C)", promptText: "A-pillars, B-pillars and C-pillars trim" },
  { id: "sunvisors", nameRu: "Козырьки", promptText: "sun visors" },
  { id: "door_upper", nameRu: "Верх карт дверей", promptText: "upper door panels (above the armrest)" },
  { id: "door_inserts", nameRu: "Вставки в дверях", promptText: "main door card inserts (the large central panel of each door)" },
  { id: "dash_top", nameRu: "Верх торпедо", promptText: "the upper dashboard surface (top pad)" },
  { id: "dash_full", nameRu: "Вся панель (торпедо)", promptText: "the entire dashboard — upper and lower sections" },
  { id: "steering", nameRu: "Руль (хваты)", promptText: "steering wheel grips at the 3 and 9 o'clock positions" },
  { id: "seat_centers", nameRu: "Центры сидений", promptText: "seat center panels (front seats, and rear seats if present)" },
  { id: "seat_bolsters", nameRu: "Боковые валики сидений", promptText: "seat side bolsters" },
  { id: "console", nameRu: "Центральный тоннель", promptText: "center console / tunnel side panels" },
  { id: "armrest", nameRu: "Подлокотник", promptText: "center armrest lid" },
  { id: "shift_boot", nameRu: "Чехол КПП", promptText: "shift boot / gear selector gaiter" },
];

// ========== STITCH / QUILTING PATTERNS (single-select) ==========
export interface StitchPattern {
  id: string;
  nameRu: string;
  promptText: string;
}

export const STITCH_PATTERNS: StitchPattern[] = [
  {
    id: "none",
    nameRu: "Без рисунка",
    promptText: "flat smooth seat centers with no quilting pattern, only clean perimeter contrast stitching around each panel edge"
  },
  {
    id: "diamond",
    nameRu: "Крупные ромбы (BMW M / AMG)",
    promptText: "bold diamond-quilted pattern on seat centers — large rotated squares (roughly 5–7 cm across) with crisp contrast stitching along every diamond edge, and a small contrast pin-point button at each diamond intersection (BMW M Individual / Mercedes-AMG Designo style)"
  },
  {
    id: "fine_diamond",
    nameRu: "Мелкие ромбы (Bentley)",
    promptText: "fine diamond quilting — dense crosshatch of small diamond cells (roughly 2–3 cm across) covering seat centers, door inserts and headliner where applicable, with tiny contrast stitching along each line (Bentley Mulliner / Rolls-Royce Bespoke style)"
  },
  {
    id: "honeycomb",
    nameRu: "Соты (Audi RS / Porsche)",
    promptText: "hexagonal honeycomb quilting on seat centers — regular hexagonal cells with contrast stitching around each hexagon edge (Audi RS Performance / Porsche GT3 style)"
  },
  {
    id: "horiz_pleats",
    nameRu: "Горизонтальные плиссе (Recaro)",
    promptText: "horizontal pleated ribs running across the seat centers — parallel raised seams spaced every 4–5 cm (classic Recaro Sport / Porsche classic style)"
  },
  {
    id: "vert_pleats",
    nameRu: "Вертикальные плиссе",
    promptText: "vertical pleated ribs on seat centers running top-to-bottom — parallel raised seams spaced every 4–5 cm, visible also on backrests"
  },
  {
    id: "square_grid",
    nameRu: "Квадратная сетка",
    promptText: "square-grid quilting on seat centers — aligned square cells (not rotated) with contrast stitching along each edge of every square"
  },
  {
    id: "baseball",
    nameRu: "Бейсбольная строчка (GT-R)",
    promptText: "baseball-style double contrast stitching — two parallel rows of bold contrast thread running along seat seams and around bolsters, no quilting on the centers (Nissan GT-R / sports tuner style)"
  },
  {
    id: "chevron",
    nameRu: "Шеврон / ёлочка",
    promptText: "chevron / herringbone stitching pattern on seat centers — repeating V-shaped angled ribs forming a zig-zag texture"
  },
  {
    id: "perforated",
    nameRu: "Перфорация без рисунка",
    promptText: "perforated leather on seat centers (regular dotted holes for ventilation) with no quilting, only perimeter contrast stitching"
  },
];

// ========== CAR-TYPE HELPERS ==========
// Camera angles that need rear doors / rear seat access should be hidden for strict 2-door cars.
export function hasRearAccess(type: string | undefined | null): boolean {
  if (!type) return true;
  const parts = type.toLowerCase().split('/').map(s => s.trim());
  const twoDoorOnly = new Set(['coupe', 'roadster', 'cabrio', 'convertible']);
  // Hide only if EVERY variant is a strict 2-door body style
  return !parts.every(p => twoDoorOnly.has(p));
}
