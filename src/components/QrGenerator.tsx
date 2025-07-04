import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from "html-to-image";

// 🌐 Cloudinary API details from .env
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
}/upload`;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET!;

const QrGenerator: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [inputUrl, setInputUrl] = useState<string>("");
  const [qrValue, setQrValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setInputUrl("");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        setQrValue(data.secure_url);
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLinkInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value);
  };

  const generateQrFromLink = () => {
    if (!inputUrl.trim()) {
      alert("Please enter a valid URL or text.");
      return;
    }
    setFile(null);
    setQrValue(inputUrl.trim());
  };

  const handleDownloadQR = async () => {
    if (!qrRef.current) return;

    try {
      const dataUrl = await toPng(qrRef.current);
      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download QR failed", err);
    }
  };

  return (
    <div
      className="min-h-screen p-6 flex flex-col items-center gap-6 transition-colors duration-300
        bg-[var(--bg-main)] text-[var(--text-main)]"
    >
      <h1 className="text-3xl font-bold text-center">QR Code Generator</h1>

      {/* File Upload UI Card */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="cursor-pointer flex flex-col items-center justify-center
          border-2 border-dashed rounded-xl p-6 w-80 shadow transition-colors duration-300
          border-[var(--border-main)]
          bg-[var(--card-bg)]
          text-[var(--text-main)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          style={{ color: "var(--primary)" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 15.75V19.5A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-3.75M16.5 10.5L12 6m0 0L7.5 10.5M12 6v12"
          />
        </svg>
        <span className="font-semibold">Click to upload a file</span>
        <span className="text-xs mt-1 text-[var(--text-muted)]">PNG, JPG, PDF, etc.</span>
        <input
          type="file"
          onChange={handleFileUpload}
          ref={fileInputRef}
          className="hidden"
        />
      </div>

      <div className="text-sm text-[var(--text-muted)]">or enter a link/text manually</div>

      {/* Manual Link Input */}
      <div className="flex gap-2 flex-wrap justify-center">
        <input
          type="text"
          value={inputUrl}
          onChange={handleLinkInput}
          placeholder="https://example.com or any text"
          className="border px-4 py-2 rounded w-[300px] transition-colors duration-300
            bg-[var(--input-bg)]
            text-[var(--text-main)]
            border-[var(--border-main)]"
        />
        <button
          onClick={generateQrFromLink}
          className="px-4 py-2 rounded transition-colors duration-300 bg-[var(--button-primary)] text-white hover:bg-[var(--button-primary-hover)]"
        >
          Generate QR
        </button>
      </div>

      {loading && <p className="text-[var(--primary)]">Uploading...</p>}
      {file && !loading && (
        <p className="text-[var(--text-muted)]">Uploaded: {file.name}</p>
      )}

      {/* QR Preview */}
      {qrValue && (
        <>
          <div
            ref={qrRef}
            className="p-4 rounded shadow transition-colors duration-300 bg-[var(--card-bg)]"
          >
            <QRCodeCanvas value={qrValue} size={256} />
          </div>
          <button
            onClick={handleDownloadQR}
            className="px-6 py-2 rounded transition-colors duration-300 bg-[var(--button-success)] text-white hover:bg-[var(--button-success-hover)]"
          >
            Download QR Code
          </button>
        </>
      )}
    </div>
  );
};

export default QrGenerator;
