import React,{useContext} from 'react'
import MoneyContext from '../context/Moneycontext'


const People = () => {
  const data = useContext(MoneyContext)
  return (
    <>
    <h1>This is the People page = {data.money} </h1>
    <h1>Counter = {data.Counter} </h1>
    <h2>Name = {data.name} </h2>
     <button onClick={() => data.setCounter(data.Counter + 1)}>Increase</button>
    </>
    
  )
}

export default People