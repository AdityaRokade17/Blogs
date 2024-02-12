import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';

const UpdateBlog = () => {
    const { postId } = useParams();
    const [updatepost, setUpdatePost] = useState({ title: "", description: "" });
    const navigate = useNavigate();

    function changeHandler(event) {
        const { name, value } = event.target
        setUpdatePost((prevPost) => ({
            ...prevPost,
            [name]: value
        }))
    }

    const UpdatePost = async (updatepost) => {
        try {

            await axios.put(`http://localhost:4000/api/v1/posts/update/${postId}`, updatepost)

        } catch (error) {
            console.log("err", error)
        }
    }

    function submitHandler(event) {
        event.preventDefault();
        console.log("updated :", updatepost)
        UpdatePost(updatepost);
        navigate("/")

    }

    return (
        <div className='h-screen bg-gray-400 '>
            <div>
                <Header />
            </div>
            <div className='flex gap-5 flex-col items-center justify-center'>
                <form onSubmit={submitHandler}>
                    <div className='bg-gray-300 m-2 w-full flex  flex-col justify-between p-5 rounded-lg'>
                        <div className='flex flex-col'>
                            <label>Title : </label>
                            <input className='border border-slate-900' type='text' name='title' value={updatepost.title} onChange={changeHandler} />
                        </div>
                        <div className='flex flex-col'>
                            <label>Description : </label>
                            <textarea className='border border-slate-900' type='text' name='body' value={updatepost.body} onChange={changeHandler} />
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

export default UpdateBlog;
