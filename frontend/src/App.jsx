import {  useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css'
import Navbar from './Component/Navbar'
import Footer from './Component/Footer'
import LandingPage from "./Pages/LandingPage";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setUser(null);
  navigate("/");
};

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <LandingPage />
  );
}

export default App;
