// src/App.jsx
import { useState } from "react";

const TestPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
      setIsOpen(prevState => !prevState);
  };


  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="relative inline-block text-left">
          {/* Dropdown Button */}
          <button 
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center" 
              type="button" 
              onClick={toggleDropdown}
          >
              Dropdown button 
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
              <div className="absolute right-0 mt-2 bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4 w-48">
                  <ul className="py-1">
                      <li>
                          <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Dashboard</a>
                      </li>
                      <li>
                          <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Settings</a>
                      </li>
                      <li>
                          <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Earnings</a>
                      </li>
                      <li>
                          <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Sign out</a>
                      </li>
                  </ul>
              </div>
          )}
      </div>
    </div>
);
};
  
export default TestPage;
