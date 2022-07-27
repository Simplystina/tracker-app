import React from 'react'
// import {FiArrowUpRight, FiArrowDownRight} from 'react-icons/fi'
import {FaTwitch, FaSlack, FaDropbox} from 'react-icons/fa'
// import {RiArrowRightSLine} from 'react-icons/ri'
import pattern from '../../images/feed-pattern.png'

const FeedsBox = () => {

    
  return (
    <div className='feedbox-content-container'>
        <div className='feedbox-img-container'>
            <img src={pattern} alt="pattern"/>
        </div>
        <div className='feedbox-content'>
            <h2>Your Applications</h2>
            <div className='box-application'>
                <div className='box-item'>
                    <span><FaTwitch className='box-icon'/></span>
                    <h4>Project Manager at Andela</h4>
                </div>
                <div className='box-item'>
                    <span><FaSlack className='box-icon'/></span>
                    <h4>MLH Internship</h4>
                </div>
                <div className='box-item'>
                    <span><FaDropbox className='box-icon'/></span>
                    <h4>Front End Developer at Konga</h4>
                </div>
                <div className='box-item'>
                    <span><FaTwitch className='box-icon'/></span>
                    <h4>Lab Attendant</h4>
                </div>
            </div>
            <button className='boxfeed-btn'>Show More</button>
            <h3>Tell A Friend About Tracker</h3>
            <p>Let’s help you stay on top of all your job applications</p>
        </div>
        
    </div>
  )
}

export default FeedsBox
