import React from 'react'
import Login from '../Component/Login'
import Register from '../Component/Register'

export default function AuthPage() {
  const [isLogin, setIsLogin] = React.useState(true);
  return (
    <div className='w-full flex justify-center items-center'>
        {isLogin ? <Login onSwitch={() => setIsLogin(false)} /> : <Register onSwitch={() => setIsLogin(true)} /> }
    </div>
  )
}
