import { useState, useRef, useEffect } from "react";


export function Select({ value, onValueChange, options, placeholder = "Select option..." }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (selectedValue) => {
    onValueChange(selectedValue);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative w-48">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center border rounded px-3 py-2 bg-white shadow-sm hover:bg-gray-50"
      >
        <span>{options.find((opt) => opt.value === value)?.label || placeholder}</span>
        <svg
          className={`h-4 w-4 ml-2 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border rounded shadow">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                opt.value === value ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
