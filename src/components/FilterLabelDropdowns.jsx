import React from 'react';

const FilterLabelDropdowns = ({ filter, setFilter, label, setLabel }) => {
  return (
    <div className="flex space-x-4">
      {filter && setFilter && (
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
      )}
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
  );
};

export default FilterLabelDropdowns;
