
// Utility function to strip HTML tags
const stripHTML = (html) => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

const NotesList = ({ title, content, onClick }) => {
  return (
    <div
      className="p-4 bg-white rounded-lg shadow-md cursor-pointer h-48 hover:scale-105 transition-all duration-300" // Fixed height
      onClick={onClick}
    >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p
        className="text-gray-700 overflow-hidden text-ellipsis"
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 4, 
        }}
      >
        {stripHTML(content)} {/* Strip HTML tags before displaying content */}
      </p>
    </div>
  );
};

export default NotesList;
