import React, {  useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Register.css'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../images/TRACKER.png'
import googleIcon from '../../images/google-icon.png'
import star from '../../images/Stars.png'
import {signInuser, signUpUser, signUpWithGoogle } from '../../Services/connectApi';
import Users from '../../images/Users.png'
import validator from 'validator'
import { registerUser, loginUser } from '../../features/user/userSlice';
import { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';







const Register = () => {
    
    
   
    const navigate= useNavigate()
    const dispatch = useDispatch()

  
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [registeredStatus, setRegisteredStatus] = useState()

 
    const handleOnChange = (e) => {
        if (e.target.name==="name") {
            setName(e.target.value)
        }else if(e.target.name==="password"){
            setPassword(e.target.value)
        }else  if(e.target.name==="email"){
            setEmail(e.target.value)
        }
    }

  
    const submitForm = async (e)=>{
        if (registeredStatus && email && password) {
            if (!validator.isEmail(email)) { toast.warning("Please enter a valid email")}
            if (password.length < 5) {return toast.warning("Password should be upto 8 characters") }
            
            try{

                dispatch(loginUser({email, password }));
                console.log(email, password)
                navigate('/dashboard/overview')
                
            }catch(error){
                toast.error('Invalid credentials')
                console.log(error)
            }
    
        }else if(!registeredStatus && email && password && name){

            if (!validator.isEmail(email)) {toast.warning("Please enter a valid email")}
            if (password.length < 5) { return toast.warning("Password should be upto 8 characters") }

            try{
                dispatch(registerUser({ name, email, password }));
                //toast.success("Registration Successful")
        
            } catch(error){
                console.log(error.response,"erorrrrrr")
                toast.error("Account already exist")
            }
        }else{
            toast.error("Please fill all the fields!")
        }
        
        e.preventDefault()
        
    }
    
        const handleSignUpWithGoogle = async (e)=>{
            e.preventDefault()
           await signUpWithGoogle()
        }

    
  return (
    <>
    <ToastContainer 
        autoClose={2000} position="top-center"/>
     <div className="registration-container" >
        <div className='content1'>
           <img src={logo} alt="logo" className='logo'/>
           <h2 className='registration-signup'>{registeredStatus? "Sign in" : "Sign up"}</h2>
          {!registeredStatus &&
             <form className='registration-form'>
                <label>Full Name</label>
                <input type='text' id='name' name='name' value={name}
                placeholder='Enter your name'
                onChange={(e)=> handleOnChange(e)}
                />
            </form>
            }
            <form className='registration-form'>
                <label>Email</label>
                <input type='email' id='email' name='email' value={email}
                placeholder='Enter your mail'
                onChange={(e)=> handleOnChange(e)}
                />
            </form>
            <form className='registration-form'>
                <label>Password</label>
                <input id='password' name='password' type='password' value={password}
                placeholder='Create password' autoComplete='new password'
                onChange={(e)=> handleOnChange(e)}
                />
            </form>
            <button onClick={(e)=> submitForm(e)} className='btn submit-btn'>submit</button>
            <button className='btn googleSignin'  onClick={(e)=> {handleSignUpWithGoogle(e)}}> <img className='google-icon' src={googleIcon} alt='google icon'/> {registeredStatus? "signin with google": "sign up with google" } 
            </button>
            <p className='reg-status'>{registeredStatus?"Don't have an account?" :'Already have an account?'} <span onClick={()=> setRegisteredStatus(!registeredStatus)}>{registeredStatus?'Sign up' :'Sign in'}</span></p>
        </div>
        <div className='content2'>
            <img src={star} alt='star'/>
            <h2>Easily keep track of all jobs applications</h2>
            <p>Create an account to save your jobs applications and easily get notified to apply to them. Never miss a job or interview!</p>
            <div className='users'>
                <img src={Users} alt='user images'/>
                <p>Join 1,000+ users</p>
            </div>
        </div>
    </div>
    </>
  )}


export default Register
