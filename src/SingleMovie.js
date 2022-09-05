import React from 'react'
import { useState,useEffect } from 'react';
import {useParams,NavLink} from 'react-router-dom'
import { API_URL } from './context';

const SingleMovie = () => {
  const {id}= useParams();
  const[isLoading,setisLoading]=useState(true);
    const[movie,setmovie]=useState([]);
   const getMovies=async(url)=>{
try{
    const res=await fetch(url)
    const data=await res.json();
    console.log(data);
    if(data.Response==="True")
    {
        setisLoading(false)
setmovie(data)
    }
}
catch(error)
{
    console.log(error);
}
   }
    useEffect(()=>{
        let timerOut=setTimeout(()=>{
            getMovies(`${API_URL}&i=${id}`)
        },1000)
        return ()=>clearTimeout(timerOut)
    },[id])
    if(isLoading)
    {
      return(
        <div className='movie-section'>
<div className='loading'>
  Loading...
</div>
        </div>
      )
    }
  return (
   <>
   <section className='movie-section'>
<div className='movie-card'>
<figure>
  <img src={movie.Poster} alt=""></img>
</figure>
<div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className=""></p>
          <p className="card-text">{movie.Released}</p>
          <p className="card-text">{movie.Genre}</p>
          <p className="card-text">{movie.imdbRating} / 10</p>
          <p className="card-text">{movie.Country}</p>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
</div>
</div>
   </section>
   </>
  )
}

export default SingleMovie