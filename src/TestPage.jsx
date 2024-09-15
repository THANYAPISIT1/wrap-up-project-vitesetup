import { useState } from 'react';
// import Card from './card';
// import axios from 'axios';

const TestPage = ({note}) => {
//   const [isSelectionMode, setIsSelectionMode] = useState(false);
//   const [selectedCards, setSelectedCards] = useState([]);

//   const cards = [
//     { id: 1, title: 'Card 1', description: 'This is card 1.' },
//     { id: 2, title: 'Card 2', description: 'This is card 2.' },
//     // Add more cards as needed
//   ];

//   const handleCardClick = (cardId) => {
//     if (isSelectionMode) {
//       if (selectedCards.includes(cardId)) {
//         setSelectedCards(selectedCards.filter(id => id !== cardId));
//       } else {
//         setSelectedCards([...selectedCards, cardId]);
//       }
//     } else {
//       console.log(`Edit card ${cardId}`);
//     }
//   };

//   const handleSelectionToggle = () => {
//     setIsSelectionMode(!isSelectionMode);
//     setSelectedCards([]); // Clear selection when mode changes
//   };

//   return (
//     <div className="p-4">
//       <button
//         onClick={handleSelectionToggle}
//         className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         {isSelectionMode ? 'Exit Selection Mode' : 'Enter Selection Mode'}
//       </button>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {cards.map(card => (
//           <Card
//             key={card.id}
//             card={card}
//             onClick={() => handleCardClick(card.id)}
//             isSelected={selectedCards.includes(card.id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
// const [inputValue, setInputValue] = useState("");
// const [errorMessage, setErrorMessage] = useState("");
// const maxLength = 50; // Set your text length limit here

// const handleInputChange = (e) => {
//   const value = e.target.value;
//   if (value.length <= maxLength) {
//     setInputValue(value);
//     setErrorMessage(""); // Clear error message when input is valid
//   } else {
//     setErrorMessage(`Text cannot be longer than ${maxLength} characters!`);
//   }
// };

// return (
//   <div className="max-w-sm mx-auto p-4">
//     <form>
//       <label htmlFor="textInput" className="block text-sm font-medium text-gray-700">Text Input:</label>
//       <input
//         type="text"
//         id="textInput"
//         value={inputValue}
//         onChange={handleInputChange}
//         placeholder={`Max ${maxLength} characters`}
//         className={`mt-1 block w-full p-2 border ${
//           errorMessage ? "border-red-500" : "border-gray-300"
//         } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//       />
//       {errorMessage && (
//         <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
//       )}
//     </form>
//     <p className="mt-2 text-sm text-gray-500">
//       {inputValue.length}/{maxLength} characters
//     </p>
//   </div>
// );
// };

  // State to determine which scenario to use (edit or fetch and filter)
  const [isEditMode, setIsEditMode] = useState(false);

  // State to hold the notes data after fetching (mocked data)
  const [notes, setNotes] = useState([]);

  // Handler for button click
  const handleButtonClick = () => {
    if (isEditMode) {
      // Scenario 1: Edit note
      editNote(note);
    } else {
      // Scenario 2: Mock Fetch data and filter by status
      mockFetchAndFilterNotes();
    }
  };

  // Edit note function
  const editNote = (note) => {
    console.log("Editing note:", note);
    // Implement your edit logic here
    alert(`Editing note: ${note.title}`);
  };

  // Mock function to simulate fetching and filtering notes
  const mockFetchAndFilterNotes = () => {
    const mockData = [
      { id: 1, title: 'Note 1', status: 'active' },
      { id: 2, title: 'Note 2', status: 'done' },
      { id: 3, title: 'Note 3', status: 'active' },
    ];

    const filteredNotes = mockData.filter((n) => n.status !== 'done'); // Example: filter out notes with status 'done'
    setNotes(filteredNotes);
    console.log("Filtered notes (mock):", filteredNotes);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{note.title}</div>
        <p className="text-gray-700 text-base">
          {note.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {note.status}
        </span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleButtonClick}
        >
          {isEditMode ? 'Edit Note' : 'Mock Fetch & Filter Notes'}
        </button>
      </div>
      <div className="mt-4">
        {/* Render notes if fetched */}
        {notes.length > 0 && (
          <div>
            <h3 className="text-lg font-bold">Filtered Notes (Mock):</h3>
            <ul className="list-disc ml-6">
              {notes.map((filteredNote) => (
                <li key={filteredNote.id}>{filteredNote.title} - {filteredNote.status}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Toggle between edit mode and fetch/filter mode */}
      <button
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsEditMode(!isEditMode)}
      >
        Toggle Mode ({isEditMode ? 'Switch to Fetch Mode' : 'Switch to Edit Mode'})
      </button>
    </div>
  );
};

// Test Component
const TestNoteCard = () => {
  // Example note for testing
  const testNote = {
    id: 1,
    title: 'Test Note',
    description: 'This is a test note description.',
    status: 'active', // Example status
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <TestPage note={testNote} />
    </div>
  );
};



  
  
export default TestNoteCard;
