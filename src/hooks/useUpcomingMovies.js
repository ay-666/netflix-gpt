import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUpcomingMovies } from '../utils/store/moviesSlice';
import { API_OPTIONS, UPCOMING_MOVIES_ENDPOINT } from '../utils/constants';
import { toast } from 'react-toastify';

const useUpcomingMovies = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => (store.user));


    const getUpcomingMovies = async () => {
        try {
            const data = await fetch(UPCOMING_MOVIES_ENDPOINT, API_OPTIONS);
            const jsonData = await data.json();
            //console.log(jsonData.results);
            dispatch(addUpcomingMovies(jsonData.results))


        } catch (error) {
            toast(error.message)
        }
    }

    useEffect(() => {
        if (user) {
            getUpcomingMovies();

        }

    }, [user])
}

export default useUpcomingMovies;