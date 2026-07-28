import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Meal = () => {

    const [mealsdata, setmealsdata] = useState([])
    useEffect(() => {
     const fetchDataApi = async (area) => {
        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        const data = await api.json();
        console.log(data.meals);
        setmealsdata(data.meals)
     }

     fetchDataApi('canadian');
    }, [])
    
  return (
    <>
    <div className='my-3 text-center'>
      <button type="button" className="btn btn-outline-primary mx-3">All</button>
      <button type="button" className="btn btn-outline-secondary mx-3">Action</button>
      <button type="button" className="btn btn-outline-success mx-3">Thriller</button>
      <button type="button" className="btn btn-outline-danger mx-3">Animation</button>
      <button type="button" className="btn btn-outline-warning mx-3">Horror</button>
      <button type="button" className="btn btn-outline-info mx-3">Drama</button>
      <button type="button" className="btn btn-outline-light mx-3 ">Sci-Fi</button>
    </div>
    <div style={{display:'flex', justifyContent:'center', alignItems: 'center', flexWrap:'wrap', gap:'10px'}}>
     {mealsdata.map((data)=> (
        <div key={data.idMeal} style={{textAlign:'center'}}>
            <div>
                <img src={data.strMealThumb}  alt={data.strMeal} style={{width:'250px', borderRadius:'10px', border:'2px solid blue'}}/>
            </div>
            <h5>{data.strMeal}</h5>
        </div>
     ))}
     </div>
    </>
  )
}

export default Meal