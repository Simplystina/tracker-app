import  './searchApplication.styles.css'
import { FiSearch} from "react-icons/fi";
import {  useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleChange, clearFilters } from '../../features/allJobs/allJobsSlice';


const SearchComponent = ()=>{
    const [filter, setFilter] = useState('All')
   // const [search, setSearch] = useState('')


    const { isLoading, totalJobs, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);

  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    if (isLoading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
    console.log(e.target.name, "value")
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };


return(
   
   <div className="search-container">
       <p className="search_container_heading">
        All applications <span>{totalJobs? totalJobs :0}</span>
       </p>
       <div className="search_container-field">
           <div className='search_container_field_input' >
               <input name="search" value={search} type="text" placeholder='Search' className="search_container_field_input_element"  onChange={(e)=>handleSearch(e)}/>
           </div>
            <select name="sort" value={sort} className="search_container_field_dropdown" onChange={(e)=>handleSearch(e)}>
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
            </select>
            <select name="searchStatus" value={searchStatus} className="search_container_field_dropdown" onChange={(e)=>handleSearch(e)}>
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="interview">interview</option>
                <option value="declined">Declined</option>
            </select>
            <select name="searchType" value={searchType} className="search_container_field_dropdown" onChange={(e)=>handleSearch(e)}>
                <option value="all">All</option>
                <option value="full-time">full-time</option>
                <option value="part-time">part-time</option>
                <option value="internship">internship</option>
                <option value="remote">remote</option>
            </select>
            <button disabled={isLoading} onClick={handleSubmit} className='clear-filter-btn'>clear filter</button>
       </div>
   </div>
)
}


export default SearchComponent
// <img src={graph} alt="graph"/>