// src/pages/Home.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const Home: React.FC<HomeProps> = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-start mt-15 px-6 max-w-4xl mx-auto bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 gap-8">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="fixed top-4 right-4 p-2 rounded-lg bg-[var(--nav-bg)] text-white cursor-pointer hover:brightness-110 transition flex items-center justify-center z-50"
      >
        {theme === "light" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.36 5.66l-.7-.7M6.34 6.34l-.7-.7m12.02 12.02l-.7-.7M6.34 17.66l-.7-.7M12 7a5 5 0 100 10 5 5 0 000-10z"
            />
          </svg>
        )}
      </button>

      <h1 className="text-4xl font-extrabold text-center m-0">Welcome to Your Tools</h1>
      <p className="text-center text-[var(--text-main)]/70 max-w-md m-0">
        Easily merge images or generate QR codes — get started by selecting one of the options below.
      </p>

      {/* Two Cards */}
      <div className="flex gap-10 flex-wrap justify-center w-full px-4">
        <div
          onClick={() => navigate("/merge-image")}
          className="cursor-pointer bg-[var(--card-bg)] rounded-xl shadow-lg p-8 w-72 flex flex-col items-center text-center hover:brightness-105 transition duration-300 ease-in-out select-none"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") navigate("/merge-image");
          }}
          aria-label="Go to Image Merger"
        >
          <h2 className="text-2xl font-semibold mb-3">Image Merger</h2>
          <p className="text-[var(--text-main)]/80 m-0">
            Upload and crop images, then merge them with ease.
          </p>
        </div>

        <div
          onClick={() => navigate("/qr-generator")}
          className="cursor-pointer bg-[var(--card-bg)] rounded-xl shadow-lg p-8 w-72 flex flex-col items-center text-center hover:brightness-105 transition duration-300 ease-in-out select-none"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") navigate("/qr-generator");
          }}
          aria-label="Go to QR Generator"
        >
          <h2 className="text-2xl font-semibold mb-3">QR Code Generator</h2>
          <p className="text-[var(--text-main)]/80 m-0">
            Create QR codes from URLs, text, or uploaded files.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
