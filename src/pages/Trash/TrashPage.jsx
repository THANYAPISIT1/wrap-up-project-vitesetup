import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import NotesList from "../Note/NotesList";
import { useState, useEffect } from "react";
import axios from 'axios';

const Trash = () => {
    const [trashNotes, setTrashNotes] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state

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
                setLoading(false); // Set loading to false after fetching data
            } catch (error) {
                console.error("Error fetching deleted notes:", error.message);
                setLoading(false); // Set loading to false if there's an error
            }
        };

        fetchTrashNotes();
    }, []);

    // Display loading message while fetching data
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex bg-gray-100 h-screen">
            <Sidebar />
            <div className="flex-1 ml-[20rem]">
                <Navbar />

                {/* -----------Content----------- */}
                <div className="p-8">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold mb-6">Trash</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {trashNotes.length > 0 ? (
                            trashNotes.map((note, index) => (
                                <NotesList
                                    key={index}
                                    title={note.title}
                                    content={note.content}
                                />
                            ))
                        ) : (
                            <p>No deleted notes found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trash;
