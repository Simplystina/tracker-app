import React,{useEffect, useRef} from 'react'
import './Sidebar.css'
import logo from '../../images/Trackerlogo.png'
import {IoMdStats} from 'react-icons/io'
import {MdQueryStats,MdOutlinePostAdd} from 'react-icons/md'
import {ImProfile} from 'react-icons/im'
import {BiLogOut} from 'react-icons/bi'
import { Link, NavLink} from 'react-router-dom'
import { logOutUser } from '../../Services/connectApi'
import { useNavigate } from 'react-router-dom';
import './Sidebar.css'
import {AiOutlineClose} from 'react-icons/ai'

const Sidebar = () => {
  const navigate = useNavigate()

   
  const node = useRef();

  const handleLogOut = async () => {
          logOutUser()
          navigate('/login')
  }
  const closeSidebar = ()=>{
    document.getElementById("sidenav").style.width = "0";
    console.log('sidebar-clicked', document.getElementById('sidenav'))
  }
  const handleClick = e => {
    if(window.innerWidth <=1006 ){
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }
        
        document.getElementById("sidenav").style.width = "0"; 
          // outside click 
    }
    
  };

useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
     // return function to be called when unmounted
       return () => {
      document.removeEventListener("mousedown", handleClick);
    };
    
  }, []);
        

  return (
   <aside ref={node}  style={{width:'14rem'}} className='side-bar' id='sidenav'>
       <div className='sidebar-header'>
          <Link to='/'><img className='sidebar-logo' src={logo} alt='logo'></img></Link>
         <span onClick={closeSidebar}><AiOutlineClose  className='sidebar-close-icon'/></span>
        </div>
       <ul className='sidebar-links'>
          <li> <NavLink className="nav-links" to='/dashboard/overview'  style={({ isActive }) => ({ background: isActive ? "rgb(54, 77, 217)" : "none" , color: isActive? 'white':"#5C6578"})}><IoMdStats className='links-icon'/> Overview</NavLink></li>
          <li><NavLink className="nav-links" to='/dashboard/applications'  style={({ isActive }) => ({ background: isActive ? "#364DD9" : "none" ,color: isActive? 'white':"#5C6578"})}><MdQueryStats className='links-icon'/>  Applications</NavLink></li>
          <li><NavLink className="nav-links" to='/dashboard/feeds' style={({ isActive }) => ({ background: isActive ? "#364DD9" : "none",color: isActive? 'white':"#5C6578" })}> <MdOutlinePostAdd className='links-icon'/> Feeds</NavLink></li>
          <li><NavLink className="nav-links" to='/dashboard/account' style={({ isActive }) => ({ background: isActive ? "#364DD9" : "none",color: isActive? 'white':"#5C6578" })}><ImProfile className='links-icon' />Account</NavLink></li>
          <li className='logout' onClick={()=> handleLogOut()}>  <BiLogOut className='links-icon' />logout</li >
       </ul>
    </aside>
  )
}

export default Sidebar
