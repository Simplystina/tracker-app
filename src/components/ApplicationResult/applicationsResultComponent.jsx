import './applicationResults.styles.css'

import Result from '../Result/resultComponent';

import { Loader } from '../Index';




const ApplicationResults = ({jobs, showModal})=>{
   console.log(jobs, "jobs")

    return (
        <>
            {
            jobs.length> 0 ? 
            <section className="application-results">
            {jobs.map(job=> {
                    return <Result showModal={showModal} key={job._id} {...job} />
                }) }
            </section>
            : 
               <div className='none-application-result'>
                  <h4>No jobs to display...</h4>
               </div> 
            }  
        </>
    )
}


export default ApplicationResults