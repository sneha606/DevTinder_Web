import axios from 'axios'
import React, { useEffect } from 'react'
import BASE_URL from './constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from './utils/connectionSlice'

const ConnectionRequest = () => {
  const dispatch = useDispatch()
  const connections = useSelector((store) => store.connection)

  const fetchConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true
    })
    dispatch(addConnection(res.data.data))
  }

  useEffect(() => {
    fetchConnections()
  }, [])

  if (!connections) return null;
  if (connections.length === 0) return <h1 className='text-center mt-20 text-2xl '>No connections found</h1>

  return (
  <div className="flex flex-col items-center min-h-screen py-10">
  <h1 className="font-bold text-3xl mb-10">Connections</h1>

  {connections.map((connection) => {
    const { _id, firstName, lastName, age, gender, skills, photoURL, about } = connection;

    return (
      <div
        key={_id}
        className="flex items-center bg-base-300 rounded-2xl shadow-md p-6 w-2/3 mb-6"
      >
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

          <p className="mt-3 text-sm text-gray-400">{about}</p>

          {skills && skills.length > 0 && (
            <p className="mt-2 text-sm text-gray-400">
              <span className="font-semibold">Skills:</span>{" "}
              {skills.filter(skill => skill).join(", ")}
            </p>
          )}
        </div>
      </div>
    );
  })}
</div>
  )
}

export default ConnectionRequest

