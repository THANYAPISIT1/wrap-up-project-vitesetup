const RestoreNoteModal = ({ isOpen, onClose, onRestore, note }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Restore Note</h2>
        <p>Are you sure you want to restore this note?</p>
        <p className="font-semibold mt-2">{note.title}</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="mr-4 bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => onRestore(note.NID)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Restore
          </button>
        </div>
      </div>
    </div>
  );
};
  
  export default RestoreNoteModal;
  