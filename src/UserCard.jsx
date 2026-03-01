import axios from 'axios'
import React from 'react'
import BASE_URL from './constants'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from './utils/feedSlice'

const UserCard = ({user}) => {
  const dispatch= useDispatch()
  const handleSendRequest=async(status,userId)=>{
    try{
    const res= await axios.post(BASE_URL+ "/request/send/" + status + "/" + userId,{},{withCredentials:true})
    dispatch(removeUserFromFeed(userId))
    }catch(err){
      console.log(err.message)
    }
  }
      if (!user) return null;
    

    const { _id, firstName, lastName, age, gender , photoURL, about}= user;
  return (
   <div className="flex justify-center items-center my-10">
  <div className="card bg-base-200 w-96 shadow-xl rounded-3xl hover:shadow-2xl transition-shadow duration-300">
    
    {/* Image */}
    <figure className="px-6 pt-6">
      <img
        src={photoURL}
        alt="profile"
       className="rounded-2xl h-64 w-full object-contain bg-black"
      />
    </figure>

    {/* Body */}
    <div className="card-body">
      <h2 className="card-title text-2xl font-bold">
        {firstName} {lastName}
      </h2>

      {age && gender && (
        <p className="text-sm text-gray-500">
          {age}, {gender}
        </p>
      )}

      <p className="text-sm mt-2 text-gray-700 line-clamp-3">
        {about}
      </p>

      {/* Buttons */}
      <div className="card-actions justify-between mt-6">
        <button
          onClick={() => handleSendRequest("ignored", _id)}
          className="btn btn-outline btn-error w-32"
        >
          Ignore
        </button>

        <button
          onClick={() => handleSendRequest("interested", _id)}
          className="btn btn-primary w-32"
        >
          Interested
        </button>
      </div>
    </div>

  </div>
</div>
  )
}

export default UserCard


