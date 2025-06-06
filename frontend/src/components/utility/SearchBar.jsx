import React from "react";

export default function SearchBar({
  searchInput,
  onSearchInputChange,
  onSearchSubmit,
  onAdd,
  placeholderText,
  buttonText,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
      
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center w-full">
        <input
          onChange={onSearchInputChange}
          value={searchInput}
          placeholder={placeholderText}
          className="border border-gray-300 p-3 rounded w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <div className="flex gap-2 sm:ml-2">
          <button
            onClick={onSearchSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
          <button
            onClick={onAdd}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            + {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
