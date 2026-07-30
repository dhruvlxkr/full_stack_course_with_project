import React from 'react'
import { Link } from 'react-router-dom'

const Course = () => {
  let arr = [
    {
      id : 'Mern001',
      name : 'MERN Full Stack',
      price : 15000,
      description : 'Mern Full Stack Best Courses'
    },
    {
      id : 'Java002',
      name : 'Java',
      price : 25000,
      description : 'Java Couse Android'
    },
    {
      id : 'React003',
      name : 'React Full Stack',
      price : 35000,
      description : 'Frontent Full Stack'
    },
    {
      id : 'Node004',
      name : 'Node Js ',
      price : 45000,
      description : 'Node Js Backend Full Stack Best Courses'
    }
  ]
  return <>
    <ul>
     {arr.map((data) => (<div key={data.id}>
         <li><Link to={`/Course_detail/${data.id}`}>{data.name}</Link></li>
    </div>) )}
    </ul>
    </> 
}

export default Course