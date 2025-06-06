export function NoData({ message = "No data to show." }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-gray-500 max-w-md mx-auto">
      <svg
        className="w-10 h-10 mb-2 text-gray-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M8 12h8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="text-center">{message}</p>
    </div>
  );
}
