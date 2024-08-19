import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import JoditEditor from 'jodit-react';

const NoteModal = ({ isOpen, onClose, title, content, NID, onSave }) => {
//     const [editableContent, setEditableContent] = useState(content);
//     const [editableTitle, setEditableTitle] = useState(title);
//     const [isDeleting, setIsDeleting] = useState(false); // New state to track delete operation
//     const editor = useRef(null); // Reference for Jodit Editor

//     useEffect(() => {
//         setEditableContent(content);
//         setEditableTitle(title);
//     }, [content, title]);

//     const handleSave = async () => {
//         try {
//             const response = await axios.put(
//                 `http://localhost:8000/note/${NID}`,
//                 {
//                     title: editableTitle,
//                     content: editableContent,
//                 },
//                 { withCredentials: true }
//             );

//             if (response.data.message === "Note updated successfully!!") {
//                 onSave(editableContent);
//             } else {
//                 console.log(response.data.message);
//             }

//             onClose();
//         } catch (error) {
//             console.error("Error updating note:", error.message);
//         }
//     };

//     const handleDelete = async () => {
//         try {
//             setIsDeleting(true); // Set the delete state to true
//             const response = await axios.put(
//                 `http://localhost:8000/note/${NID}`,
//                 {
//                     status: 'deleted', // Update the status to 'deleted'
//                 },
//                 { withCredentials: true }
//             );

//             if (response.data.message === "Note deleted successfully!!") {
//                 console.log("Note deleted successfully!!");
//                 // Optionally remove the note from the UI after deletion
//             } else {
//                 console.log(response.data.message);
//             }

//             onClose();
//         } catch (error) {
//             console.error("Error deleting note:", error.message);
//         } finally {
//             setIsDeleting(false); // Reset the delete state
//         }
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex justify-center items-center">
//             <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
//             <div className="relative z-10 bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6">
//                 <div className="flex justify-between mb-4">
//                     <h2 className="text-2xl font-bold ">Edit Note</h2>
//                     <button
//                         className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
//                         onClick={handleDelete} // Trigger handleDelete on click
//                         disabled={isDeleting} // Disable the button while deleting
//                     >
//                         {isDeleting ? "Deleting..." : "Delete"}
//                     </button>
//                 </div>
//                 <input
//                     className="w-full p-2 border rounded-md mb-4"
//                     value={editableTitle}
//                     onChange={(e) => setEditableTitle(e.target.value)}
//                 />
//                 <JoditEditor
//                     ref={editor}
//                     value={editableContent}
//                     onBlur={(newContent) => setEditableContent(newContent)} // preferred to use only `onBlur` event to update the content
//                     onChange={(newContent) => {}} // onChange can be used as well, but might update too frequently
//                     config={{
//                       height: 400,
//                       width: '100%',
//                       theme: 'default',
//                     }}
//                     className="h-[400px] w-full"
//                 />
//                 <div className="flex justify-end space-x-4 mt-4">
//                     <button
//                         onClick={onClose}
//                         className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={handleSave}
//                         className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
//                     >
//                         Save
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };
    const [editableContent, setEditableContent] = useState(content);
    const [editableTitle, setEditableTitle] = useState(title);
    const [editStatus, setEditStatus] =useState(status);
    const [showConfirm, setShowConfirm] = useState(false); // State for confirmation dialog
    const editor = useRef(null); // Reference for Jodit Editor

    useEffect(() => {
        setEditableContent(content);
        setEditableTitle(title);
        setEditStatus(status);
    }, [content, title]);

    const handleSave = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8000/note/delete/${NID}`,
                {
                    title: editableTitle,
                    content: editableContent,
                },
                { withCredentials: true }
            );

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

    const handleDelete = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8000/note/${NID}`,
                { status: 'deleted' }, // Soft delete by changing status
                { withCredentials: true }
            );

            if (response.data.message === "Note deleted successfully!!") {
                onSave(setEditStatus);
            } else {
                console.log(response.data.message);
            }

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
        <div className="fixed inset-0 z-50 flex justify-center items-center">
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
                    onChange={(newContent) => {}}
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
