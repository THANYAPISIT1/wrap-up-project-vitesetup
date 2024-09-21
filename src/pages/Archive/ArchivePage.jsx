import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import NotesList from "../Note/NotesList";
import RestoreNoteModal from "../../components/Modal/RestoreNoteModal";
import ConfirmLogoutModal from "../../components/Modal/ConfirmLogoutModal";
import { useState, useEffect } from "react";
import axios from 'axios';
import { motion } from "framer-motion";

const Archive = () => {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [showConfirmLogout, setShowConfirmLogout] = useState(false); 


    // Fetch notes from API when component mounts
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/archive/', {
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

    const handleRestore = async (NID) => {
        try {
            await axios.put(`http://localhost:8000/note/default/${NID}`, 
                {}, 
                { withCredentials: true }
            );
            setNotes(notes.filter((note) => note.NID !== NID)); 
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

                {/* -----------Content----------- */}

                <div className="p-8">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold mb-6">Archived Notes ({notes.length})</h1>
                    </div>
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {notes.map((note, index) => (
                            <motion.div key={note.NID} layoutId={`note-${note.NID}`}>
                                <NotesList
                                    key={index}
                                    title={note.title}
                                    content={note.content}
                                    dateUpdate={note.date_update}
                                    label={note.label}
                                    onClick={() => handleNoteClick(note)} // Open modal on click
                                />
                            </motion.div>
                        ))}
                    </motion.div>
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
        </div>
    );
};

export default Archive;
