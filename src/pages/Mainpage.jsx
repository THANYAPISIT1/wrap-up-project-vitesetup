import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar"
import Dropdown from "../components/Dropdown";
import NotesList from "./Note/NotesList";
import NoteModal from "../components/NoteModal";
import { useState } from "react";

const Mainpage = () => {
    const [notes, setNotes] = useState([
        { title: 'First Note', content: 'This is the content of the first note. It is quite short.' },
        {
          title: 'Second Note',
          content: 'This is the content of the second note. It is longer and will trigger the Read More feature to show how it works in the grid layout. You can add more text here to make the note even longer and test the expansion feature.',
        },
        {
          title: 'Third Note',
          content: 'Another example of a short note.',
        },
        {
          title: 'Fourth Note',
          content: 'This note is very long and will definitely show how the Read More and Read Less functionality works. By adding a lot of content here, you can ensure that the grid layout is properly adjusting when the note is expanded and contracted.',
        },
        {
          title: 'Fifth Note',
          content: 'This note includes some medium-length content. It’s not too short, but not long enough to trigger the Read More feature. It gives a good balance in the grid layout.',
        },
        {
          title: 'Sixth Note',
          content: 'A very brief note with minimal content.',
        },
        {
          title: 'Seventh Note',
          content: 'Here’s another example of a longer note. The purpose of this note is to further demonstrate the grid layout and how notes of varying lengths interact with the grid. You can expand this note to see all the content, and when collapsed, it will again show the Read More option.',
        },
        {
          title: 'Eighth Note',
          content: 'A short and sweet note to add to the collection.',
        },
        {
          title: 'Ninth Note',
          content: 'This is the ninth note, which is relatively longer. It has enough content to be expanded, but it’s not too overwhelming. This type of note is great for testing the responsiveness and flexibility of the grid layout in the notes page.',
        },
        {
          title: 'Tenth Note',
          content: 'A final note with medium-length content. This one is here to ensure that the grid layout remains balanced and visually appealing, even with a variety of note lengths.',
        },
        {
          title: 'Tenth Note',
          content: 'A final note with medium-length content. This one is here to ensure that the grid layout remains balanced and visually appealing, even with a variety of note lengths.',
        },
        {
          title: 'Tenth Note',
          content: 'A final note with medium-length content. This one is here to ensure that the grid layout remains balanced and visually appealing, even with a variety of note lengths.',
        },
        {
          title: 'Tenth Note',
          content: 'A final note with medium-length content. This one is here to ensure that the grid layout remains balanced and visually appealing, even with a variety of note lengths.',
        },
        {
          title: 'Tenth Note',
          content: 'A final note with medium-length content. This one is here to ensure that the grid layout remains balanced and visually appealing, even with a variety of note lengths.',
        },
        {
          title: 'Tenth Note',
          content: 'A final note with medium-length content. This one is here to ensure that the grid layout remains balanced and visually appealing, even with a variety of note lengths.',
        },
        {
          title: 'Tenth Note',
          content: 'A final note with medium-length content. This one is here to ensure that the grid layout remains balanced and visually appealing, even with a variety of note lengths.',
        },
        {
          title: 'Tenth Note',
          content: 'A final note with medium-length content. This one is here to ensure that the grid layout remains balanced and visually appealing, even with a variety of note lengths.',
        },
        {
          title: 'Tenth Note',
          content: 'A final note with medium-length content. This one is here to ensure that the grid layout remains balanced and visually appealing, even with a variety of note lengths.',
        },
        {
          title: 'Tenth Note',
          content: 'A final note with medium-length content. This one is here to ensure that the grid layout remains balanced and visually appealing, even with a variety of note lengths.',
        },
        {
          title: 'Tenth Note',
          content: 'A final note with medium-length content. This one is here to ensure that the grid layout remains balanced and visually appealing, even with a variety of note lengths.',
        },
        {
          title: 'Tenth Note',
          content: 'A final note with medium-length content. This one is here to ensure that the grid layout remains balanced and visually appealing, even with a variety of note lengths.',
        },
        {
          title: 'Tenth Note',
          content: 'A final note with medium-length content. This one is here to ensure that the grid layout remains balanced and visually appealing, even with a variety of note lengths.',
        },
      ]);
    
      const [selectedNote, setSelectedNote] = useState(null);
    
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

    return(
    <div className="flex bg-gray-100">
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