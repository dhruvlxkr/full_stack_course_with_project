import React, { useState } from 'react'
import {movies} from '../assets/data'


const Movies = () => {
  const [movieList, setMovieList] = useState(movies)

  const fillterByCategory = (cat) =>{
      if(cat === 'All'){
      setMovieList(movies);
      }else{
      setMovieList(movies.filter((data) => data.category == cat))}
      }
  
  return (
    <>
    <div className='my-3 text-center'>
      <button type="button" onClick={() => fillterByCategory('All')} className="btn btn-outline-primary mx-3">All</button>
      <button type="button" onClick={() => fillterByCategory('Action')} className="btn btn-outline-secondary mx-3">Action</button>
      <button type="button" onClick={() => fillterByCategory('Thriller')} className="btn btn-outline-success mx-3">Thriller</button>
      <button type="button" onClick={() => fillterByCategory('Animation')} className="btn btn-outline-danger mx-3">Animation</button>
      <button type="button" onClick={() => fillterByCategory('Horror')} className="btn btn-outline-warning mx-3">Horror</button>
      <button type="button" onClick={() => fillterByCategory('Drama')} className="btn btn-outline-info mx-3">Drama</button>
      <button type="button" onClick={() => fillterByCategory('Sci-Fi')} className="btn btn-outline-light mx-3 ">Sci-Fi</button>
    </div>
    <div style={{display:"flex",justifyContent:'center',alignItems:'center',flexWrap:'wrap',gap:'2rem',textAlign:'center', width:'1200px',margin: 'auto',marginTop:'1.5rem'}}>
    {movieList.map((data)=> (
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