/* eslint-disable @next/next/no-img-element */

type Props = {
  nombre: string;
  imagen: string;
};

export default function ProductGallery({ nombre, imagen }: Props) {
  return (
    <div className="space-y-4">
      <div
        className="flex items-center justify-center overflow-hidden rounded-lg bg-slate-100 p-5"
        style={{ height: "20rem", maxHeight: "45vh", maxWidth: "420px" }}
      >
        <img
          src={imagen}
          alt={nombre}
          className="block"
          style={{
            height: "100%",
            maxWidth: "100%",
            objectFit: "contain",
            width: "auto",
          }}
        />
      </div>

      <div className="grid grid-cols-3 gap-3" style={{ maxWidth: "420px" }}>
        {[1, 2, 3].map((item) => (
          <button
            key={item}
            type="button"
            className="flex h-20 items-center justify-center rounded-lg border border-slate-200 bg-white p-2 transition hover:border-blue-300"
            aria-label={`Ver foto ${item} de ${nombre}`}
          >
            <img
              src={imagen}
              alt={`${nombre} foto ${item}`}
              className="block max-h-full max-w-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
