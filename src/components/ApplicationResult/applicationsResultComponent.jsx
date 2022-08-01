import './applicationResults.styles.css'

import Result from '../Result/resultComponent';

import { Loader } from '../Index';




const ApplicationResults = ({jobs, showModal})=>{
  
    return (
        <div>
            
            {
            jobs.length> 0 ? jobs.map(job=> {
                return ( 
                    <section className="application-results">
                        <Result showModal={showModal} key={job._id} {...job} />
                    </section>
                    )
                }) :  <div className='none-application-results'>
                        <h4>No jobs to display...</h4>
                      </div>
            }  
        
        </div>
        
    )
}


export default ApplicationResults