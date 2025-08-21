import React from 'react'

export default function Button({ title, onClick }) {
  return (
    <div className="relative inline-flex items-center justify-center gap-4 group cursor-pointer ">
      <div className="absolute inset-0 duration-1000 opacity-60 transitiona-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200" />
      <a role="button" onClick={onClick} className="group relative inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-4 py-2 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30">{title}
      </a>
    </div>
  );
}
