import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import EditProfile from './EditProfile'
import UserCard from './UserCard'

const Profile = () => {
  const user = useSelector((store)=> store.user)

  const [editedUser, setEditedUser] = useState(user)

  return (
    user &&
    <div className='flex justify-center gap-20'>
      <EditProfile user={editedUser} setEditedUser={setEditedUser}/>
      <UserCard user={editedUser}/>
    </div>
  )
}

export default Profile

