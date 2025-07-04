import React from "react";

interface Props  {
  onUpload: (url: string) => void;
  imageUrl?: string | null;
};

const OverlayImageUpload = ({ onUpload, imageUrl }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onUpload(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (imageUrl) {
    return (
      <div className="flex flex-col items-center justify-center w-80 h-15">
        
        <label
          htmlFor="overlay-upload"
          className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Re-upload Overlay Image
        </label>
        <input
          id="overlay-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>
    );
  }

  // Default upload UI with SVG icon
  return (
    <label
      htmlFor="overlay-upload"
      className="cursor-pointer flex flex-col items-center justify-center w-60 h-40 border-2 border-dashed border-green-400 rounded-lg bg-white hover:bg-green-50 transition p-4 shadow"
    >
      {/* Upload Icon */}
      <svg
        className="w-10 h-10 text-green-500 mb-2"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 16v4a1 1 0 001 1h14a1 1 0 001-1v-4M16 12l-4-4m0 0l-4 4m4-4v12"
        />
      </svg>
      {/* Text Label */}
      <span className="text-sm text-green-700 font-medium text-center">
        Upload Overlay Image
      </span>
      <input
        id="overlay-upload"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </label>
  );
};

export default OverlayImageUpload;
