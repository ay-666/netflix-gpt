import React, { useEffect } from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMoives from '../hooks/useTopRatedMoives';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import GPTSearch from './GPTSearch';
import { useSelector } from 'react-redux';



const Browse = () => {

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMoives();
  useUpcomingMovies();

  return (

    <div className=''>
      <Header></Header>
      {showGptSearch ? (<GPTSearch />)
        : (<>
            <MainContainer />
            <SecondaryContainer />
        </>)
      }

    </div>
  )
}

export default Browse