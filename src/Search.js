import React from 'react'
import { useGlobalContext } from './context'

const Search = () => {
  const {query,setquery,isError}=useGlobalContext();
  return(
    <>
  <section className="search-section">
<h2>search your favourite movie</h2>
<form action="#" onSubmit={(e)=>e.preventDefault()}>
  <div>
    <input type="text" placeholder='search here' value={query} onChange={(e)=>setquery(e.target.value)} />
  </div>
</form>
<div className='card-error'>
<p>{isError.show && isError.msg}</p>
</div>
  </section>
  </>
  )
}

export default Search