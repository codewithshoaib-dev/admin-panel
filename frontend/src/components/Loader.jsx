

function Loader() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[300px] animate-opacity"
      role="status"
      aria-label="Loading"
    >
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute w-5 h-5 bg-indigo-500 rounded-full"></div>
      </div>
      <p className="mt-4 text-base text-gray-600">Loading, please wait...</p>
    </div>
  );
}

export default Loader;
