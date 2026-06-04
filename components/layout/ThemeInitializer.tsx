"use client";

import { useLayoutEffect } from "react";

const themeStorageKey = "cetromotos-theme";

const getPrefersDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export default function ThemeInitializer() {
  useLayoutEffect(() => {
    const savedTheme = window.localStorage.getItem(themeStorageKey);
    const isDark =
      savedTheme === "dark" || (savedTheme !== "light" && getPrefersDark());
    const root = document.documentElement;

    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
  }, []);

  return null;
}
