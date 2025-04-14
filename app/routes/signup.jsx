import React from 'react'
import SignUp from '../component/Login/SignUp.jsx'
import Image from '../assets/home.jpg'
import useResponsiveBodyHeight from '../component/Functions/ResponsiveBodyHeight.jsx'


export default function signup() {

  //useResponsiveBodyHeight()

  return (
    <div className='login-page' style={{backgroundImage: Image}}>
        <SignUp />
    </div>
  )
}
