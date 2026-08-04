import React from 'react'
import Block from './Block'

const District = ({ money }) => {
   money = money - 100
  return (
    <>
    <h1>This is the District page</h1>
    <Block money={money}></Block>
    </>
    
  )
}

export default District