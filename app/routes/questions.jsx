import React from 'react'
import Questionnaire from '../component/questionnaire'
import useResponsiveBodyHeight from '../component/Functions/ResponsiveBodyHeight'

export default function questions() {

  //useResponsiveBodyHeight()

  return (
    <div className='question-page'>
        <Questionnaire />
    </div>
  )
}
