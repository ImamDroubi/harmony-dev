import React, { useState } from 'react'
import "./user-side.scss";
import person1 from "../../../assets/images/person1.jpg";
import ButtonStrong from '../../buttons/button-strong/ButtonStrong';
import { useMutation } from '@tanstack/react-query';
import { toggleUserFollow } from '../../../apiCalls/users';
export default function UserSide({user}) {
  const [isFollowed,setIsFollowed] = useState(user?.isFollowed);
  const [followersCount,setFollowersCount] = useState(user?.followersCount || 0);
  const followTask = useMutation({
    mutationFn : ()=>toggleUserFollow(user?.id),
    onError : ()=>{
      setIsFollowed(prev=>!prev);
    },
  })
  const handleFollow = ()=>{
    if(isFollowed){
      setFollowersCount(prev=>prev-1);
    }else{
      setFollowersCount(prev=>prev+1);
    }
    setIsFollowed(prev=>!prev);
    followTask.mutate();
  }
  return (
    <div className='user-side'>
      <div className="info">
        <div className="picture">
          <img src={user?.profilePicture || person1} />
        </div>
        <div className="details">
          <h2 className='name'>{user?.username}</h2>
          <p className='followers'>{followersCount} followers</p>
          <button onClick={handleFollow} className='button-strong'>{isFollowed?"Unfollow" : "Follow"}</button>
        </div>
      </div>
    </div>
  )
}
