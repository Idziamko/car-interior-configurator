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
    ]
  },
  {
    name: "Mercedes-Benz",
    models: [
      { name: "C-Class", body: "W202", type: "sedan", years: [1993, 2000] },
      { name: "C-Class", body: "W203", type: "sedan", years: [2000, 2007] },
      { name: "C-Class", body: "W204", type: "sedan", years: [2007, 2014] },
      { name: "C-Class", body: "W205", type: "sedan/coupe", years: [2014, 2021] },
      { name: "C-Class", body: "W206", type: "sedan", years: [2021, 2026] },
      { name: "E-Class", body: "W210", type: "sedan", years: [1995, 2003] },
      { name: "E-Class", body: "W211", type: "sedan", years: [2002, 2009] },
      { name: "E-Class", body: "W212", type: "sedan", years: [2009, 2016] },
      { name: "E-Class", body: "W213", type: "sedan/coupe", years: [2016, 2023] },
      { name: "E-Class", body: "W214", type: "sedan", years: [2023, 2026] },
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
      { name: "NSX", body: "NC1", type: "coupe", years: [2016, 2022] },
    ]
  },
  {
    name: "Nissan",
    models: [
      { name: "GT-R", body: "R35", type: "coupe", years: [2007, 2026] },
      { name: "350Z", body: "Z33", type: "coupe", years: [2002, 2009] },
      { name: "370Z", body: "Z34", type: "coupe", years: [2009, 2020] },
      { name: "Z", body: "Z (RZ34)", type: "coupe", years: [2023, 2026] },
      { name: "Skyline", body: "R34", type: "coupe/sedan", years: [1998, 2002] },
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
      { name: "LS", body: "XF40", type: "sedan", years: [2006, 2017] },
      { name: "LS", body: "XF50", type: "sedan", years: [2017, 2026] },
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
      { name: "MX-5/Miata", body: "NB", type: "roadster", years: [1998, 2005] },
      { name: "MX-5/Miata", body: "NC", type: "roadster", years: [2005, 2015] },
      { name: "MX-5/Miata", body: "ND", type: "roadster", years: [2015, 2026] },
      { name: "3", body: "BL", type: "sedan/hatch", years: [2009, 2013] },
      { name: "3", body: "BM/BN", type: "sedan/hatch", years: [2013, 2019] },
      { name: "3", body: "BP", type: "sedan/hatch", years: [2019, 2026] },
      { name: "6", body: "GJ/GL", type: "sedan", years: [2012, 2023] },
      { name: "CX-5", body: "KE", type: "SUV", years: [2012, 2017] },
      { name: "CX-5", body: "KF", type: "SUV", years: [2017, 2026] },
      { name: "RX-7", body: "FD", type: "coupe", years: [1992, 2002] },
      { name: "RX-8", body: "SE3P", type: "coupe", years: [2003, 2012] },
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
      { name: "4C", body: "960", type: "coupe", years: [2013, 2020] },
    ]
  },
  {
    name: "Infiniti",
    models: [
      { name: "G35/G37", body: "V36", type: "sedan/coupe", years: [2007, 2015] },
      { name: "Q50", body: "V37", type: "sedan", years: [2014, 2026] },
      { name: "Q60", body: "CV37", type: "coupe", years: [2017, 2024] },
      { name: "QX80", body: "Z62", type: "SUV", years: [2010, 2026] },
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
}

export const CAMERA_ANGLES: CameraAngle[] = [
  {
    id: "driver_door",
    nameRu: "С двери водителя",
    icon: "🚪",
    prompt: "Camera: from open driver's door, 3/4 overhead angle, full cabin visible, door fully open"
  },
  {
    id: "bird_eye",
    nameRu: "Вид сверху",
    icon: "🔭",
    prompt: "Camera: top-down bird's eye view, roof removed, entire cabin visible from directly above"
  },
  {
    id: "driver_pov",
    nameRu: "Глазами водителя",
    icon: "🧑‍✈️",
    prompt: "Camera: from driver's seat POV, hands-on-wheel perspective, looking at dashboard, steering wheel and center console"
  },
  {
    id: "passenger_door",
    nameRu: "Со стороны пассажира",
    icon: "🚶",
    prompt: "Camera: from open passenger door, 3/4 view looking across to driver's side, full interior visible"
  },
  {
    id: "rear_seat",
    nameRu: "С заднего ряда",
    icon: "🔙",
    prompt: "Camera: from rear seat perspective, looking forward at front seats headrests, dashboard and center console"
  },
  {
    id: "wide_front",
    nameRu: "Панорама спереди",
    icon: "📐",
    prompt: "Camera: wide-angle from front windshield looking in, both seats and full dashboard visible, symmetric composition"
  },
];
