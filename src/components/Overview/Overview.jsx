import React, { useState,useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import './Overview.css'
import {FiArrowUpRight, FiArrowDownRight} from 'react-icons/fi'
import {FaTwitch, FaSlack, FaDropbox} from 'react-icons/fa'
import {RiArrowRightSLine} from 'react-icons/ri'
import { BarChartComponent } from '../Index'
// import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import SkeletonComponent from '../Skeleton/skeletonComponent'
import { ApplicationContext } from '../../context/application/applicationContext'
import { useSelector, useDispatch } from 'react-redux';
import { showStats ,getAllJobs} from '../../features/allJobs/allJobsSlice';
import moment from 'moment'
import graph from '../../images/graph.png'


const compare =(count)=> Math.ceil(count/50)*100


const Overview = () => { 
    const { isLoading, monthlyApplications } = useSelector(
        (store) => store.allJobs
      );

      const {jobs } = useSelector((store) => store.allJobs);
      const { monthlyApplications: data } = useSelector((store) => store.allJobs);

      const { stats } = useSelector((store) => store.allJobs);
      
      const dispatch = useDispatch();
      useEffect(() => {
        dispatch(showStats());
        dispatch(getAllJobs()) 
      }, []);
    
      const topJobs = jobs?.length >3 ? jobs.slice(0,3) : jobs
      const capitalize =(text) =>  text.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
     

  return (
    <div className='dashboard-overview'>
      
      {isLoading? <SkeletonComponent/>:(
      <><h2 className='overview-text'>Overview</h2>
       <div className='overview-stats-container'>
           <div className='overview-stats'>
               <span className='overview-stats-count'>{stats.pending||0 + stats.declined||0 + stats.interview||0}</span>
               <p className='overview-stats-text1'>Total applications</p>
               <div className='overview-stats-percent'><FiArrowUpRight className='arrow-up'/> {compare(stats.pending||0 + stats.declined||0 + stats.interview||0)}%</div>
               <p className='overview-stats-text2'>compared to others</p>
           </div>
           <div className='overview-stats'>
               <span className='overview-stats-count'>{stats.pending||0}</span>
               <p className='overview-stats-text1'>Pending applications</p>
               <div className='overview-stats-percent'><FiArrowUpRight className='arrow-up'/> {compare(stats.pending||0)}%</div>
               <p className='overview-stats-text2'>compared to last month</p>
           </div>
           <div className='overview-stats'>
              <span className='overview-stats-count'>{stats.interview||0}</span>
               <p className='overview-stats-text1'>Interview</p>
               <div className='overview-stats-percent'><FiArrowUpRight className='arrow-up'/>{compare(stats.interview||0)}%</div>
               <p className='overview-stats-text2'>compared to last month</p>
           </div>
           <div className='overview-stats'>
               <span className='overview-stats-count'>{stats.declined||0}</span>
               <p className='overview-stats-text1'>Jobs declined</p>
               <div className='overview-stats-percent red'><FiArrowDownRight className='arrow-up'/>{compare(stats.declined||0)}%</div>
               <p className='overview-stats-text2'>compared to last month</p>
           </div>
       </div>
       <div className='overview-heading2'>
          <h2>Top Saved Applications</h2>
          <Link to='/dashboard/applications'><button  style={{cursor: 'pointer'}}>see all</button></Link>
       </div>
       <div className='overview-topjob-container'>
        {topJobs.length>0 &&
            topJobs?.map((item)=>{
                const date = moment(item.createdAt).format('MMM Do, YYYY');

              return(
             <div className='overview-topjob-content'>
               <span><FaTwitch className='overview-topjob-icon'/> </span>
               <div>
                   <h2>{capitalize(item.position)}</h2>
                   <p>{date}</p>
               </div>
               <RiArrowRightSLine className='arrow-right'/>
           </div>)
            })
        }
           
        </div>
       
       {
           <BarChartComponent data={data}/>
        
        }
    </>)
   }
    </div>
  )
}

export default Overview