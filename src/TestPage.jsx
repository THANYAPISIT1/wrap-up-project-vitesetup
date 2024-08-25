// src/App.jsx
import { useState } from "react";

const TestPage = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  
    return (
      <div className="flex items-center">
        {/* Button that controls hover */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
        >
          Hover Me
        </div>
  
        {/* Conditionally render the button only when hovered */}
        {isHovered && (
          <button className="ml-4 bg-gray-500 text-white py-2 px-4 rounded">
            Hovered Button
          </button>
        )}
      </div>
    );
  }
  
  
export default TestPage;
