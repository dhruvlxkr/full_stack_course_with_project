import React,{useState} from 'react'
import Moneycontext from './Moneycontext'

const Moneystate = (props) => {
    const money = 1000;
    const [Counter, setCounter] = useState(0);
    const name = "Dharmendra Laxkar"
  return (
    <>
    <Moneycontext.Provider value={{ money, Counter, setCounter, name }}>{props.children}</Moneycontext.Provider>
       
    </>
  )
}

export default Moneystate
