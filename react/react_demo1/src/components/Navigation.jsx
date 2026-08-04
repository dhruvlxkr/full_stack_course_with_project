import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css';
import { useState } from 'react';


const Navigation = () => {
  const [IsLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate();
   
  const login = () => {
      setIsLoggedIn(true);
      navigate('/Dashboard');
  } 

  const logout = () => {
      setIsLoggedIn(false);
       navigate('/');
  }
  return <>
    <div class="nav_bar">
        <div class="left">
          <Link className="items" to={'/'}>WDM</Link>
        </div>
        
        <div class="right">
        {IsLoggedIn && (
          <>
          <Link class="items" to={'/Course'}>Course</Link>
          <Link class="items" to={'/Dashboard'}>Dashboard</Link>
          <Link class="items" to={'/Profile'}>Profile</Link>
          <Link class="items" to={'/Indiangov'}>Indiangov</Link>
           <button class="items" onClick={logout} style={{background:'gray',fontWeight:'bold'}}>Logout</button>
          </>
  
        )}
        

          {!IsLoggedIn && (
            <>
            <Link class="items" to={'/About'}>About</Link>
          <Link class="items" to={'/Team'}>Team</Link>
          
          <Link class="items" to={'/Contact'}>Contact</Link>
           <button class="items" onClick={login} style={{background:'gray',fontWeight:'bold'}}>Login</button>
            </>
          )}
          
        
        
        </div>

    </div>
  </>
}

export default Navigation