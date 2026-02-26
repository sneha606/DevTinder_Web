import axios from 'axios'
import React, { useEffect } from 'react'
import BASE_URL from './constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from './utils/requestsSlice'

const Request = () => {
    const dispatch= useDispatch()
    const requests= useSelector((store)=>store.requests)
    const reviewRequests= async(status, _id)=>{
        const res= await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,{},{withCredentials:true})
        dispatch(removeRequest(_id))
    }
    const fetchRequests= async ()=>{
        try{
     const res= await axios.get(BASE_URL + "/user/requests/received",{withCredentials:true})
      dispatch(addRequests(res.data.data))
        }
        catch(err){
            console.log(err.message)
        }
    }

    useEffect(()=>{
         fetchRequests()
    },[])
 if (!requests) return null;
  if (requests.length === 0) return <h1>No Requests found</h1>

  return (
    <div  className="flex justify-center flex-col text-center mb-30">
      <h1 className='font-bold text-2xl my-6'>Requests</h1>

      {requests.map((requests, index) => {
        const { firstName, lastName, age, gender, skills, photoURL, about } = requests.fromUserId;

        return (
            <div className='flex justify-center'>
          <div className='flex flex-row bg-base-300 text-left mb-96 w-1/2 ' key={index}>
            <div>
              <img src={photoURL} />
            </div>
            <div className='ml-40 my-5'>
              <h1 className='text-xl font-bold my-2'>{firstName + " " + lastName}</h1>
             {age && gender && <p className='my-2'>{age}, {gender}</p> } 
              <p>{about}</p>
              <p>{skills}</p>
            </div>
            <div className='flex justify-center items-center mx-6' >
            <button onClick={()=> reviewRequests("accepted",requests._id)} className="btn btn-soft btn-primary mx-3">Accept</button>
          <button onClick={()=> reviewRequests("rejected",requests._id)} className="btn btn-soft btn-secondary mx-3">Reject</button>
          </div>
          </div>
           
          </div>
        
        )
      })}

    </div>
  )
}

export default Request
