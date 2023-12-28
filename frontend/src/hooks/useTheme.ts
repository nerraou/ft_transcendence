import { useCallback, useEffect, useState } from "react";

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

enum ThemeSource {
  SYSTEM = "system",
  STORAGE = "storage",
}

interface ThemeState {
  source: ThemeSource;
  value: Theme;
}

interface UseThemeParams {
  storageKey?: string;
}

function getSystemTheme() {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return isDark ? Theme.DARK : Theme.LIGHT;
}

function getInitialTheme(storageKey: string): ThemeState {
  const currentTheme = localStorage.getItem(storageKey);

  if (currentTheme) {
    try {
      return JSON.parse(currentTheme);
    } catch (error) {}
  }
  return {
    value: getSystemTheme(),
    source: ThemeSource.SYSTEM,
  };
}

export default function useTheme(params?: UseThemeParams) {
  const { storageKey = "theme" } = params ?? {};

  const [theme, setTheme] = useState<ThemeState | null>(null);

  useEffect(
    function () {
      setTheme(getInitialTheme(storageKey));
    },
    [storageKey],
  );

  useEffect(
    function watchSystemThemeChange() {
      const matchedMedia = window.matchMedia("(prefers-color-scheme: dark)");

      function changeEventListener(e: MediaQueryListEvent) {
        if (!theme) {
          return;
        }

        const newThemeName = e.matches ? Theme.DARK : Theme.LIGHT;

        const { source } = theme;

        if (source == ThemeSource.SYSTEM) {
          setTheme({
            value: newThemeName,
            source,
          });
        }
      }

      matchedMedia.addEventListener("change", changeEventListener);

      return function removeListener() {
        matchedMedia.removeEventListener("change", changeEventListener);
      };
    },
    [theme],
  );

  useEffect(
    function setThemeBodyClassName() {
      if (theme) {
        const { value, source } = theme;
        let isDark = false;

        if (source == ThemeSource.SYSTEM) {
          isDark = getSystemTheme() == Theme.DARK;
        } else {
          isDark = value == Theme.DARK;
        }

        if (isDark) {
          document.documentElement.classList.add(Theme.DARK);
        } else {
          document.documentElement.classList.remove(Theme.DARK);
        }

        localStorage.setItem(storageKey, JSON.stringify(theme));
      }
    },
    [theme, storageKey],
  );

  const toggleTheme = useCallback(
    function toggleTheme() {
      if (!theme) {
        return;
      }

      const { value } = theme;

      setTheme({
        value: value == Theme.DARK ? Theme.LIGHT : Theme.DARK,
        source: ThemeSource.STORAGE,
      });
    },
    [theme],
  );

  return { theme, toggleTheme, setTheme };
}
