import React from 'react'
import { useNavigate } from 'react-router-dom';

const Card = (props) => {




  return (
    <a href={props.src}><div className='bg-[rgba(98,43,209,0.16)] w-[25vw] p-[1.5vw] rounded-2xl'>
      <img className='rounded-2xl' src={props.src} />
    </div></a>
  )
}

export default Card
