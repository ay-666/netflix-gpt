import React from 'react'
import GPTSearchBar from './GPTSearchBar'
import GPTMovieSuggestion from './GPTMovieSuggestion'
import { NETFLIX_BACKGROUND_IMAGE } from '../utils/constants'

const GPTSearch = () => {
  return (
    <div>
      <div className='absolute'>
        <img
          src={NETFLIX_BACKGROUND_IMAGE}
          alt="bg"></img>
      </div>
      <GPTSearchBar />
      <GPTMovieSuggestion />

    </div>
  )
}

export default GPTSearch