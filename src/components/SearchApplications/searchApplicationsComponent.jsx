import  './searchApplication.styles.css'
import { FiSearch} from "react-icons/fi";
import {  useEffect, useState } from 'react';





const SearchComponent = ({filteredData,handleChange,handleSearch})=>{
    const [filter, setFilter] = useState('All')
    const [search, setSearch] = useState('')


    useEffect(()=>{  //eslint-disable-line 
        handleChange(filter)  //eslint-disable-line 
    },[filter])  //eslint-disable-line 

   useEffect(()=>{  //eslint-disable-line 
    handleSearch( search)  //eslint-disable-line 
   },[search])  //eslint-disable-line 

    const handleFilterChange =(e) =>{
        setFilter(e.target.value)
    }

    const hanleSearchChange = (e) =>{
        setSearch(e.target.value)
    }

    const handleSubmitSearch = () =>{
        handleSearch(search)
    }

return(
   
   <div className="search-container">
       <p className="search_container_heading">
        All applications <span>{filteredData ?filteredData.length:0}</span>
       </p>
       <div className="search_container-field">
           <div className='search_container_field_input' >
               <input type="text" placeholder='Search' className="search_container_field_input_element"  onChange={(e)=>  hanleSearchChange(e)}/>
               <span onClick={handleSubmitSearch}><FiSearch className='svg'/></span>
           </div>
            <select name="sort"  className="search_container_field_dropdown">
                <option value="">Sort</option>
                <option value="">A-Z</option>
                <option value="">Z-A</option>
            </select>
            <select name="sort" value={filter} className="search_container_field_dropdown" onChange={(e)=>  handleFilterChange(e)}>
            <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Declined">Declined</option>
            </select>
       </div>
   </div>
)
}


export default SearchComponent