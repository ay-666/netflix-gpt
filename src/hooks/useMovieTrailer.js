import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/store/moviesSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { API_OPTIONS } from '../utils/constants'

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  
  const getMovieVideos = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        API_OPTIONS
      );
      const jsonData = await data.json();
      //console.log(jsonData);

      const filterData = jsonData?.results.filter(
        (video) => video.type === "Trailer" && video.official
      );
      const trailer =
        filterData && filterData.length === 0
          ? jsonData?.results?.[0]
          : filterData[0];
      

      dispatch(addTrailerVideo(trailer));
    } catch (error) {
      toast(error.message);
    }
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};


export default useMovieTrailer;
