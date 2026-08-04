import React from 'react'
import People from './People'

const Panchayat = ({ money }) => {
   money = money - 100
  return (
    <>
      <h1>This is the Panchayat page</h1>
      <People money={money}></People>
    </>
  
  )
}

export default Panchayat