import React from 'react'
import './Dashboard.css'
import { Sidebar, Navbar } from '../../components/Index'
import {Navigate} from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import {AiOutlineMenu} from 'react-icons/ai'
import { useEffect } from 'react'

const Dashboard = () => {
   let token = localStorage.getItem("user")


  useEffect(()=>{
   token = localStorage.getItem("user")
    console.log(token, "token")
  },[token])
 

  const openSidebar = ()=>{
    document.getElementById("sidenav").style.width = "14rem";
    console.log('sidebar-clicked', document.getElementById('sidenav'))
  }
  return (<>{
token ? (<div>
             <Sidebar/>
            <div className='page-content' id="page-content">
              <Navbar/>
              <span onClick={openSidebar} className='harmburger-menu'><AiOutlineMenu padding="20px" fontSize="25px"/></span>
              <Outlet />
            </div>
        </div>):<Navigate to='/login'/>

  }</>)
   
}

export default Dashboard 