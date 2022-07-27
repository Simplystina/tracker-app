import React,{useReducer,useState} from 'react'
import './AddApplicationForm.css'
import {toast, ToastContainer} from 'react-toastify'
import {MdOutlineClose} from 'react-icons/md'
import { createApplication } from '../Services/connectApi'


const applicationTypes ={
    location:'location',
    position:'position',
    company:'company',
    status:'status',
    jobType:'jobType',
    clear:'clear',
   }
  
   const initialState ={
     location:'',
     position:'',
     company:'',
     status:'Pending',
     jobType:'full-time',
   }
  
  
  const reducer = (state=initialState, action={}) =>{
  
    const {type,payload} = action
    switch (type) {
      case applicationTypes.company:
        return {...state,company:payload}
      case applicationTypes.jobType:
        return {...state,jobType:payload}
      case applicationTypes.status:
        return {...state,status:payload}
      case applicationTypes.position:
        return {...state,position:payload}
      case applicationTypes.location:
       return {...state,location:payload}
      case applicationTypes.clear:
        return {...initialState}
      default:
        return state
    }
  
  }
  
  const AddApplication = ({showModal}) => {
    const [state,dispatch] =  useReducer(reducer,initialState)
    const [submitAction, setsubmitAction] = useState(false)
    const {location,position,status,company,jobType} =state
  
   const handleChange =(e) => {
     dispatch({
       type:e.target.name,
       payload:e.target.value
     })
   }
  
   const handleSubmit =async ()=> {
 
     if(!(location&&position&&company&&jobType&&status)) return toast.error('Please all fields are required to create a new application')
  
    setsubmitAction(true)
     await createApplication(state)
     toast.success('Application created')
     setsubmitAction(false)
     showModal(false)
     dispatch({type:'clear'})
   }

    const closeModal = ()=>{
        showModal(false)
    }

  return (
    <div id="myModal" className="modal" >
  <ToastContainer 
        autoClose={2000} position="top-center" className='toast'/>
        <div className='modal-content'>
             <div className='modal-heading'>
                 <p>Add Job</p>
                 <MdOutlineClose onClick={closeModal} className='close-icon'/>
             </div>
            <div className='all-forms-container'>
           
             <form className='form'>
                 <label>Role</label>
                 <input type='text' placeholder="Position" value={position} name='position' onChange={(e)=>  handleChange(e)}/>
             </form>
             <form className='form'>
                 <label>Company</label>
                 <input type='text' placeholder="Company" name='company' value={company} onChange={(e)=>  handleChange(e)}/>
             </form>
             <form className='form'>
                 <label>Job Location</label>
                 <input type='text' placeholder="Location" name='location' value={location} onChange={(e)=>  handleChange(e)}/>
             </form>
             <form className='form'>
                 <label>Status</label>
                 <select name='status' value={status}  onChange={(e) =>  handleChange(e)}>
                     <option value='Pending'>pending</option>
                     <option value='Declined'>declined</option>
                     <option value= 'Accepted'>accepted</option>
                 </select>
             </form>
             <form className='form'>
                 <label>Job Type</label>
                 <select value={jobType} name='jobType' onChange={(e)=>  handleChange(e)}>
                     <option value="Full-time">Full time</option>
                     <option value="part-time">Part-time</option>
                     <option value="Freelance">Freelance</option>
                 </select>
             </form>
             <div className='add-application-btn-container'>
                 <button className='clear-form' onClick={()=> dispatch({type:'clear'})}>clear</button>
                 <button className='update-form' onClick={handleSubmit}> {submitAction?"submiting...":"Submit"}</button>
             </div>
             </div>
             
        </div>
    </div>
  )
}

export default AddApplication
