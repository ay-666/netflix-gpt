import React, { useEffect } from 'react'
import { addNowPlayingMovies } from '../utils/store/moviesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS, CURRENT_PLAYING_MOVIE_ENDPOINT } from '../utils/constants';
import { toast } from 'react-toastify';

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => (store.user));


    const getNowPlayingMovies = async () => {
        try {
            const data = await fetch(CURRENT_PLAYING_MOVIE_ENDPOINT, API_OPTIONS);
            const jsonData = await data.json();
            //console.log(jsonData.results);
            dispatch(addNowPlayingMovies(jsonData.results))


        } catch (error) {
            toast(error.message)
        }
    }

    useEffect(() => {
        if (user) {
            getNowPlayingMovies();

        }

    }, [user])
}

export default useNowPlayingMovies;

