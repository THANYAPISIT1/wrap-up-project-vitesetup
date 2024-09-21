import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import NotesList from "../Note/NotesList";
import RestoreNoteModal from "../../components/Modal/RestoreNoteModal";
import ConfirmLogoutModal from "../../components/Modal/ConfirmLogoutModal";
import { useState, useEffect } from "react";
import axios from 'axios';
import { motion,AnimatePresence } from "framer-motion";


const Trash = () => {
    const [trashNotes, setTrashNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [showConfirmLogout, setShowConfirmLogout] = useState(false); 

    // Fetch deleted notes from the /trash API when the component mounts
    useEffect(() => {
        const fetchTrashNotes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/trash', {
                    withCredentials: true, // Include cookies in the request
                });

                console.log("API Response:", response.data.note); // Check the data returned by the API

                // Set the fetched deleted notes to state
                setTrashNotes(response.data.note);
            } catch (error) {
                console.error("Error fetching deleted notes:", error.message);
            }
        };

        fetchTrashNotes();
    }, []);

    const handleNoteClick = (trashNotes) => {
        setSelectedNote(trashNotes);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedNote(null);
    };

    const handleRestore = async (NID) => {
        try {
            await axios.put(`http://localhost:8000/note/default/${NID}`, 
                {}, 
                { withCredentials: true }
            );
            setTrashNotes(trashNotes.filter((note) => note.NID !== NID)); 
            closeModal(); 
        } catch (error) {
            console.error("Error restoring note:", error.message);
        }
    };

    return (
        <div className="flex bg-gray-100 min-h-screen max-h-content">
            <Sidebar onLogoutClick={() => setShowConfirmLogout(true)}/>
            <div className="flex-1 ml-[20rem]">
                <Navbar />
                <div>
                    
                </div>
                {/* -----------Content----------- */}
                <div className="p-8">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold mb-6">Trash</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {trashNotes.map((note, index) => (
                            <motion.div key={note.NID} layoutId={`note-${note.NID}`}>
                                <NotesList
                                    key={index}
                                    title={note.title}
                                    content={note.content}
                                    dateUpdate={note.date_update} 
                                    onClick={() => handleNoteClick(note)} 
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {showConfirmLogout && (
                <ConfirmLogoutModal
                    onCancel={() => setShowConfirmLogout(false)} // Handle cancellation
                />
            )}

            {selectedNote && (
                <RestoreNoteModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onRestore={handleRestore}
                    note={selectedNote}
                />
            )}
        </div>
    );
};

export default Trash;
