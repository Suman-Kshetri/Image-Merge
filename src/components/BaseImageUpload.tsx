type Props = {
  onUpload: (url: string) => void;
};

const BaseImageUpload = ({ onUpload }: Props) => {
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
        htmlFor="upload-input"
        className="cursor-pointer px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Browse Base Image
      </label>
      <input
        id="upload-input"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </>
  );
};

export default BaseImageUpload;
