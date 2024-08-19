import { useState, useEffect } from 'react';
import axios from 'axios';

const NoteModal = ({ isOpen, onClose, title, content, NID, onSave }) => {
    const [editableContent, setEditableContent] = useState(content);
    const [editableTitle, setEditableTitle] = useState(title);

    useEffect(() => {
        setEditableContent(content);
        setEditableTitle(title);
    }, [content, title]);

    const handleSave = async () => {
        try {
            // Send a PUT request to the server to update the note
            const response = await axios.put(
                `http://localhost:8000/note/${NID}`, // Assuming NID is passed as a prop
                {
                    title: editableTitle,
                    content: editableContent,
                },
                { withCredentials: true }
            );

            // Handle the response or update the UI accordingly
            if (response.data.message === "Note updated successfully!!") {
                onSave(editableContent);
            } else {
                console.log(response.data.message);
            }

            onClose();
        } catch (error) {
            console.error("Error updating note:", error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
            <div className="relative z-10 bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6">
                <h2 className="text-2xl font-bold mb-4">Edit Note</h2>
                <input
                    className="w-full p-2 border rounded-md mb-4"
                    value={editableTitle}
                    onChange={(e) => setEditableTitle(e.target.value)}
                />
                <textarea
                    className="w-full h-40 p-2 border rounded-md mb-4"
                    value={editableContent}
                    onChange={(e) => setEditableContent(e.target.value)}
                />
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteModal;