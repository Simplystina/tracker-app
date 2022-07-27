import React, { useState } from 'react'
import './FeedsContent.css'
import {AiOutlinePicture} from 'react-icons/ai'
import {FaPaperPlane} from 'react-icons/fa'
import './NewPost'
import NewPost from './NewPost'
import FeedsBox from './FeedsBox'









const FeedsContent = () => {
  const [post, setmessage] = useState('')

  const handleOnChange = (e) => {
      setmessage(e.target.value)
  }

  // const handleSubmit = (e) => {
  //    e.preventDefault()

   
  // }


  console.log(post)
  return (
    <div className='feeds-container'>
      <div className='feed-post-content'>
        <form className='feeds-form'>
            <input type='text' id='experience' name='experience' 
             placeholder='Share your experience........' onChange={(e)=> handleOnChange(e)} value={post}
            />
            <div className='feeds-icons-container'>
              <AiOutlinePicture className='feed-icon'/>
              <FaPaperPlane className='feed-icon'/>
            </div>
        </form>
        <div className='allpost-container'>      
          <NewPost/>
          <NewPost/>
          <NewPost/>
          <NewPost/>
        </div>  
      </div>
      <FeedsBox/>
      
    </div>
  )
}

export default FeedsContent
