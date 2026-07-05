import React from 'react'
import Card from './Card'
import { useLocation } from 'react-router-dom'

const PhotoGallery = (props) => {

  const location = useLocation();

  const { match } = location.state;

  console.log(match)

  return (
    <div className='bg-black p-[3vw] pb-[10vw] overflow-y-scroll flex flex-wrap w-[100vw] h-max  gap-10 justify-center'>

      {match.length > 0 ? match.map((item, idx) => (
        <Card key={idx} src={item}/>
      )) : ""}

    </div>
  )
}

export default PhotoGallery
