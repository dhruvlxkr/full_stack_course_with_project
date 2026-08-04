import React from 'react'
import Stategov from './Stategov'

const Indiangov = ({ money }) => {
      money = money - 100
  return (
    
    <>
    <h1>This is the Indian Government page</h1>
      <Stategov money={money}></Stategov>
    </>
  
  )
}
export default Indiangov