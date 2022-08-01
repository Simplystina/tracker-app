import React,{useState, useEffect} from 'react'
import './AddApplicationForm.css'
import {toast, ToastContainer} from 'react-toastify'
import {MdOutlineClose} from 'react-icons/md'
import { createApplication } from '../Services/connectApi'
import { useSelector, useDispatch } from 'react-redux';
import {
  handleChange,
  clearValues,
  createJob,
  editJob,
} from '../features/job/jobSlice';



  
  const AddApplication = ({showModal}) => {

    const {
      isLoading,
      position,
      company,
      jobLocation,
      jobType,
      jobTypeOptions,
      status,
      statusOptions,
      isEditing,
      editJobId,
      jobCreatedStatus,
      jobEditedStatus
    } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.user);

    const dispatch =  useDispatch()
    
    const handleJobInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      dispatch(handleChange({ name, value }));
    };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error('Please fill out all fields');
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      );
      
      setTimeout(() => {
                          return showModal(false);
                        }, 3000);
       
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
    
    
    setTimeout(() => {
                          return showModal(false);
                        }, 3000);
    
  };

    
    const closeModal = ()=>{
        showModal(false)
    }

    useEffect(() => {
      if (!isEditing) {
        dispatch(
          handleChange({
            name: 'jobLocation',
            value: user.location,
          })
        );
      }
    }, []);
  return (
    <div id="myModal" className="modal" >
  <ToastContainer 
        autoClose={2000} position="top-center" className='toast'/>
        <div className='modal-content'>
             <div className='modal-heading'>
                 <p>{isEditing ? 'Edit job' : 'Add job'}</p>
                 <MdOutlineClose onClick={closeModal} className='close-icon'/>
             </div>
            <div className='all-forms-container'>
           
             <form className='form'>
                 <label>Position</label>
                 <input type='text' placeholder="Position" value={position} name='position' onChange={handleJobInput}/>
             </form>
             <form className='form'>
                 <label>Company</label>
                 <input type='text' placeholder="Company" name='company' value={company} onChange={handleJobInput}/>
             </form>
             <form className='form'>
                 <label>Job Location</label>
                 <input type='text' placeholder="Location" name='jobLocation' value={jobLocation} onChange={handleJobInput}/>
             </form>
             <form className='form'>
                 <label>Status</label>
                 <select name='status' value={status}  onChange={handleJobInput}>
                     <option value='Pending'>pending</option>
                     <option value='Declined'>declined</option>
                     <option value= 'Accepted'>accepted</option>
                 </select>
             </form>
             <form className='form'>
                 <label>Job Type</label>
                 <select value={jobType} name='jobType' onChange={handleJobInput}>
                     <option value="full-time">full-time</option>
                     <option value="part-time">part-time</option>
                     <option value="remote">remote</option>
                     <option value="internship">internship</option>
                 </select>
             </form>
             <div className='add-application-btn-container'>
                 <button className='clear-form' onClick={() => dispatch(clearValues())}>clear</button>
                 <button className='update-form' onClick={handleSubmit} disabled={isLoading}> {isLoading?"submiting...":"Submit"}</button>
             </div>
             </div>
             
        </div>
    </div>
  )
}

export default AddApplication
