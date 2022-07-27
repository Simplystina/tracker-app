import React, { useContext} from 'react'
import './Navbar.css'
import {AiOutlineMenuUnfold, AiFillCaretDown} from 'react-icons/ai'
// import {BsPersonCircle} from 'react-icons/bs'
import person from '../../images/person.png'
import { UserContext } from '../../context/user/userContext'

const Navbar = () => {

 
  const toggleSidebar = ()=>{
    if(window.innerWidth>1006){
      if(document.getElementById("sidenav").style.width === "14rem"){
        document.getElementById("sidenav").style.width = "0";
        document.getElementById("page-content").style.marginLeft= "0px";
      }
      else{
        document.getElementById("sidenav").style.width = "14rem";
        document.getElementById("page-content").style.marginLeft = "14rem";
      }
     return
    }else{
      document.getElementById("sidenav").style.width = "14rem"
    }
  
  }
  const {user} = useContext(UserContext)
  

  return (
    user && <div className='navbar-container'>
        <AiOutlineMenuUnfold onClick={toggleSidebar} className='menu-icon'/>
        <h2>Dashboard</h2>
        <div className='user-btn'>
            <img className='user-img' src={person} alt=""/>
            <p>{user.name}</p>
            <AiFillCaretDown className='user-icon'/>
        </div>
    </div>
  )
}

export default Navbar
