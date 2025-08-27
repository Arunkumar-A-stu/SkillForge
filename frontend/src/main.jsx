import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LandingPage from './Pages/LandingPage.jsx'
import SkilForgeTerminal from './Pages/SkilForgeTerminal.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <LandingPage />,   // App will render Navbar + Footer + Outlet
  //   children: [
  //     { path: "/", element: <LandingPage /> },
  //     { path: "/auth", element: <SkilForgeTerminal /> },
  //   ]
  // }
  {path: "/", element: <LandingPage />},
  {path: "/auth", element: <SkilForgeTerminal />},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
