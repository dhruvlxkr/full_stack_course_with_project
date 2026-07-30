import React from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {
    const navigate = useNavigate()
  const gotoHome = () => {
     navigate('/');
  }

   const gotoBack = () => {
     navigate(-1);
  }
  return (
    <>
    <button onClick={gotoHome}>Go To Home</button>
    <button onClick={gotoBack}>Go To Back</button>
    </>
  )
}

export default About