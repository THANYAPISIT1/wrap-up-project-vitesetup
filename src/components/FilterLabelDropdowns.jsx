import { useState, useEffect, useRef } from 'react';

const FilterLabelDropdowns = ({ filter, setFilter, label, setLabel }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [labelOpen, setLabelOpen] = useState(false);
  const filterRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
      if (labelRef.current && !labelRef.current.contains(event.target)) {
        setLabelOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex space-x-4">
      {filter && setFilter && (
        <div ref={filterRef} className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              id="filter-menu-button"
              aria-expanded={filterOpen}
              aria-haspopup="true"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              Sort By: {filter}
              <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {filterOpen && (
            <div className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 ease-out" role="menu" aria-orientation="vertical" aria-labelledby="filter-menu-button" tabIndex="-1">
              <div className="py-1" role="none">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id="filter-menu-item-0" onClick={() => { setFilter("title"); setFilterOpen(false); }}>Title</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id="filter-menu-item-1" onClick={() => { setFilter("date create"); setFilterOpen(false); }}>Date Created</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id="filter-menu-item-2" onClick={() => { setFilter("last update"); setFilterOpen(false); }}>Last Updated</a>
              </div>
            </div>
          )}
        </div>
      )}
      <div ref={labelRef} className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            id="label-menu-button"
            aria-expanded={labelOpen}
            aria-haspopup="true"
            onClick={() => setLabelOpen(!labelOpen)}
          >
            Label: {label || 'All'}
            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {labelOpen && (
          <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 ease-out" role="menu" aria-orientation="vertical" aria-labelledby="label-menu-button" tabIndex="-1">
            <div className="py-1" role="none">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id="label-menu-item-0" onClick={() => { setLabel(""); setLabelOpen(false); }}>All</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id="label-menu-item-1" onClick={() => { setLabel("study"); setLabelOpen(false); }}>Study</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id="label-menu-item-2" onClick={() => { setLabel("health"); setLabelOpen(false); }}>Health</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id="label-menu-item-3" onClick={() => { setLabel("finance"); setLabelOpen(false); }}>Finance</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id="label-menu-item-4" onClick={() => { setLabel("diary"); setLabelOpen(false); }}>Diary</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterLabelDropdowns;
