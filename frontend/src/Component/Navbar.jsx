import React, { useState } from 'react'
import Button from './Button'
import Logo from '/favicon.svg'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import ThemeToggle from './ThemeToggle'

export default function Navbar({ onSignInClick }) {

  const [isOpen, setIsOpen] = useState(false); 

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({
      behavior: 'smooth'
    });
  }

  return (
    <nav className="bg-white w-full max-h-16 flex justify-between items-center p-4 gap-4">
        <img src={Logo} alt="Logo" className="h-12 w-10 cursor-pointer" />
        <div className="hidden md:flex gap-10 text-gray-700 ">
          <p className=" p-1 text-xl rounded-sm transition duration-200 hover:text-blue-700 hover:scale-100 hover:bg-gray-100 cursor-pointer active focus:bg-gray-100 active:bg-gray-200" onClick={() => scrollToSection('hero')}>Home</p>
          <p className=" p-1 text-xl rounded-sm transition duration-200 hover:text-blue-700 hover:scale-100 hover:bg-gray-100 cursor-pointer active focus:bg-gray-100 active:bg-gray-200" onClick={() => scrollToSection('features')}>Features</p>
          <p className=" p-1 text-xl rounded-sm transition duration-200 hover:text-blue-700 hover:scale-100 hover:bg-gray-100 cursor-pointer active focus:bg-gray-100 active:bg-gray-200" onClick={() => scrollToSection('stats')}>Stats</p>
        </div>
        <div className=' flex flex-col p-2 gap-4 justify-between items-center hidden md:block'>
          <Button title="Sign In" onClick={onSignInClick} />
        </div>
 
        
        <div className="md:hidden">
          {isOpen ? (<IoMdClose className="text-2xl" onClick={() => setIsOpen(false)} />):(<GiHamburgerMenu className="text-2xl" onClick={() => setIsOpen(true)} />)}
        </div>

              {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-white flex flex-col items-center gap-6 py-6 shadow-md md:hidden z-50">
                  <p className="text-xl hover:text-blue-700 cursor-pointer" onClick={() => scrollToSection('hero')}>Home</p>
                  <p className="text-xl hover:text-blue-700 cursor-pointer" onClick={() => scrollToSection('features')}>Features</p>
                  <p className="text-xl hover:text-blue-700 cursor-pointer" onClick={() => scrollToSection('stats')}>Stats</p>
                  <Button title="Sign In" onClick={onSignInClick} />
                </div>
      )}
    </nav>
  )
}
