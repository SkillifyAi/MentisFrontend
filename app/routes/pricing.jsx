import React from 'react'
import PromotionPage from '../component/Mui/Promovation'
import { useLocation } from 'react-router'
import useResponsiveBodyHeight from '../component/Functions/ResponsiveBodyHeight'

export default function pricing() {

  const location = useLocation()

  const registered = location.state
  // useResponsiveBodyHeight()

  return (
    <div>
        <PromotionPage registered = {registered}/>
    </div>
  )
}
