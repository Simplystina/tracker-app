import { useState } from 'react';
import './resultComponent.styles.css'
import {BsThreeDotsVertical } from "react-icons/bs";
import moment from 'moment';
import ResultDropdown from '../resultDropdown/resultDropdown';



const Result = ({
    _id,
    position,
    company,
    jobLocation,
    jobType,
    createdAt,
    status,
    showModal
  })=>{
    const [showDropdown,setShowDropdown] = useState(false)
    const date = moment(createdAt).format('MMM Do, YYYY');
    


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
            <p className="result_center_paragraph">{jobLocation}     <span className="dot dot-center"></span>{jobType}</p>
        </div>
        <div className="result_bottom">
            <p className="result_bottom_paragraph">
                {company} <span>{status}</span>
            </p>
        </div>
        <div>
            <h2 className="result_center_title">Date</h2>
            <p className="result_bottom_paragraph">{date}</p>
        </div>
        {showDropdown && <ResultDropdown status={status}
                                   jobType={jobType} 
                                     jobLocation={jobLocation}
                                     editJobId={_id}
                                     position={position}
                                     company={company}
                                     _id={_id}
                                     showModal={showModal}
                                     />}
    </div>
   )
}


export default Result