import NotesList from "../Note/NotesList";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { motion } from "framer-motion";

const stripHTML = (html) => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

const Summary = () => {
    const [summaries, setSummaries] = useState([]);


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

    const listVariants = {
        hidden: { opacity: 0, y: 20 },  // Start hidden and slightly below
        visible: { opacity: 1, y: 0 },  // Move up and fade in
      };

    return (
        <div className="p-8">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-6">Summary Notes ({summaries.length})</h1>
            </div>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {summaries.map((summary, index) => (
                    <motion.div 
                        key={index}
                        variants={listVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5, delay: index * 0.1 }} // Add delay for staggered effect
                    >
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
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Summary;
