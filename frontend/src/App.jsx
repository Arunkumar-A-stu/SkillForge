import {  useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css'
import Navbar from './Component/Navbar'
import Footer from './Component/Footer'

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
      <div className="flex flex-col min-h-screen overflow-x-hidden overflow-y-hidden w-full">
        <header>
          <Navbar isLoggedIn={!!user}
          username={user?.name}
          onSignInClick={ () => navigate("/auth")}
          onLogout={handleLogout} 
          className='fixed top-0 left-0 right-0 z-50'/>
        </header>

        <Outlet context={{ setUser }} />
        <Footer />
      </div>
  );
}

export default App;
