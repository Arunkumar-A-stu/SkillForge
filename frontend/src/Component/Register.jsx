import React, { useState } from 'react'
import { FaEye,FaEyeSlash } from "react-icons/fa";
import Logo from '/logo.svg';
import GitButton from './GitButton';
import MailButton from './MailButton';
import LinkedInButton from './LinkedInButton';

export default function Register({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword); 

  return (
    <div className="w-full h-screen flex justify-center items-center">
        <div className='w-[90%] max-w-sm md:max-w-md lg:max-w-lg p-5 bg-white flex flex-col items-center gap-3 rounded-sm shadow-slate-400 shadow-xl'>
            <img src={Logo} alt='Logo' className='w-50 md:w-54 ' />


            <div className='w-full flex flex-col gap-3 text-black'>
                <div className='w-full flex items-center bg-transparent p-2 rounded-lg gap-2'>
                    <input type="text" placeholder='Username' className='w-full border-0 outline-1 bg-transparent text-sm md:text-base p-2 rounded-sm' />
                </div>
                <div className='w-full flex items-center bg-transparent p-2 rounded-lg gap-2'>
                    <input type="email" placeholder='Email' className='w-full border-0 outline-1 bg-transparent text-sm md:text-base p-2 rounded-sm' />
                </div>
                <div className='w-full flex items-center bg-transparent p-2 rounded-lg gap-2 relative'>
                    <input type={showPassword ? 'text' : 'password'} name="password" placeholder='Password' className='w-full outline-1 bg-transparent text-sm md:text-base p-2 rounded-sm' />
                    {showPassword ? (<FaEye className="absolute right-5 cursor-pointer" onClick={togglePasswordVisibility} />):(<FaEyeSlash className="absolute right-5 cursor-pointer" onClick={togglePasswordVisibility} />) }
                </div>
                <div className='w-full flex items-center bg-transparent p-2 rounded-lg gap-2 relative'>
                    <input type={showPassword ? 'text' : 'password'} name="cnfpassword" placeholder='Confirm Password' className='w-full outline-1 bg-transparent text-sm md:text-base p-2 rounded-sm' />
                    {showPassword ? (<FaEye className="absolute right-5 cursor-pointer" onClick={togglePasswordVisibility} />):(<FaEyeSlash className="absolute right-5 cursor-pointer" onClick={togglePasswordVisibility} />) }
                </div>
            </div>
            <button className='w-full p-2 bg-yellow-400 mt-3 rounded-xl hover:bg-yellow-500 text-sm md:text-base'>Sign Up</button>
            <div className="flex w-full justify-center gap-2 cursor-pointer">
                <p className="text-gray-600 text-xs md:text-sm">Have an account?</p>
                <button className="text-blue-500 text-xs md:text-sm cursor-pointer hover:underline" onClick={onSwitch}>Sign In</button>
            </div>


            <p className='text-gray-400 text-xs md:text-sm'>or you can sign in with</p>

            <div className="relative flex w-full justify-between items-center py-2 text-gray-400">
                <GitButton />
                <MailButton />
                <LinkedInButton />
            </div>

        </div>
    </div>
  )
}
