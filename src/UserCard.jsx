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
    <div className=' flex justify-center my-5 items-center'>
    <div >
      <div className="card bg-black w-96 my-10 shadow-sm">
  <figure>
    <img
      src={photoURL}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    { age && gender &&  <p>{ age + "," + gender }</p>}
    <p>{about}</p>
    <div className="card-actions justify-end">
      <button onClick={()=>handleSendRequest("interested",_id)} className="btn btn-primary">Interested</button>
        <button onClick={()=>handleSendRequest("ignored",_id)} className="btn btn-primary">Ignored</button>
    </div>
  </div>
</div>
    </div>
    </div>
  )
}

export default UserCard


