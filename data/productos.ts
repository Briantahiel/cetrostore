import productosData from "./productos.json";

export type Producto = {
  id: number;
  codigo?: string;
  nombre: string;
  descripcion: string;
  precio: number | null;
  imagen: string[];
  color?: string;
  stock?: "fisico" | "virtual";
  disponibleSucursal?: boolean;
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

export const normalizeProductoSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getProductoSlug = (
  producto: Pick<Producto, "id" | "codigo" | "nombre">,
) =>
  normalizeProductoSlug(
    `${producto.nombre}${producto.codigo ? ` ${producto.codigo}` : ` ${producto.id}`}`,
  );

export const getProductoCanonicalPath = (
  producto: Pick<Producto, "id" | "codigo" | "nombre">,
) => `/catalogo/${getProductoSlug(producto)}`;

const ficha = (items: Array<[string, string]>): FichaTecnicaItem[] =>
  items.map(([etiqueta, valor]) => ({ etiqueta, valor }));

const fichasTecnicas = {
  wave: ficha([
    ["Motor", "Monocilindrico 4 tiempos OHC, 2 valvulas"],
    ["Cilindrada", "109 cc"],
    ["Alimentacion", "Carburador"],
    ["Potencia máxima", "9.3 HP a 7.500 rpm"],
    ["Torque máximo", "8.5 Nm a 6.000 rpm"],
    ["Arranque", "Eléctrico / Patada"],
    ["Transmision", "Semiautomatica de 4 velocidades"],
    ["Freno delantero", "Disco / tambor segun version"],
    ["Freno trasero", "Tambor con CBS"],
    ["Velocidad maxima estimada", "90 km/h aprox."],
  ]),
  gilera: ficha([
    ["Tipo", "Monocilíndrico, 4 tiempos"],
    ["Cilindrada", "107 cc"],
    ["Refrigeración", "Aire"],
    ["Alimentación", "Carburador"],
    ["Potencia máxima", "6,6 HP a 8.500 rpm"],
    ["Torque maximo", "7 Nm aprox."],
    ["Caja", "4 velocidades semiautomática"],
    ["Arranque", "Eléctrico / Patada"],
    ["Freno delantero", "Disco / tambor segun version"],
    ["Freno trasero", "Tambor"],
    ["Velocidad maxima estimada", "80 km/h aprox."],
  ]),
  kellerEcoCrono110: ficha([
    ["Tipo", "Monocilíndrico, 4 tiempos"],
    ["Cilindrada", "107 cc"],
    ["Refrigeración", "Aire"],
    ["Alimentación", "Carburador"],
    ["Potencia máxima", "6,5 HP a 8.000 rpm"],
    ["Torque maximo", "7 Nm aprox."],
    ["Caja", "4 velocidades semiautomática"],
    ["Arranque", "Eléctrico / Patada"],
    ["Freno delantero", "Disco / tambor segun version"],
    ["Freno trasero", "Tambor"],
    ["Velocidad maxima estimada", "80 km/h aprox."],
  ]),
  zanellaZb110: ficha([
    ["Tipo", "Monocilíndrico, 4 tiempos, OCH"],
    ["Cilindrada", "107 cc"],
    ["Potencia máxima", "6.7 a 7.2 HP"],
    ["Torque maximo", "7 Nm aprox."],
    ["Alimentación", "Carburador"],
    ["Arranque", "Eléctrico / Patada"],
    ["Refrigeración", "Aire"],
    ["Caja", "4 velocidades semiautomática"],
    ["Freno delantero", "Disco / tambor segun version"],
    ["Freno trasero", "Tambor"],
    ["Velocidad maxima estimada", "80 km/h aprox."],
  ]),
  rouser125: ficha([
    ["Tipo", "Monocilíndrico, 4 tiempos, DTS-i"],
    ["Cilindrada", "124,4 cc"],
    ["Refrigeración", "Aire"],
    ["Potencia máxima", "12 HP a 8.500 rpm"],
    ["Torque máximo", "11 Nm a 6.500 rpm"],
    ["Alimentacion", "Carburador"],
    ["Arranque", "Eléctrico / Patada"],
    ["Caja", "5 velocidades"],
    ["Freno delantero", "Disco hidraulico de 240 mm"],
    ["Freno trasero", "Tambor de 130 mm"],
    ["Velocidad maxima estimada", "105 km/h aprox."],
  ]),
  rouser150: ficha([
    ["Cilindrada", "150 cc aprox."],
    ["Motor", "Monocilindrico 4 tiempos DTS-i"],
    ["Refrigeracion", "Aire"],
    ["Alimentacion", "Carburador"],
    ["Potencia maxima", "14 HP aprox."],
    ["Torque maximo", "13 Nm aprox."],
    ["Velocidades", "5"],
    ["Arranque", "Electrico"],
    ["Freno delantero", "A disco"],
    ["Freno trasero", "Tambor"],
    ["Llantas", "Aleacion"],
    ["Velocidad maxima estimada", "115 km/h aprox."],
    ["Uso", "Street urbano"],
  ]),
  rouser200: ficha([
    ["Cilindrada", "199,5 cc"],
    ["Motor", "Monocilindrico 4 tiempos DTS-i"],
    ["Refrigeracion", "Liquida"],
    ["Alimentacion", "Carburador / inyeccion segun version"],
    ["Potencia maxima", "23,5 HP aprox."],
    ["Torque maximo", "18,3 Nm aprox."],
    ["Velocidades", "6"],
    ["Arranque", "Eléctrico"],
    ["Freno delantero", "A disco"],
    ["Freno trasero", "A disco"],
    ["Llantas", "Aleacion"],
    ["Velocidad maxima estimada", "135 km/h aprox."],
    ["Uso", "Naked deportiva"],
  ]),
  motomelS2: ficha([
    ["Motor", "Monocilíndrico 4 tiempos"],
    ["Cilindrada", "149,5 cc"],
    ["Potencia máxima", "13,4 HP a 8.500 rpm"],
    ["Torque maximo", "12 Nm aprox."],
    ["Refrigeración", "Aire"],
    ["Alimentación", "Carburador"],
    ["Arranque", "Eléctrico / Patada"],
    ["Transmisión", "Manual 5 velocidades"],
    ["Freno delantero", "Disco"],
    ["Freno trasero", "Tambor"],
    ["Velocidad maxima estimada", "110 km/h aprox."],
  ]),
  hondaCgGlh150: ficha([
    ["Tipo", "Monocilíndrico, 4 tiempos, OHC"],
    ["Cilindrada", "149,2 cc"],
    ["Velocidades", "5"],
    ["Refrigeración", "Aire"],
    ["Alimentacion", "Inyeccion electronica PGM-FI"],
    ["Potencia maxima", "12 HP aprox."],
    ["Torque maximo", "12,5 Nm aprox."],
    ["Arranque", "Eléctrico"],
    ["Freno delantero", "Disco hidraulico de 240 mm"],
    ["Freno trasero", "Tambor con CBS"],
    ["Llantas", "Aleación"],
    ["Velocidad maxima estimada", "110 km/h aprox."],
  ]),
  yamahaYbr125: ficha([
    ["Cilindrada", "124 cc"],
    ["Motor", "Monocilindrico 4 tiempos SOHC"],
    ["Refrigeracion", "Aire"],
    ["Alimentacion", "Carburador"],
    ["Potencia maxima", "10 HP aprox."],
    ["Torque maximo", "10 Nm aprox."],
    ["Velocidades", "5"],
    ["Arranque", "Eléctrico"],
    ["Freno delantero", "A disco"],
    ["Freno trasero", "Tambor"],
    ["Llantas", "Aleacion"],
    ["Velocidad maxima estimada", "105 km/h aprox."],
    ["Uso", "Street urbano"],
  ]),
  yamahaFz: ficha([
    ["Cilindrada", "153 cc"],
    ["Motor", "Monocilindrico 4 tiempos SOHC"],
    ["Refrigeracion", "Aire"],
    ["Alimentacion", "Inyeccion electronica segun version"],
    ["Potencia maxima", "12,4 HP aprox."],
    ["Torque maximo", "13,3 Nm aprox."],
    ["Velocidades", "5"],
    ["Arranque", "Eléctrico"],
    ["Freno delantero", "A disco"],
    ["Freno trasero", "Tambor / disco segun version"],
    ["Llantas", "Aleacion"],
    ["Velocidad maxima estimada", "115 km/h aprox."],
    ["Uso", "Naked urbana"],
  ]),
  yamahaFz25: ficha([
    ["Cilindrada", "249 cc"],
    ["Motor", "Monocilindrico 4 tiempos SOHC"],
    ["Refrigeracion", "Aire con radiador de aceite"],
    ["Alimentacion", "Inyeccion electronica"],
    ["Potencia maxima", "20,9 HP aprox."],
    ["Torque maximo", "20,1 Nm aprox."],
    ["Velocidades", "5"],
    ["Arranque", "Eléctrico"],
    ["Freno delantero", "A disco"],
    ["Freno trasero", "A disco"],
    ["ABS", "Delantero / segun version"],
    ["Llantas", "Aleacion"],
    ["Velocidad maxima estimada", "130 km/h aprox."],
    ["Uso", "Naked urbana y ruta corta"],
  ]),
  hondaXr150: ficha([
    ["Tipo", "Monocilíndrico, 4 tiempos OHC, refrigerado por aire"],
    ["Cilindrada", "149,1 cc"],
    ["Potencia máxima", "12,6 HP a 7.750 rpm"],
    ["Alimentación", "Carburador"],
    ["Encendido", "CDI electrónico"],
    ["Torque máximo", "12,1 Nm a 6.000 rpm aprox."],
    ["Arranque", "Eléctrico/Patada"],
    ["Transmision", "5 velocidades"],
    ["Freno delantero", "A disco"],
    ["Freno trasero", "Tambor"],
    ["Velocidad maxima estimada", "105 km/h aprox."],
    ["Uso", "On/Off"],
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
    ["Velocidad maxima estimada", "135 km/h aprox."],
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
    ["Velocidad maxima estimada", "135 km/h aprox."],
    ["Uso", "On/Off - Adventure"],
    // ["Equipamiento", "Parabrisas, carenado rally, protectores y estética Dakar"]
]),
  boxer150: ficha([
    ["Cilindrada", "144,8 cc"],
    ["Motor", "Monocilindrico 4 tiempos"],
    ["Refrigeracion", "Aire"],
    ["Alimentacion", "Carburador"],
    ["Velocidades", "5"],
    ["Arranque", "Eléctrico"],
    ["Freno delantero", "A disco / tambor segun version"],
    ["Freno trasero", "Tambor"],
    ["Uso", "Utilitario"],
  ]),
  boxer100: ficha([
    ["Cilindrada", "100 cc aprox."],
    ["Motor", "Monocilindrico 4 tiempos"],
    ["Refrigeracion", "Aire"],
    ["Alimentacion", "Carburador"],
    ["Velocidades", "4"],
    ["Arranque", "Eléctrico / Patada"],
    ["Freno delantero", "Tambor"],
    ["Freno trasero", "Tambor"],
    ["Uso", "Utilitario urbano"],
  ]),
  cub110: ficha([
    ["Cilindrada", "107 cc"],
    ["Motor", "Monocilindrico 4 tiempos"],
    ["Refrigeracion", "Aire"],
    ["Alimentacion", "Carburador"],
    ["Velocidades", "4"],
    ["Arranque", "Eléctrico"],
    ["Freno delantero", "A disco / tambor segun version"],
    ["Freno trasero", "Tambor"],
    ["Llantas", "Aleacion / rayos segun version"],
    ["Uso", "Cub urbana"],
  ]),

  corvenEnergy: ficha([
    ["Tipo", "Monocilíndrico, 4 tiempos, refrigerado por aire"],
    ["Cilindrada", "107 cc"],
    ["Potencia máxima", "6,6 HP a 8.500 rpm"],
    ["Alimentacion", "Carburador"],
    ["Arranque", "Eléctrico/Patada"],
    ["Transmisión", "4 velocidades semiautomatica"],
  ]),
  cb190: ficha([
    ["Tipo", "Monocilíndrico, 4 tiempos, OHC"],
    ["Cilindrada", "184,4 cc"],
    ["Potencia máxima", "16,4 HP a 8.500 rpm aprox."],
    ["Torque máximo", "15,7 Nm a 6.000 rpm"],
    ["Refrigeración", "Aire"],
    ["Alimentación", "Inyección electrónica PGM-FI"],
    ["Arranque", "Eléctrico"],
    ["Caja", "5 velocidades"],
    ["Freno delantero", "Disco"],
    ["Freno trasero", "Disco"],
    ["Velocidad maxima estimada", "115 km/h aprox."],
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
    ["Freno delantero", "Disco"],
    ["Freno trasero", "Disco"],
    ["Velocidad maxima estimada", "115 km/h aprox."],
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
    ["Potencia maxima", "11 HP aprox."],
    ["Torque maximo", "10,6 Nm aprox."],
    ["Arranque", "Eléctrico"],
    ["Freno delantero", "Disco"],
    ["Freno trasero", "Tambor"],
    ["Llantas", "Aleación"],
    ["Velocidad maxima estimada", "105 km/h aprox."],
  ]),
  cb300: ficha([
    ["Tipo", "Monocilíndrico, 4 tiempos, OHC, 4 valvulas"],
    ["Cilindrada", "294 cc"],
    ["Potencia máxima", "24,5 CV a 7.500 rpm aprox."],
    ["Torque máximo", "25,6 Nm a 5.500 rpm"],
    ["Refrigeración", "Aire con radiador de aceite"],
    ["Alimentación", "Inyección electrónica PGM-FI"],
    ["Arranque", "Eléctrico"],
    ["Transmision", "6 velocidades, embrague anti-rebote"],
    ["Freno delantero", "Disco con ABS"],
    ["Freno trasero", "Disco con ABS"],
    ["Velocidad maxima estimada", "135 km/h aprox."],
  ]),
  xtz250: ficha([
    ["Cilindrada", "249 cc"],
    ["Tipo", "Monocilíndrico 4T SOHC, refrigerado por aire"],
    ["Arranque", "Eléctrico"],
    ["Diametro x carrera", "74 x 58 mm"],
    ["Relación compresión", "9.8:1"],
    ["Lubricación", "Carter húmedo"],
    ["Alimentación", "Inyección electrónica"],
    ["Encendido", "TCI"],
  ]),
  xtz125: ficha([
    ["Cilindrada", "124 cc aprox."],
    ["Tipo", "Monocilíndrico 4 tiempos"],
    ["Arranque", "Eléctrico"],
    ["Transmisión", "5 velocidades"],
    ["Refrigeración", "Aire"],
    ["Alimentacion", "Carburador"],
    ["Freno delantero", "A disco"],
    ["Freno trasero", "Tambor"],
    ["Uso", "On/Off liviana"],
  ]),
  scooter125: ficha([
    ["Cilindrada", "124,6 cc"],
    ["Motor", "Monocilindrico 4 tiempos"],
    ["Refrigeracion", "Aire"],
    ["Alimentacion", "Carburador / inyeccion segun modelo"],
    ["Arranque", "Eléctrico"],
    ["Llantas", "Aleación"],
    ["Freno delantero", "A disco"],
    ["Freno trasero", "Tambor"],
    ["Transmisión", "CVT automática"],
    ["Uso", "Scooter urbano"],
  ]),
  rayZ: ficha([
    ["Cilindrada", "113 cc"],
    ["Tipo", "Monocilíndrico 4T SOHC, refrigerado por aire"],
    ["Llantas", "Aleación"],
    ["Transmisión", "Correa trapezoidal automática"],
    ["Embrague", "Automático centrifugo en seco"],
    ["Alimentacion", "Carburador"],
    ["Arranque", "Electrico / patada"],
    ["Freno delantero", "A disco / tambor segun version"],
    ["Uso", "Scooter urbano"],
  ]),
  kymcoMicare125: ficha([
    ["Cilindrada", "125 cc"],
    ["Motor", "Monocilindrico 4 tiempos"],
    ["Refrigeracion", "Aire"],
    ["Alimentacion", "Carburador"],
    ["Arranque", "Electrico / Patada"],
    ["Transmision", "Automatica CVT"],
    ["Freno delantero", "A disco"],
    ["Uso", "Urbano"],
  ]),
  yamahaFascino125: ficha([
    ["Cilindrada", "125 cc"],
    ["Motor", "Monocilindrico 4 tiempos SOHC"],
    ["Alimentacion", "Inyeccion electronica"],
    ["Transmision", "Automatica CVT"],
    ["Arranque", "Electrico"],
    ["Freno delantero", "A disco"],
    ["Llantas", "Aleacion"],
    ["Uso", "Urbano"],
  ]),
  yamahaRayZr125: ficha([
    ["Cilindrada", "125 cc"],
    ["Motor", "Monocilindrico 4 tiempos SOHC"],
    ["Alimentacion", "Inyeccion electronica"],
    ["Transmision", "Automatica CVT"],
    ["Arranque", "Electrico"],
    ["Freno delantero", "A disco"],
    ["Llantas", "Aleacion"],
    ["Uso", "Scooter urbano"],
  ]),
  rouserP150: ficha([
    ["Cilindrada", "149,68 cc"],
    ["Motor", "Monocilindrico 4 tiempos DTS-i"],
    ["Refrigeracion", "Aire"],
    ["Alimentacion", "Carburador"],
    ["Caja", "5 velocidades"],
    ["Arranque", "Electrico"],
    ["Freno delantero", "A disco"],
    ["Uso", "Street"],
  ]),
  rouserNs160: ficha([
    ["Cilindrada", "160,3 cc"],
    ["Motor", "Monocilindrico 4 tiempos DTS-i"],
    ["Refrigeracion", "Aceite"],
    ["Caja", "5 velocidades"],
    ["Arranque", "Electrico"],
    ["Freno delantero", "A disco"],
    ["Llantas", "Aleacion"],
    ["Uso", "Street"],
  ]),
};

type FichaTecnicaKey = keyof typeof fichasTecnicas;

const descripcionPorFichaTecnica: Partial<Record<FichaTecnicaKey, string>> = {
  wave:
    "La Honda Wave 110 S New es una cub urbana simple, economica y confiable, pensada para traslados diarios con bajo consumo, mantenimiento accesible y manejo agil.",
  gilera:
    "La Gilera Smash 110 es una cub practica para uso urbano, valorada por su mecanica sencilla, repuestos accesibles y bajo costo de mantenimiento.",
  kellerEcoCrono110:
    "La Keller Eco Crono 110 es una cub urbana de bajo consumo, liviana y facil de usar, ideal para trabajo, estudio y recorridos cortos todos los dias.",
  zanellaZb110:
    "La Zanella ZB 110 es una cub economica y maniobrable, orientada a movilidad diaria con mecanica simple, consumo contenido y mantenimiento accesible.",
  rouser125:
    "La Bajaj Rouser 125 LS es una street liviana con estilo deportivo, buena autonomia y respuesta equilibrada para ciudad, trabajo diario y primera moto.",
  rouser150:
    "La Bajaj Rouser 150 combina una postura comoda con mecanica eficiente y caracter urbano, pensada para uso diario con un plus de presencia deportiva.",
  rouser200:
    "La Bajaj Rouser NS 200 es una naked deportiva de media cilindrada, con respuesta firme, caja de 6 velocidades y buen comportamiento para ciudad y ruta corta.",
  motomelS2:
    "La Motomel S2 150 es una street sencilla y rendidora, adecuada para movilidad urbana, trabajo diario y usuarios que buscan una 150 practica.",
  hondaCgGlh150:
    "La Honda GLH 150 es una urbana confiable y eficiente, con inyeccion electronica, caja de 5 velocidades y una posicion de manejo comoda para uso intensivo.",
  yamahaYbr125:
    "La Yamaha YBR 125 es una street confiable y economica, ideal para traslados diarios, primera moto y usuarios que priorizan bajo consumo.",
  yamahaFz:
    "La Yamaha FZ 150 es una naked urbana con diseno deportivo, posicion relajada y motor eficiente para recorridos frecuentes en ciudad.",
  yamahaFz25:
    "La Yamaha FZ25 es una naked de 249 cc con buen torque, postura comoda y equilibrio para ciudad, ruta corta y uso cotidiano.",
  hondaXr150:
    "La Honda XR 150 L es una doble proposito versatil, preparada para ciudad, ripio y caminos de tierra con postura alta y suspensiones resistentes.",
  hondaXr300:
    "La Honda XR 300 L Tornado es una trail de mayor cilindrada para uso mixto, con buen despeje, motor con inyeccion y capacidad para caminos exigentes.",
  hondaXr300Rally:
    "La Honda XR 300 L Tornado Rally suma estetica y equipamiento de aventura sobre una base trail de 294 cc pensada para uso mixto.",
  boxer150:
    "La Bajaj Boxer 150 es una moto utilitaria robusta, pensada para trabajo y recorridos intensivos con bajo consumo y mantenimiento simple.",
  boxer100:
    "La Bajaj Boxer CT 100 es una utilitaria liviana y economica, enfocada en durabilidad, bajo consumo y costos operativos reducidos.",
  cub110:
    "Esta cub 110 es una opcion practica para movilidad urbana, con mecanica simple, manejo facil y consumo bajo para el uso cotidiano.",
  corvenEnergy:
    "La Corven Energy 110 es una cub utilitaria de bajo consumo, comoda para ciudad y recorridos frecuentes gracias a su peso contenido.",
  cb190:
    "La Honda CB 190 R es una street de estilo deportivo con inyeccion electronica, buena respuesta urbana y posicion agil para subir de cilindrada.",
  zr190:
    "La Honda ZR 190 es una opcion on/off de 184 cc con inyeccion electronica, postura alta y respuesta practica para uso mixto.",
  xr190:
    "La Honda XR 190 L ofrece una propuesta doble proposito con motor de 184 cc, inyeccion electronica y buena altura para ciudad o caminos de tierra.",
  cb125:
    "La Honda CB 125 F Twister es una street urbana de bajo consumo, con caja de 5 velocidades y una postura comoda para uso diario.",
  cb300:
    "La Honda CB 300 F Twister es una naked de media cilindrada con respuesta contundente, frenos a disco y ergonomia apta para ciudad o ruta corta.",
  xtz250:
    "La Yamaha XTZ 250 ABS es una doble proposito con inyeccion, suspensiones de largo recorrido y frenado asistido para ciudad, tierra y viajes.",
  xtz125:
    "La Yamaha XTZ 125 E es una on/off liviana y economica, pensada para ciudad, calles en mal estado y primeros recorridos fuera del asfalto.",
  scooter125:
    "Este scooter 125 prioriza comodidad urbana, transmision automatica y facilidad de uso para traslados diarios sin cambios manuales.",
  rayZ:
    "La Yamaha Ray Z es un scooter urbano liviano, de manejo simple y practico para desplazamientos diarios en ciudad.",
  kymcoMicare125:
    "La Kymco Micare 125 es un scooter urbano compacto, con transmision automatica y enfoque practico para moverse con comodidad.",
  yamahaFascino125:
    "La Yamaha Fascino 125 FI es un scooter liviano y eficiente, con inyeccion electronica y transmision automatica para uso urbano.",
  yamahaRayZr125:
    "La Yamaha Ray ZR 125 FI es un scooter urbano de estilo deportivo, con inyeccion electronica, bajo peso y transmision automatica.",
  rouserP150:
    "La Bajaj Rouser P 150 es una street 150 de estilo moderno, con buena autonomia, caja de 5 velocidades y respuesta equilibrada para ciudad.",
  rouserNs160:
    "La Bajaj Rouser NS 160 es una naked deportiva de baja-media cilindrada, con motor DTS-i y frenado a disco para una conduccion firme.",
};

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
  MO0846: "yamahaFascino125",
  MO0847: "yamahaFascino125",
  MO0848: "yamahaRayZr125",
  MO0849: "yamahaRayZr125",
  MO0850: "yamahaRayZr125",
  MO0884: "kymcoMicare125",
  MO0885: "kymcoMicare125",
  MO0886: "kymcoMicare125",
  MO0902: "yamahaFascino125",
  MO0814: "cb125",
  MO0819: "xr190",
  MO0820: "cb300",
  MO0822: "cb300",
  MO0833: "hondaCgGlh150",
  MO0851: "yamahaFz",
  MO0852: "yamahaFz",
  MO0853: "yamahaFz",
  MO0854: "yamahaFz",
  MO0857: "rouserP150",
  MO0858: "rouserP150",
  MO0859: "rouserP150",
  MO0861: "rouser125",
  MO0862: "rouser125",
  MO0866: "rouser200",
  MO0870: "rouserNs160",
  MO0874: "yamahaFz25",
  MO0901: "yamahaFz25",
  MO0908: "yamahaFz25",
  MO0904: "rouserP150",
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
    normalizedName.includes("rouserns150")
  ) {
    return "rouserP150";
  }
  if (normalizedName.includes("rouserns160")) return "rouserNs160";
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
  if (normalizedName.includes("fascino")) return "yamahaFascino125";
  if (normalizedName.includes("micare")) return "kymcoMicare125";
  if (normalizedName.includes("rayzr")) return "yamahaRayZr125";

  return null;
};

const getFichaTecnicaKeyProducto = (
  producto: Pick<Producto, "nombre" | "codigo">,
): FichaTecnicaKey | null =>
  (producto.codigo ? fichaTecnicaPorCodigo[producto.codigo] : null) ??
  getFichaTecnicaKeyPorNombre(producto.nombre);

const isDescripcionSinDatos = (descripcion?: string) => {
  const normalizedDescription = normalizeModelText(descripcion ?? "");

  return (
    normalizedDescription.length === 0 ||
    normalizedDescription === "sd" ||
    normalizedDescription === "sindatos" ||
    normalizedDescription === "consultar"
  );
};

export const getDescripcionProducto = (
  producto: Pick<Producto, "nombre" | "codigo"> & { descripcion?: string },
) => {
  if (!isDescripcionSinDatos(producto.descripcion)) {
    return producto.descripcion?.trim() ?? "";
  }

  const fichaTecnicaKey = getFichaTecnicaKeyProducto(producto);

  return (
    (fichaTecnicaKey ? descripcionPorFichaTecnica[fichaTecnicaKey] : undefined) ??
    `${producto.nombre} es una moto disponible para consultar en Cetromotos. Te asesoramos sobre disponibilidad, financiacion y entrega segun el modelo.`
  );
};

export const getFichaTecnicaProducto = (
  producto: Pick<Producto, "nombre" | "codigo" | "fichaTecnica">,
): FichaTecnicaItem[] => {
  if (producto.fichaTecnica?.length) return producto.fichaTecnica;

  const fichaTecnicaKey = getFichaTecnicaKeyProducto(producto);

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
