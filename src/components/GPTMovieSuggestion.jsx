import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GPTMovieSuggestion = () => {
  const {moviesByAI,searchedMovies} = useSelector((store) => store.gpt);
  if(!moviesByAI || !searchedMovies) return;
  return (
    <div className='bg-black relative z-20'>
      {searchedMovies.map((movies,index) => (<MovieList title={moviesByAI[index]} movies={movies} />))}
    </div>
  )
}

export default GPTMovieSuggestion;