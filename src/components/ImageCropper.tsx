import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import type { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

type ImageCropperProps = {
  imageUrl: string;
  onCropChange: (crop: Crop) => void;
  onCropComplete: (croppedArea: PixelCrop) => void;
  onImageLoaded?: (img: HTMLImageElement) => void;
};

const ImageCropper: React.FC<ImageCropperProps> = ({
  imageUrl,
  onCropChange,
  onCropComplete,
  onImageLoaded,
}) => {
  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });

  const handleCropChange = (newCrop: Crop) => {
    setCrop(newCrop);
    onCropChange(newCrop);
  };

  const handleCropComplete = (croppedArea: PixelCrop) => {
    onCropComplete(croppedArea);
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    onImageLoaded?.(e.currentTarget);
  };

  return (
    <div style={{ overflow: 'auto' }}>
      <ReactCrop
        crop={crop}
        onChange={handleCropChange}
        onComplete={handleCropComplete}
        aspect={undefined}
      >
        <img
          src={imageUrl}
          alt="To crop"
          onLoad={onImageLoad}
          style={{
            width: 'auto',
            height: 'auto',
          }}
        />
      </ReactCrop>
    </div>
  );
};

export default ImageCropper;