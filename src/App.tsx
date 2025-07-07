import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import ToolLayout from "./pages/ToolLayout";
import ImageUploader from "./components/ImageUploader";
import QrGenerator from "./components/QrGenerator";

const App: React.FC = () => {
  // Initialize theme synchronously to avoid flicker
  const getInitialTheme = (): "light" | "dark" => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  // When theme changes, update <html> class and localStorage
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ToolLayout theme={theme} />,
      children: [
        { index: true, element: <Home theme={theme} toggleTheme={toggleTheme} /> },
        { path: "merge-image", element: <ImageUploader /> },
        { path: "qr-generator", element: <QrGenerator /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
