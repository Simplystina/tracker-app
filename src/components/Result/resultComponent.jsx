import { useState } from 'react';
import './resultComponent.styles.css'
import {BsThreeDotsVertical } from "react-icons/bs";

import ResultDropdown from '../resultDropdown/resultDropdown';



const Result = ({application})=>{
    const [showDropdown,setShowDropdown] = useState(false)

    const {location,position,status,jobType,company,$id } = application


   return (
    <div className="application_results_result">
       <div className="result_top">
           <span className="dot"></span>
            <p className="result_top_title">
                {position}
            </p>
            <BsThreeDotsVertical className='three_vertical' onClick={()=> setShowDropdown(!showDropdown)}/>
        </div>
        <div className="result_center">
            <h2 className="result_center_title">{position} </h2>
            <p className="result_center_paragraph">{location}     <span className="dot dot-center"></span>{jobType}</p>
        </div>
        <div className="result_bottom">
            <p className="result_bottom_paragraph">
                {company} <span>{status}</span>
            </p>
        </div>
        {showDropdown && <ResultDropdown id={$id}/>}
    </div>
   )
}


export default Result