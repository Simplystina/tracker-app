import './applicationsStyles.css'
import {FaPlus} from 'react-icons/fa'
import SearchComponent from '../SearchApplications/searchApplicationsComponent'
import ApplicationResults from '../ApplicationResult/applicationsResultComponent'
import { useContext, useEffect, useState } from 'react'
import { ApplicationContext } from '../../context/application/applicationContext'
import AddApplication from '../../AddApplicationForm/AddApplicationForm'
import { useSelector, useDispatch } from 'react-redux';
import { getAllJobs } from '../../features/allJobs/allJobsSlice';
import { Loader } from '../Index';




const ApplicationsComponent= ()=>{
    const {
        jobs,
        isLoading,
        page,
        totalJobs,
        numOfPages,
        search,
        searchStatus,
        searchType,
        sort,
      } = useSelector((store) => store.allJobs);
      const dispatch = useDispatch();

      const [isModalOpen, setIsModalOpen] = useState(false) //intitalize modal State


      useEffect(() => {
        dispatch(getAllJobs());
      }, [page, search, searchStatus, searchType, sort]);


    const addJob = ()=>{
        setIsModalOpen(true)
    }
 
    return (<>
            <header>
                <h2 className="heading" >All Jobs</h2>
                <button className="btn-search" onClick={addJob}><FaPlus /> Add job</button>
            </header>
            <SearchComponent />
            {isLoading? <Loader/> : <ApplicationResults  showModal={setIsModalOpen} jobs={jobs}/>}
            {isModalOpen && <AddApplication showModal={setIsModalOpen}/>}
            </>
        )
} 

export default ApplicationsComponent