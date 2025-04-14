import React from 'react'
import Login from '../component/Login'
import Image from '../assets/home.jpg'
import useResponsiveBodyHeight from '../component/Functions/ResponsiveBodyHeight'



export default function login() {
  useResponsiveBodyHeight()
  return (
    <div className='login-page' style={{backgroundImage: Image}}>
        <Login />
    </div>
  )
}
