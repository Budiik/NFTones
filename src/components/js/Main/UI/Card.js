import React from 'react'
import '../../../css/Main/Card.css'

/* card template, takes in num -> array of desired width, height*/
const Card = ({num, children}) => {
  const [num1, num2] = num
  return (
    <div className='Card' style={{width: num1, height: num2 }}>
        {children}
    </div>
  )
}

export default Card