import React from 'react'
import './Dashboard.css'
import { Sidebar, Navbar } from '../../components/Index'
import {Navigate} from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  const token = localStorage.getItem("user")
  return (<>{
    
token ? (<div>
             <Sidebar/>
            <div className='page-content' id="page-content">
              <Navbar/>
              <Outlet/>
            </div>
        </div>):<Navigate to='/login'/>

  }</>)
   
}

export default Dashboard 