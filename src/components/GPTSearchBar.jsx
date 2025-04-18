import React, { useRef } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { API_OPTIONS, SUPPORTED_LANGUAGES } from '../utils/constants';
import { lang } from '../utils/langConstants';
import { toast } from 'react-toastify';
import openai from '../utils/openai.config';
import deepseekai from '../utils/deepseek.config'
import geminiai from '../utils/gemini.config'
import { addSearchedMoviesResult } from '../utils/store/gptSlice';
import { startLoading, stopLoading } from '../utils/store/loadingSlice';

const GPTSearchBar = () => {
  const language = useSelector((store) => store.config.language);
   const searchText = useRef();
   const dispatch = useDispatch();


   const searchMovieByName = async(movie)=>{
  
    
    try{
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,API_OPTIONS);
      const jsonData = await res.json();
      return jsonData.results;
    }catch(error){
      console.log(error.message)
    }
   }

  const handleGPTSearch = async () =>{
    
    if(!searchText.current.value) return;
    // API  call to  AI to get movies name
    dispatch(startLoading());
    const gptQuery = `Act as a Movie Recommendatation System and suggest some movies for the query : ${searchText.current.value}. Only provide names of 5 movies in seperated by comma. Exmaple result:  movie1, movie2, movie3, movie4 .Dont provide anything extra in results.`

    try{
      // const res = await deepseekai.chat.completions.create({
      //   model: 'deepseek-chat',
      //   messages:[
      //     {role: 'user' , content: 'Say this is a test.'}
      //   ]
      // })

      // console.log(res.choices)

      const res = await geminiai.models.generateContent({
        model:'gemini-2.0-flash',
        contents: gptQuery
      })
      
      
      const movies = res?.text.split(',').map((movie) => movie.trim()) || [];
      
      if(!movies || movies.length === 0){
        toast('Nothing to watch.')
        return;
      }

      const moviesDetailsPromiseArray =  movies.map((movie)=> searchMovieByName(movie));
      
      const moviesDetails = await Promise.all(moviesDetailsPromiseArray);
      
      dispatch(addSearchedMoviesResult({moviesByAI: movies, searchedMovies:moviesDetails}));



    }catch(error){
      toast(error.message);
    }finally{
      dispatch(stopLoading());
    }
  }

  return (
    <div>
      <div className='py-[25%] sm:py-[15%] md:py-20 flex justify-center w-f relative z-20'>
        <form onSubmit={(e)=>{e.preventDefault()}} className=' bg-black/75 w-3/4 sm:w-2/3 md:w-1/2 flex flex-col md:grid md:grid-cols-12 '>
            <input ref={searchText} type='text' className='p-3  m-4  md:col-span-9 text-white border-2  border-gray-400 rounded  focus:outline-white/20 bg-transparent' placeholder={lang[language].gptSearchPlaceholder}></input>
            <button onClick={handleGPTSearch} className='m-4 py-2 md:py-0 md:col-span-3 text-white font-bold rounded bg-red-600/75'>{lang[language].search}</button>
        </form>
        
    </div>
    </div>
  )
}

export default GPTSearchBar