import React, { useState,useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import './Overview.css'
import {FiArrowUpRight, FiArrowDownRight} from 'react-icons/fi'
import {FaTwitch, FaSlack, FaDropbox} from 'react-icons/fa'
import {RiArrowRightSLine} from 'react-icons/ri'
import { BarChart } from '../Index'
// import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import SkeletonComponent from '../Skeleton/skeletonComponent'
import { ApplicationContext } from '../../context/application/applicationContext'


const findStat = (applicationData,stat) => (applicationData.reduce((acc,application)=>{
        if(application.status === stat) {
           return acc+1
        }
        return acc+0
    },0)
)

const compare =(count)=> (count/50)*100


const Overview = () => { 
    const {applicationData} = useContext(ApplicationContext)
  
 
  const [isApplicationEmpty, setIsApplicationEmpty] = useState(true) //displays chart only when application list is not empty

  useEffect(() =>{
    setTimeout(()=>{
        setIsApplicationEmpty(false)
    },1000)
  })


  return (
    <div className='dashboard-overview'>
      
      {isApplicationEmpty && !(applicationData)? <SkeletonComponent/>:(
      <><h2 className='overview-text'>Overview</h2>
       <div className='overview-stats-container'>
           <div className='overview-stats'>
               <span className='overview-stats-count'>{applicationData.length}</span>
               <p className='overview-stats-text1'>Total applications</p>
               <div className='overview-stats-percent'><FiArrowUpRight className='arrow-up'/> {compare(applicationData.length)}%</div>
               <p className='overview-stats-text2'>compared to others</p>
           </div>
           <div className='overview-stats'>
               <span className='overview-stats-count'>{findStat(applicationData,'Pending')}</span>
               <p className='overview-stats-text1'>Pending applications</p>
               <div className='overview-stats-percent'><FiArrowUpRight className='arrow-up'/> {compare(findStat(applicationData,'Pending'))}%</div>
               <p className='overview-stats-text2'>compared to last month</p>
           </div>
           <div className='overview-stats'>
              <span className='overview-stats-count'>{findStat(applicationData,'Accepted')}</span>
               <p className='overview-stats-text1'>Accepted</p>
               <div className='overview-stats-percent'><FiArrowUpRight className='arrow-up'/>{compare(findStat(applicationData,'Accepted'))}%</div>
               <p className='overview-stats-text2'>compared to last month</p>
           </div>
           <div className='overview-stats'>
               <span className='overview-stats-count'>{findStat(applicationData,'Declined')}</span>
               <p className='overview-stats-text1'>Jobs declined</p>
               <div className='overview-stats-percent red'><FiArrowDownRight className='arrow-up'/>{compare(findStat(applicationData,'Decline'))}%</div>
               <p className='overview-stats-text2'>compared to last month</p>
           </div>
       </div>
       <div className='overview-heading2'>
          <h2>Top Saved Applications</h2>
          <Link to='/dashboard/applications'><button  style={{cursor: 'pointer'}}>see all</button></Link>
       </div>
       <div className='overview-topjob-container'>
           <div className='overview-topjob-content'>
               <span><FaTwitch className='overview-topjob-icon'/> </span>
               <div>
                   <h2>Product management</h2>
                   <p>24th May 2022</p>
               </div>
               <RiArrowRightSLine className='arrow-right'/>
           </div>
           <div className='overview-topjob-content'>
               <span><FaSlack className='overview-topjob-icon'/> </span>
               <div>
                   <h2>Frontend Developer</h2>
                   <p>16th May 2022</p>
               </div>
               <RiArrowRightSLine className='arrow-right'/>
           </div>
           <div className='overview-topjob-content'>
               <span><FaDropbox className='overview-topjob-icon'/> </span>
               <div>
                   <h2>Devops Engineer</h2>
                   <p>18th May 2022</p>
               </div>
               <div className='arrow-right'><RiArrowRightSLine /></div>
           </div>
        </div>
  <BarChart/></>)
}
    </div>
  )
}

export default Overview