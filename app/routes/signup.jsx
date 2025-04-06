import React from 'react'
import SignUp from '../component/SignUp.jsx'
import Image from '../assets/home.jpg'


export default function signup() {
  return (
    <div className='login-page' style={{backgroundImage: Image}}>
        <SignUp />
    </div>
  )
}
