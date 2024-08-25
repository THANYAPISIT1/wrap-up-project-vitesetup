import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import NotesList from "../Note/NotesList";
import { useState, useEffect } from "react";
import axios from 'axios';

const Archive = () => {
    const [notes, setNotes] = useState([]);


    // Fetch notes from API when component mounts
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/archive/', {
                    // params: { 
                    //     status: 'archive' // Adding status filter
                    // },
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
    }, []); 
    
    return (
        <div className="flex bg-gray-100 h-screen">
            <Sidebar />
            <div className="flex-1 ml-[20rem]">
                <Navbar />

                {/* -----------Content----------- */}

                <div className="p-8">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold mb-6">Archived Notes</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {notes.map((note, index) => (
                            <NotesList
                                key={index}
                                title={note.title}
                                content={note.content}
                            />
                        ))}
                    </div>
                </div>

                {/* -------------------------------------- */}
            </div>
        </div>
    );
};

export default Archive;
