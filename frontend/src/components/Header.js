import React from 'react'
import {Link , useLocation, useParams} from 'react-router-dom'
const Header = () => {
    const location = useLocation();
    const { postId } = useParams();
  return (
    <div>
        <div className='nav text-white bg-slate-900 h-[4rem] flex justify-between items-center'>
            <div className='m-5'>Blogs</div>
            <div className='flex gap-10 m-10'>
            {location.pathname === '/createnew' ? (
                <Link to={"/"} className='bg-slate-500 p-2 rounded-xl'>Back</Link>
            ) : location.pathname === `/update/${postId}` ? (
                <Link to={"/"} className='bg-slate-500 p-2 rounded-xl'>Back</Link>
            ) : (
                <Link to={"/createnew"} className='bg-slate-500 p-2 rounded-xl'>Create New</Link>
            )}
                
            </div>
        
        </div>
    </div>
  )
}

export default Header