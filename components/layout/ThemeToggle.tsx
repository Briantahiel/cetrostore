// "use client";

// import { useEffect, useState } from "react";

// const themeStorageKey = "cetromotos-theme";

// const getInitialTheme = () => {
//   if (typeof window === "undefined") return "light";

//   const savedTheme = window.localStorage.getItem(themeStorageKey);
//   if (savedTheme === "dark" || savedTheme === "light") return savedTheme;

//   return window.matchMedia("(prefers-color-scheme: dark)").matches
//     ? "dark"
//     : "light";
// };

// export default function ThemeToggle() {
//   const [theme, setTheme] = useState(getInitialTheme);

//   useEffect(() => {
//     const root = document.documentElement;
//     const isDark = theme === "dark";

//     root.classList.toggle("dark", isDark);
//     root.style.colorScheme = isDark ? "dark" : "light";
//     window.localStorage.setItem(themeStorageKey, theme);
//   }, [theme]);

//   const isDark = theme === "dark";

//   return (
//     <button
//       type="button"
//       aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
//       title={isDark ? "Modo claro" : "Modo oscuro"}
//       onClick={() => setTheme(isDark ? "light" : "dark")}
//       className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-lg font-black text-slate-800 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-cyan-400 dark:hover:bg-slate-800 dark:hover:text-cyan-200"
//     >
//       {isDark ? "☀" : "☾"}
//     </button>
//   );
// }
"use client";

import { useEffect, useState } from "react";

const themeStorageKey = "cetromotos-theme";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(themeStorageKey);

    const initialTheme =
      savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    setTheme(initialTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const isDark = theme === "dark";

    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
    window.localStorage.setItem(themeStorageKey, theme);
  }, [theme, mounted]);

  if (!mounted) {
    return (
      <button
        type="button"
        className="flex h-11 w-11 shrink-0"
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
      title={isDark ? "Modo claro" : "Modo oscuro"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-lg font-black text-slate-800 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-cyan-400 dark:hover:bg-slate-800 dark:hover:text-cyan-200"
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
}
