import React from 'react'
import { useSelector } from 'react-redux'
import MovieCard from './MovieCard';

const MovieList = ({title , movies}) => {
    if(!movies) return;
    //console.log(movies[0]);

  return (
    <div className=''>
        <div className='' >
            <h1 className='text-2xl text-white font-bold px-8 py-2'>{title}</h1>
            <div className='flex justify-around overflow-x-scroll scrollbar-hide whitespace-nowrap space-x-2 px-8'>
                {
                    movies.filter((movie)=> movie.poster_path).map((movie)=>{
                        return (<MovieCard key={movie.id} imagePath={movie.poster_path} />)
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default MovieList