import React from 'react'
import Login from '../Component/Login'
import Register from '../Component/Register'
import axios from "axios"
import { useNavigate, useOutletContext } from "react-router-dom"

export default function AuthPage() {
  const [isLogin, setIsLogin] = React.useState(true);
  const API_URL = "http://localhost:5000/api/auth"
  const navigate = useNavigate();
  const { setUser } = useOutletContext();

  const handleLogin = async (form) => {
    try{
      const res = await axios.post(`${API_URL}/login`,form);
      localStorage.setItem("token", res.data.token);
      const userData = {
        id: res.data._id,
        name: res.data.name,
        email: res.data.email
      };
      localStorage.setItem("user", JSON.stringify(userData));

      // ✅ update user state in App.jsx
      setUser(userData);

      console.log("Login successful");
      navigate("/"); 
    } catch (err) {
      console.error(err);
    }
  }

  const handleRegister = async (form) => {
    try{
      const res = await axios.post(`${API_URL}/register`,form);
      console.log("Registration successful");
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <div className='w-full flex justify-center items-center'>
        {isLogin ? <Login onSwitch={() => setIsLogin(false)} onSubmit={ handleLogin } /> : <Register onSwitch={() => setIsLogin(true)} onSubmit= { handleRegister } /> }
    </div>
  )
}
