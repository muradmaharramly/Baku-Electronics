import React from 'react'
import { RiArrowRightDoubleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const MonthlyPayment = () => {
  return (
    <div className='monthly-payment'>
        <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>Aylıq ödəniş</span></div>
        <h2>Aylıq ödəniş</h2>
        <iframe src='https://e-pul.az/frames/935'></iframe>
    </div>
  )
}

export default MonthlyPayment