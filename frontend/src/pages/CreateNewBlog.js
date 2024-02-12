import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';

const CreateNewBlog = () => {

  const [newpost , setNewPost] = useState({title : "" , description : "" });
  const navigate = useNavigate();
  
  function changeHandler(event) {
    const { name , value } = event.target
    setNewPost( (prevNewPost) => ({
      ...prevNewPost,
      [name] : value
    }))
    
  }

  const createNewPost = async (newpost) => {
    try{
      
      await axios.post("http://localhost:4000/api/v1/posts/create" , newpost)

    }catch(error){
      console.log("err", error)
    }
  }

  function submitHandler(event) {
    event.preventDefault();
    console.log("newpost :" ,newpost)
    createNewPost(newpost);
    navigate("/")

  }
  return (
    <div className='h-screen bg-gray-400 '>
      <div>
        <Header/>
      </div>
      <div className='flex gap-5 flex-col items-center justify-center'>
        <form onSubmit={submitHandler}>
        <div className='bg-gray-300 m-2 w-full flex  flex-col justify-between p-5 rounded-lg'>
            <div className='flex flex-col'>
              <label>Title : </label>
              <input className='border border-slate-900' type='text' name='title' value={newpost.title} onChange={changeHandler}/>
            </div>
            <div className='flex flex-col'>
              <label>Description : </label>
              <textarea className='border border-slate-900' type='text' name='body' value={newpost.body} onChange={changeHandler}/>
            </div>
            <div className='text-white flex justify-center m-5 '>
              <button className='bg-slate-900 p-2 rounded-lg' type='submit'>Submit</button>
            </div>
        </div>
          
            
        </form>
      </div>  
    </div>
  )
}

export default CreateNewBlog