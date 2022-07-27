import React, { useContext, useReducer } from 'react'
import { UserContext } from '../../context/user/userContext'
import {updateEmail, updateName, updatePassword } from '../../Services/connectApi'
import './ProfileUpdate.css'
import {toast, ToastContainer} from 'react-toastify'


const intialState = {
  name:'',
  email: '',
  password:'',
  oldPassword:''
}


const reducer = (state=intialState,action={}) => {
  const {type,payload} = action
  switch (type) {
      case 'name':
          return {...state,name:payload}
      case 'email':
          return {...state,email:payload}
          
      case 'password':
          return {...state,password: payload}
      case 'oldPassword':
          return {...state,oldPassword: payload}
      case 'clear':
          return {...intialState}
      default:
          return state
  }
}


const ProfileUpdate = () => {
  const [state,dispatch] =useReducer(reducer,intialState)
  const {user} = useContext(UserContext)
  const {name,email,password,oldPassword} = state

 
  const handleOnChange = (e) => {
      dispatch({
          type:e.target.name,
          payload:e.target.value
      })
  }

  const handleSumbit = async (e) => {
    e.preventDefault()
   if(!(name|| email||password || oldPassword)) return toast.error('please enter the details of at leat one field');//error out if no field is provided



    try{
      if (name) await updateName(name) //update name
      if (email) {
        if(!(email && oldPassword)) return toast.warning('please enter your current password') //warn if no password is provided for email update
        await updateEmail(email,oldPassword) //update email
      }
      if (password){ 
        if(!(password && oldPassword)) return toast.warning('please enter your current password') //warn if old password is not provided for password update
        await  updatePassword(password,oldPassword) //update password
      } 
      dispatch({type:'clear'})
      toast.success('Updated successfully')
    }
    catch(e){
      toast.error(e.message)
    }
  }



  return (
   user &&  <div className='profile-container'>
        <ToastContainer 
        autoClose={2000} position="top-center"/>
       <div className='profile-inner-container'>
           <h2 className='profile-heading'>Update Profile</h2>
           <div className='profile-form-container'>
                <form className='update-users-form'>
                    <label>Full Name: {user.name} </label>
                    <input type='text' id='name' name='name' value={name}
                    placeholder='Enter your name' onChange={(e)=> handleOnChange(e)}
                    />
                </form>
            
                <form className='update-users-form'>
                    <label>Email : {user.email}</label>
                    <input type='email' id='email' name='email' value={email}
                    placeholder='Enter your mail' onChange={(e)=> handleOnChange(e)}
                    />
                </form>
                <form className='update-users-form'>
                    <label>New Password</label>
                    <input id='password' name='password' type='password' value={password}
                    placeholder='Create password' autoComplete='new password' onChange={(e)=> handleOnChange(e)}
                    />
                </form>
                <form className='update-users-form'>
                    <label>Current Password</label>
                    <input id='oldpassword' name='oldPassword' type='password' value={oldPassword}
                    placeholder='Enter your old password' autoComplete='new password' onChange={(e)=> handleOnChange(e)}
                    />
                </form>
                <button className='btn save-btn' onClick={(e)=>handleSumbit(e)}>save changes</button>
           </div>
       </div>
    </div>
  )
}

export default ProfileUpdate
