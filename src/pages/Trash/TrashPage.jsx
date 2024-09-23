import NotesList from "../Note/NotesList";
import RestoreNoteModal from "../../components/Modal/RestoreNoteModal";
import { useState, useEffect } from "react";
import axios from 'axios';
import { motion } from "framer-motion";


const Trash = () => {
    const [trashNotes, setTrashNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 

    // Fetch deleted notes from the /trash API when the component mounts
    useEffect(() => {
        const fetchTrashNotes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/trash', {
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
    const noteVariants = {
        hidden: { opacity: 0, y: 20 },  // Starts slightly below and transparent
        visible: { opacity: 1, y: 0 },  // Moves up and becomes fully visible
      };

    return (
        <div className="p-8">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-6">Trash ({trashNotes.length})</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {trashNotes.map((note, index) => (
                    <motion.div 
                        key={note.NID} 
                        layoutId={`note-${note.NID}`}
                        variants={noteVariants} // Apply animation variants
                        initial="hidden" 
                        animate="visible"
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <NotesList
                            key={index}
                            title={note.title}
                            content={note.content}
                            dateUpdate={note.date_update} 
                            label={note.label}
                            onClick={() => handleNoteClick(note)} 
                        />
                    </motion.div>
                ))}
            </div>
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
