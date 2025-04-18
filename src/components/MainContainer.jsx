import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);
    if(!movies) return;
    const mainMovie = movies[0];
    //console.log(mainMovie)

    const {original_title , overview,id} = mainMovie;

  return (
    <div className='pt-[25%] sm:pt-[15%] md:pt-0  bg-black'>
        <VideoTitle title={original_title} details={overview} />
        <VideoBackground movieId={id} />
    </div>
  )
}

export default MainContainer