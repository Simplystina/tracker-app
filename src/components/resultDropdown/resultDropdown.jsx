import './resultDropdown.css'
import { RiPencilLine} from "react-icons/ri";
import {HiOutlineTrash} from "react-icons/hi";
import { deleteDocument } from '../../Services/connectApi';
import {ToastContainer } from 'react-toastify'

const ResultDropdown =({id})=>{
    const handleDelete = async() =>{
        try{
            await   deleteDocument('627ba4875a25e3bc71d9',id)
        }catch(err){
        }
     


    }

    return(
        <div className="result_dropdown">
            <ToastContainer 
        autoClose={2000} position="top-center"/>
        <p className="result_dropdown_paragraph"> <RiPencilLine className='dropdown_icon'/> Edit</p>
        <p onClick={()=>handleDelete()} className="result_dropdown_paragraph result_dropdown_paragraph--delete"> <HiOutlineTrash className='dropdown_icon'/>Delete</p>
    </div>
    )
}

export default ResultDropdown