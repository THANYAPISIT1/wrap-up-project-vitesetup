import NotesList from "../Note/NotesList";
import RestoreNoteModal from "../../components/Modal/RestoreNoteModal";
import { useState, useEffect } from "react";
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

const Trash = () => {
    const [trashNotes, setTrashNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 

    // Fetch deleted notes from the /trash API when the component mounts
    useEffect(() => {
        const fetchTrashNotes = async () => {
            try {
                const response = await axios.get(`${API_URL}/trash`, {
                    withCredentials: true, // Include cookies in the request
                });

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
            await axios.put(`${API_URL}/note/default/${NID}`, 
                {}, 
                { withCredentials: true }
            );
            setTrashNotes(trashNotes.filter((note) => note.NID !== NID)); 
            closeModal(); 
        } catch (error) {
            console.error("Error restoring note:", error.message);
        }
    };

    const listVariants = {
        hidden: { opacity: 0, y: 20 },  // Start hidden and slightly below
        visible: { opacity: 1, y: 0 },  // Move up and fade in
        exit: { opacity: 0, y: 20 }     // Move down and fade out
    };

    return (
        <div className="p-8">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-6">Trash ({trashNotes.length})</h1>
            </div>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                <AnimatePresence>
                    {trashNotes.map((note) => (
                        <motion.div 
                            key={note.NID} 
                            layoutId={`note-${note.NID}`}
                            variants={listVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <NotesList
                                key={note.NID}
                                title={note.title}
                                content={note.content}
                                dateUpdate={note.date_update} 
                                label={note.label}
                                onClick={() => handleNoteClick(note)} 
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
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