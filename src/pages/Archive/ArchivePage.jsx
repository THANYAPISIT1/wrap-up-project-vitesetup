import NotesList from "../Note/NotesList";
import RestoreNoteModal from "../../components/Modal/RestoreNoteModal";
import NoteModal from "../../components/Modal/EditNoteModal"; // Import the EditNoteModal
import { useState, useEffect } from "react";
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence

const API_URL = import.meta.env.VITE_API_URL;

const Archive = () => {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 

    // Fetch notes from API when component mounts
    const fetchNotes = async () => {
        try {
            const response = await axios.get(`${API_URL}/archive/`, {
                withCredentials: true, 
            });

            const activeNotes = response.data.note.filter(note => note.status !== 'deleted');

            const sortedNotes = activeNotes.sort(
                (a, b) => new Date(b.date_update) - new Date(a.date_update)
            );

            setNotes(sortedNotes);
        } catch (error) {
            console.error("Error fetching notes:", error.message);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []); 

    const handleNoteClick = (note) => {
        setSelectedNote(note);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedNote(null);
    };

    const handleSave = () => {
        closeModal(); // Close the modal
        fetchNotes(); // Refresh the notes
    };

    const listVariants = {
        hidden: { opacity: 0, y: 20 },  // Start hidden and slightly below
        visible: { opacity: 1, y: 0 },  // Move up and fade in
        exit: { opacity: 0, y: 20 }     // Move down and fade out
    };

    return (
        <div>
            {/* -----------Content----------- */}
            <div className="p-8">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold mb-6">Archived Notes ({notes.length})</h1>
                </div>
                <motion.div layout className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    <AnimatePresence>
                        {notes.map((note) => (
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
            </div>

            {/* NoteModal */}
            {selectedNote && (
                <NoteModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title={selectedNote.title}
                    content={selectedNote.content}
                    NID={selectedNote.NID}
                    status={selectedNote.status} // Pass the note's status
                    onSave={handleSave} // Call handleSave to refresh the notes
                />
            )}
        </div>
    );
};

export default Archive;
