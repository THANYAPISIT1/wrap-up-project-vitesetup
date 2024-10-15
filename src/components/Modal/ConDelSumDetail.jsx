const ConfirmDeleteModal = ({ isOpen, onCancel, onConfirm, itemName }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-6 rounded-lg shadow-xl z-50">
          <h2 className="text-xl font-bold mb-4">
            Are you sure you want to delete this {itemName}?
          </h2>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmDeleteModal;