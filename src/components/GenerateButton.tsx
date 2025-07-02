const GenerateButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="cursor-pointer px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
  >
    Generate Merged Image
  </button>
);

export default GenerateButton;
