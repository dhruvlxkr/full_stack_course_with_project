import React from 'react'
import District from './District'

const Stategov = ({ money }) => {
   money = money - 100
  return (
    <>
        <h1>This is the State Government page</h1>
        <District money={money}></District>
    </>

  )
}

export default Stategov