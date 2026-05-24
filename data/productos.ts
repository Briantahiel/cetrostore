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
    "/motos/honda-wave-blanca.jpg",
    "/motos/honda-wave-roja.jpg",
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
  precio: null,
  stock: "virtual" as const,
};

export const productos: Producto[] = [
  {
  id: 1,
  codigo: "MO1001",
  nombre: "Honda Wave 110 S",
  descripcion:
    "La Honda Wave 110 S es una de las motos urbanas mas vendidas de Argentina gracias a su bajo consumo, confiabilidad mecanica y mantenimiento economico. Su motor de 110 cc y transmision semiautomatica la convierten en una opcion ideal para movilidad diaria, delivery y uso urbano intensivo.",
  precio: null,
  imagen: imagenes.wave,
  stock: "fisico",
},
{
  id: 2,
  codigo: "MO1002",
  nombre: "Bajaj Rouser NS 125",
  descripcion:
    "La Bajaj Rouser NS 125 combina un estilo deportivo con un motor eficiente y buen nivel de equipamiento para su segmento. Ofrece una posicion de manejo comoda, excelente estabilidad en ciudad y un rendimiento destacado para quienes buscan su primera moto street.",
  precio: null,
  imagen: imagenes.rouser,
  stock: "fisico",
},
{
  id: 3,
  codigo: "MO1003",
  nombre: "Motomel S2 150",
  descripcion:
    "La Motomel S2 150 es una moto utilitaria muy elegida por su resistencia y bajo costo operativo en el uso diario. Cuenta con motor de 150 cc, buena autonomia y una mecanica simple que facilita el mantenimiento y las reparaciones.",
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
    "La Yamaha FZ 150 ofrece un diseño moderno tipo naked junto con una conduccion comoda y estable para uso urbano. Su motor de 150 cc brinda buena respuesta, mientras que su estetica deportiva y equipamiento la hacen muy popular entre jovenes usuarios.",
  precio: null,
  imagen: imagenes.yamahaFz,
  stock: "fisico",
},
{
  id: 7,
  codigo: "MO1007",
  nombre: "Honda XR 150L",
  descripcion:
    "La Honda XR 150L es una moto on/off diseñada para adaptarse tanto a calles urbanas como a caminos rurales y terrenos irregulares. Su suspension elevada, resistencia mecanica y posicion de manejo confortable la convierten en una excelente opcion multiproposito.",
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
    "La Zanella ZB 110 es una moto economica y practica, ideal para desplazamientos urbanos y uso diario. Su bajo consumo de combustible y mantenimiento accesible la convierten en una de las opciones mas elegidas dentro del segmento 110.",
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
  nombre: "Honda CB 190R",
  descripcion:
    "La Honda CB 190R es una naked deportiva con diseño agresivo, buena aceleracion y excelente maniobrabilidad urbana. Equipa inyeccion electronica y frenos a disco, ofreciendo una experiencia de manejo moderna y segura.",
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
    "La Yamaha MT-03 es una naked deportiva de media cilindrada con gran aceleracion, diseño agresivo y excelente tecnologia. Equipada con motor bicilindrico y frenos ABS, ofrece una experiencia de manejo dinamica tanto en ciudad como en ruta.",
  precio: null,
  imagen: imagenes.mt03,
  stock: "fisico",
},
{
  id: 15,
  codigo: "MO1015",
  nombre: "Bajaj Dominar 400",
  descripcion:
    "La Bajaj Dominar 400 fue diseñada para turismo y viajes largos, combinando potencia, estabilidad y confort de manejo. Su motor de 400 cc, iluminacion full LED y equipamiento moderno la convierten en una de las touring mas completas de su categoria.",
  precio: null,
  imagen: imagenes.dominar,
  stock: "fisico",
},
{
  id: 16,
  codigo: "MO0809",
  nombre: "Honda Wave 110 S New blanco",
  descripcion:
    "La Honda Wave 110 S New mantiene el reconocido equilibrio entre economia, confiabilidad y practicidad para uso urbano diario. Esta version incorpora diseño actualizado y excelente autonomia, siendo ideal para quienes buscan una moto agil y de bajo mantenimiento.",
  imagen: imagenes.wave,
  variantes: [
    {
      codigo: "MO0809",
      nombre: "Honda Wave 110 S New blanco",
      imagen: "/motos/honda-wave-blanca.jpg",
      color: "Blanco",
    },
    {
      codigo: "MO0808",
      nombre: "Honda Wave 110 S New roja",
      imagen: "/motos/honda-wave-roja.jpg",
      color: "Rojo",
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
  nombre: "Honda XR 150L rojo",
  descripcion:
    "La Honda XR 150L es una moto doble proposito preparada para circular comodamente tanto en ciudad como en caminos de tierra. Su posicion elevada, suspensiones resistentes y mecanica confiable la convierten en una opcion muy valorada para trabajo y aventura.",
  imagen: imagenes.hondaXr,
  ...stockVirtual,
},
{
  id: 18,
  codigo: "MO0806",
  nombre: "Honda XR 150L blanco",
  descripcion:
    "La Honda XR 150L combina versatilidad y resistencia en una moto ideal para trayectos urbanos y rurales. Gracias a su motor confiable y su estructura robusta, ofrece un excelente rendimiento en distintos tipos de terreno.",
  imagen: imagenes.hondaXr,
  ...stockVirtual,
},
{
  id: 19,
  codigo: "MO0819",
  nombre: "Honda XR 190L beige",
  descripcion:
    "La Honda XR 190L ofrece mayor potencia y equipamiento dentro de la linea on/off de Honda. Su motor de 190 cc, buena altura al suelo y posicion de manejo confortable permiten un desempeño eficiente tanto en ciudad como fuera del asfalto.",
  imagen: imagenes.hondaXr,
  ...stockVirtual,
},
{
  id: 20,
  codigo: "MO0830",
  nombre: "Honda XR 300L rojo",
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
    nombre: "Honda XR 300L Tornado Rally Rojo",
    descripcion:
      "La Honda XR 300L Tornado Rally es una trail de 293 cc orientada al uso mixto y a caminos exigentes. Su motor monocilindrico, chasis preparado para doble proposito y posicion de manejo alta la hacen adecuada para aventura y recorridos rurales.",
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
    nombre: "Honda CB125F Twister negro",
    descripcion:
      "La Honda CB125F Twister es una street de 124 cc orientada a la movilidad urbana con bajo consumo y manejo facil. Su caja de 5 velocidades, freno delantero a disco y postura comoda la hacen una buena opcion para uso diario.",
    imagen: imagenes.hondaCb,
    ...stockVirtual,
  },
  {
    id: 38,
    codigo: "MO0820",
    nombre: "Honda CB300F Twister rojo",
    descripcion:
      "La Honda CB300F Twister es una naked de 294 cc con inyeccion electronica y motor OHC de 4 valvulas. Ofrece mayor torque y potencia que las street chicas, con postura deportiva y buen equilibrio para ciudad y ruta.",
    imagen: imagenes.hondaCb,
    ...stockVirtual,
  },
  {
    id: 39,
    codigo: "MO0822",
    nombre: "Honda CB300F Twister gris",
    descripcion:
      "La Honda CB300F Twister combina un monocilindrico de 294 cc con una ciclística agil para uso diario y salidas a ruta. Su equipamiento moderno, frenos a disco y respuesta contundente la ubican como una naked versatil de media cilindrada.",
    imagen: imagenes.hondaCb,
    ...stockVirtual,
  },
  {
    id: 40,
    codigo: "MO0833",
    nombre: "Honda GLH150 rojo",
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
    nombre: "Bajaj Rouser P150 Black Red",
    descripcion:
      "La Bajaj Rouser P150 es una street de 150 cc con orientacion deportiva y una posicion de manejo comoda para ciudad. Su motor eficiente, caja de 5 velocidades y diseno moderno la hacen una evolucion practica dentro de la familia Rouser.",
    imagen: imagenes.rouser,
    ...stockVirtual,
  },
  {
    id: 46,
    codigo: "MO0858",
    nombre: "Bajaj Rouser P150 Caribbean",
    descripcion:
      "La Bajaj Rouser P150 ofrece una combinacion de bajo consumo, buen torque urbano y estetica naked actual. Es una moto pensada para uso diario con prestaciones suficientes para traslados rapidos y una conduccion estable.",
    imagen: imagenes.rouser,
    ...stockVirtual,
  },
  {
    id: 47,
    codigo: "MO0859",
    nombre: "Bajaj Rouser P150 Ebony Black",
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
    nombre: "Rouser P150-Red",
    descripcion:
      "La Rouser P150 es una Bajaj de 150 cc orientada al uso urbano con estilo deportivo y mecanica eficiente. Su caja de 5 velocidades, bajo consumo y postura comoda la hacen adecuada para trabajo, estudio y traslados diarios.",
    imagen: imagenes.rouser,
    ...stockVirtual,
  },
  {
    id: 56,
    codigo: "MO0920",
    nombre: "Bajaj Boxer CT100 ROJA",
    descripcion:
      "La Bajaj Boxer CT100 es una moto utilitaria de baja cilindrada enfocada en economia, robustez y mantenimiento simple. Su motor cercano a 100 cc, transmision de 4 velocidades y construccion resistente la hacen popular para trabajo diario.",
    imagen: imagenes.boxer,
    ...stockVirtual,
  },
  {
    id: 57,
    codigo: "MO0918",
    nombre: "Bajaj Boxer CT100 Azul/Negro",
    descripcion:
      "La Bajaj Boxer CT100 prioriza bajo consumo y durabilidad por encima de prestaciones deportivas. Es una moto liviana y sencilla, adecuada para recorridos urbanos, tareas de reparto y usuarios que buscan costos operativos reducidos.",
    imagen: imagenes.boxer,
    ...stockVirtual,
  },
];
