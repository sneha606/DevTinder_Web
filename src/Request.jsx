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
  if (requests.length === 0) return <h1 className='text-center mt-20 text-2xl'>No Requests found</h1>

  return (
    <div  className="flex justify-center flex-col text-center mb-30">
      <h1 className='font-bold text-2xl my-6'>Requests</h1>

      {requests.map((requests, index) => {
        const { firstName, lastName, age, gender, skills, photoURL, about } = requests.fromUserId;

        return (
          <div className="flex justify-center">
  <div className="flex items-center bg-base-300 rounded-2xl shadow-md p-6 w-2/3 mb-6">

    {/* Profile Image */}
    <div className="flex-shrink-0">
      <img
        src={photoURL}
        alt="profile"
        className="w-28 h-28 object-cover rounded-full border-4 border-base-100"
      />
    </div>

    {/* User Info */}
    <div className="flex-1 mx-8">
      <h2 className="text-xl font-bold">
        {firstName} {lastName}
      </h2>

      {age && gender && (
        <p className="text-sm text-gray-500 mt-1">
          {age}, {gender}
        </p>
      )}

      <p className="mt-3 text-sm">{about}</p>

      {skills && (
        <p className="mt-2 text-sm text-gray-600">
          <span className="font-semibold">Skills:</span> {skills.join(", ")}
        </p>
      )}
    </div>

    {/* Buttons */}
    <div className="flex flex-col gap-3">
      <button
        onClick={() => reviewRequests("accepted", requests._id)}
        className="btn btn-success btn-sm"
      >
        Accept
      </button>

      <button
        onClick={() => reviewRequests("rejected", requests._id)}
        className="btn btn-error btn-sm"
      >
        Reject
      </button>
    </div>

  </div>
</div>
        
        )
      })}

    </div>
  )
}

export default Request
