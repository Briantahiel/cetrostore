import productosData from "./productos.json";

export type Producto = {
  id: number;
  codigo?: string;
  nombre: string;
  descripcion: string;
  precio: number | null;
  imagen: string[];
  stock?: "fisico" | "virtual";
  variantes?: ProductoVariante[];
  fichaTecnica?: FichaTecnicaItem[];
};

export type ProductoVariante = {
  codigo: string;
  nombre: string;
  imagen: string;
  color: string;
  descripcion?: string;
  precio?: number | null;
  stock?: "fisico" | "virtual";
  fichaTecnica?: FichaTecnicaItem[];
};

export type FichaTecnicaItem = {
  etiqueta: string;
  valor: string;
};

export const getProductoImagenPrincipal = (imagen: string[]) => imagen[0] ?? "";

const ficha = (items: Array<[string, string]>): FichaTecnicaItem[] =>
  items.map(([etiqueta, valor]) => ({ etiqueta, valor }));

const fichasTecnicas = {
  wave: ficha([
    ["Cilindrada", "109 cc"],
    ["Velocidades", "4"],
    ["Alimentacion", "Carburador"],
    ["Potencia máxima", "9.3 HP a 7.500 rpm"],
    ["Torque máximo", "8.5 Nm a 6.000 rpm"],
    ["Arranque", "Eléctrico / Patada"],
    ["Llantas", "Rayos"],
    ["Freno", "A disco"],
  ]),
  gilera: ficha([
    ["Tipo", "Monocilíndrico, 4 tiempos"],
    ["Cilindrada", "107 cc"],
    ["Refrigeración", "Aire"],
    ["Alimentación", "Carburador"],
    ["Frenos", "Delantero a tambor o disco"],
    ["Potencia máxima", "6,6 HP a 8.500 rpm"],
    ["Caja", "4 velocidades semiautomática"],
    ["Arranque", "Eléctrico / Patada"],
  ]),
  kellerEcoCrono110: ficha([
    ["Tipo", "Monocilíndrico, 4 tiempos"],
    ["Cilindrada", "107 cc"],
    ["Refrigeración", "Aire"],
    ["Alimentación", "Carburador"],
    ["Frenos", "Delantero a tambor o disco"],
    ["Potencia máxima", "6,5 HP a 8.000 rpm"],
    ["Caja", "4 velocidades semiautomática"],
    ["Arranque", "Eléctrico / Patada"],
  ]),
  zanellaZb110: ficha([
    ["Tipo", "Monocilindrico, 4 tiempos, OCH"],
    ["Cilindrada", "107 cc"],
    ["Potencia máxima", "6.7 a 7.2 HP"],
    ["Alimentacion", "Carburador"],
    ["Arranque", "Electrico / Patada"],
    ["Refrigeración", "Aire"],
    ["Caja", "4 velocidades semiautomática"],
  ]),
  rouser125: ficha([
    ["Tipo", "Monocilindrico, 4 tiempos, DTS-i"],
    ["Cilindrada", "124,4 cc"],
    ["Refrigeracion", "Aire"],
    ["Potencia maxima", "12 HP a 8.500 rpm"],
    ["Torque maximo", "11 Nm a 6.500 rpm"],
    ["Alimentacion", "Carburador"],
    ["Arranque", "Electrico / Patada"],
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
    ["Arranque", "Electrico / Patada"],
    ["Transmision", "Manual 5 velocidades"],
  ]),
  hondaCgGlh150: ficha([
    ["Tipo", "Monocilíndrico, 4 tiempos, OHC"],
    ["Cilindrada", "149,2 cc"],
    ["Velocidades", "5"],
    ["Refrigeración", "Aire"],
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
  hondaXr300Rally: ficha([
    ["Tipo", "Monocilíndrico, 4 tiempos, 4 válvulas, OHC, refrigerado por aire y aceite"],
    ["Cilindrada", "294 cc"],
    ["Alimentación", "Inyección electrónica PGM-FI"],
    ["Potencia máxima", "24,3 HP a 7.500 rpm"],
    ["Torque máximo", "26,5 Nm a 5.750 rpm"],
    ["Arranque", "Eléctrico"],
    ["Freno delantero", "Disco con ABS"],
    ["Freno trasero", "Disco"],
    ["Velocidades", "6"],
    ["Uso", "On/Off - Adventure"],
    // ["Equipamiento", "Parabrisas, carenado rally, protectores y estética Dakar"]
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
    ["Tipo", "Monocilíndrico, 4 tiempos, OHC, 4 valvulas"],
    ["Cilindrada", "124 cc"],
    ["Velocidades", "5"],
    ["Refrigeración", "Aire (con radiador de aceite)"],
    ["Alimentación", "Inyección electrónica PGM-FI"],
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
  MO1001: "kellerEcoCrono110",
  MO1002: "corvenEnergy",
  MO1003: "motomelS2",
  MO1004: "hondaCgGlh150",
  MO1005: "yamahaYbr125",
  MO1006: "yamahaFz",
  MO1007: "hondaXr150",
  MO1008: "boxer150",
  MO1009: "zanellaZb110",
  MO1010: "gilera",
  MO1011: "corvenEnergy",
  MO1012: "cb190",
  MO1013: "hondaXr300",
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
  MO0926: "hondaXr300Rally",
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
  producto: Pick<Producto, "nombre" | "codigo" | "fichaTecnica">,
): FichaTecnicaItem[] => {
  if (producto.fichaTecnica?.length) return producto.fichaTecnica;

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

export const productos: Producto[] = productosData as Producto[];
