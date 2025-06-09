import axios from 'axios';
import { useState, type ChangeEvent } from 'react'

type UploadStatus = "idle" | "uploading" | "success" | "error";

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFile = e.target.files[0];
      setFile(newFile);
      console.log("file: ", newFile);
    }
  };

  const handleFileHandling = async () => {
    if (!file) return;
    setStatus("uploading");

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post("//url", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className='space-y-4'>
      <input type="file" onChange={handleFileChange} />
      {file && (
        <div className="mb-4">
          <p>File Name: {file.name}</p>
          <p>File Size: {(file.size / 1024).toFixed(2)} KB</p>
          <p>File Type: {file.type}</p>
        </div>
      )}
      {
        file && (
          <button 
            onClick={handleFileHandling} 
            disabled={status === "uploading"}
          >
            {status === "uploading" ? "Uploading..." : "Upload"}
          </button>
        )
      }
      {status === 'success' && <p>File uploaded successfully.</p>}
      {status === 'error' && <p>File upload failed.</p>}
    </div>
  );
};

export default FileUploader;
