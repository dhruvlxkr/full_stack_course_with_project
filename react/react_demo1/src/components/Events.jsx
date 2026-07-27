import React from 'react'

const Events = () => {
    const handleButton = () => {
        alert('You click me Button');
    }

     const additionBtn = (a) => {
        alert(a+10);
    }
  return (
    <>
    {/* <button onClick={()=>additionBtn(266)}>Click</button> */}
    </>
  )
}

export default Events