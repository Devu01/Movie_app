import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import React ,{ useContext, useEffect, useState }from "react";
const AppContext=React.createContext();
export const API_URL=`http://www.omdbapi.com/?apikey=b178c0bb`;
const AppProvider=({children})=>{
    const[isLoading,setisLoading]=useState(true);
    const[movie,setmovie]=useState([]);
    const[isError,setisError]=useState({show:"false",msg:" "});
    const[query,setquery]=useState('titanic');
   const getMovies=async(url)=>{
    setisLoading(true);
try{
    const res=await fetch(url)
    const data=await res.json();
    console.log(data);
    if(data.Response==="True")
    {
        setisError({
            show:false,
            msg:" ",
        });
        setisLoading(false)
setmovie(data.Search)
    }
    else
    {
        setisError({
            show:true,
            msg:data.Error,
        }); 
    }
}
catch(error)
{
    console.log(error);
}
   }
    useEffect(()=>{
        let timerOut=setTimeout(()=>{
            getMovies(`${API_URL}&s=${query}`)
        },500)
        return ()=>clearTimeout(timerOut)
    },[query])
    return <AppContext.Provider value={{isLoading, isError ,movie,query,setquery}}>{children}</AppContext.Provider>
};
//global custom hook
const useGlobalContext=()=>{
    return useContext(AppContext);
}
export { AppContext, AppProvider, useGlobalContext }