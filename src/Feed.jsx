import React, { useEffect } from 'react'
import BASE_URL from './constants'
import { addFeed } from './utils/feedSlice'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from './UserCard'

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      // agar already data hai toh dobara fetch mat karo
      if (feed?.length > 0) return;

      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;

  if (feed.length === 0) {
    return <h1 className="flex justify-center">No new Users Found!</h1>;
  }

  return (
    <div>
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
