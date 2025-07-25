import React, { useState, useRef } from "react";
import ImageCropper from "./ImageCropper";
import BaseImageUpload from "./BaseImageUpload";
import OverlayImageUpload from "./OverlayImageUpload";
import GenerateButton from "./GenerateButton";
import MergedImagePreview from "./MergedImagePreview";
import type { PixelCrop } from "react-image-crop";

const ImageUploader: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [overlayUrl, setOverlayUrl] = useState<string | null>(null);
  const [croppedArea, setCroppedArea] = useState<PixelCrop | null>(null);
  const [baseImageNaturalSize, setBaseImageNaturalSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [mergedImageUrl, setMergedImageUrl] = useState<string | null>(null);

  const baseImageRef = useRef<HTMLImageElement | null>(null);
  const overlayImageRef = useRef<HTMLImageElement | null>(null);

  const handleBaseImageUpload = (url: string) => {
    const img = new Image();
    img.onload = () => {
      setImageUrl(url);
      setMergedImageUrl(null);
      setCroppedArea(null);
      setBaseImageNaturalSize(null);
    };
    img.src = url;
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
  };

  const handleOverlayUpload = (url: string) => {
    setOverlayUrl(url);
  };

  const handleCropComplete = (croppedAreaPixels: PixelCrop) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleBaseImageLoaded = (img: HTMLImageElement) => {
    baseImageRef.current = img;
    setBaseImageNaturalSize({
      width: img.naturalWidth,
      height: img.naturalHeight,
    });
  };

  const handleOverlayImageLoaded = (img: HTMLImageElement) => {
    overlayImageRef.current = img;
  };

  const generateMergedImage = () => {
    if (
      !baseImageRef.current ||
      !overlayImageRef.current ||
      !croppedArea ||
      !baseImageNaturalSize
    ) {
      alert("Please select base image, overlay image, and crop area first.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = baseImageNaturalSize.width;
    canvas.height = baseImageNaturalSize.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      alert("Failed to get canvas context");
      return;
    }

    ctx.drawImage(baseImageRef.current, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      overlayImageRef.current,
      croppedArea.x,
      croppedArea.y,
      croppedArea.width,
      croppedArea.height
    );

    const mergedDataUrl = canvas.toDataURL("image/png");
    setMergedImageUrl(mergedDataUrl);
  };

  const downloadMergedImage = () => {
    if (!mergedImageUrl) return;

    const link = document.createElement("a");
    link.href = mergedImageUrl;
    link.download = "merged-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen w-full bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">
      <div className="flex flex-col items-center justify-center mt-10 space-y-6 px-4 max-w-[1300px] mx-auto">
        <h1 className="text-3xl font-bold text-center">Image Merger</h1>

        <BaseImageUpload
          onUpload={handleBaseImageUpload}
          imageUrl={imageUrl}
          onRemove={handleRemoveImage}
        />

        {imageUrl && (
          <ImageCropper
            imageUrl={imageUrl}
            onCropChange={() => {}}
            onCropComplete={handleCropComplete}
            onImageLoaded={handleBaseImageLoaded}
          />
        )}

        {croppedArea && (
          <OverlayImageUpload
            onUpload={handleOverlayUpload}
            imageUrl={overlayUrl}
          />
        )}

        {overlayUrl && (
          <img
            src={overlayUrl}
            alt="Overlay"
            ref={overlayImageRef}
            style={{ display: "none" }}
            onLoad={(e) => handleOverlayImageLoaded(e.currentTarget)}
          />
        )}

        {overlayUrl && croppedArea && (
          <GenerateButton onClick={generateMergedImage} />
        )}

        {mergedImageUrl && baseImageNaturalSize && (
          <MergedImagePreview
            url={mergedImageUrl}
            width={baseImageNaturalSize.width}
            height={baseImageNaturalSize.height}
            onDownload={downloadMergedImage}
          />
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
