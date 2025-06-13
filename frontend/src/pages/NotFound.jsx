import React from "react";
import { Link } from "react-router-dom";
import { Ghost } from "lucide-react";

const ContentNotFound = ({ message = "We couldn’t find the content you’re looking for." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6">
      <Ghost className="w-24 h-24 text-indigo-400 mb-4 animate-bounce" />
      <h1 className="text-5xl font-extrabold mb-2">Content Not Found</h1>
      <p className="text-lg mb-6 text-slate-300 max-w-md text-center">
        {message}
      </p>
      <Link
        to="/dashboard"
        className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 transition rounded-full text-white font-semibold shadow-lg"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ContentNotFound;
