function Loader() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[300px] text-neutral-400"
      role="status"
      aria-label="Loading"
    >
      <div className="w-14 h-14 border-4 border-neutral-700 border-t-teal-500 rounded-full animate-spin" />
      <p className="mt-5 text-sm text-neutral-500">Loading, please wait…</p>
    </div>
  );
}

export default Loader;
