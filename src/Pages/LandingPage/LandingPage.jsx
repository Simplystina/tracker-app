import React, { useContext } from 'react'
import './LandingPage.css'
//import logo from '../../images/logo.svg'
import logo from '../../images/Trackerlogo.png'
import main from '../../images/main.svg'
import { Link } from 'react-router-dom'

import { UserContext } from '../../context/user/userContext'

import { Loader } from '../../components/Index'

const LandingPage = () => {
  const {user, isLoading} = useContext(UserContext)
  

  return (
  <>
    {
     isLoading ? <Loader/> : ( 
      <div className='landingpage-container'>
        <nav className='landingpage-navbar'><img src={logo} alt='logo'></img></nav>
        <div className='landingpage-content'>
            <div className='landingpage-inner-contents'>
                <h1><span>Application Tracker</span></h1>
                <p>We're here to help you keep track of your job application
                    till forever. Interested in keeping track of your applications?
                    Click the link below to get started.
                </p>
              { user?(
                  <>
                      <h2>Welcome to Tracker {user.name}</h2>
                     <div className='landingpage-inner-contents-btn-container'><Link className='btn landingpage-inner-contents-btn' to='/dashboard/overview'>View Dashboard</Link></div> 
                  </>
              )
              : <div className='landingpage-inner-contents-btn-container'><Link className='btn landingpage-inner-contents-btn' to='/login'>Login/Register</Link></div>}
            </div>
            <div className='landingPage-content-image'>
                <img src={main} alt='hero'></img>
            </div>
        </div>
      </div>)
  }
</>
  )
}

export default LandingPage
