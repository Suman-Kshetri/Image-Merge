import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

interface ToolLayoutProps {
  theme: "light" | "dark";
}

const ToolLayout: React.FC<ToolLayoutProps> = () => {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <div
      className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] p-6 transition-colors duration-300"
    >
      {/* Conditionally render NavBar only if NOT Home */}
      {!isHome && (
        <div className="fixed top-4 right-6 flex items-center space-x-4 z-50">
          {location.pathname !== "/merge-image" && (
            <NavLink
              to="/merge-image"
              className="px-4 py-2 bg-[var(--button-primary)] text-white rounded-lg hover:brightness-110 transition"
            >
              Go To Image Merger
            </NavLink>
          )}
          {location.pathname !== "/qr-generator" && (
            <NavLink
              to="/qr-generator"
              className="px-4 py-2 bg-[var(--button-secondary)] text-white rounded-lg hover:brightness-110 transition"
            >
              Go To QR Generator
            </NavLink>
          )}
          <NavLink
            to="/"
            className="px-4 py-2 bg-[var(--nav-bg)] text-white rounded-lg hover:brightness-110 transition"
          >
            Home
          </NavLink>
        </div>
      )}

      <div className="pt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default ToolLayout;
