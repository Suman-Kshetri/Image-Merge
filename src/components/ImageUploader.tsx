import React, { useState } from 'react';

const MAX_WIDTH = 1200;
const MAX_HEIGHT = 700;

const ImageUploader: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          if (img.width <= MAX_WIDTH && img.height <= MAX_HEIGHT) {
            setImageUrl(reader.result as string);
            setImageName(file.name);
            setError(null);
          } else {
            setImageUrl(null);
            setImageName(null);
            setError(
              `Image is too large. Max allowed size is ${MAX_WIDTH}x${MAX_HEIGHT}px. Your image is ${img.width}x${img.height}px.`
            );
          }
        };
        img.onerror = () => {
          setError('Failed to load the image.');
          setImageUrl(null);
          setImageName(null);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImageUrl(null);
    setImageName(null);
    setError(null);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 space-y-6 px-4 max-w-[1300px] mx-auto">
      {/* Upload button */}
      <label
        htmlFor="upload-input"
        className="cursor-pointer inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Browse Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        id="upload-input"
        className="hidden"
      />

      {/* Error message */}
      {error && (
        <div className="text-red-600 font-semibold text-center max-w-[1200px]">
          {error}
        </div>
      )}

      {/* Image name above the image */}
      {imageUrl && imageName && (
        <div className="text-gray-700 font-medium max-w-[1200px]">
          {imageName}
        </div>
      )}

      {/* Image preview */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded"
          className="max-w-[1200px] max-h-[700px] object-contain rounded-lg shadow-lg border border-gray-300"
        />
      )}

      {/* Delete button below the image */}
      {imageUrl && (
        <button
          onClick={handleDeleteImage}
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        >
          Delete Image
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
