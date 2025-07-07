import { useState, useEffect } from "react";

export const useTheme = () => {
  // Function to get initial theme synchronously
  const getInitialTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "light"; // SSR safe fallback

    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved === "light" || saved === "dark") return saved;

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  // Initialize state with function to avoid flicker
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  // Effect to keep <html> classes in sync (runs after mount and when theme changes)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle theme helper
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};
