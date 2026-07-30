import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Meal = () => {

    const [mealsdata, setmealsdata] = useState([])
    const [area, setArea] = useState('india')
    const [inputData, setInputData] = useState('');
    useEffect(() => {
     const fetchDataApi = async (area) => {
        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        const data = await api.json();
        console.log(data.meals);
        setmealsdata(data.meals)
     }

     fetchDataApi(area);
    }, [area])

    const submitHandler = async (e) => {
      e.preventDefault();
       const submitApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData}`);
       const submitData = await submitApi.json();
       console.log(submitData.meals);
       setmealsdata(submitData.meals);
       setInputData(''); 
       
    }
    
  return (
    <>
    <div className='my-3 text-center'>
      <button type="button" onClick={() => setArea('india')} className="btn btn-outline-primary mx-3">Indian</button>
      <button type="button" onClick={() => setArea('canadian')} className="btn btn-outline-secondary mx-3">Canadian</button>
      <button type="button" onClick={() => setArea('american')} className="btn btn-outline-success mx-3">American</button>
      <button type="button" onClick={() => setArea('thai')} className="btn btn-outline-danger mx-3">Thai</button>
      <button type="button" onClick={() => setArea('british')} className="btn btn-outline-warning mx-3">British</button>
      <button type="button" onClick={() => setArea('russian')} className="btn btn-outline-info mx-3">Russian</button>
    </div>
    <div className='my-4  ' style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <div>
        <form onSubmit={submitHandler} action="">
      <input type="text" onChange={(e)=>setInputData(e.target.value)} className='form-control' style={{width:'450px'}}/>
      </form>
      </div>
     
    </div>
    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
 <div style={{display:'flex', justifyContent:'center', alignItems: 'center', flexWrap:'wrap', gap:'10px',width:'1200px'}}>
     {mealsdata.map((data)=> (
        <div key={data.idMeal} style={{textAlign:'center'}}>
            <div>
                <img src={data.strMealThumb}  alt={data.strMeal} style={{width:'250px', borderRadius:'10px', border:'2px solid blue'}}/>
            </div>
            <h6>{data.strMeal}</h6>
        </div>
     ))}
     </div>
    </div>
   
    </>
  )
}

export default Meal