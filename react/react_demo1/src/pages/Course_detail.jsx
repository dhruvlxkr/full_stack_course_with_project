import React from 'react'
import { useParams,Link,useLocation } from 'react-router-dom'

const Course_detail = () => {
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
    const {id} = useParams();
    const course_detail = arr.filter((data)=> data.id == id);
    const location = useLocation();
  return <>
    <h1>Course id:- {id}</h1>
    <h2>Course name :- {course_detail[0].name}</h2>
    
    {location.pathname != '/Course_detail/Mern001' && (
        <>
        <h2>Course Price :- {course_detail[0].price}</h2>
        <h2>Course Description :- {course_detail[0].description}</h2>
        </>
    )}
   
    <button><Link to={'/course'}>Back</Link></button>
</>
 
}

export default Course_detail