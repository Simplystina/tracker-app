import React, { useState } from 'react'
import { UserContext } from '../../context/user/userContext'
import {updateEmail, updateName, updatePassword } from '../../Services/connectApi'
import './ProfileUpdate.css'
import {toast, ToastContainer} from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../features/user/userSlice';



const ProfileUpdate = () => {
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  });
 
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, lastName, location } = userData;
    if (!name || !email || !lastName || !location) {
      toast.error('please fill out all fields');
      return;
    }
    dispatch(updateUser(userData));
  };

  
     
  return (
   user &&  <div className='profile-container'>
        <ToastContainer 
        autoClose={2000} position="top-center"/>
       <div className='profile-inner-container'>
           <h2 className='profile-heading'>Update Profile</h2>
           <div className='profile-form-container'>
                <form className='update-users-form'>
                    <label>first Name</label>
                    <input type='text' id='name' name='name' value={userData.name}
                    placeholder='Enter your name' onChange={(e)=> handleOnChange(e)}
                    />
                </form>
                <form className='update-users-form'>
                    <label>last Name</label>
                    <input type='text' id='lastName' name='lastName' value={userData.lastName}
                    placeholder='Enter your name' onChange={(e)=> handleOnChange(e)}
                    />
                </form>
                <form className='update-users-form'>
                    <label>Email </label>
                    <input type='email' id='email' name='email' value={userData.email}
                    placeholder='Enter your mail' onChange={(e)=> handleOnChange(e)}
                    />
                </form>
                <form className='update-users-form'>
                    <label>Location</label>
                    <input id='location' name='location' type='location' value={userData.location}
                    placeholder='Enter your old password' autoComplete='new password' onChange={(e)=> handleOnChange(e)}
                    />
                </form>
                <button className='btn save-btn' onClick={(e)=>handleSubmit(e)}>save changes</button>
           </div>
       </div>
    </div>
  )
}

export default ProfileUpdate
