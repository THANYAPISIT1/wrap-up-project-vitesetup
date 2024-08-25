import Sidebar from "../components/Sidebar";
import Modal from "../components/CreateNoteModal";
import Navbar from "../components/Navbar"
import NotesList from "./Note/NotesList";
import NoteModal from "../components/EditNoteModal";
import { useState, useEffect } from "react";
import axios from 'axios'; // Import axios for making API requests

const Mainpage = () => {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [filter, setFilter] = useState('last update'); // Default filter
    const [label, setLabel] = useState('');

    // Fetch notes from API when component mounts
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/note', {
                    params: { filter, label },
                    withCredentials: true, // Include cookies in the request
                });

                // Filter out notes that have a status of "deleted"
                const activeNotes = response.data.note.filter(note => note.status !== 'deleted');

                // Sort active notes by date_update in descending order
                const sortedNotes = activeNotes.sort(
                    (a, b) => new Date(b.date_update) - new Date(a.date_update)
                );

                setNotes(sortedNotes);
            } catch (error) {
                console.error("Error fetching notes:", error.message);
            }
        };

        fetchNotes();
    }, [filter, label]); 
    
    const handleNoteClick = (note) => {
        setSelectedNote(note);
    };
    console.log(setFilter.value)

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
                {/* Filter and Label Dropdowns */}
                <div className="flex space-x-4">
                    <div>
                        <label htmlFor="filter" className="mr-2">Sort By:</label>
                        <select
                            id="filter"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="border border-gray-300 rounded-md py-2 px-3"
                        >
                            <option value="title">Title</option>
                            <option value="date create">Date Created</option>
                            <option value="last update">Last Updated</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="label" className="mr-2">Label:</label>
                        <select
                            id="label"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            className="border border-gray-300 rounded-md py-2 px-3"
                        >
                            <option value="">All</option>
                            <option value="study">Study</option>
                            <option value="health">Health</option>
                            <option value="finance">Finance</option>
                            <option value="diary">Diary</option>
                        </select>
                    </div>
                </div>
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
