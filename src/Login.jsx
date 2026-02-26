import React, { useState } from 'react'
import axios  from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';
import { useNavigate } from 'react-router';
import BASE_URL from './constants';

const Login = () => {
  const [emailId,setEmailId]=useState("");
  const [password,setPassword]=useState("");
  const [firstName,setFirstName]=useState("");
  const [lastName, setLastName]= useState("");
  const[isLogin, setIsLogin]=useState(true);
  const[error,setError]=useState("")
  const dispatch= useDispatch()
  const navigate= useNavigate()
   
  const handleLogin=async ()=>{
 try{
    const res= await axios.post( BASE_URL+ "/login",{
      emailId,
      password
    },{withCredentials:true});
    console.log(res.data)
    dispatch(addUser(res.data))
    navigate("/Feed")
 }catch(err){
  setError(err.message)
  console.log(err)
 }
  }

  const handleSignup=async()=>{
    try{
      const res= await axios.post(BASE_URL+ "/signup",{firstName,lastName,emailId,password},{withCredentials:true})
      dispatch(addUser(res.data.data))
     return  navigate("/profile")
    }
    catch(err){
      console.log(err.message)
    }
  }

  return (
    <div className='justify-center items-center flex mt-25 mb-25'>
      <div className="card bg-base-300 w-96 shadow-2xl  ">
  <div className="card-body">
    <h2 className="card-title justify-center text-2xl font-semibold">{isLogin?"Login":"Sign Up"}</h2>
     {!isLogin && <><fieldset className="fieldset">
  <legend className="fieldset-legend">First Name</legend>
  <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="input"  />
  
 
</fieldset>
 <fieldset className="fieldset">
  <legend className="fieldset-legend">Last Name</legend>
  <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="input"  />
  
 
</fieldset></>}
    <fieldset className="fieldset">
  <legend className="fieldset-legend">Email Address</legend>
  <input type="text" value={emailId} onChange={(e)=>setEmailId(e.target.value)} className="input"  />
  
 
</fieldset>
 <fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
  <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} className="input"  />
 
</fieldset>
<p className='text-red-600'>{error}</p>
    <div className="card-actions justify-center mt-3 mb-4">
      <button onClick={ isLogin? handleLogin: handleSignup} className="btn btn-primary ">{isLogin?"Login":"Sign Up"}</button>
    </div>
          <p className='text-center my-1 cursor-pointer' onClick={()=>setIsLogin((value)=>!value)}>{isLogin? "New User? SignUp Here": "Existing User? Login Here"}</p>

  </div>
</div>
    </div>
  )
}

export default Login



