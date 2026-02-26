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
  if (connections.length === 0) return <h1>No connection found</h1>

  return (
    <div className="flex justify-center flex-col text-center">
      <h1 className='font-bold text-2xl my-6'>Connections</h1>

      {connections.map((connection, index) => {
        const { _id, firstName, lastName, age, gender, skills, photoURL, about } = connection;

        return (
            <div className='flex justify-center'>
          <div className='flex flex-row bg-base-300 text-left mb-6 w-1/2 ' key={_id}>
            <div>
              <img src={photoURL} />
            </div>
            <div className='ml-40 my-5'>
              <h1 className='text-xl font-bold my-2'>{firstName + " " + lastName}</h1>
             {age && gender && <p className='my-2'>{age}, {gender}</p> } 
              <p>{about}</p>
              <p>{skills}</p>
            </div>
          </div>
          </div>
        )
      })}

    </div>
  )
}

export default ConnectionRequest

