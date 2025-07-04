import React, { useState, useRef } from "react";
import { QRCodeCanvas } from 'qrcode.react';
import { toPng } from "html-to-image";

const QrGenerator = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const qrRef = useRef<HTMLDivElement>(null);

  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result as string;
        setImageUrl(base64Url);
      };
      reader.readAsDataURL(file);
    }
  };

   const handleDownload = () => {
    if (!qrRef.current) return;

    toPng(qrRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "qr-code.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Failed to download QR code", err);
      });
  };


  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold">QR Code from Image</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                   file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 
                   hover:file:bg-blue-100"
      />

      {imageUrl && (
        <>
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-40 h-40 object-contain border rounded shadow"
          />

          <div ref={qrRef} className="p-4 bg-white rounded shadow">
            <QRCodeCanvas value={imageUrl} size={256} />
          </div>

          <button
            onClick={handleDownload}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download QR Code
          </button>
        </>
      )}
    </div>
  );
};

export default QrGenerator;
