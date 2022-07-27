import { createContext, useState ,useEffect} from "react";
import sdk, {  getApplications } from "../../Services/connectApi";


//helper function for handling update 
const updateApplication = (allApplications,updateApplication)=>{
    return allApplications.map(application=>{
       if(application['$id']===updateApplication['$id']){
           return updateApplication
       }
       return application
    })
}


//helper function for handling delete 
const removeApplication = (allApplications,deletedApplication)=> allApplications.filter(application => application['$id']!==deletedApplication['$id'])





export const ApplicationContext = createContext([])


const ApplicationProvider = ({children}) => {

    const [applicationData,setApplications] = useState([])
    const [isLoading, setIsLoading] = useState(true)




     //this subscribes to the document channel and listens to changes in documents
    useEffect(()=>{
     const unsuscribe = sdk.subscribe('documents',data =>{
        if(data.event ==='database.documents.create'){//listens for create
            console.log(data.payload)
            
            setApplications((applicationData) => [...applicationData,data.payload])
        }
        else if(data.event ==='database.documents.update'){ //listens for updates
              setApplications((state) => updateApplication(state,data.payload))
        }
        else if(data.event === 'database.documents.delete'){//listens for delete
            setApplications((state) => removeApplication(state,data.payload))
        }
     })
       return unsuscribe
    },[])
   


    useEffect(
        ()=>{
            const getApplicationsData = async ()=>{
                    const {documents} = await getApplications() //get application data on first mount
                    setApplications(documents)
                    setIsLoading(false)
            }
            getApplicationsData()
        },[]) 

    return <ApplicationContext.Provider value={{applicationData,isLoading}}>{children}</ApplicationContext.Provider>
}

export default ApplicationProvider