import React,{useState} from 'react'

const Counter = () => {

  const [counter,setCounter] = useState(0);
    let incrementbtn = () =>{
        // 
        setCounter(counter+1);
        // console.log(counter)
    }

    let decrimentBtn = () =>{
        setCounter(counter-1);
        // counter--;
        // console.log(counter)
    }
  return (
    <>
     <div>{counter}</div>
     <button onClick={incrementbtn}>Increment</button>
     <button onClick={decrimentBtn}>Decrement</button>
    </>
   
  )
}

export default Counter