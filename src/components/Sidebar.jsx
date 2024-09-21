import { FaArchive } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { FaNoteSticky } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ onLogoutClick }) => {
  const location = useLocation(); // Get current path

  const activeClass =
    "scale-105 bg-blue-50 bg-opacity-80 text-blue-900"; // Active class styling
  const defaultClass =
    "transition-all duration-300 hover:scale-105 hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900";



  return (
    <div className="fixed top-0 left-0 h-full flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Link to={'/'}>
          <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
            Wrap UP Note
          </h5>
        </Link>
      </div>
      <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
        {/* Notes Link */}
        <Link to="/note">
          <div
            role="button"
            tabIndex="0"
            className={`flex items-center w-full p-3 rounded-lg text-start leading-tight ${
              location.pathname === "/note" ? activeClass : defaultClass
            } outline-none`}
          >
            <div className="grid place-items-center mr-4">
              <FaNoteSticky size={18} />
            </div>
            Notes
          </div>
        </Link>
        
        {/* Archive Link */}
        <Link to="/archive">
          <div
            role="button"
            tabIndex="0"
            className={`flex items-center w-full p-3 rounded-lg text-start leading-tight ${
              location.pathname === "/archive" ? activeClass : defaultClass
            } outline-none`}
          >
            <div className="grid place-items-center mr-4">
              <FaArchive size={18} />
            </div>
            Archive
          </div>
        </Link>

        {/* Summary Link */}
        <Link to="/summary">
          <div
            role="button"
            tabIndex="0"
            className={`flex items-center w-full p-3 rounded-lg text-start leading-tight ${
              location.pathname === "/summary" ? activeClass : defaultClass
            } outline-none`}
          >
            <div className="grid place-items-center mr-4">
              <BsClipboard2CheckFill size={18} />
            </div>
            Summary
          </div>
        </Link>

        {/* Trash Link */}
        <Link to="/trash">
          <div
            role="button"
            tabIndex="0"
            className={`flex items-center w-full p-3 rounded-lg text-start leading-tight ${
              location.pathname === "/trash" ? activeClass : defaultClass
            } outline-none`}
          >
            <div className="grid place-items-center mr-4">
              <RiDeleteBin5Fill size={20} />
            </div>
            Trash
          </div>
        </Link>

        {/* Settings Link */}
        <Link to="/settings">
          <div
            role="button"
            tabIndex="0"
            className={`flex items-center w-full p-3 rounded-lg text-start leading-tight ${
              location.pathname === "/settings" ? activeClass : defaultClass
            } outline-none`}
          >
            <div className="grid place-items-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            Settings
          </div>
        </Link>

        {/* Log Out Link */}
        <div
          role="button"
          tabIndex="0"
          onClick={onLogoutClick} //  Updated to use prop function
          className={`flex items-center w-full p-3 rounded-lg text-start leading-tight ${
            location.pathname === "/logout" ? activeClass : defaultClass
          } outline-none`}
        >
          <div className="grid place-items-center mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M7.5 3.75A.75.75 0 018.25 3h10.5a.75.75 0 01.75.75v16.5a.75.75 0 01-.75.75H8.25a.75.75 0 010-1.5h9.75V4.5H8.25a.75.75 0 01-.75-.75zM10.47 11.03a.75.75 0 10-1.06 1.06l1.72 1.72H3.75a.75.75 0 000 1.5h7.38l-1.72 1.72a.75.75 0 001.06 1.06l3-3a.75.75 0 000-1.06l-3-3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          Log Out
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;


