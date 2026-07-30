import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';


const Navigation = () => {
  return <>
    <div class="nav_bar">
        <div class="left">
          <Link class="items" to={'/'}>Home</Link>
        </div>
        
        <div class="right">
          <Link class="items" to={'/About'}>About</Link>
          <Link class="items" to={'/Course'}>Course</Link>
          <Link class="items" to={'/Team'}>Team</Link>
          <Link class="items" to={'/Contact'}>Contact</Link>
        </div>

    </div>
  </>
}

export default Navigation