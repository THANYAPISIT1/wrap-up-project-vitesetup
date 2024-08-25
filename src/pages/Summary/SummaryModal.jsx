const SummaryModal = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="text-gray-700 mb-6">{content}</p>
                <button
                    onClick={onClose}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SummaryModal;
