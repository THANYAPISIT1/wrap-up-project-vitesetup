import Sidebar from "../components/Sidebar";
import Modal from "../components/CreateNoteModal";
import Navbar from "../components/Navbar";
import NotesList from "./Note/NotesList";
import NoteModal from "../components/EditNoteModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making API requests
import { motion,AnimatePresence } from "framer-motion";

const Mainpage = () => {
  const [notes, setNotes] = useState([]);
  const [pinnedNotes, setPinnedNotes] = useState([]); // State for pinned notes
  const [selectedNote, setSelectedNote] = useState(null);
  const [filter, setFilter] = useState("last update"); // Default filter
  const [label, setLabel] = useState("");
  const [isSelectionMode, setIsSelectionMode] = useState(false); // For selection mode
  const [selectedNotes, setSelectedNotes] = useState([]); // Track selected notes
  const [selectionLabel, setSelectionLabel] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch notes from API
  const fetchNotes = async (labelToFilter = "") => {
    try {

      const response = await axios.get("http://localhost:8000/note", {
        params: { filter, label: labelToFilter || label },
        withCredentials: true,
      });

      let activeNotes = response.data.note.filter(
        (note) => note.status !== "deleted" && note.status !== "archive"
      );

      // Apply label filtering
      if (labelToFilter || label) {
        activeNotes = activeNotes.filter(
          (note) =>
            note.label && note.label.toLowerCase() === (labelToFilter || label).toLowerCase()
        );
      }

      console.log("Fetching notes with filter:", filter, "and label:", label);
      // console.log("Active Notes after filtering by label:", activeNotes);
      console.log("Label selected:", label);

      // Sort active notes by date_update in descending order
      const sortedNotes = activeNotes.sort((a, b) => {
        if (filter === "title") {
          return a.title.localeCompare(b.title);
        } else if (filter === "date create") {
          return new Date(b.date_create) - new Date(a.date_create);
        } else if (filter === "last update") {
          return new Date(b.date_update) - new Date(a.date_update);
        }
        return 0;
      });

      // Separate pinned and unpinned notes
      const pinned = sortedNotes.filter((note) => note.pin === 1);
      const unpinned = sortedNotes.filter((note) => note.pin !== 1);

      setNotes(unpinned);
      setPinnedNotes(pinned);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  useEffect(() => {
    fetchNotes(); // Fetch notes when the component is mounted or filter/label changes
  }, [filter, label]);

  const handleNoteClick = (note) => {
    if (isSelectionMode) {
      if (selectedNotes.includes(note.NID)) {
        setSelectedNotes(selectedNotes.filter((id) => id !== note.NID));
      } else {
        setSelectedNotes([...selectedNotes, note.NID]);

        // Detect first note selection and set the label for filtering
        if (selectedNotes.length === 0) {
          setSelectionLabel(note.label);
          fetchNotes(note.label); // Fetch notes filtered by the first selected note's label
        }

        console.log(`Note selected:`, [...selectedNotes, note.NID]);
      }
    } else {
      setSelectedNote(note);
    }
  };

  const closeModal = () => {
    setSelectedNote(null);
  };

  const handleSave = () => {
    closeModal(); // Close the modal
    fetchNotes();
  };

  const handleSelectionToggle = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedNotes([]);
    setSelectionLabel(null); // Clear selection label when exiting selection mode
    fetchNotes(); // Fetch all notes again when exiting selection mode
  };

  const handlePinClick = async (note) => {
    try {
      if (note.pin === 1) {
        // Unpin note
        await axios.put(
          `http://localhost:8000/note/unpin/${note.NID}`,
          {},
          { withCredentials: true }
        );
        note.pin = 0;
        setPinnedNotes(pinnedNotes.filter((pn) => pn.NID !== note.NID));
        setNotes([...notes, note]);
      } else {
        // Pin note
        await axios.put(
          `http://localhost:8000/note/pin/${note.NID}`,
          {},
          { withCredentials: true }
        );
        note.pin = 1;
        setNotes(notes.filter((n) => n.NID !== note.NID));
        setPinnedNotes([...pinnedNotes, note]);
      }
      fetchNotes();
    } catch (error) {
      console.error("Error updating pin status:", error.message);
    }
  };

  const handleSummaryClick = () => {
    setIsModalOpen(true); // Open the confirmation modal
  };


  const handleConfirmSummary = async (selectedNotes) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/summarize",
        { NIDs : selectedNotes },
        { withCredentials: true }
      );

      alert(response.data.message);
      setIsModalOpen(false); // Close the modal on success
    } catch (error) {
      console.error("Error generating summary:", error);
      alert("Summary generation failed.");
      setIsModalOpen(false); // Close the modal on failure
    }
    setSelectedNotes([]);
    setIsSelectionMode(false);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen max-h-full">
      <Sidebar />
      <div className="flex-1 ml-[20rem] relative">
        <Navbar />
        <div className="flex justify-between m-4">
          {/* Filter and Label Dropdowns */}
          <div className="flex space-x-4">
            <div>
              <label htmlFor="filter" className="mr-2">
                Sort By:
              </label>
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
              <label htmlFor="label" className="mr-2">
                Label:
              </label>
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
          <Modal/> 
        </div>
        <hr />

        {/* -----------Content----------- */}

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">My Notes</h1>

          {/* Pinned Notes Section */}
          {pinnedNotes.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Pinned Notes</h2>
              <motion.div layout className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
              <AnimatePresence>
                {pinnedNotes.map((note) => (
                  <motion.div key={note.NID} layoutId={`note-${note.NID}`}>
                    <NotesList
                      title={note.title}
                      content={note.content}
                      onClick={() => handleNoteClick(note)}
                      onPinClick={() => handlePinClick(note)}
                      dateUpdate={note.date_update}
                      isPinned={note.pin === 1}
                      isSelected={selectedNotes.includes(note.NID)} // Pass selection state
                      label={note.label}
                    />
                  </motion.div>
                ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}

          {/* Unpinned Notes Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">All Notes</h2>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <AnimatePresence>
              {notes.map((note) => (
                <motion.div key={note.NID} layoutId={`note-${note.NID}`}>
                  <NotesList
                    title={note.title}
                    content={note.content}
                    onClick={() => handleNoteClick(note)}
                    onPinClick={() => handlePinClick(note)}
                    dateUpdate={note.date_update}
                    isPinned={note.pin === 1}
                    isSelected={selectedNotes.includes(note.NID)} // Pass selection state
                    label={note.label}
                  />
                </motion.div>
              ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* NoteModal */}
          {selectedNote && (
            <NoteModal
              isOpen={!!selectedNote}
              onClose={closeModal}
              title={selectedNote.title}
              content={selectedNote.content}
              NID={selectedNote.NID} 
              onSave={handleSave} // Call handleSave to refresh the notes
            />
          )}
        </div>

        {/* Selection Button */}
        {isSelectionMode ? (
        <div className="fixed bottom-4 right-4 flex space-x-4">
          <button
            onClick={handleSelectionToggle}
            className="px-6 py-3 bg-red-500 hover:bg-red-700 transition duration-300 text-white rounded-full shadow-lg"
          >
            Exit Selection Mode
          </button>
          <button
            onClick={handleSummaryClick}
            className="px-6 py-3 bg-green-500 hover:bg-green-700 transition duration-300 text-white rounded-full shadow-lg"
          >
            Summary
          </button>
        </div>
      ) : (
        <button
          onClick={handleSelectionToggle}
          className="fixed bottom-4 right-4 px-6 py-3 bg-blue-500 hover:bg-blue-700 transition duration-300 text-white rounded-full shadow-lg"
        >
          Select Notes for summary
        </button>
      )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSummary}
        selectedNotes={selectedNotes}
      />
    </div>
  );
};

export default Mainpage;
