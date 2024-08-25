
const Navbar = () => {
  return (
    <nav className="w-full flex justify-end px-20 py-8 items-center bg-white drop-shadow">
      <div className="flex items-center">
        <div className="flex items-center rounded-lg bg-white drop-shadow-md p-1 mr-2 hover:scale-105 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 pt-0.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input className="ml-2 outline-none bg-transparent font-" type="text" name="search" id="search" placeholder="Search..." />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
