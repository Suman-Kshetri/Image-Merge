type Props = {
  url: string;
  width: number;
  height: number;
  onDownload: () => void;
};

const MergedImagePreview = ({ url, width, height, onDownload }: Props) => (
  <>
    <div className="mt-6 border border-[var(--border)] p-2 overflow-auto bg-[var(--card-bg)] rounded">
      <img src={url} alt="Merged" width={width} height={height} />
    </div>
    <button
      onClick={onDownload}
      className="mt-4 px-6 py-2 bg-[var(--button-primary)] text-white font-semibold cursor-pointer rounded-lg shadow-md hover:brightness-110 transition duration-300"
    >
      Download Merged Image
    </button>
  </>
);

export default MergedImagePreview;
