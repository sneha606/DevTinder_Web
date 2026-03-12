import React from 'react'
import { Link, Navigate } from 'react-router'
import {useDispatch, useSelector} from "react-redux"
import axios from 'axios'
import BASE_URL from './constants'
import { removeUser } from './utils/userSlice'
import { useNavigate } from 'react-router'

const NavBar = () => {
 
  const dispatch= useDispatch();
  const navigate= useNavigate()
  const handleLogout=async()=>{
  await axios.post(BASE_URL + "/logout",{},{withCredentials:true});
  dispatch(removeUser())
   return navigate("/login")
  }
  const user= useSelector((store)=>store.user)
  return (
    <div>
           <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/feed" className="btn btn-ghost text-xl" > 👩🏾‍💻 
      DevTinder </Link>
  </div>
  <div className="flex gap-2">
    
     {user && <div className="dropdown dropdown-end flex "> Welcome,{user.firstName}
      {/* <p>Welcome, {user.firstName}</p> */}
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-5">
       <div className="w-10 rounded-full ">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoURL} />
        </div>

      </div>
      
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><Link to="/requests">Requests</Link></li>
         <li><Link to="/premium">Premium 🥨</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
    }
  </div>
</div>
    </div>
  )
}

export default NavBar
