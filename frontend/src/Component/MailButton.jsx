import React from 'react'
import { BiLogoGmail } from "react-icons/bi";

export default function MailButton() {
  return (
    <button href="#" className="flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-red-500 text-white shadow hover:bg-red-600/90 h-9 px-4 py-2 max-w-52 whitespace-pre md:flex group relative w-30 justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-red-500 hover:ring-offset-2">
      <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
      <div className="flex items-center">
              <BiLogoGmail className="text-lg md:text-3xl" />
      </div>

    </button>
  )
}
