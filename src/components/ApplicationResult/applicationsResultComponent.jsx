import './applicationResults.styles.css'

import Result from '../Result/resultComponent';

import { Loader } from '../Index';




const ApplicationResults = ({isLoading,filteredData})=>{


    if(isLoading) return <Loader/>

    return (
        <section className="application-results">
            {
            filteredData.length> 0 ? filteredData.map(application=> {
                    return <Result key= {application['$id']} application={application} />
                }) :  <h4>Empty
                </h4>
            }  
        </section>
    )
}


export default ApplicationResults