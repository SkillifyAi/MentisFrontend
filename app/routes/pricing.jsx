import React from 'react'
import PromotionPage from '../component/Mui/Promovation'
import { useLocation } from 'react-router'

export default function pricing() {

  const location = useLocation()

  const registered = location.state

  return (
    <div>
        <PromotionPage registered = {registered}/>
    </div>
  )
}
