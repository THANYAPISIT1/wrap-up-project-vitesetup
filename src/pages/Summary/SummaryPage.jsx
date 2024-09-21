import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import NotesList from "../Note/NotesList";
import ConfirmLogoutModal from "../../components/Modal/ConfirmLogoutModal";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const stripHTML = (html) => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

const Summary = () => {
    const [summaries, setSummaries] = useState([]);
    const [showConfirmLogout, setShowConfirmLogout] = useState(false); 


    // Fetch summaries from API when component mounts
    useEffect(() => {
        const fetchSummaryNotes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/summary', {
                    withCredentials: true, // Include cookies in the request
                });

                setSummaries(response.data.summary);
            } catch (error) {
                console.error("Error fetching Summary notes:", error.message);
            }
        };

        fetchSummaryNotes();
    }, []);




    return (
        <div className="flex bg-gray-100 min-h-screen max-h-content">
            <Sidebar onLogoutClick={() => setShowConfirmLogout(true)}/>
            <div className="flex-1 ml-[20rem]">
                <Navbar />

                {/* -----------Content----------- */}

                <div className="p-8">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold mb-6">Summary Notes ({summaries.length})</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {summaries.map((summary, index) => (
                            <Link
                                to={`/summary/${summary.SID}`} 
                                state={{ 
                                    SID: summary.SID, 
                                    content: summary.content, 
                                    label: summary.label, 
                                    dateUpdate: summary.date_create 
                                }} 
                                key={index}
                                >
                                    <NotesList
                                        SID={summary.SID} 
                                        content={summary.content}
                                        label={summary.label}
                                        dateUpdate={summary.date_create}
                                    />
                            </Link>
                        ))}
                    </div>
                </div>
                {showConfirmLogout && (
                    <ConfirmLogoutModal
                        onCancel={() => setShowConfirmLogout(false)} // Handle cancellation
                    />
                )}

            </div>
        </div>
    );
};

export default Summary;
