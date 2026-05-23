export type Producto = {
  id: number;
  codigo?: string;
  nombre: string;
  descripcion: string;
  precio: number | null;
  imagen: string[];
  stock?: "fisico" | "virtual";
};

export type FichaTecnicaItem = {
  etiqueta: string;
  valor: string;
};

const imagenes = {
  wave: [
    "/motos/cetrogar-wave.jpg",
    "/motos/67c-021c-8img-web-wave-2025-roja-2.jpg",
  ],
  rouser: [
    "/motos/cetrogar-bajaj-rouser-125.webp",
  ],
  motomel: [
    "/motos/cetrogar-honda-xr150.jpg",
  ],
  hondaCg: [
    "/motos/cetrogar-honda-cb190.webp",
  ],
  yamahaYbr: [
    "/motos/cetrogar-yamaha-xtz-250.jpeg",
  ],
  yamahaFz: [
    "/motos/cetrogar-bajaj-rouser-125.webp",
  ],
  hondaXr: [
    "/motos/cetrogar-honda-xr150.jpg",
  ],
  boxer: [
    "/motos/cetrogar-bajaj-rouser-125.webp",
  ],
  zanella: [
    "/motos/cetrogar-wave.jpg",
  ],
  gilera: [
    "/motos/cetrogar-wave.jpg",
  ],
  corven: [
    "/motos/cetrogar-wave.jpg",
  ],
  hondaCb: [
    "/motos/cetrogar-honda-cb190.webp",
    "/motos/cetrogar-honda-cb300.jpg",
  ],
  tornado: [
    "/motos/cetrogar-honda-xr150.jpg",
    "/motos/cetrogar-yamaha-xtz-250.jpeg",
  ],
  mt03: [
    "/motos/cetrogar-yamaha-xtz-250.jpeg",
  ],
  dominar: [
    "/motos/cetrogar-bajaj-rouser-125.webp",
  ],
  scooter: [
    "/motos/cetrogar-kymco-agility.png",
  ],
};

export const getProductoImagenPrincipal = (imagen: string[]) => imagen[0] ?? "";

const ficha = (items: Array<[string, string]>): FichaTecnicaItem[] =>
  items.map(([etiqueta, valor]) => ({ etiqueta, valor }));

const fichasTecnicas = {
  wave: ficha([
    ["Cilindrada", "109 cc"],
    ["Velocidades", "4"],
    ["Arranque", "Electrico / Patada"],
    ["Llantas", "Rayos"],
    ["Freno", "A disco"],
  ]),
  rouser125: ficha([
    ["Tipo", "Monocilindrico, 4 tiempos, DTS-i"],
    ["Cilindrada", "124,4 cc"],
    ["Refrigeracion", "Aire"],
    ["Potencia maxima", "12 HP a 8.500 rpm"],
    ["Torque maximo", "11 Nm a 6.500 rpm"],
    ["Alimentacion", "Carburador"],
    ["Arranque", "Electrico y pedal"],
    ["Caja", "5 velocidades"],
  ]),
  rouser150: ficha([
    ["Cilindrada", "150 cc aprox."],
    ["Velocidades", "5"],
    ["Arranque", "Electrico"],
    ["Freno", "A disco"],
    ["Llantas", "Aleacion"],
  ]),
  rouser200: ficha([
    ["Cilindrada", "199,5 cc"],
    ["Velocidades", "6"],
    ["Arranque", "Electrico"],
    ["Freno", "A disco"],
    ["Llantas", "Aleacion"],
  ]),
  motomelS2: ficha([
    ["Motor", "Monocilindrico 4 tiempos"],
    ["Cilindrada", "149,5 cc"],
    ["Potencia maxima", "13,4 HP a 8.500 rpm"],
    ["Refrigeracion", "Aire"],
    ["Alimentacion", "Carburador"],
    ["Arranque", "Electrico y pedal"],
    ["Transmision", "Manual 5 velocidades"],
  ]),
  hondaCgGlh150: ficha([
    ["Cilindrada", "149,2 cc"],
    ["Velocidades", "5"],
    ["Arranque", "Electrico"],
    ["Freno", "A disco"],
    ["Llantas", "Aleacion"],
  ]),
  yamahaYbr125: ficha([
    ["Cilindrada", "124 cc"],
    ["Velocidades", "5"],
    ["Arranque", "Electrico"],
    ["Freno", "A disco"],
    ["Llantas", "Aleacion"],
  ]),
  yamahaFz: ficha([
    ["Cilindrada", "153 cc"],
    ["Velocidades", "5"],
    ["Arranque", "Electrico"],
    ["Freno", "A disco"],
    ["Llantas", "Aleacion"],
  ]),
  yamahaFz25: ficha([
    ["Cilindrada", "249 cc"],
    ["Velocidades", "5"],
    ["Arranque", "Electrico"],
    ["Freno", "A disco"],
    ["Llantas", "Aleacion"],
  ]),
  hondaXr150: ficha([
    ["Tipo", "Monocilindrico, 4 tiempos OHC, refrigerado por aire"],
    ["Cilindrada", "149,1 cc"],
    ["Potencia maxima", "12,6 HP a 7.750 rpm"],
    ["Torque maximo", "12,5 Nm aprox."],
    ["Alimentacion", "Carburador"],
    ["Encendido", "CDI electronico"],
    ["Arranque", "Electrico y pedal"],
  ]),
  hondaXr300: ficha([
    ["Tipo", "Monocilindrico, 4 tiempos"],
    ["Cilindrada", "293 cc aprox."],
    ["Arranque", "Electrico"],
    ["Freno", "A disco"],
    ["Uso", "On/Off"],
  ]),
  boxer150: ficha([
    ["Cilindrada", "144,8 cc"],
    ["Velocidades", "5"],
    ["Arranque", "Electrico"],
    ["Freno", "A disco"],
  ]),
  boxer100: ficha([
    ["Cilindrada", "100 cc aprox."],
    ["Velocidades", "4"],
    ["Arranque", "Electrico / Patada"],
    ["Freno", "Tambor"],
  ]),
  cub110: ficha([
    ["Cilindrada", "107 cc"],
    ["Velocidades", "4"],
    ["Arranque", "Electrico"],
    ["Freno", "A disco"],
    ["Llantas", "Aleacion"],
  ]),
  corvenEnergy: ficha([
    ["Tipo", "Monocilindrico, 4 tiempos, refrigerado por aire"],
    ["Cilindrada", "107 cc"],
    ["Potencia maxima", "6,6 HP a 8.500 rpm"],
    ["Alimentacion", "Carburador"],
    ["Arranque", "Electrico y pedal"],
    ["Transmision", "4 velocidades semiautomatica"],
  ]),
  cb190: ficha([
    ["Tipo", "Monocilindrico, 4 tiempos, OHC"],
    ["Cilindrada", "184,4 cc"],
    ["Potencia maxima", "16,4 HP a 8.500 rpm aprox."],
    ["Torque maximo", "15,7 Nm a 6.000 rpm"],
    ["Refrigeracion", "Aire"],
    ["Alimentacion", "Inyeccion electronica PGM-FI"],
    ["Arranque", "Electrico"],
    ["Caja", "5 velocidades"],
  ]),
  cb125: ficha([
    ["Cilindrada", "124 cc"],
    ["Velocidades", "5"],
    ["Arranque", "Electrico"],
    ["Freno", "A disco"],
    ["Llantas", "Aleacion"],
  ]),
  cb300: ficha([
    ["Tipo", "Monocilindrico, 4 tiempos, OHC, 4 valvulas"],
    ["Cilindrada", "294 cc"],
    ["Potencia maxima", "24,5 CV a 7.500 rpm aprox."],
    ["Torque maximo", "25,6 Nm a 5.500 rpm"],
    ["Refrigeracion", "Aire con radiador de aceite"],
    ["Alimentacion", "Inyeccion electronica PGM-FI"],
    ["Arranque", "Electrico"],
  ]),
  xtz250: ficha([
    ["Cilindrada", "249 cc"],
    ["Tipo", "Monocilindrico 4T SOHC, refrigerado por aire"],
    ["Arranque", "Electrico"],
    ["Diametro x carrera", "74 x 58 mm"],
    ["Relacion compresion", "9.8:1"],
    ["Lubricacion", "Carter humedo"],
    ["Alimentacion", "Inyeccion electronica"],
    ["Encendido", "TCI"],
  ]),
  xtz125: ficha([
    ["Cilindrada", "124 cc aprox."],
    ["Tipo", "Monocilindrico 4 tiempos"],
    ["Arranque", "Electrico"],
    ["Transmision", "5 velocidades"],
    ["Refrigeracion", "Aire"],
  ]),
  scooter125: ficha([
    ["Cilindrada", "124,6 cc"],
    ["Arranque", "Electrico"],
    ["Llantas", "Aleacion"],
    ["Freno", "A disco"],
    ["Transmision", "CVT automatica"],
  ]),
  rayZ: ficha([
    ["Cilindrada", "113 cc"],
    ["Tipo", "Monocilindrico 4T SOHC, refrigerado por aire"],
    ["Llantas", "Aleacion"],
    ["Transmision", "Correa trapezoidal automatica"],
    ["Embrague", "Automatico centrifugo en seco"],
  ]),
};

export const getFichaTecnicaProducto = (
  producto: Pick<Producto, "nombre">,
): FichaTecnicaItem[] => {
  const nombre = producto.nombre.toLowerCase();

  if (nombre.includes("wave")) return fichasTecnicas.wave;
  if (nombre.includes("rouser 125")) return fichasTecnicas.rouser125;
  if (nombre.includes("rouser ns 200")) return fichasTecnicas.rouser200;
  if (nombre.includes("rouser p150") || nombre.includes("rouser ns 150")) {
    return fichasTecnicas.rouser150;
  }
  if (nombre.includes("motomel s2")) return fichasTecnicas.motomelS2;
  if (nombre.includes("glh150") || nombre.includes("cg 150")) {
    return fichasTecnicas.hondaCgGlh150;
  }
  if (nombre.includes("ybr 125")) return fichasTecnicas.yamahaYbr125;
  if (nombre.includes("fz25")) return fichasTecnicas.yamahaFz25;
  if (nombre.includes("fzs") || nombre.includes("fz 150")) {
    return fichasTecnicas.yamahaFz;
  }
  if (nombre.includes("xr 300") || nombre.includes("tornado")) {
    return fichasTecnicas.hondaXr300;
  }
  if (nombre.includes("xr 150")) return fichasTecnicas.hondaXr150;
  if (nombre.includes("boxer ct100")) return fichasTecnicas.boxer100;
  if (nombre.includes("boxer")) return fichasTecnicas.boxer150;
  if (
    nombre.includes("zb 110") ||
    nombre.includes("smash") ||
    nombre.includes("110")
  ) {
    return fichasTecnicas.cub110;
  }
  if (nombre.includes("energy")) return fichasTecnicas.corvenEnergy;
  if (nombre.includes("cb190")) return fichasTecnicas.cb190;
  if (nombre.includes("cb125")) return fichasTecnicas.cb125;
  if (nombre.includes("cb300")) return fichasTecnicas.cb300;
  if (nombre.includes("xtz 250")) return fichasTecnicas.xtz250;
  if (nombre.includes("xtz 125")) return fichasTecnicas.xtz125;
  if (nombre.includes("fascino") || nombre.includes("micare")) {
    return fichasTecnicas.scooter125;
  }
  if (nombre.includes("ray zr")) return fichasTecnicas.rayZ;

  return ficha([
    ["Cilindrada", "Consultar"],
    ["Arranque", "Consultar"],
    ["Transmision", "Consultar"],
    ["Freno", "Consultar"],
  ]);
};

const stockVirtual = {
  descripcion:
    "Unidad de stock virtual. Consulta disponibilidad, colores, precio actualizado y financiacion.",
  precio: null,
  stock: "virtual" as const,
};

export const productos: Producto[] = [
  {
    id: 1,
    nombre: "Honda Wave 110 S",
    descripcion:
      "Ideal para ciudad, bajo consumo y alta confiabilidad.",
    precio: 4000000,
    imagen: imagenes.wave,
    stock: "fisico",
  },
  {
    id: 2,
    nombre: "Bajaj Rouser NS 125",
    descripcion:
      "Sport de entrada, diseno moderno y excelente relacion precio/potencia.",
    precio: 1500000,
    imagen: imagenes.rouser,
    stock: "fisico",
  },
  {
    id: 3,
    nombre: "Motomel S2 150",
    descripcion:
      "Moto utilitaria resistente, ideal para trabajo y uso diario.",
    precio: 2200000,
    imagen: imagenes.motomel,
    stock: "fisico",
  },
  {
    id: 4,
    nombre: "Honda CG 150 Titan",
    descripcion:
      "Clasica confiable, muy usada en Argentina por su durabilidad.",
    precio: 2500000,
    imagen: imagenes.hondaCg,
    stock: "fisico",
  },
  {
    id: 5,
    nombre: "Yamaha YBR 125",
    descripcion:
      "Moto urbana liviana, economica y muy facil de manejar.",
    precio: 2100000,
    imagen: imagenes.yamahaYbr,
    stock: "fisico",
  },
  {
    id: 6,
    nombre: "Yamaha FZ 150",
    descripcion: "Diseno deportivo con buen rendimiento en ciudad.",
    precio: 2900000,
    imagen: imagenes.yamahaFz,
    stock: "fisico",
  },
  {
    id: 7,
    nombre: "Honda XR 150L",
    descripcion: "On/Off versatil para ciudad y caminos rurales.",
    precio: 3200000,
    imagen: imagenes.hondaXr,
    stock: "fisico",
  },
  {
    id: 8,
    nombre: "Bajaj Boxer 150",
    descripcion: "Ultra resistente, pensada para trabajo intensivo.",
    precio: 2000000,
    imagen: imagenes.boxer,
    stock: "fisico",
  },
  {
    id: 9,
    nombre: "Zanella ZB 110",
    descripcion:
      "Una de las 110 mas vendidas del pais, economica y simple.",
    precio: 1400000,
    imagen: imagenes.zanella,
    stock: "fisico",
  },
  {
    id: 10,
    nombre: "Gilera Smash 110",
    descripcion: "Muy usada en delivery por su bajo costo de mantenimiento.",
    precio: 1600000,
    imagen: imagenes.gilera,
    stock: "fisico",
  },
  {
    id: 11,
    nombre: "Corven Energy 110",
    descripcion: "Economica y practica para movilidad urbana.",
    precio: 1500000,
    imagen: imagenes.corven,
    stock: "fisico",
  },
  {
    id: 12,
    nombre: "Honda CB 190R",
    descripcion: "Naked sport con diseno moderno y buena potencia.",
    precio: 4100000,
    imagen: imagenes.hondaCb,
    stock: "fisico",
  },
  {
    id: 13,
    nombre: "Honda Tornado XR 250",
    descripcion: "Enduro clasica en Argentina, ideal para todo terreno.",
    precio: 6500000,
    imagen: imagenes.tornado,
    stock: "fisico",
  },
  {
    id: 14,
    nombre: "Yamaha MT-03",
    descripcion:
      "Naked deportiva de media cilindrada con gran performance.",
    precio: 8500000,
    imagen: imagenes.mt03,
    stock: "fisico",
  },
  {
    id: 15,
    nombre: "Bajaj Dominar 400",
    descripcion: "Touring potente, ideal para viajes largos y ruta.",
    precio: 9000000,
    imagen: imagenes.dominar,
    stock: "fisico",
  },
  {
    id: 16,
    codigo: "MO0809",
    nombre: "Honda Wave 110 S New blanco",
    imagen: imagenes.wave,
    ...stockVirtual,
  },
  {
    id: 17,
    codigo: "MO0810",
    nombre: "Honda Wave 110 S New negro",
    imagen: imagenes.wave,
    ...stockVirtual,
  },
  {
    id: 18,
    codigo: "MO0811",
    nombre: "Honda Wave 110 S New gris",
    imagen: imagenes.wave,
    ...stockVirtual,
  },
  {
    id: 19,
    codigo: "MO0805",
    nombre: "Honda XR 150L rojo",
    imagen: imagenes.hondaXr,
    ...stockVirtual,
  },
  {
    id: 20,
    codigo: "MO0806",
    nombre: "Honda XR 150L blanco",
    imagen: imagenes.hondaXr,
    ...stockVirtual,
  },
  {
    id: 21,
    codigo: "MO0819",
    nombre: "Honda XR 190L beige",
    imagen: imagenes.hondaXr,
    ...stockVirtual,
  },
  {
    id: 22,
    codigo: "MO0830",
    nombre: "Honda XR 300L rojo",
    imagen: imagenes.tornado,
    ...stockVirtual,
  },
  {
    id: 23,
    codigo: "MO0839",
    nombre: "Yamaha XTZ 250 ABS Azul",
    imagen: imagenes.yamahaYbr,
    ...stockVirtual,
  },
  {
    id: 24,
    codigo: "MO0841",
    nombre: "Yamaha XTZ 125 E Azul",
    imagen: imagenes.yamahaYbr,
    ...stockVirtual,
  },
  {
    id: 25,
    codigo: "MO0842",
    nombre: "Yamaha XTZ 125 E Blanco",
    imagen: imagenes.yamahaYbr,
    ...stockVirtual,
  },
  {
    id: 26,
    codigo: "MO0843",
    nombre: "Yamaha XTZ 125 E Negro",
    imagen: imagenes.yamahaYbr,
    ...stockVirtual,
  },
  {
    id: 27,
    codigo: "MO0873",
    nombre: "Yamaha XTZ 250 ABS negro",
    imagen: imagenes.yamahaYbr,
    ...stockVirtual,
  },
  {
    id: 28,
    codigo: "MO0891",
    nombre: "Yamaha XTZ 250 ABS beige",
    imagen: imagenes.yamahaYbr,
    ...stockVirtual,
  },
  {
    id: 29,
    codigo: "MO0926",
    nombre: "Honda XR 300L Tornado Rally Rojo",
    imagen: imagenes.tornado,
    ...stockVirtual,
  },
  {
    id: 30,
    codigo: "MO0846",
    nombre: "Yamaha Fascino 125 FI Negra",
    imagen: imagenes.scooter,
    ...stockVirtual,
  },
  {
    id: 31,
    codigo: "MO0847",
    nombre: "Yamaha Fascino 125 FI Cyan",
    imagen: imagenes.scooter,
    ...stockVirtual,
  },
  {
    id: 32,
    codigo: "MO0848",
    nombre: "Yamaha Ray ZR 125 FI Rojo",
    imagen: imagenes.scooter,
    ...stockVirtual,
  },
  {
    id: 33,
    codigo: "MO0849",
    nombre: "Yamaha Ray ZR 125 FI Negro",
    imagen: imagenes.scooter,
    ...stockVirtual,
  },
  {
    id: 34,
    codigo: "MO0850",
    nombre: "Yamaha Ray ZR 125 FI Azul",
    imagen: imagenes.scooter,
    ...stockVirtual,
  },
  {
    id: 35,
    codigo: "MO0884",
    nombre: "Kymco Micare 125 - Black",
    imagen: imagenes.scooter,
    ...stockVirtual,
  },
  {
    id: 36,
    codigo: "MO0885",
    nombre: "Kymco Micare 125 - Ruby red",
    imagen: imagenes.scooter,
    ...stockVirtual,
  },
  {
    id: 37,
    codigo: "MO0886",
    nombre: "Kymco Micare 125 - Silver Blue",
    imagen: imagenes.scooter,
    ...stockVirtual,
  },
  {
    id: 38,
    codigo: "MO0902",
    nombre: "Yamaha Fascino 125 FI Rojo",
    imagen: imagenes.scooter,
    ...stockVirtual,
  },
  {
    id: 39,
    codigo: "MO0814",
    nombre: "Honda CB125F Twister negro",
    imagen: imagenes.hondaCb,
    ...stockVirtual,
  },
  {
    id: 40,
    codigo: "MO0820",
    nombre: "Honda CB300F Twister rojo",
    imagen: imagenes.hondaCb,
    ...stockVirtual,
  },
  {
    id: 41,
    codigo: "MO0822",
    nombre: "Honda CB300F Twister gris",
    imagen: imagenes.hondaCb,
    ...stockVirtual,
  },
  {
    id: 42,
    codigo: "MO0833",
    nombre: "Honda GLH150 rojo",
    imagen: imagenes.hondaCg,
    ...stockVirtual,
  },
  {
    id: 43,
    codigo: "MO0851",
    nombre: "Yamaha FZS FI V4.0 ABS Negro",
    imagen: imagenes.yamahaFz,
    ...stockVirtual,
  },
  {
    id: 44,
    codigo: "MO0852",
    nombre: "Yamaha FZS FI V4.0 ABS Azul",
    imagen: imagenes.yamahaFz,
    ...stockVirtual,
  },
  {
    id: 45,
    codigo: "MO0853",
    nombre: "Yamaha FZS FI V4.0 ABS Azul LL Azul",
    imagen: imagenes.yamahaFz,
    ...stockVirtual,
  },
  {
    id: 46,
    codigo: "MO0854",
    nombre: "Yamaha FZS FI V4.0 ABS Negra LL Dorada",
    imagen: imagenes.yamahaFz,
    ...stockVirtual,
  },
  {
    id: 47,
    codigo: "MO0857",
    nombre: "Bajaj Rouser P150 Black Red",
    imagen: imagenes.rouser,
    ...stockVirtual,
  },
  {
    id: 48,
    codigo: "MO0858",
    nombre: "Bajaj Rouser P150 Caribbean",
    imagen: imagenes.rouser,
    ...stockVirtual,
  },
  {
    id: 49,
    codigo: "MO0859",
    nombre: "Bajaj Rouser P150 Ebony Black",
    imagen: imagenes.rouser,
    ...stockVirtual,
  },
  {
    id: 50,
    codigo: "MO0861",
    nombre: "Bajaj Rouser 125 LS Blanco",
    imagen: imagenes.rouser,
    ...stockVirtual,
  },
  {
    id: 51,
    codigo: "MO0862",
    nombre: "Bajaj Rouser 125 LS Negro",
    imagen: imagenes.rouser,
    ...stockVirtual,
  },
  {
    id: 52,
    codigo: "MO0866",
    nombre: "Bajaj Rouser NS 200 Pear",
    imagen: imagenes.rouser,
    ...stockVirtual,
  },
  {
    id: 53,
    codigo: "MO0870",
    nombre: "Bajaj Rouser NS 150 Pear",
    imagen: imagenes.rouser,
    ...stockVirtual,
  },
  {
    id: 54,
    codigo: "MO0908",
    nombre: "Yamaha FZ25 AZUL",
    imagen: imagenes.yamahaFz,
    ...stockVirtual,
  },
  {
    id: 55,
    codigo: "MO0904",
    nombre: "Rouser P150-Red",
    imagen: imagenes.rouser,
    ...stockVirtual,
  },
  {
    id: 56,
    codigo: "MO0920",
    nombre: "Bajaj Boxer CT100 ROJA",
    imagen: imagenes.boxer,
    ...stockVirtual,
  },
  {
    id: 57,
    codigo: "MO0918",
    nombre: "Bajaj Boxer CT100 Azul/Negro",
    imagen: imagenes.boxer,
    ...stockVirtual,
  },
];
