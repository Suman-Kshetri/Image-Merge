const GenerateButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="cursor-pointer px-6 py-2 bg-[var(--button-primary)] text-white font-semibold rounded-lg shadow-md hover:brightness-110 transition duration-300"
  >
    Generate Merged Image
  </button>
);

export default GenerateButton;
