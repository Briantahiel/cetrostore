export type Producto = {
  id: number;
  codigo?: string;
  nombre: string;
  descripcion: string;
  precio: number | null;
  imagen: string;
  stock?: "fisico" | "virtual";
};

const imagenes = {
  wave:
    "https://aspenmotos.com/wp-content/uploads/2023/07/WAVE-110-ROJO-1.png",
  rouser:
    "https://cyclemotorshopar.vtexassets.com/arquivos/ids/600349/3--3-.png?v=638857903134600000",
  motomel:
    "https://aszisa.com.ar/wp-content/uploads/2025/10/moto-motomel-cg-s2-150-base.jpg",
  hondaCg:
    "https://www.honda.com.ar/motos/sites/default/files/2023-02/cg-titan-150-roja.png",
  yamahaYbr:
    "https://www.yamaha-motor.com.ar/wp-content/uploads/2021/04/ybr-125-azul.png",
  yamahaFz:
    "https://www.yamaha-motor.com.ar/wp-content/uploads/2022/01/fz-fi-negra.png",
  hondaXr:
    "https://www.honda.com.ar/motos/sites/default/files/2023-02/xr150l-roja.png",
  boxer:
    "https://bajajauto.com.ar/wp-content/uploads/2021/04/boxer-150.png",
  zanella:
    "https://zanella.com.ar/wp-content/uploads/2022/03/zb-110-roja.png",
  gilera:
    "https://gilera.com.ar/wp-content/uploads/2021/05/smash-roja.png",
  corven:
    "https://corvenmotos.com.ar/wp-content/uploads/2022/02/energy-110.png",
  hondaCb:
    "https://www.honda.com.ar/motos/sites/default/files/2023-02/cb190r-roja.png",
  tornado:
    "https://www.honda.com.ar/motos/sites/default/files/2023-02/xr250-tornado.png",
  mt03:
    "https://www.yamaha-motor.com.ar/wp-content/uploads/2023/01/mt03-negra.png",
  dominar:
    "https://bajajauto.com.ar/wp-content/uploads/2021/04/dominar-400.png",
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
      "Moped economica ideal para ciudad, bajo consumo y alta confiabilidad.",
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
    imagen: imagenes.yamahaYbr,
    ...stockVirtual,
  },
  {
    id: 31,
    codigo: "MO0847",
    nombre: "Yamaha Fascino 125 FI Cyan",
    imagen: imagenes.yamahaYbr,
    ...stockVirtual,
  },
  {
    id: 32,
    codigo: "MO0848",
    nombre: "Yamaha Ray ZR 125 FI Rojo",
    imagen: imagenes.yamahaYbr,
    ...stockVirtual,
  },
  {
    id: 33,
    codigo: "MO0849",
    nombre: "Yamaha Ray ZR 125 FI Negro",
    imagen: imagenes.yamahaYbr,
    ...stockVirtual,
  },
  {
    id: 34,
    codigo: "MO0850",
    nombre: "Yamaha Ray ZR 125 FI Azul",
    imagen: imagenes.yamahaYbr,
    ...stockVirtual,
  },
  {
    id: 35,
    codigo: "MO0884",
    nombre: "Kymco Micare 125 - Black",
    imagen: imagenes.yamahaYbr,
    ...stockVirtual,
  },
  {
    id: 36,
    codigo: "MO0885",
    nombre: "Kymco Micare 125 - Ruby red",
    imagen: imagenes.yamahaYbr,
    ...stockVirtual,
  },
  {
    id: 37,
    codigo: "MO0886",
    nombre: "Kymco Micare 125 - Silver Blue",
    imagen: imagenes.yamahaYbr,
    ...stockVirtual,
  },
  {
    id: 38,
    codigo: "MO0902",
    nombre: "Yamaha Fascino 125 FI Rojo",
    imagen: imagenes.yamahaYbr,
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
    codigo: "MO0874",
    nombre: "Hero Hunk 160R DD SD Rojo",
    imagen: imagenes.rouser,
    ...stockVirtual,
  },
  {
    id: 55,
    codigo: "MO0901",
    nombre: "Hero Hunk 160R DD SD Blanco",
    imagen: imagenes.rouser,
    ...stockVirtual,
  },
  {
    id: 56,
    codigo: "MO0908",
    nombre: "Yamaha FZ25 AZUL",
    imagen: imagenes.yamahaFz,
    ...stockVirtual,
  },
  {
    id: 57,
    codigo: "MO0904",
    nombre: "Rouser P150-Red",
    imagen: imagenes.rouser,
    ...stockVirtual,
  },
  {
    id: 58,
    codigo: "MO0920",
    nombre: "Bajaj Boxer CT100 ROJA",
    imagen: imagenes.boxer,
    ...stockVirtual,
  },
  {
    id: 59,
    codigo: "MO0918",
    nombre: "Bajaj Boxer CT100 Azul/Negro",
    imagen: imagenes.boxer,
    ...stockVirtual,
  },
];
