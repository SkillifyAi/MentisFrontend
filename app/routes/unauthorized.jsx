import React from 'react'
import {Link} from 'react-router'
import useResponsiveBodyHeight from '../component/Functions/ResponsiveBodyHeight'


export default function Unauthorized() {

  //useResponsiveBodyHeight()

  return (
    <div className='unauthorized'>
        <div className='unauthorized-card'>
            <h1>Unauthorized</h1>
            <p>Please login before visiting this page</p>
            <Link to="/login">Go to login</Link>
        </div>
    </div>
  )
}
