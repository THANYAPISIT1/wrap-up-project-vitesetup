import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import NotesList from "../Note/NotesList";
import SummaryModal from "./SummaryModal";
import { useState, useEffect } from "react";
import axios from 'axios';

const stripHTML = (html) => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

const Summary = () => {
    const [summaries, setSummaries] = useState([]);
    const [selectedSummary, setSelectedSummary] = useState(null);

    // Fetch summaries from API when component mounts
    useEffect(() => {
        const fetchSummaryNotes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/summary/', {
                    withCredentials: true, // Include cookies in the request
                });

                setSummaries(response.data.summary);
            } catch (error) {
                console.error("Error fetching Summary notes:", error.message);
            }
        };

        fetchSummaryNotes();
    }, []);

    const handleSummaryClick = (summary) => {
        setSelectedSummary(summary);
    };

    const closeModal = () => {
        setSelectedSummary(null);
    };

    return (
        <div className="flex bg-gray-100 h-screen">
            <Sidebar />
            <div className="flex-1 ml-[20rem]">
                <Navbar />

                {/* -----------Content----------- */}

                <div className="p-8">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold mb-6">Summary Notes</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {summaries.map((summary, index) => (
                            <NotesList
                                key={index}
                                title={summary.title} // Assuming your summary object has a 'title'
                                content={summary.content}
                                onClick={() => handleSummaryClick(summary)} // Handle click to open modal
                            />
                        ))}
                    </div>
                </div>

                {/* SummaryModal */}
                {selectedSummary && (
                    <SummaryModal
                        isOpen={!!selectedSummary}
                        onClose={closeModal}
                        title={selectedSummary.title}
                        content={stripHTML(selectedSummary.content)}
                    />
                )}
            </div>
        </div>
    );
};

export default Summary;
