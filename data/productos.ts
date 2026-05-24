export type Producto = {
  id: number;
  codigo?: string;
  nombre: string;
  descripcion: string;
  precio: number | null;
  imagen: string[];
  stock?: "fisico" | "virtual";
  variantes?: ProductoVariante[];
};

export type ProductoVariante = {
  codigo: string;
  nombre: string;
  imagen: string;
  color: string;
};

export type FichaTecnicaItem = {
  etiqueta: string;
  valor: string;
};

const imagenes = {
  wave: [
    "/motos/honda-wave-roja.jpg",
    "/motos/honda-wave-blanca.jpg",
    "/motos/honda-wave-negra.jpg",
    "/motos/honda-wave-gris.jpg",
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
    "/motos/honda-xr-150-blanca.webp",
  ],
  hondaXr190: [
    "/motos/honda-xr-190-beige.png"
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
    "/motos/honda-tornado-300.webp",
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
    ["Potencia maxima", "9.3 HP a 7.500 rpm"],
    ["Torque maximo", "8.5 Nm a 6.000 rpm"],
    ["Arranque", "Elctrico / Patada"],
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
    ["Tipo", "Monocilíndrico, 4 tiempos OHC, refrigerado por aire"],
    ["Cilindrada", "149,1 cc"],
    ["Potencia máxima", "12,6 HP a 7.750 rpm"],
    ["Freno", "A disco"],
    ["Torque máximo", "12,5 Nm aprox."],
    ["Alimentación", "Carburador"],
    ["Encendido", "CDI electrónico"],
    ["Potencia máxima", "11.7 HP a 8.000 rpm aprox."],
    ["Torque máximo", "12,1 Nm a 6.000 rpm aprox."],
    ["Arranque", "Eléctrico/Patada"],
    ["Rendimiento estimado", "34 km/l aprox."],
  ]),
  hondaXr300: ficha([
    ["Tipo", "Monocilíndrico, 4 tiempos, 4 válvulas, OHC, refrigerado por aire y aceite"],
    ["Cilindrada", "294 cc."],
    ["Alimentación", "Inyección electrónica PGM-FI"],
    ["Potencia máxima", "24,2 HP a 7.500 rpm aprox."],
    ["Torque máximo", "26,5 Nm a 5.750 rpm"],
    ["Arranque", "Eléctrico"],
    ["Freno", "A disco"],
    ["Velocidades", "6"],
    ["Uso", "On/Off"],
  ]),
  boxer150: ficha([
    ["Cilindrada", "144,8 cc"],
    ["Velocidades", "5"],
    ["Arranque", "Eléctrico"],
    ["Freno", "A disco"],
  ]),
  boxer100: ficha([
    ["Cilindrada", "100 cc aprox."],
    ["Velocidades", "4"],
    ["Arranque", "Eléctrico / Patada"],
    ["Freno", "Tambor"],
  ]),
  cub110: ficha([
    ["Cilindrada", "107 cc"],
    ["Velocidades", "4"],
    ["Arranque", "Eléctrico"],
    ["Freno", "A disco"],
    ["Llantas", "Aleación"],
  ]),
  corvenEnergy: ficha([
    ["Tipo", "Monocilindrico, 4 tiempos, refrigerado por aire"],
    ["Cilindrada", "107 cc"],
    ["Potencia maxima", "6,6 HP a 8.500 rpm"],
    ["Alimentacion", "Carburador"],
    ["Arranque", "Eléctrico/Patada"],
    ["Transmision", "4 velocidades semiautomatica"],
  ]),
  cb190: ficha([
    ["Tipo", "Monocilíndrico, 4 tiempos, OHC"],
    ["Cilindrada", "184,4 cc"],
    ["Potencia maxima", "16,4 HP a 8.500 rpm aprox."],
    ["Torque maximo", "15,7 Nm a 6.000 rpm"],
    ["Refrigeracion", "Aire"],
    ["Alimentacion", "Inyección electrónica PGM-FI"],
    ["Arranque", "Eléctrico"],
    ["Caja", "5 velocidades"],
  ]),
    zr190: ficha([
    ["Tipo", "Monocilíndrico, 4 tiempos, OHC"],
    ["Cilindrada", "184,4 cc"],
    ["Potencia máxima", "16,4 HP a 8.500 rpm aprox."],
    ["Torque máximo", "15,7 Nm a 6.000 rpm"],
    ["Refrigeración", "Aire"],
    ["Alimentación", "Inyección electrónica PGM-FI"],
    ["Arranque", "Eléctrico"],
    ["Caja", "5 velocidades"],
  ]),      
    xr190: ficha([
    ["Tipo", "Monocilíndrico, 4 tiempos, OHC"],
    ["Cilindrada", "184.4 cc"],
    ["Freno", "A disco"],
    ["Potencia máxima", "15,6 HP a 8.500 rpm aprox."],
    ["Torque máximo", "15,7 Nm a 6.000 rpm"],
    ["Refrigeración", "Aire"],
    ["Alimentación", "Inyección electrónica PGM-FI"],
    ["Arranque", "Eléctrico/Patada"],
    ["Caja", "5 velocidades"],
    ["Velocidad máxima", "110 - 120 km/h"],
    ["Consumo estimado", "35km/l aprox"],
  ]),
  cb125: ficha([
    ["Cilindrada", "124 cc"],
    ["Velocidades", "5"],
    ["Arranque", "Eléctrico"],
    ["Freno", "A disco"],
    ["Llantas", "Aleación"],
  ]),
  cb300: ficha([
    ["Tipo", "Monocilíndrico, 4 tiempos, OHC, 4 valvulas"],
    ["Cilindrada", "294 cc"],
    ["Potencia máxima", "24,5 CV a 7.500 rpm aprox."],
    ["Torque máximo", "25,6 Nm a 5.500 rpm"],
    ["Refrigeración", "Aire con radiador de aceite"],
    ["Alimentación", "Inyección electrónica PGM-FI"],
    ["Arranque", "Eléctrico"],
  ]),
  xtz250: ficha([
    ["Cilindrada", "249 cc"],
    ["Tipo", "Monocilíndrico 4T SOHC, refrigerado por aire"],
    ["Arranque", "Eléctrico"],
    ["Diametro x carrera", "74 x 58 mm"],
    ["Relación compresion", "9.8:1"],
    ["Lubricación", "Carter humedo"],
    ["Alimentación", "Inyección electrónica"],
    ["Encendido", "TCI"],
  ]),
  xtz125: ficha([
    ["Cilindrada", "124 cc aprox."],
    ["Tipo", "Monocilíndrico 4 tiempos"],
    ["Arranque", "Eléctrico"],
    ["Transmisión", "5 velocidades"],
    ["Refrigeración", "Aire"],
  ]),
  scooter125: ficha([
    ["Cilindrada", "124,6 cc"],
    ["Arranque", "Eléctrico"],
    ["Llantas", "Aleación"],
    ["Freno", "A disco"],
    ["Transmisión", "CVT automática"],
  ]),
  rayZ: ficha([
    ["Cilindrada", "113 cc"],
    ["Tipo", "Monocilíndrico 4T SOHC, refrigerado por aire"],
    ["Llantas", "Aleación"],
    ["Transmisión", "Correa trapezoidal automática"],
    ["Embrague", "Automático centrifugo en seco"],
  ]),
};

type FichaTecnicaKey = keyof typeof fichasTecnicas;

const fichaTecnicaPorCodigo: Partial<Record<string, FichaTecnicaKey>> = {
  // MO1001: "wave",
  // MO1002: "rouser125",
  // MO1003: "motomelS2",
  // MO1004: "hondaCgGlh150",
  // MO1005: "yamahaYbr125",
  // MO1006: "yamahaFz",
  // MO1007: "hondaXr150",
  // MO1008: "boxer150",
  // MO1009: "cub110",
  // MO1010: "cub110",
  // MO1011: "corvenEnergy",
  // MO1012: "cb190",
  // MO1013: "hondaXr300",
  MO0808: "wave",
  MO0809: "wave",
  MO0810: "wave",
  MO0811: "wave",
  MO0805: "hondaXr150",
  MO0806: "hondaXr150",
  MO0830: "hondaXr300",
  MO0839: "xtz250",
  MO0841: "xtz125",
  MO0842: "xtz125",
  MO0843: "xtz125",
  MO0873: "xtz250",
  MO0891: "xtz250",
  MO0926: "hondaXr300",
  MO0846: "scooter125",
  MO0847: "scooter125",
  MO0848: "rayZ",
  MO0849: "rayZ",
  MO0850: "rayZ",
  MO0884: "scooter125",
  MO0885: "scooter125",
  MO0886: "scooter125",
  MO0902: "scooter125",
  MO0814: "cb125",
  MO0819: "xr190",
  MO0820: "cb300",
  MO0822: "cb300",
  MO0833: "hondaCgGlh150",
  MO0851: "yamahaFz",
  MO0852: "yamahaFz",
  MO0853: "yamahaFz",
  MO0854: "yamahaFz",
  MO0857: "rouser150",
  MO0858: "rouser150",
  MO0859: "rouser150",
  MO0861: "rouser125",
  MO0862: "rouser125",
  MO0866: "rouser200",
  MO0870: "rouser150",
  MO0874: "yamahaFz25",
  MO0901: "yamahaFz25",
  MO0908: "yamahaFz25",
  MO0904: "rouser150",
  MO0920: "boxer100",
  MO0918: "boxer100",
};

const normalizeModelText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");

const getFichaTecnicaKeyPorNombre = (nombre: string): FichaTecnicaKey | null => {
  const normalizedName = normalizeModelText(nombre);

  if (normalizedName.includes("wave")) return "wave";
  if (normalizedName.includes("rouser125")) return "rouser125";
  if (normalizedName.includes("rouserns200")) return "rouser200";
  if (
    normalizedName.includes("rouserp150") ||
    normalizedName.includes("rouserns150") ||
    normalizedName.includes("rouserns160")
  ) {
    return "rouser150";
  }
  if (normalizedName.includes("motomels2")) return "motomelS2";
  if (normalizedName.includes("glh150") || normalizedName.includes("cg150")) {
    return "hondaCgGlh150";
  }
  if (normalizedName.includes("ybr125")) return "yamahaYbr125";
  if (normalizedName.includes("fz25")) return "yamahaFz25";
  if (normalizedName.includes("fzs") || normalizedName.includes("fz150")) {
    return "yamahaFz";
  }
  if (normalizedName.includes("xr300") || normalizedName.includes("tornado")) {
    return "hondaXr300";
  }
  if (normalizedName.includes("xr150")) return "hondaXr150";
  if (normalizedName.includes("boxerct100")) return "boxer100";
  if (normalizedName.includes("boxer")) return "boxer150";
  if (
    normalizedName.includes("zb110") ||
    normalizedName.includes("smash") ||
    normalizedName.includes("110")
  ) {
    return "cub110";
  }
  if (normalizedName.includes("energy")) return "corvenEnergy";
  if (normalizedName.includes("cb190")) return "cb190";
  if (normalizedName.includes("cb125")) return "cb125";
  if (normalizedName.includes("cb300")) return "cb300";
  if (normalizedName.includes("xtz250")) return "xtz250";
  if (normalizedName.includes("xtz125")) return "xtz125";
  if (normalizedName.includes("fascino") || normalizedName.includes("micare")) {
    return "scooter125";
  }
  if (normalizedName.includes("rayzr")) return "rayZ";

  return null;
};

export const getFichaTecnicaProducto = (
  producto: Pick<Producto, "nombre" | "codigo">,
): FichaTecnicaItem[] => {
  const fichaTecnicaKey =
    (producto.codigo ? fichaTecnicaPorCodigo[producto.codigo] : null) ??
    getFichaTecnicaKeyPorNombre(producto.nombre);

  if (fichaTecnicaKey) return fichasTecnicas[fichaTecnicaKey];

  return ficha([
    ["Cilindrada", "Consultar"],
    ["Arranque", "Consultar"],
    ["Transmision", "Consultar"],
    ["Freno", "Consultar"],
  ]);
};

export const getCilindradaProducto = (
  producto: Pick<Producto, "nombre" | "codigo">,
): number | null => {
  const fichaTecnica = getFichaTecnicaProducto(producto);
  const cilindrada = fichaTecnica.find(
    (item) => item.etiqueta.toLowerCase() === "cilindrada",
  );
  const cilindradaMatch = cilindrada?.valor.match(/\d+(?:,\d+)?/);

  if (cilindradaMatch) {
    return Number(cilindradaMatch[0].replace(",", "."));
  }

  const nombreMatch = producto.nombre.match(/\b(\d{3})\b/);
  return nombreMatch ? Number(nombreMatch[1]) : null;
};

const stockVirtual = {
  precio: null,
  stock: "virtual" as const,
};

export const productos: Producto[] = [
  {
    id: 1,
    codigo: "MO1001",
    nombre: "Honda Wave 110 S",
    descripcion:
      "La Honda Wave 110 S es una de las motos urbanas mas vendidas de Argentina por su bajo consumo, confiabilidad mecanica y mantenimiento economico. Su motor de 110 cc y transmision semiautomatica la convierten en una opcion ideal para movilidad diaria, delivery y uso urbano intensivo.",
    precio: null,
    imagen: imagenes.wave,
    stock: "fisico",
  },
  {
    id: 2,
    codigo: "MO1002",
    nombre: "Bajaj Rouser NS 125",
    descripcion:
      "La Bajaj Rouser NS 125 combina estilo deportivo con un motor eficiente y buen nivel de equipamiento para su segmento. Ofrece una posicion de manejo comoda, buena estabilidad urbana y un rendimiento destacado para quienes buscan su primera moto street.",
    precio: null,
    imagen: imagenes.rouser,
    stock: "fisico",
  },
  {
    id: 3,
    codigo: "MO1003",
    nombre: "Motomel S2 150",
    descripcion:
      "La Motomel S2 150 es una moto utilitaria elegida por su resistencia y bajo costo operativo en el uso diario. Cuenta con motor de 150 cc, buena autonomia y una mecanica simple que facilita el mantenimiento y las reparaciones.",
    precio: null,
    imagen: imagenes.motomel,
    stock: "fisico",
  },
  {
    id: 4,
    codigo: "MO1004",
    nombre: "Honda CG 150 Titan",
    descripcion:
      "La Honda CG 150 Titan es reconocida por su durabilidad, economia y excelente reputacion en el mercado argentino. Su motor confiable y su comodidad de manejo la convierten en una moto ideal tanto para trabajo como para uso cotidiano.",
    precio: null,
    imagen: imagenes.hondaCg,
    stock: "fisico",
  },
  {
    id: 5,
    codigo: "MO1005",
    nombre: "Yamaha YBR 125",
    descripcion:
      "La Yamaha YBR 125 es una moto urbana confiable y de manejo suave, pensada para quienes buscan economia y confort en ciudad. Se destaca por su bajo consumo, calidad de construccion y excelente vida util del motor.",
    precio: null,
    imagen: imagenes.yamahaYbr,
    stock: "fisico",
  },
  {
    id: 6,
    codigo: "MO1006",
    nombre: "Yamaha FZ 150",
    descripcion:
      "La Yamaha FZ 150 ofrece un diseno moderno tipo naked junto con una conduccion comoda y estable para uso urbano. Su motor de 150 cc brinda buena respuesta, mientras que su estetica deportiva y equipamiento la hacen popular entre usuarios jovenes.",
    precio: null,
    imagen: imagenes.yamahaFz,
    stock: "fisico",
  },
  {
    id: 7,
    codigo: "MO1007",
    nombre: "Honda XR 150 L",
    descripcion:
      "La Honda XR 150L es una moto on/off disenada para adaptarse tanto a calles urbanas como a caminos rurales y terrenos irregulares. Su suspension elevada, resistencia mecanica y posicion confortable la convierten en una excelente opcion multiproposito.",
    precio: null,
    imagen: imagenes.hondaXr,
    stock: "fisico",
  },
  {
    id: 8,
    codigo: "MO1008",
    nombre: "Bajaj Boxer 150",
    descripcion:
      "La Bajaj Boxer 150 fue desarrollada para trabajo intensivo y uso diario en condiciones exigentes. Se destaca por su robustez, gran capacidad de carga, bajo consumo y una mecanica simple orientada a la durabilidad.",
    precio: null,
    imagen: imagenes.boxer,
    stock: "fisico",
  },
  {
    id: 9,
    codigo: "MO1009",
    nombre: "Zanella ZB 110",
    descripcion:
      "La Zanella ZB 110 es una moto economica y practica, ideal para desplazamientos urbanos y uso diario. Su bajo consumo de combustible y mantenimiento accesible la convierten en una opcion muy elegida dentro del segmento 110.",
    precio: null,
    imagen: imagenes.zanella,
    stock: "fisico",
  },
  {
    id: 10,
    codigo: "MO1010",
    nombre: "Gilera Smash 110",
    descripcion:
      "La Gilera Smash 110 es una de las motos mas utilizadas para delivery y movilidad urbana gracias a su confiabilidad y economia. Su transmision semiautomatica facilita el manejo y permite una conduccion sencilla para todo tipo de usuarios.",
    precio: null,
    imagen: imagenes.gilera,
    stock: "fisico",
  },
  {
    id: 11,
    codigo: "MO1011",
    nombre: "Corven Energy 110",
    descripcion:
      "La Corven Energy 110 ofrece una solucion accesible y eficiente para el transporte diario en ciudad. Cuenta con un motor confiable, bajo costo de mantenimiento y una estructura liviana que facilita la conduccion en el trafico urbano.",
    precio: null,
    imagen: imagenes.corven,
    stock: "fisico",
  },
  {
    id: 12,
    codigo: "MO1012",
    nombre: "Honda CB 190 R",
    descripcion:
      "La Honda CB 190R es una naked deportiva con diseno agresivo, buena aceleracion y excelente maniobrabilidad urbana. Equipa inyeccion electronica y frenos a disco, ofreciendo una experiencia de manejo moderna y segura.",
    precio: null,
    imagen: imagenes.hondaCb,
    stock: "fisico",
  },
  {
    id: 13,
    codigo: "MO1013",
    nombre: "Honda Tornado XR 250",
    descripcion:
      "La Honda Tornado XR 250 es una de las motos enduro mas reconocidas del mercado argentino por su potencia y resistencia. Su motor de 250 cc y suspensiones de largo recorrido la hacen ideal para aventuras off-road y viajes en caminos exigentes.",
    precio: null,
    imagen: imagenes.tornado,
    stock: "fisico",
  },
  {
    id: 14,
    codigo: "MO1014",
    nombre: "Yamaha MT-03",
    descripcion:
      "La Yamaha MT-03 es una naked deportiva de media cilindrada con gran aceleracion, diseno agresivo y excelente tecnologia. Equipada con motor bicilindrico y frenos ABS, ofrece una experiencia de manejo dinamica tanto en ciudad como en ruta.",
    precio: null,
    imagen: imagenes.mt03,
    stock: "fisico",
  },
  {
    id: 15,
    codigo: "MO1015",
    nombre: "Bajaj Dominar 400",
    descripcion:
      "La Bajaj Dominar 400 fue disenada para turismo y viajes largos, combinando potencia, estabilidad y confort de manejo. Su motor de 400 cc, iluminacion full LED y equipamiento moderno la convierten en una touring completa de su categoria.",
    precio: null,
    imagen: imagenes.dominar,
    stock: "fisico",
  },
{
  id: 16,
  codigo: "MO0808",
  nombre: "Honda Wave 110 S New rojo",
  descripcion:
    "La Honda Wave 110 S New mantiene el reconocido equilibrio entre economia, confiabilidad y practicidad para uso urbano diario. Esta version incorpora diseño actualizado y excelente autonomia, siendo ideal para quienes buscan una moto agil y de bajo mantenimiento.",
  imagen: imagenes.wave,
  variantes: [
     {
      codigo: "MO0808",
      nombre: "Honda Wave 110 S New roja",
      imagen: "/motos/honda-wave-roja.jpg",
      color: "Rojo",
    },
    {
      codigo: "MO0809",
      nombre: "Honda Wave 110 S New blanco",
      imagen: "/motos/honda-wave-blanca.jpg",
      color: "Blanco",
    },
    {
      codigo: "MO0810",
      nombre: "Honda Wave 110 S New negra",
      imagen: "/motos/honda-wave-negra.jpg",
      color: "Negro",
    },
    {
      codigo: "MO0811",
      nombre: "Honda Wave 110 S New gris",
      imagen: "/motos/honda-wave-gris.jpg",
      color: "Gris",
    },
  ],
  ...stockVirtual,
},
{
  id: 17,
  codigo: "MO0805",
  nombre: "Honda XR 150 L rojo",
  descripcion:
    "La Honda XR 150L es una moto doble proposito preparada para circular comodamente tanto en ciudad como en caminos de tierra. Su posición elevada, suspensiones resistentes y mecánica confiable la convierten en una opción muy valorada para trabajo y aventura.",
  imagen: imagenes.hondaXr,
   variantes: [
     {
      codigo: "MO0805",
      nombre: "Honda XR 150 L rojo",
      imagen: "/motos/cetrogar-honda-xr150.jpg",
      color: "Rojo",
    },
    {
      codigo: "MO0806",
      nombre: "Honda XR 150 L blanco",
      imagen: "/motos/honda-xr-150-blanca.webp",
      color: "Blanco",
    },
  ],        
  ...stockVirtual,
},
{
  id: 19,
  codigo: "MO0819",
  nombre: "Honda XR 190 L beige",
  descripcion:
    "La Honda XR 190L ofrece mayor potencia y equipamiento dentro de la linea on/off de Honda. Su motor de 190 cc, buena altura al suelo y posicion de manejo confortable permiten un desempeño eficiente tanto en ciudad como fuera del asfalto.",
  imagen: imagenes.hondaXr190,
  ...stockVirtual,
},
{
  id: 20,
  codigo: "MO0830",
  nombre: "Honda XR 300 L rojo",
  descripcion:
    "La Honda XR 300L esta orientada a usuarios que buscan una moto de aventura con mayor potencia y capacidad off-road. Su motor de mayor cilindrada y suspensiones reforzadas brindan estabilidad y rendimiento en terrenos exigentes.",
  imagen: imagenes.tornado,
  ...stockVirtual,
},
  {
    id: 21,
    codigo: "MO0839",
    nombre: "Yamaha XTZ 250 ABS Azul",
    descripcion:
      "La Yamaha XTZ 250 ABS es una doble proposito con motor de 249 cc, inyeccion electronica y arranque electrico. Su suspension de largo recorrido, frenos con ABS y postura alta la hacen apta para ciudad, ripio y caminos de uso mixto.",
    imagen: imagenes.yamahaYbr,
    ...stockVirtual,
  },
  {
    id: 22,
    codigo: "MO0841",
    nombre: "Yamaha XTZ 125 E Azul",
    descripcion:
      "La Yamaha XTZ 125 E es una on/off liviana con motor de 124 cc, caja de 5 velocidades y refrigeracion por aire. Su bajo peso, despeje y postura erguida la vuelven practica para aprender, circular en ciudad y entrar en caminos de tierra.",
    imagen: imagenes.yamahaYbr,
    ...stockVirtual,
  },
  {
    id: 23,
    codigo: "MO0842",
    nombre: "Yamaha XTZ 125 E Blanco",
    descripcion:
      "La Yamaha XTZ 125 E combina una mecanica simple de 124 cc con suspensiones pensadas para uso mixto. Es una moto confiable y facil de manejar, adecuada para traslados diarios y salidas por calles en mal estado o ripio.",
    imagen: imagenes.yamahaYbr,
    ...stockVirtual,
  },
  {
    id: 24,
    codigo: "MO0843",
    nombre: "Yamaha XTZ 125 E Negro",
    descripcion:
      "La Yamaha XTZ 125 E es una alternativa de baja cilindrada para quienes buscan una moto alta, liviana y versatil. Su motor refrigerado por aire y transmision de 5 marchas priorizan economia, control y mantenimiento sencillo.",
    imagen: imagenes.yamahaYbr,
    ...stockVirtual,
  },
  {
    id: 25,
    codigo: "MO0873",
    nombre: "Yamaha XTZ 250 ABS negro",
    descripcion:
      "La Yamaha XTZ 250 ABS utiliza un monocilindrico de 249 cc con inyeccion electronica, reconocido por su entrega progresiva. La version con ABS suma seguridad de frenado y conserva la versatilidad para transitar asfalto, tierra y recorridos largos.",
    imagen: imagenes.yamahaYbr,
    ...stockVirtual,
  },
  {
    id: 26,
    codigo: "MO0891",
    nombre: "Yamaha XTZ 250 ABS beige",
    descripcion:
      "La Yamaha XTZ 250 ABS esta pensada para quienes necesitan una doble proposito confiable con buena autonomia y respuesta. Su configuracion de 249 cc, suspensiones altas y frenos asistidos favorecen el uso diario y las escapadas fuera del asfalto.",
    imagen: imagenes.yamahaYbr,
    ...stockVirtual,
  },
  {
    id: 27,
    codigo: "MO0926",
    nombre: "Honda XR 300 L Tornado Rally Rojo",
    descripcion:
      "La Honda XR 300L Tornado Rally es una trail de 293 cc orientada al uso mixto y a caminos exigentes. Su motor monocilindrico, chasis preparado para doble proposito y posicion de manejo alta la hacen adecuada para aventura y recorridos rurales. La Honda XR 300 L está equipada con tecnología de última generación. El sistema de inyección de combustible avanzado optimiza el consumo y reduce las emisiones, mientras que el sistema de frenos ABS de doble canal garantiza una seguridad adicional en cada frenada",
    imagen: imagenes.tornado,
    ...stockVirtual,
  },
  {
    id: 28,
    codigo: "MO0846",
    nombre: "Yamaha Fascino 125 FI Negra",
    descripcion:
      "La Yamaha Fascino 125 FI es un scooter urbano con motor de 125 cc, inyeccion electronica y transmision automatica CVT. Su enfoque esta en la comodidad, bajo consumo y manejo simple para desplazamientos diarios sin cambios manuales.",
    imagen: imagenes.scooter,
    ...stockVirtual,
  },
  {
    id: 29,
    codigo: "MO0847",
    nombre: "Yamaha Fascino 125 FI Cyan",
    descripcion:
      "La Yamaha Fascino 125 FI ofrece una conduccion ligera y practica gracias a su transmision automatica y motor eficiente de 125 cc. Su diseno tipo scooter facilita el uso urbano, con buena maniobrabilidad y asiento comodo para trayectos cotidianos.",
    imagen: imagenes.scooter,
    ...stockVirtual,
  },
  {
    id: 30,
    codigo: "MO0848",
    nombre: "Yamaha Ray ZR 125 FI Rojo",
    descripcion:
      "La Yamaha Ray ZR 125 FI es un scooter de estilo deportivo con motor de 125 cc, inyeccion electronica y transmision automatica. Esta pensado para ciudad, con manejo agil, bajo peso y practicidad para usuarios que buscan movilidad sencilla.",
    imagen: imagenes.scooter,
    ...stockVirtual,
  },
  {
    id: 31,
    codigo: "MO0849",
    nombre: "Yamaha Ray ZR 125 FI Negro",
    descripcion:
      "La Yamaha Ray ZR 125 FI combina estetica deportiva con economia de combustible y conduccion automatica. Su motor de 125 cc y dimensiones compactas lo hacen comodo para transito urbano, estacionamiento y recorridos frecuentes.",
    imagen: imagenes.scooter,
    ...stockVirtual,
  },
  {
    id: 32,
    codigo: "MO0850",
    nombre: "Yamaha Ray ZR 125 FI Azul",
    descripcion:
      "La Yamaha Ray ZR 125 FI es un scooter urbano de 125 cc con respuesta progresiva y manejo muy simple. La transmision CVT elimina los cambios manuales y favorece una conduccion relajada en calles congestionadas.",
    imagen: imagenes.scooter,
    ...stockVirtual,
  },
  {
    id: 33,
    codigo: "MO0884",
    nombre: "Kymco Micare 125 - Black",
    descripcion:
      "La Kymco Micare 125 es un scooter urbano de 125 cc con transmision automatica, ideal para moverse con comodidad en ciudad. Su formato compacto, piso plano y proteccion frontal priorizan practicidad, bajo consumo y facilidad de uso.",
    imagen: imagenes.scooter,
    ...stockVirtual,
  },
  {
    id: 34,
    codigo: "MO0885",
    nombre: "Kymco Micare 125 - Ruby red",
    descripcion:
      "La Kymco Micare 125 apunta a usuarios que quieren un scooter sencillo, economico y facil de estacionar. Su motor de 125 cc y transmision CVT permiten circular sin cambios manuales, con una postura comoda para trayectos urbanos.",
    imagen: imagenes.scooter,
    ...stockVirtual,
  },
  {
    id: 35,
    codigo: "MO0886",
    nombre: "Kymco Micare 125 - Silver Blue",
    descripcion:
      "La Kymco Micare 125 es una opcion practica para movilidad diaria, con mecanica de 125 cc y conduccion automatica. Su configuracion de scooter favorece el uso cotidiano, la comodidad del conductor y los recorridos cortos dentro de la ciudad.",
    imagen: imagenes.scooter,
    ...stockVirtual,
  },
  {
    id: 36,
    codigo: "MO0902",
    nombre: "Yamaha Fascino 125 FI Rojo",
    descripcion:
      "La Yamaha Fascino 125 FI es un scooter eficiente, liviano y facil de conducir gracias a su transmision automatica. Su motor con inyeccion electronica ayuda a reducir consumo y mejora la respuesta en uso urbano.",
    imagen: imagenes.scooter,
    ...stockVirtual,
  },
  {
    id: 37,
    codigo: "MO0814",
    nombre: "Honda CB 125 F Twister negro",
    descripcion:
      "La Honda CB125F Twister es una street de 124 cc orientada a la movilidad urbana con bajo consumo y manejo facil. Su caja de 5 velocidades, freno delantero a disco y postura comoda la hacen una buena opcion para uso diario.",
    imagen: imagenes.hondaCb,
    ...stockVirtual,
  },
  {
    id: 38,
    codigo: "MO0820",
    nombre: "Honda CB 300 F Twister rojo",
    descripcion:
      "La Honda CB300F Twister es una naked de 294 cc con inyeccion electronica y motor OHC de 4 valvulas. Ofrece mayor torque y potencia que las street chicas, con postura deportiva y buen equilibrio para ciudad y ruta.",
    imagen: imagenes.hondaCb,
    ...stockVirtual,
  },
  {
    id: 39,
    codigo: "MO0822",
    nombre: "Honda CB 300 F Twister gris",
    descripcion:
      "La Honda CB300F Twister combina un monocilindrico de 294 cc con una ciclística agil para uso diario y salidas a ruta. Su equipamiento moderno, frenos a disco y respuesta contundente la ubican como una naked versatil de media cilindrada.",
    imagen: imagenes.hondaCb,
    ...stockVirtual,
  },
  {
    id: 40,
    codigo: "MO0833",
    nombre: "Honda GLH 150 rojo",
    descripcion:
      "La Honda GLH150 es una moto urbana de 149,2 cc con inyeccion electronica, pensada para eficiencia y confiabilidad. Su caja de 5 velocidades, postura comoda y bajo consumo la hacen muy apta para trabajo y traslados cotidianos.",
    imagen: imagenes.hondaCg,
    ...stockVirtual,
  },
  {
    id: 41,
    codigo: "MO0851",
    nombre: "Yamaha FZS FI V4.0 ABS Negro",
    descripcion:
      "La Yamaha FZS FI V4.0 ABS es una naked urbana con motor de 149 cc con inyeccion electronica y freno delantero con ABS. Se destaca por su bajo consumo, ergonomia comoda y diseno moderno para quienes buscan una 150 equipada.",
    imagen: imagenes.yamahaFz,
    ...stockVirtual,
  },
  {
    id: 42,
    codigo: "MO0852",
    nombre: "Yamaha FZS FI V4.0 ABS Azul",
    descripcion:
      "La Yamaha FZS FI V4.0 ABS mantiene la base eficiente de la familia FZ con inyeccion, buena estabilidad y postura relajada. El ABS delantero suma seguridad en frenadas y la hace conveniente para uso urbano intensivo.",
    imagen: imagenes.yamahaFz,
    ...stockVirtual,
  },
  {
    id: 43,
    codigo: "MO0853",
    nombre: "Yamaha FZS FI V4.0 ABS Azul LL Azul",
    descripcion:
      "La Yamaha FZS FI V4.0 ABS es una street de 150 cc pensada para economia, confort y respuesta suave en ciudad. Su estetica naked, inyeccion electronica y freno con ABS la vuelven una alternativa moderna dentro del segmento.",
    imagen: imagenes.yamahaFz,
    ...stockVirtual,
  },
  {
    id: 44,
    codigo: "MO0854",
    nombre: "Yamaha FZS FI V4.0 ABS Negra LL Dorada",
    descripcion:
      "La Yamaha FZS FI V4.0 ABS combina motor eficiente de 149 cc, ergonomia urbana y detalles deportivos de la linea FZ. La version con ABS delantero mejora el control de frenado y conserva el bajo consumo caracteristico del modelo.",
    imagen: imagenes.yamahaFz,
    ...stockVirtual,
  },
  {
    id: 45,
    codigo: "MO0857",
    nombre: "Bajaj Rouser P 150 Black Red",
    descripcion:
      "La Bajaj Rouser P150 es una street de 150 cc con orientacion deportiva y una posicion de manejo comoda para ciudad. Su motor eficiente, caja de 5 velocidades y diseno moderno la hacen una evolucion practica dentro de la familia Rouser.",
    imagen: imagenes.rouser,
    ...stockVirtual,
  },
  {
    id: 46,
    codigo: "MO0858",
    nombre: "Bajaj Rouser P 150 Caribbean",
    descripcion:
      "La Bajaj Rouser P150 ofrece una combinacion de bajo consumo, buen torque urbano y estetica naked actual. Es una moto pensada para uso diario con prestaciones suficientes para traslados rapidos y una conduccion estable.",
    imagen: imagenes.rouser,
    ...stockVirtual,
  },
  {
    id: 47,
    codigo: "MO0859",
    nombre: "Bajaj Rouser P 150 Ebony Black",
    descripcion:
      "La Bajaj Rouser P150 pertenece al segmento street 150, con motor de 4 tiempos y caja de 5 marchas. Su enfoque esta en la eficiencia, el diseno deportivo y una respuesta equilibrada para ciudad y recorridos suburbanos.",
    imagen: imagenes.rouser,
    ...stockVirtual,
  },
  {
    id: 48,
    codigo: "MO0861",
    nombre: "Bajaj Rouser 125 LS Blanco",
    descripcion:
      "La Bajaj Rouser 125 LS utiliza un motor DTS-i de 124,4 cc que prioriza rendimiento y bajo consumo. Es una moto liviana y maniobrable, ideal para primera moto, trabajo diario y trayectos urbanos frecuentes.",
    imagen: imagenes.rouser,
    ...stockVirtual,
  },
  {
    id: 49,
    codigo: "MO0862",
    nombre: "Bajaj Rouser 125 LS Negro",
    descripcion:
      "La Bajaj Rouser 125 LS combina diseno deportivo con mecanica simple de 125 cc y caja de 5 velocidades. Su buena autonomia y respuesta suave la hacen una opcion confiable para ciudad y usuarios que buscan economia.",
    imagen: imagenes.rouser,
    ...stockVirtual,
  },
  {
    id: 50,
    codigo: "MO0866",
    nombre: "Bajaj Rouser NS 200 Pearl",
    descripcion:
      "La Bajaj Rouser NS 200 es una naked deportiva con motor de 199,5 cc, caja de 6 velocidades y buena respuesta en media cilindrada. Su chasis perimetral, frenos a disco y postura agresiva la hacen apta para manejo urbano dinamico y ruta corta.",
    imagen: imagenes.rouser,
    ...stockVirtual,
  },
  {
    id: 51,
    codigo: "MO0870",
    nombre: "Bajaj Rouser NS 160 Pearl",
    descripcion:
      "La Bajaj Rouser NS 160 se ubica entre las street de baja y media cilindrada, con enfoque deportivo y buen rendimiento urbano. Su motor de 160 cc, postura naked y frenado a disco ofrecen una conduccion mas firme que una 125 tradicional.",
    imagen: imagenes.rouser,
    ...stockVirtual,
  },
    {
    id: 52,
    codigo: "MO0874",
    nombre: "Yamaha FZ25 BS Rojo",
    descripcion:
      "La Yamaha FZ25 es una naked de 249 cc con inyeccion electronica y motor SOHC refrigerado por aire y aceite segun version. Se destaca por su torque a bajas vueltas, postura comoda y facilidad para usarla tanto en ciudad como en ruta.",
    imagen: imagenes.yamahaFz,
    ...stockVirtual,
  },
    {
    id: 53,
    codigo: "MO0901",
    nombre: "Yamaha FZ25 ABS Azul",
    descripcion:
      "La Yamaha FZ25 ABS agrega asistencia antibloqueo al frenado sobre una base de 249 cc confiable y de bajo mantenimiento. Es una naked equilibrada, con buena entrega de torque y una ergonomia apta para recorridos diarios o salidas de fin de semana.",
    imagen: imagenes.yamahaFz,
    ...stockVirtual,
  },
  {
    id: 54,
    codigo: "MO0908",
    nombre: "Yamaha FZ25 AZUL",
    descripcion:
      "La Yamaha FZ25 ofrece un monocilindrico de 249 cc con respuesta elastica y consumo razonable para su cilindrada. Su diseno naked, asiento amplio y buena estabilidad la convierten en una moto versatil para ciudad y ruta.",
    imagen: imagenes.yamahaFz,
    ...stockVirtual,
  },
  {
    id: 55,
    codigo: "MO0904",
    nombre: "Rouser P 150-Red",
    descripcion:
      "La Rouser P150 es una Bajaj de 150 cc orientada al uso urbano con estilo deportivo y mecanica eficiente. Su caja de 5 velocidades, bajo consumo y postura comoda la hacen adecuada para trabajo, estudio y traslados diarios.",
    imagen: imagenes.rouser,
    ...stockVirtual,
  },
  {
    id: 56,
    codigo: "MO0920",
    nombre: "Bajaj Boxer CT 100 ROJA",
    descripcion:
      "La Bajaj Boxer CT100 es una moto utilitaria de baja cilindrada enfocada en economia, robustez y mantenimiento simple. Su motor cercano a 100 cc, transmision de 4 velocidades y construccion resistente la hacen popular para trabajo diario.",
    imagen: imagenes.boxer,
    ...stockVirtual,
  },
  {
    id: 57,
    codigo: "MO0918",
    nombre: "Bajaj Boxer CT 100 Azul/Negro",
    descripcion:
      "La Bajaj Boxer CT100 prioriza bajo consumo y durabilidad por encima de prestaciones deportivas. Es una moto liviana y sencilla, adecuada para recorridos urbanos, tareas de reparto y usuarios que buscan costos operativos reducidos.",
    imagen: imagenes.boxer,
    ...stockVirtual,
  },
];
