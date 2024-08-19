import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar"
import Dropdown from "../components/FilterDropdown";
import NotesList from "./Note/NotesList";
import NoteModal from "../components/NoteModal";
import { useState, useEffect } from "react";
import axios from 'axios'; // Import axios for making API requests

const Mainpage = () => {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);

    // Fetch notes from API when component mounts
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/note', {
                    withCredentials: true, // Include cookies in the request
                });

                // Sort notes by date_update in descending order
                const sortedNotes = response.data.note.sort(
                    (a, b) => new Date(b.date_update) - new Date(a.date_update)
                );

                setNotes(sortedNotes);
            } catch (error) {
                console.error("Error fetching notes:", error.message);
            }
        };

        fetchNotes();
    }, []); // Empty dependency array ensures this runs only once on mount

    const handleNoteClick = (note) => {
        setSelectedNote(note);
    };

    const closeModal = () => {
        setSelectedNote(null);
    };

    const handleSave = (updatedContent) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.title === selectedNote.title
                    ? { ...note, content: updatedContent }
                    : note
            )
        );
    };


    return (
        <div className="flex bg-gray-100 h-screen">
            <Sidebar />
            <div className="flex-1 ml-[20rem]">
                <Navbar />
                <div className="flex justify-between m-4">
                    <Dropdown />
                    <Modal />
                </div>
                <hr />

                {/* -----------Content----------- */}

                <div className="p-8">
                    <h1 className="text-3xl font-bold mb-6">My Notes</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {notes.map((note, index) => (
                            <NotesList
                                key={index}
                                title={note.title}
                                content={note.content}
                                onClick={() => handleNoteClick(note)}
                            />
                        ))}
                    </div>

                    {/* NoteModal */}
                    {selectedNote && (
                        <NoteModal
                            isOpen={!!selectedNote}
                            onClose={closeModal}
                            title={selectedNote.title}
                            content={selectedNote.content}
                            NID={selectedNote.NID}  // Pass the NID here
                            onSave={handleSave}
                        />
                    )}
                </div>

                {/* -------------------------------------- */}
            </div>
        </div>
    );
};

export default Mainpage;
