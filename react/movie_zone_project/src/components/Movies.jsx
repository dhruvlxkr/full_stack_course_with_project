import React, { useState } from 'react'
import {movies} from '../assets/data'


const Movies = () => {
  const [movieList, setMovieList] = useState(movies)
  return (
    <>
    <div style={{display:"flex",justifyContent:'center',alignItems:'center',flexWrap:'wrap',gap:'2rem',textAlign:'center', width:'1200px',margin: 'auto'}}>
    {movies.map((data)=> (
       <div key={data.id} style={{maxWidth:"250px"}}>
        <div style={{padding:'10px'}} className='hover_effect'>
          <img src={data.poster_path} alt={data.title} style={{width:'200px',border:'1px solid yellow',borderRadius:'10px'}} />
        </div>
        <h6 style={{color:"white"}}>{data.title}</h6>
        <p style={{color:"white"}}>{data.release_date}</p>
       </div>
    ))}
    </div>
    </>
  );
}

export default Movies