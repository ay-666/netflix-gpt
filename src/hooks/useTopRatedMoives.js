import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTopRatedMovies } from '../utils/store/moviesSlice';
import { API_OPTIONS, TOP_RATED_MOVIES_ENDPOINT } from '../utils/constants';
import { toast } from 'react-toastify';

const useTopRatedMoives = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => (store.user));


    const getTopRatedMovies = async () => {
        try {
            const data = await fetch(TOP_RATED_MOVIES_ENDPOINT, API_OPTIONS);
            const jsonData = await data.json();
            //console.log(jsonData.results);
            dispatch(addTopRatedMovies(jsonData.results))


        } catch (error) {
            toast(error.message)
        }
    }

    useEffect(() => {
        if (user) {
            getTopRatedMovies();

        }

    }, [user])
}

export default useTopRatedMoives;