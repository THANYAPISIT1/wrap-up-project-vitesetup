import { useState } from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, selectedNotes, selectionLabel }) => {
  const [loading, setLoading] = useState(false); // Track loading state

  if (!isOpen) return null;

  const handleConfirmClick = async () => {
    setLoading(true); // Start loading
    await onConfirm(selectedNotes,selectionLabel); // Wait for the summary process to complete
    setLoading(false); // Stop loading
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Confirm Summary</h2>
        <p>Are you sure you want to summarize the selected notes?</p>

        {/* Show loading spinner or message */}
        {loading ? (
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p>Summarizing...</p>
          </div>
        ) : (
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmationModal;
