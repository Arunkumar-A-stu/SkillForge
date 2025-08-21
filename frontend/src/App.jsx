import { useState } from 'react'
import './App.css'
import Navbar from './Component/Navbar'
import Footer from './Component/Footer'
import AuthPage from './Pages/AuthPage'
import LandingPage from './Pages/LandingPage'

function App() {

  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <div className="flex flex-col min-h-screen overflow-x-hidden overflow-y-hidden w-full">
        <header>
          <Navbar onSignInClick={() => setShowAuth(true)} />
        </header>
        {showAuth ? <AuthPage /> : <LandingPage/>}
        <Footer />
      </div>
    </>
  );
}

export default App
