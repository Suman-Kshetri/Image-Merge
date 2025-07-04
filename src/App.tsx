import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import ToolLayout from "./pages/ToolLayout";
import ImageUploader from "./components/ImageUploader";
import QrGenerator from "./components/QrGenerator";

const App: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ToolLayout theme={theme} />, // pass theme to layout
      children: [
        {
          index: true,
          element: <Home theme={theme} toggleTheme={toggleTheme} />, // toggle button only on Home
        },
        { path: "merge-image", element: <ImageUploader /> },
        { path: "qr-generator", element: <QrGenerator /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
