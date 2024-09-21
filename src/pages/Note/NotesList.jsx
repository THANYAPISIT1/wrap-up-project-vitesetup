import { useLocation } from "react-router-dom"; // Import useLocation from react-router-dom
import { BsPinAngle, BsFillPinAngleFill } from "react-icons/bs"; // Import icons for pin and unpin
import { motion } from "framer-motion";

// Utility function to strip HTML tags
const stripHTML = (html) => {
  let doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const labelColors = {
  Study: '#8684FB',
  Hobby: '#A47EE3',
  Health: '#48EA58',
  Finance: '#E7D000',
  Diary: '#F77C7C',
};

const NotesList = ({ title, content,SID , label , dateUpdate, onClick, onPinClick, isPinned , isSelected}) => {
  const location = useLocation(); // Get the current route

  console.log([SID,label])
  return (
    <motion.div 
      animate={{opacity: 1}} 
      initial={{opacity: 0}}
      exit={{opacity: 0}}
      layout
      className={`relative p-4 rounded-lg shadow-md cursor-pointer h-48 justify-between hover:scale-105 transition-all duration-300 group ${isSelected ? 'bg-blue-200' : 'bg-white' }`}
      onClick={onClick}
    >
      <div
        className="inline-block px-2 py-1 w-2/3 mb-1 text-white text-xs rounded"
        style={{ backgroundColor: labelColors[label ? label.charAt(0).toUpperCase() + label.slice(1) : ''] || '#ccc' }} // Fallback color if label not found
      >
        {/* Hide text below medium screens */}
        <span className="hidden md:inline">{label && label.charAt(0).toUpperCase() + label.slice(1)}</span>
      </div>

      {/* Conditionally render Pin Icon based on the current route */}
      {location.pathname === "/note" && (
        <div
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={(e) => {
            e.stopPropagation(); 
            onPinClick(); 
          }}
        >
          {isPinned ? (
            <BsFillPinAngleFill className="text-gray-700" />
          ) : (
            <BsPinAngle className="text-gray-700" />
          )}
        </div>
      )}

      <div>
        <h2
          className="text-xl font-bold mb-2 overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2, // Limit title to 2 lines
            whiteSpace: "normal",
          }}
        >
          {title}
        </h2>
        <p
          className="text-gray-700 overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3, // Limit content to 3 lines
          }}
        >
          {stripHTML(content)}
        </p>
      </div>
      <div className="absolute bottom-2 right-2 text-sm text-gray-500 mt-2 self-end">
        {new Date(dateUpdate).toLocaleDateString()} {/* Format date as needed */}
      </div>
    </motion.div>
  );
};

export default NotesList;
