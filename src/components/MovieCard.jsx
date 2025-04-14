import React from 'react'
import { MOVIE_IMAGE_CDN_URL } from '../utils/constants'

const MovieCard = ({imagePath}) => {
  return (
    <div className='min-w-40 max-w-44'>
        <img alt="movie_poster" className='rounded' src={`${MOVIE_IMAGE_CDN_URL}${imagePath}`} />
    </div>
  )
}

export default MovieCard