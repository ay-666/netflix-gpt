import React from 'react'
import playButton from '../assets/playIcon.png'
import infoIcon from '../assets/infoIcon.png'

const VideoTitle = ({title , details}) => {
  return (
    <div className='flex flex-col justify-center px-8  md:pt-[20vh] lg:pt-8 w-screen aspect-video absolute bg-gradient-to-r from-black/75 '>
        <h2 className='text-xl sm:text-3xl text-white font-medium'>{title}</h2>
        <p className='text-white sm:text-lg py-5 w-3/4 sm:w-1/2 md:w-1/3'>{details}</p>
        <div className=' flex gap-2'>
            <button  className='bg-white hover:bg-white/75 py-2  gap-2  justify-center flex items-center  rounded  font-medium text-black '>
                <img className='text-black w-1/6' src={playButton} /> Play</button>
            <button className='bg-gray-500/60 hover:bg-gray-500/25  w-36 flex   justify-center items-center gap-2 rounded  py-2 font-medium text-white'> 
                <img className='text-black w-1/8' src={infoIcon} />More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle