import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import { BsSave2Fill } from 'react-icons/bs'; // Import the icon

const API_URL = import.meta.env.VITE_API_URL;

const NoteModal = ({ isOpen, onClose, title, content, NID, onSave, status }) => {
    const [editableContent, setEditableContent] = useState(content);
    const [editableTitle, setEditableTitle] = useState(title);
    const [showConfirm, setShowConfirm] = useState(false);
    const editor = useRef(null);

    useEffect(() => {
        setEditableContent(content);
        setEditableTitle(title);
    }, [content, title]);

    const handleSave = async () => {
        try {
            const response = await axios.put(
                `${API_URL}/note/${NID}`,
                { title: editableTitle, content: editableContent },
                { withCredentials: true }
            );

            if (response.data.message === "Note updated successfully!!") {
                onSave(); // Notify parent component to refresh notes
            } else {
                console.log(response.data.message);
            }
            onSave();
            onClose();
        } catch (error) {
            console.error("Error updating note:", error.message);
        }
    };

    const handleArchive = async () => {
        try {
            const response = await axios.put(
                `${API_URL}/note/archive/${NID}`,
                { status: 'archive' },
                { withCredentials: true }
            );

            if (response.data.message === "Note archived successfully!!") {
                onSave(); // Notify parent component to refresh notes
            } else {
                console.log(response.data.message);
            }
            onSave();
            onClose();
        } catch (error) {
            console.error("Error archiving note:", error.message);
        }
    };

    const handleUnarchive = async () => {
        try {
            const response = await axios.put(
                `${API_URL}/note/default/${NID}`,
                { status: 'default' },
                { withCredentials: true }
            );

            if (response.data.message === "Note unarchived successfully!!") {
                onSave(); // Notify parent component to refresh notes
            } else {
                console.log(response.data.message);
            }
            onSave();
            onClose();
        } catch (error) {
            console.error("Error unarchiving note:", error.message);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.put(
                `${API_URL}/note/delete/${NID}`,
                { status: 'deleted' },
                { withCredentials: true }
            );

            if (response.data.message === "Note deleted successfully!!") {
                onSave(); // Notify parent component to refresh notes
            } else {
                console.log(response.data.message);
            }
            onSave();
            onClose();
        } catch (error) {
            console.error("Error deleting note:", error.message);
        }
    };

    const handleDeleteClick = () => {
        setShowConfirm(true); // Show the confirmation dialog
    };

    const confirmDelete = () => {
        setShowConfirm(false);
        handleDelete();
    };

    const cancelDelete = () => {
        setShowConfirm(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center ">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
            <div className="relative z-10 bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl font-bold">Edit Note</h2>
                    <button
                        onClick={handleDeleteClick}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
                <input
                    className="w-full p-2 border rounded-md mb-4"
                    value={editableTitle}
                    onChange={(e) => setEditableTitle(e.target.value)}
                />
                <JoditEditor
                    ref={editor}
                    value={editableContent}
                    onBlur={(newContent) => setEditableContent(newContent)}
                    onChange={() => {}}
                    config={{
                        height: 400,
                        width: '100%',
                        theme: 'default',
                    }}
                    className="h-[400px] w-full"
                />
                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    {status === 'archive' ? (
                        <button
                            onClick={handleUnarchive} // Unarchive button handler
                            className="px-4 py-2 bg-green-500 transition-all duration-300 text-white rounded-md flex items-center hover:bg-green-700"
                        >
                            <BsSave2Fill className="mr-2" /> Unarchive
                        </button>
                    ) : (
                        <button
                            onClick={handleArchive} // Archive button handler
                            className="px-4 py-2 bg-green-500 transition-all duration-300 text-white rounded-md flex items-center hover:bg-green-700"
                        >
                            <BsSave2Fill className="mr-2" /> Archive
                        </button>
                    )}
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex justify-center items-center">
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="relative z-10 bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this note?</h2>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoteModal;
