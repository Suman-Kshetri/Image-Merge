type Props = {
  url: string;
  width: number;
  height: number;
  onDownload: () => void;
};

const MergedImagePreview = ({ url, width, height, onDownload }: Props) => (
  <>
    <div className="mt-6 border border-gray-400 p-2 overflow-auto">
      <img src={url} alt="Merged" width={width} height={height} />
    </div>
    <button
      onClick={onDownload}
      className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold cursor-pointer rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
    >
      Download Merged Image
    </button>
  </>
);

export default MergedImagePreview;
