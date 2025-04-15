import React, { useEffect } from 'react'
import { addPopularMovies } from '../utils/store/moviesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS, POPULAR_MOVIES_ENDPOINT } from '../utils/constants';
import { toast } from 'react-toastify';

const usePopularMovies = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => (store.user));

    const popularMovies = useSelector((store)=> (store.movies.popularMovies));


    const getPopularMovies = async () => {
        try {
            const data = await fetch(POPULAR_MOVIES_ENDPOINT, API_OPTIONS);
            const jsonData = await data.json();
            
            dispatch(addPopularMovies(jsonData.results))


        } catch (error) {
            toast(error.message)
        }
    }

    useEffect(() => {
        if (user) {
            getPopularMovies();

        }

    }, [user])
}

export default usePopularMovies;

