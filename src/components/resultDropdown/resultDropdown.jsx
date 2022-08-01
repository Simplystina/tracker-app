import './resultDropdown.css'
import { RiPencilLine} from "react-icons/ri";
import {HiOutlineTrash} from "react-icons/hi";
import { deleteDocument } from '../../Services/connectApi';
import {ToastContainer } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux';
import { deleteJob, setEditJob } from '../../features/job/jobSlice';

const ResultDropdown =({ _id,editJobId,position,company,jobLocation,jobType,status,showModal,})=>{
   
    const dispatch = useDispatch()

    const editDetails = ()=>{
      console.log(showModal, "show modal", "modalllllll")
       showModal(true)
       dispatch(
        setEditJob({
          editJobId: _id,
          position,
          company,
          jobLocation,
          jobType,
          status,
        })
      )
    }

    return(
        <div className="result_dropdown">
            <ToastContainer 
        autoClose={2000} position="top-center"/>
        <p onClick={editDetails} className="result_dropdown_paragraph"> <RiPencilLine className='dropdown_icon' /> Edit</p>
        <p onClick={() => dispatch(deleteJob(_id))} className="result_dropdown_paragraph result_dropdown_paragraph--delete"> <HiOutlineTrash className='dropdown_icon'/>Delete</p>
    </div>
    )
}

export default ResultDropdown