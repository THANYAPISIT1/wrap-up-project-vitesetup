import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const ConfirmationModal = ({ isOpen, onClose, onConfirm, selectedNotes, selectionLabel, summarySID }) => {
  useEffect(() => {
    console.log("ConfirmationModal useEffect, summarySID:", summarySID);
  }, [summarySID]);
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate(); // Initialize useNavigate

  if (!isOpen) return null;

  const handleConfirmClick = async () => {
    setLoading(true); // Start loading
    await onConfirm(selectedNotes, selectionLabel); // Wait for the summary process to complete
    setLoading(false); // Stop loading
  };

  const handleViewSummaryClick = () => {
    if (summarySID) {
      navigate(`/summary/${summarySID}`); // Navigate to the summary page
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">

        {summarySID ? (
          <div>
            <h2 className="text-xl font-semibold mb-2">Summary successfully</h2>
            <p>Did you want to see the note has been summarized?</p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2">Confirm Summary</h2>
            {selectedNotes.length < 2 && !summarySID && (
              <p className="text-red-500 font-bold">PLEASE Select more than two notes to summary.</p>
            )}
            <p>Are you sure you want to summarize the selected notes?</p>
          </div>
        )}


        {/*ANCHOR Show loading spinner or message */}
        {loading ? (
          <div className="flex items-center justify-center space-x-2 mt-4">
            <button
              type="button"
              className="py-2 px-4 flex justify-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg max-w-md"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="mr-2 animate-spin"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z" />
              </svg>
              Summarizing...
            </button>
          </div>

        ) : (
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
            {summarySID ? (
                <button
                onClick={handleViewSummaryClick}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
              >
                View Summary
              </button>
            ) : (
              <button
                onClick={handleConfirmClick}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                Confirm
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmationModal;
