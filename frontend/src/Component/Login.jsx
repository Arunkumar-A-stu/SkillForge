import React, { useState } from 'react'
import { MdAlternateEmail } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from '/logo.svg';
import GitButton from './GitButton';
import MailButton from './MailButton';
import LinkedInButton from './LinkedInButton';

export default function Login({ onSwitch, onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword); 

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onSubmit(form);  // ✅ just call AuthPage handler
      setForm({ email: "", password: "" }); 
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className='w-[90%] max-w-sm md:max-w-md lg:max-w-lg p-5 bg-white flex flex-col items-center gap-3 rounded-sm shadow-slate-400 shadow-xl'>
        <img src={Logo} alt='Logo' className='w-50 md:w-54 ' />
        <h1 className='text-lg md:text-xl font-semibold text-black'>Welcome Back</h1>

        <div className='w-full flex flex-col gap-3 text-black'>
          <form onSubmit={handleSubmit}>
            <div className='w-full flex items-center bg-transparent p-2 rounded-lg gap-2'>
              <MdAlternateEmail />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder='Email'
                className='w-full border-0 outline-1 bg-transparent text-sm md:text-base p-2 rounded-sm'
              />
            </div>
            <div className='w-full flex items-center bg-transparent p-2 rounded-lg gap-2 relative'>
              <TbPasswordUser />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder='Password'
                className='w-full outline-1 bg-transparent text-sm md:text-base p-2 rounded-sm'
              />
              {showPassword ? (
                <FaEye className="absolute right-5 cursor-pointer" onClick={togglePasswordVisibility} />
              ) : (
                <FaEyeSlash className="absolute right-5 cursor-pointer" onClick={togglePasswordVisibility} />
              )}
            </div>
            <button type="submit" className='w-full p-2 bg-yellow-400 mt-3 rounded-xl hover:bg-yellow-500 text-sm md:text-base'>
              Login
            </button>
          </form>

          <div className="flex w-full justify-between cursor-pointer">
            <p className="text-gray-600 text-xs md:text-sm">Forgot Password?</p>
            <button onClick={onSwitch} className='hover:underline cursor-pointer'>Sign Up</button>
          </div>

          <p className='text-gray-400 text-xs md:text-sm'>or you can sign in with</p>

          <div className="relative flex w-full justify-between items-center py-2 text-gray-400">
            <GitButton />
            <MailButton />
            <LinkedInButton />
          </div>
        </div>
      </div>
    </div>
  );
}
