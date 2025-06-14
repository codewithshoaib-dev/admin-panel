export function ErrorMessage({ message = "Oops! Something went wrong." }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 m-4 bg-red-50 border border-red-300 rounded-lg text-red-700 max-w-md mx-auto">
      <svg
        className="w-10 h-10 mb-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
        />
      </svg>
      <p className="text-center font-semibold">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Retry
      </button>
    </div>
  );
}
