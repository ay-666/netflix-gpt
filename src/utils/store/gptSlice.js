import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name:'gpt',
    initialState:{
        showGptSearch: false,
        searchedMovies:null,
        moviesByAI:null
    },
    reducers:{
        toggleGptSearchView : (state,action)=>{
            state.showGptSearch = !state.showGptSearch;
        },
        addSearchedMoviesResult: (state,action)=>{
            const {moviesByAI, searchedMovies} = action.payload;
            state.moviesByAI = moviesByAI;
            state.searchedMovies = searchedMovies;
        }
    }
})

export const {toggleGptSearchView, addSearchedMoviesResult} = gptSlice.actions;
export default gptSlice.reducer;