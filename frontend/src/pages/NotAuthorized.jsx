import React from "react";


export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center p-8">
      <h1 className="text-7xl font-extrabold mb-6 animate-pulse">🚫 ACCESS DENIED</h1>
      <p className="text-2xl mb-4">Nice try, STAFF.</p>
      <p className="text-lg text-gray-400">This page is off-limits. Turn around before we unleash the virtual guard dogs. 🐶</p>
      <p className="mt-10 text-sm text-gray-600">Error Code: 403 - Not Today.</p>
    </div>
  );
}
