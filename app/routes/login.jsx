import React from 'react'
import Login from '../component/Login'
import Image from '../assets/home.jpg'


export default function login() {
  return (
    <div className='login-page' style={{backgroundImage: Image}}>
        <Login />
    </div>
  )
}
