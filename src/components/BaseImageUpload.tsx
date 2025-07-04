import React from "react";

interface Props {
  onUpload: (url: string) => void;
  imageUrl?: string | null;
  onRemove?: () => void; // optional, if you want remove functionality
}

const BaseImageUpload = ({ onUpload, imageUrl, onRemove }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onUpload(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (imageUrl) {
    // Show reupload button if image exists
    return (
      <div className="flex flex-col items-center justify-center w-70 h-40 border-2 border-blue-400 rounded-lg bg-white p-4 shadow">
        <p className="mb-2 text-blue-700 font-medium text-center">
          Base Image Uploaded
        </p>
        <label
          htmlFor="base-upload"
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Re-upload Base Image
        </label>
        <input
          id="base-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />

        {/* Optional remove button */}
        {onRemove && (
          <button
            onClick={onRemove}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Remove Image
          </button>
        )}
      </div>
    );
  }

  // Default upload UI with SVG icon
  return (
    <label
      htmlFor="base-upload"
      className="cursor-pointer flex flex-col items-center justify-center w-70 h-40 border-2 border-dashed border-blue-400 rounded-lg bg-white hover:bg-blue-50 transition p-4 shadow"
    >
      {/* Upload Icon */}
      <svg
        className="w-10 h-10 text-blue-500 mb-2"
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
      <span className="text-sm text-blue-700 font-medium text-center">
        Upload Base Image
      </span>
      <input
        id="base-upload"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </label>
  );
};

export default BaseImageUpload;
