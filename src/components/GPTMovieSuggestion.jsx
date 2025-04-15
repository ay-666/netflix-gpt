import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GPTMovieSuggestion = () => {
  const {moviesByAI,searchedMovies} = useSelector((store) => store.gpt);
  const isLoading = useSelector((store) => store.loading.isLoading);
  if(!isLoading && (!moviesByAI || !searchedMovies)) return;
  return (
    <div className='bg-black/80 relative z-20'>
      {
        isLoading ? (<div className='text-white w-10 h-10 absolute left-[50%] top-[50%] rounded-full border-gray-200 border-t-transparent border-2 animate-spin'></div>) :
        (searchedMovies.map((movies,index) => (<MovieList key={index} title={moviesByAI[index]} movies={movies} />)))
      }
    </div>
  )
}

export default GPTMovieSuggestion;