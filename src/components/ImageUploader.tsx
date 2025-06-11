import React, { useState, useRef } from 'react';
import ImageCropper from './ImageCropper';
import type { PixelCrop } from 'react-image-crop';

const ImageUploader: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [overlayUrl, setOverlayUrl] = useState<string | null>(null);
  const [croppedArea, setCroppedArea] = useState<PixelCrop | null>(null);
  const [baseImageNaturalSize, setBaseImageNaturalSize] = useState<{ width: number; height: number } | null>(null);
  const [mergedImageUrl, setMergedImageUrl] = useState<string | null>(null);

  const baseImageRef = useRef<HTMLImageElement | null>(null);
  const overlayImageRef = useRef<HTMLImageElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          setImageUrl(reader.result as string);
          setMergedImageUrl(null);
          setCroppedArea(null);
          setBaseImageNaturalSize(null);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOverlayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOverlayUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedAreaPixels: PixelCrop) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleBaseImageLoaded = (img: HTMLImageElement) => {
    baseImageRef.current = img;
    setBaseImageNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
  };

  const handleOverlayImageLoaded = (img: HTMLImageElement) => {
    overlayImageRef.current = img;
  };

  const generateMergedImage = () => {
    if (!baseImageRef.current || !overlayImageRef.current || !croppedArea || !baseImageNaturalSize) {
      alert('Please select base image, overlay image, and crop area first.');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = baseImageNaturalSize.width;
    canvas.height = baseImageNaturalSize.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      alert('Failed to get canvas context');
      return;
    }

    // Draw base image
    ctx.drawImage(baseImageRef.current, 0, 0, canvas.width, canvas.height);

    // Draw overlay image on cropped area
    ctx.drawImage(
      overlayImageRef.current,
      croppedArea.x,
      croppedArea.y,
      croppedArea.width,
      croppedArea.height
    );

    const mergedDataUrl = canvas.toDataURL('image/png');
    setMergedImageUrl(mergedDataUrl);
  };

  const downloadMergedImage = () => {
    if (!mergedImageUrl) return;

    const link = document.createElement('a');
    link.href = mergedImageUrl;
    link.download = 'merged-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 space-y-6 px-4 max-w-[1300px] mx-auto">
      {/* Upload base image */}
      <label
        htmlFor="upload-input"
        className="cursor-pointer inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Browse Base Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        id="upload-input"
        className="hidden"
      />

      {/* Cropper */}
      {imageUrl && (
        <ImageCropper
          imageUrl={imageUrl}
          onCropChange={() => {}}
          onCropComplete={handleCropComplete}
          onImageLoaded={handleBaseImageLoaded}
        />
      )}

      {/* Upload overlay image */}
      {croppedArea && (
        <>
          <label
            htmlFor="overlay-input"
            className="cursor-pointer inline-block px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            Upload Overlay Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleOverlayChange}
            id="overlay-input"
            className="hidden"
          />
        </>
      )}

      {/* Invisible overlay image */}
      {overlayUrl && (
        <img
          src={overlayUrl}
          alt="Overlay"
          ref={overlayImageRef}
          style={{ display: 'none' }}
          onLoad={(e) => handleOverlayImageLoaded(e.currentTarget)}
        />
      )}

      {/* Generate merged image */}
      {overlayUrl && croppedArea && (
        <button
          onClick={generateMergedImage}
          className="cursor-pointer px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
        >
          Generate Merged Image
        </button>
      )}

      {/* Show merged image and download button */}
      {mergedImageUrl && (
        <>
          <div className="mt-6 border border-gray-400 p-2" style={{ overflow: 'auto' }}>
            <img
              src={mergedImageUrl}
              alt="Merged result"
              style={{
                width: baseImageNaturalSize?.width ?? 'auto',
                height: baseImageNaturalSize?.height ?? 'auto',
              }}
            />
          </div>

          <button
            onClick={downloadMergedImage}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          >
            Download Merged Image
          </button>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
