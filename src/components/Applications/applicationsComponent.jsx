import './applicationsStyles.css'
import {FaPlus} from 'react-icons/fa'
import SearchComponent from '../SearchApplications/searchApplicationsComponent'
import ApplicationResults from '../ApplicationResult/applicationsResultComponent'
import { useContext, useEffect, useState } from 'react'
import { ApplicationContext } from '../../context/application/applicationContext'
import AddApplication from '../../AddApplicationForm/AddApplicationForm'



//helper function in charge of filtering
const filterApplicationData = (status,applicationData)=> {
    if (status ==="All" ) return applicationData;
    const filteredApplications= applicationData.filter(application => application.status === status)
    return filteredApplications
}


//helper function for searching
const searchForApplications = (keyword,applicationData) =>{
    const searchData  = applicationData.filter(application => application.position.includes(keyword))
    return searchData
}


const ApplicationsComponent= ()=>{
    const {applicationData,isLoading} = useContext(ApplicationContext) //get application data
    const [filteredData, setFilteredData] =useState([])  //intitalize filteredData State
    const [isModalOpen, setIsModalOpen] = useState(false) //intitalize modal State


    useEffect(()=>{
        setFilteredData(applicationData) // update filterd data to reflect updated application data
    },[applicationData])

    const handleChange = (status) =>{
          setFilteredData(filterApplicationData(status,applicationData)) // filter based on status
    }

    const handleSearch = (name) =>{
        setFilteredData(searchForApplications(name,applicationData))
    }

    const addJob = ()=>{
        setIsModalOpen(true)
    }
 
    return (<>
            <header>
                <h2 className="heading" >All Jobs</h2>
                <button className="btn-search" onClick={addJob}><FaPlus /> Add job</button>
            </header>
            <SearchComponent  filteredData={filteredData} handleChange={handleChange} handleSearch={handleSearch}/>
            <ApplicationResults filteredData={filteredData} isLoading={isLoading}/>
            {isModalOpen && <AddApplication showModal={setIsModalOpen}/>}
            </>
        
    )


} 

export default ApplicationsComponent