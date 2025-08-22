import React, { useState } from 'react'
import Button from './Button'
import Logo from '/favicon.svg'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import ProfileDropdown from './ProfileDropDown';

export default function Navbar({ isLoggedIn, username, onSignInClick, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({
      behavior: 'smooth'
    });
  }

  return (
    <nav className="bg-white w-full max-h-16 flex justify-between items-center p-4 gap-4">
      {/* Logo */}
      <img src={Logo} alt="Logo" className="h-12 w-10 cursor-pointer" />

      {/* Desktop links */}
      <div className="hidden md:flex gap-10 text-gray-700">
        <p onClick={() => scrollToSection('hero')} className="p-1 text-xl hover:text-blue-700 hover:bg-gray-100 cursor-pointer">Home</p>
        <p onClick={() => scrollToSection('features')} className="p-1 text-xl hover:text-blue-700 hover:bg-gray-100 cursor-pointer">Features</p>
        <p onClick={() => scrollToSection('stats')} className="p-1 text-xl hover:text-blue-700 hover:bg-gray-100 cursor-pointer">Stats</p>
      </div>

      {/* Desktop Auth/Profile */}
      <div className="hidden md:block">
        {isLoggedIn 
          ? <ProfileDropdown username={username} onLogout={onLogout} /> 
          : <Button title="Sign In" onClick={onSignInClick} />}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        {isOpen 
          ? <IoMdClose className="text-2xl" onClick={() => setIsOpen(false)} /> 
          : <GiHamburgerMenu className="text-2xl" onClick={() => setIsOpen(true)} />}
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white flex flex-col items-center gap-6 py-6 shadow-md md:hidden z-50">
          <p onClick={() => scrollToSection('hero')} className="text-xl hover:text-blue-700 cursor-pointer">Home</p>
          <p onClick={() => scrollToSection('features')} className="text-xl hover:text-blue-700 cursor-pointer">Features</p>
          <p onClick={() => scrollToSection('stats')} className="text-xl hover:text-blue-700 cursor-pointer">Stats</p>

          {isLoggedIn 
            ? <ProfileDropdown username={username} onLogout={onLogout} /> 
            : <Button title="Sign In" onClick={onSignInClick} />}
        </div>
      )}
    </nav>
  )
}
