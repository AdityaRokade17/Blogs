import React, { useEffect, useState } from 'react';
import axios from "axios";
import Header from '../components/Header';
import { IoAdd } from "react-icons/io5";
import { FaRegThumbsUp} from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import {Link} from 'react-router-dom'

const Blogs = () => {
  const [blogsdata, setBlogsData] = useState(); 
  const [commentData, setCommentData] = useState({});

  // const [liked ,setLiked] = useState(false);

  const commentHandler = async (postId) => {
    const commentText = commentData[postId] || "";
    console.log("Comment for post", postId, ":", commentText);
    
    try {
      await axios.post("http://localhost:4000/api/v1/comments/create", { post :postId, body: commentText , user : "aditya"});
      getAllBlogs();
      setCommentData(prevCommentData => ({
        ...prevCommentData,
        [postId]: '' // Clear the input field after submitting the comment
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentChange = (postId, event) => {
    const { value } = event.target;
    setCommentData(prevCommentData => ({
      ...prevCommentData,
      [postId]: value
    }));
  };

  const likeHandler = async (id , likes) => {
    try{  
      //console.log(likes[0]._id);
      //await axios.post("http://localhost:4000/api/v1/likes/like",{post : id , user : "aditya" } )
      //getAllBlogs();
      if(likes.length < 1){
        await axios.post("http://localhost:4000/api/v1/likes/like",{post : id , user : "aditya" } )
        console.log("liked")
      }else{
        await axios.post("http://localhost:4000/api/v1/likes/unlike",{post : id , like : likes[0]._id } )
        console.log("disliked")
      }

      getAllBlogs();
    }catch(error){
      console.log(error);
    }
  }

  const dislikeHandler = async (id , likes) => {
    if(likes.length > 0){
      await axios.post("http://localhost:4000/api/v1/likes/unlike",{post : id , like : likes[0]._id } )
      console.log("disliked")
    }
    getAllBlogs()
  }
  const getAllBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/posts");
      setBlogsData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("Error fetching blogs:", error);
    }
  };

  const deleteHandler = async (id) => {
    try{
      console.log(id)
      const res =await axios.delete(`http://localhost:4000/api/v1/posts/delete/${id}`);
      console.log(res);

    }catch(error){
      console.log(error)
    }

    getAllBlogs();
  }
 
  useEffect(() => {
    getAllBlogs();
  },[]);

  return (
    <div className='bg-slate-500'>
      <Header />
      <div className='bg-gray-400 h-full flex gap-5 flex-col items-center'>
        {blogsdata?.posts.map((blog) => (
          <div key={blog._id} className=' bg-gray-300 m-2 h-1/2 w-1/2 flex flex-col justify-between p-5 rounded-lg'>
            
            
            <div className='bg-gray-400 p-1 rounded-xl relative'>
            <Link to={`/update/${blog._id}`} className='absolute flex justify-end w-full -top-3'><CiEdit className='bg-slate-900 text-white h-[30px] w-[30px] p-1 rounded-full' /></Link>
              <h1> <span className='font-semibold'>Title : </span> {blog.title}</h1>
              <h1><span className='font-semibold'>Description : </span> {blog.body}</h1>
            </div>
            <div className='mt-2'>
              <div className='flex flex-col gap-2 bg-gray-400 p-1 rounded-xl'>
                <h1 className='font-semibold'>Comments</h1>
                <div className='flex gap-2'>
                  <input
                    className='border border-slate-300 rounded-lg p-1'
                    placeholder=' Add a Comment..'
                    value={commentData[blog._id]}
                    name='comment'
                    onChange={(e) => handleCommentChange(blog._id, e)}
                  />
                  <button
                    className='bg-slate-900 text-white p-2 rounded-full'
                    onClick={() => commentHandler(blog._id)}
                  >
                    <IoAdd />
                  </button>
                </div>
                <div>
                  {blog.comments && blog.comments.length > 0 ? (
                    blog.comments.map((comment, index) => (
                      <div key={index}>
                        <p>{comment.body} <span className='text-xs'><i>~{comment.user}</i></span></p>
                        <hr className='w-1/2'/>
                      </div>
                    ))
                  ) : (
                    <p>No comments yet.</p>
                  )}
                </div>
              </div>
            </div>
            <div className='flex gap-5 text-white m-2'>
              <div onClick={() => likeHandler( blog._id , blog.likes)} className='bg-slate-800 p-1 rounded-md cursor-pointer flex items-center gap-1'><span>{blog.likes.length}</span><span><FaRegThumbsUp /></span></div>
              <div onClick={ () => dislikeHandler(blog._id , blog.likes)} className='bg-slate-800 p-1 rounded-md cursor-pointer flex items-center gap-1'>Dislike</div>
              <div onClick={ () => deleteHandler(blog._id)} className='bg-red-800 p-1 rounded-md cursor-pointer flex items-center gap-1'>Delete</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
