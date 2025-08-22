import React, { useState } from 'react'
import { FaEye,FaEyeSlash } from "react-icons/fa";
import Logo from '/logo.svg';
import GitButton from './GitButton';
import MailButton from './MailButton';
import LinkedInButton from './LinkedInButton';

export default function Register({ onSwitch, onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword); 

  const [form, setForm] = useState({ name: "",email: "", password: "", cnfpassword: "" });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };      
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.password !== form.cnfpassword) {
      alert("Passwords do not match");
      return;
    }
    const payload = {
        name : form.name,
        email: form.email,
        password: form.password
    }
    try{
        await onSubmit(payload);
        setForm({ name: "",email:"", password:"", cnfpassword:"" });
    }catch(error){
        console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
        <div className='w-[90%] max-w-sm md:max-w-md lg:max-w-lg p-5 bg-white flex flex-col items-center gap-3 rounded-sm shadow-slate-400 shadow-xl'>
            <img src={Logo} alt='Logo' className='w-50 md:w-54 ' />


            <div className='w-full flex flex-col gap-3 text-black'>
                <form onSubmit={ handleSubmit}>
                <div className='w-full flex items-center bg-transparent p-2 rounded-lg gap-2'>
                    <input type="text" name="name" value={form.name} placeholder='Username' onChange={handleChange} className='w-full border-0 outline-1 bg-transparent text-sm md:text-base p-2 rounded-sm' />
                </div>
                <div className='w-full flex items-center bg-transparent p-2 rounded-lg gap-2'>
                    <input type="email" name="email" value={form.email} placeholder='Email' onChange={handleChange} className='w-full border-0 outline-1 bg-transparent text-sm md:text-base p-2 rounded-sm' />
                </div>
                <div className='w-full flex items-center bg-transparent p-2 rounded-lg gap-2 relative'>
                    <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} placeholder='Password' onChange={handleChange} className='w-full outline-1 bg-transparent text-sm md:text-base p-2 rounded-sm' />
                    {showPassword ? (<FaEye className="absolute right-5 cursor-pointer" onClick={togglePasswordVisibility} />):(<FaEyeSlash className="absolute right-5 cursor-pointer" onClick={togglePasswordVisibility} />) }
                </div>
                <div className='w-full flex items-center bg-transparent p-2 rounded-lg gap-2 relative'>
                    <input type={showPassword ? 'text' : 'password'} name="cnfpassword" value={form.cnfpassword} placeholder='Confirm Password' onChange={handleChange} className='w-full outline-1 bg-transparent text-sm md:text-base p-2 rounded-sm' />
                    {showPassword ? (<FaEye className="absolute right-5 cursor-pointer" onClick={togglePasswordVisibility} />):(<FaEyeSlash className="absolute right-5 cursor-pointer" onClick={togglePasswordVisibility} />) }
                </div>
                <button type="submit"  className='w-full p-2 bg-yellow-400 mt-3 rounded-xl hover:bg-yellow-500 text-sm md:text-base'>Sign Up</button>
                </form>
            </div>
            
            
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
