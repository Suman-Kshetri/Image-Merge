type Props = {
  onUpload: (url: string) => void;
};

const OverlayImageUpload = ({ onUpload }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onUpload(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <label
        htmlFor="overlay-input"
        className="cursor-pointer px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
      >
        Upload Overlay Image
      </label>
      <input
        id="overlay-input"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </>
  );
};

export default OverlayImageUpload;
