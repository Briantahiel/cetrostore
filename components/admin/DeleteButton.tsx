"use client";

type DeleteButtonProps = {
  action: (formData: FormData) => void | Promise<void>;
  id: number;
  label: string;
  name: string;
};

export default function DeleteButton({ action, id, label, name }: DeleteButtonProps) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(`Eliminar "${name}"? Esta accion no se puede deshacer.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-lg border border-red-200 px-3 py-2 text-xs font-black text-red-700 transition hover:bg-red-50"
      >
        {label}
      </button>
    </form>
  );
}
