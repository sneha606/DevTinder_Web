import React from 'react'
import BASE_URL from './constants'
import axios from 'axios'
import { addUser } from './utils/userSlice'
import { useDispatch } from 'react-redux'

const EditProfile = ({ user, setEditedUser }) => {

  const handleChange = (field, value) => {

    setEditedUser({
      ...user,
      [field]: value
    })
  }
const dispatch= useDispatch()
 const saveProfile = async () => {

  try {

    const updatedData = {
      firstName: user.firstName,
      lastName: user.lastName,
      about: user.about,
      skills: user.skills,
      age: user.age,
      gender: user.gender,
      photoURL: user.photoURL
    }

    const res = await axios.patch(
       BASE_URL+ "/profile/edit",
      updatedData,
      { withCredentials: true }
    )

    dispatch(addUser(res.data.data))

    alert("Profile Updated Successfully")
    console.log(user)

  } catch (err) {
    console.log(err.response?.data)
  }
}


  return (
    <div className='justify-center items-center flex mt-25 mb-25'>
      <div className="card bg-base-300 w-96 shadow-2xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-semibold">
            Edit Profile
          </h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              value={user.firstName || ""}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="input"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              value={user.lastName || ""}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="input"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="text"
              value={user.age || ""}
              onChange={(e) => handleChange("age", e.target.value)}
              className="input"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <input
              type="text"
              value={user.gender || ""}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="input"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <input
              type="text"
              value={user.about || ""}
              onChange={(e) => handleChange("about", e.target.value)}
              className="input"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Skills</legend>
            <input
              type="text"
              value={user.skills || ""}
              onChange={(e) => handleChange("skills", e.target.value)}
              className="input"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Photo URL</legend>
            <input
              type="text"
              value={user.photoURL || ""}
              onChange={(e) => handleChange("photoURL", e.target.value)}
              className="input"
            />
          </fieldset>

          <div className="card-actions justify-center mt-3 mb-4">
            <button onClick={saveProfile} className="btn btn-primary">Save Profile</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile

