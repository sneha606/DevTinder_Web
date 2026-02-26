import React, { useEffect } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Navigate, Outlet, useNavigate } from 'react-router'
import axios from 'axios'
import BASE_URL from './constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './utils/userSlice'
const Body = () => {
const dispatch= useDispatch();
const Navigate= useNavigate()
const userData= useSelector((store)=>store.user)
  const fetchUser=async()=>{
    try{
    const res= await axios.get(BASE_URL +"/profile/view",{
       withCredentials:true
    });
    dispatch(addUser(res.data));
    }catch(err){
      if(err.status===401){
        Navigate("/login")
      }
      console.log(err);
    }
  }

  useEffect(()=>{
if(!userData){
  fetchUser()
}
  },[])
  return (

    <div>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body;
