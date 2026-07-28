import React from 'react'
import {useEffect,useState} from 'react'

const Useeffects = () => {
  
      const [counter,setCounter] = useState(0);

        useEffect(() => {
        document.title = counter;
        console.log('Use Effect is Running');
    }, [counter])

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

export default Useeffects