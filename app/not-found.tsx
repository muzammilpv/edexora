import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-[#FFD200] text-slate-950 flex items-center justify-center font-black text-2xl">
        404
      </div>
      <h1 className="text-2xl font-black">Page Not Found</h1>
      <p className="text-xs text-slate-400 max-w-sm">
        The page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="px-5 py-2.5 bg-[#FFD200] text-slate-950 font-black rounded-xl text-xs"
      >
        Return to EDEXORA Platform
      </a>
    </div>
  );
}
