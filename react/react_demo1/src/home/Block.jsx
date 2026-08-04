import React from 'react'
import Panchayat from './Panchayat'

const Block = ({ money }) => {
   money = money - 100
  return (
    <>
    <h1>This is the Block page</h1>
    <Panchayat money={money}></Panchayat>
    </>
  )
}

export default Block