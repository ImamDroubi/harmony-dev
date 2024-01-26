import React, { useEffect, useState } from 'react'
import "./user-profile.scss";
import UserSide from '../../other/user-side/UserSide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import ContainerWide from '../../containers/container-wide/ContainerWide';
import Toggle from '../../other/toggle/Toggle';
import Combination from '../../cards/combination/Combination';
import Track from '../../cards/track/Track';
import CustomSelect from '../../menus/custom-select/CustomSelect';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPublicUserResource} from '../../../apiCalls/resources';
import { CircularProgress } from '@mui/material';
import { getExtendedUser } from '../../../apiCalls/users';
export default function UserProfile() {
  const {userId} = useParams();
  const [currentResource,setCurrentResource] = useState(false); // false for tracks, true for combinations
  const [currentCategory,setCurrentCategory] = useState();
  const [tracks, setTracks] = useState([]);
  const [categories,setCategories] = useState([]);
  const [combinations,setCombinations] = useState([]);
  const [responseMessage, setResponseMessage] = useState();
  const [user,setUser] = useState();
  // const tracks = [
  //   {
  //     "id" : "abc1234",
  //     "title" : "Ocean",
  //     "sound" : ocean_s,
  //     "img" : ocean,
  //     "volume" : 50,
  //     "repeat" : true,
  //     "mute" : false,
  //     "category" : "Nature",
  //     "duration" : "00:04:23",
  //     "is_public" : true
  //   },
  //   {
  //     "id" : "abc1235",
  //     "title" : "Birds",
  //     "sound" : birds_s,
  //     "img" : birds,
  //     "volume" : 50,
  //     "repeat" : true,
  //     "mute" : false,
  //     "category" : "Animals",
  //     "duration" : "00:00:23",
  //     "is_public" : true
  //   },
  //   {
  //     "id" : "abc1237",
  //     "title" : "Thunder",
  //     "sound" : thunder_s,
  //     "img" : thunder,
  //     "volume" : 10,
  //     "repeat" : true,
  //     "mute" : false,
  //     "category" : "Nature",
  //     "duration" : "12:00:01",
  //     "is_public" : false
  //   },
  //   {
  //     "id" : "abc1236",
  //     "title" : "Campfire",
  //     "sound" : campfire_s,
  //     "img" : campfire,
  //     "volume" : 100,
  //     "category" : "Night",
  //     "repeat" : true,
  //     "mute" : false
  //   },
  //   {
  //     "id" : "abc1238",
  //     "title" : "Waterfall",
  //     "sound" : waterfall_s,
  //     "img" : waterfall,
  //     "volume" : 50,
  //     "category" : "Nature",
  //     "repeat" : true,
  //     "mute" : false
  //   },
  //   {
  //     "id" : "abc1239",
  //     "title" : "Rain",
  //     "sound" : rain_s,
  //     "img" : rain,
  //     "volume" : 10,
  //     "category" : "Nature",
  //     "repeat" : true,
  //     "mute" : false
  //   }
  // ]
  // const combinations = [
  //   {
  //     "id" : "comb1",
  //     "owner_id" : "user1",
  //     "name" : "Bed Time",
  //     "photo" : sleep,
  //     "description" : "Combination for bed time ",
  //     "like_count" : 0,
  //     "is_public" : false,
  //     "category" : "sleep",
  //     'tracks': [
  //       {
  //         "id" : "abc1234",
  //         "title" : "Ocean",
  //         "sound" : ocean_s,
  //         "img" : ocean,
  //         "volume" : 50,
  //         "repeat" : true,
  //         "mute" : false
  //       },
  //       {
  //         "id" : "abc1235",
  //         "title" : "Birds",
  //         "sound" : birds_s,
  //         "img" : birds,
  //         "volume" : 50,
  //         "repeat" : true,
  //         "mute" : false
  //       },
  //       {
  //         "id" : "abc1237",
  //         "title" : "Thunder",
  //         "sound" : thunder_s,
  //         "img" : thunder,
  //         "volume" : 10,
  //         "repeat" : true,
  //         "mute" : false
  //       }
  //     ]
      
  //   },
  //   {
  //     "id" : "comb1",
  //     "owner_id" : "user1",
  //     "name" : "Bed Time",
  //     "photo" : sleep,
  //     "description" : "Combination for bed time ",
  //     "like_count" : 0,
  //     "is_public" : false,
  //     "category" : "sleep",
  //     'tracks': [
  //       {
  //         "id" : "abc1234",
  //         "title" : "Ocean",
  //         "sound" : ocean_s,
  //         "img" : ocean,
  //         "volume" : 50,
  //         "repeat" : true,
  //         "mute" : false
  //       },
  //       {
  //         "id" : "abc1235",
  //         "title" : "Birds",
  //         "sound" : birds_s,
  //         "img" : birds,
  //         "volume" : 50,
  //         "repeat" : true,
  //         "mute" : false
  //       },
  //       {
  //         "id" : "abc1237",
  //         "title" : "Thunder",
  //         "sound" : thunder_s,
  //         "img" : thunder,
  //         "volume" : 10,
  //         "repeat" : true,
  //         "mute" : false
  //       }
  //     ]
      
  //   },
  //   {
  //     "id" : "comb1",
  //     "owner_id" : "user1",
  //     "name" : "Bed Time",
  //     "photo" : sleep,
  //     "description" : "Combination for bed time ",
  //     "like_count" : 0,
  //     "is_public" : false,
  //     "category" : "sleep",
  //     'tracks': [
  //       {
  //         "id" : "abc1234",
  //         "title" : "Ocean",
  //         "sound" : ocean_s,
  //         "img" : ocean,
  //         "volume" : 50,
  //         "repeat" : true,
  //         "mute" : false
  //       },
  //       {
  //         "id" : "abc1235",
  //         "title" : "Birds",
  //         "sound" : birds_s,
  //         "img" : birds,
  //         "volume" : 50,
  //         "repeat" : true,
  //         "mute" : false
  //       },
  //       {
  //         "id" : "abc1237",
  //         "title" : "Thunder",
  //         "sound" : thunder_s,
  //         "img" : thunder,
  //         "volume" : 10,
  //         "repeat" : true,
  //         "mute" : false
  //       }
  //     ]
      
  //   },
  //   {
  //     "id" : "comb1",
  //     "owner_id" : "user1",
  //     "name" : "Bed Time",
  //     "photo" : sleep,
  //     "description" : "Combination for bed time ",
  //     "like_count" : 0,
  //     "is_public" : false,
  //     "category" : "sleep",
  //     'tracks': [
  //       {
  //         "id" : "abc1234",
  //         "title" : "Ocean",
  //         "sound" : ocean_s,
  //         "img" : ocean,
  //         "volume" : 50,
  //         "repeat" : true,
  //         "mute" : false
  //       },
  //       {
  //         "id" : "abc1235",
  //         "title" : "Birds",
  //         "sound" : birds_s,
  //         "img" : birds,
  //         "volume" : 50,
  //         "repeat" : true,
  //         "mute" : false
  //       },
  //       {
  //         "id" : "abc1237",
  //         "title" : "Thunder",
  //         "sound" : thunder_s,
  //         "img" : thunder,
  //         "volume" : 10,
  //         "repeat" : true,
  //         "mute" : false
  //       }
  //     ]
      
  //   },
  //   {
  //     "id" : "comb1",
  //     "owner_id" : "user1",
  //     "name" : "Bed Time",
  //     "photo" : sleep,
  //     "description" : "Combination for bed time ",
  //     "like_count" : 0,
  //     "is_public" : false,
  //     "category" : "sleep",
  //     'tracks': [
  //       {
  //         "id" : "abc1234",
  //         "title" : "Ocean",
  //         "sound" : ocean_s,
  //         "img" : ocean,
  //         "volume" : 50,
  //         "repeat" : true,
  //         "mute" : false
  //       },
  //       {
  //         "id" : "abc1235",
  //         "title" : "Birds",
  //         "sound" : birds_s,
  //         "img" : birds,
  //         "volume" : 50,
  //         "repeat" : true,
  //         "mute" : false
  //       },
  //       {
  //         "id" : "abc1237",
  //         "title" : "Thunder",
  //         "sound" : thunder_s,
  //         "img" : thunder,
  //         "volume" : 10,
  //         "repeat" : true,
  //         "mute" : false
  //       }
  //     ]
      
  //   },
  //   {
  //     "id" : "comb1",
  //     "owner_id" : "user1",
  //     "name" : "Bed Time",
  //     "photo" : sleep,
  //     "description" : "Combination for bed time ",
  //     "like_count" : 0,
  //     "is_public" : false,
  //     "category" : "sleep",
  //     'tracks': [
  //       {
  //         "id" : "abc1234",
  //         "title" : "Ocean",
  //         "sound" : ocean_s,
  //         "img" : ocean,
  //         "volume" : 50,
  //         "repeat" : true,
  //         "mute" : false
  //       },
  //       {
  //         "id" : "abc1235",
  //         "title" : "Birds",
  //         "sound" : birds_s,
  //         "img" : birds,
  //         "volume" : 50,
  //         "repeat" : true,
  //         "mute" : false
  //       },
  //       {
  //         "id" : "abc1237",
  //         "title" : "Thunder",
  //         "sound" : thunder_s,
  //         "img" : thunder,
  //         "volume" : 10,
  //         "repeat" : true,
  //         "mute" : false
  //       }
  //     ]
      
  //   },
  //   {
  //     "id" : "comb2",
  //     "owner_id" : "user1",
  //     "name" : "Study Time",
  //     "photo" : study,
  //     "description" : "Combination for studying my math exam for the college and bla bla bla ",
  //     "like_count" : 2,
  //     "is_public" : true,
  //     "category" : "study",
  //     'tracks': [
  //       {
  //         "id" : "abc1236",
  //         "title" : "Campfire",
  //         "sound" : campfire_s,
  //         "img" : campfire,
  //         "volume" : 100,
  //         "repeat" : true,
  //         "mute" : false
  //       },
  //       {
  //         "id" : "abc1238",
  //         "title" : "Waterfall",
  //         "sound" : waterfall_s,
  //         "img" : waterfall,
  //         "volume" : 0,
  //         "repeat" : true,
  //         "mute" : false
  //       },
  //       {
  //         "id" : "abc1239",
  //         "title" : "Rain",
  //         "sound" : rain_s,
  //         "img" : rain,
  //         "volume" : 0,
  //         "repeat" : true,
  //         "mute" : false
  //       }
  //     ]
      
  //   }
  // ]
  // const categories = [
  //   "Nature","Animals","Night"
  // ]
  const userQuery = useQuery({
    queryKey : ["user" , userId],
    queryFn : ()=>getExtendedUser(userId),
    enabled : !!userId
  })
  const tracksQuery = useQuery({
    queryKey : ["tracks", "user", userId],
    queryFn : ()=>getPublicUserResource("tracks" , userId),
    enabled : !!userId
  });
  const combinationsQuery = useQuery({
    queryKey : ["combinations", "user", userId],
    queryFn : ()=>getPublicUserResource("combinations" , userId),
    enabled : !!userId
  });
  useEffect(()=>{
    if(userQuery.isError){
      setResponseMessage("Failed to get User.")
    }else if (userQuery.isSuccess){
      setUser(userQuery.data.data);
      const categories = userQuery.data.data.categories.map(category=>{
        return category.name;
      })
      setCategories(categories);
    }
  },[userQuery.isError, userQuery.isSuccess])
  useEffect(()=>{
    if(tracksQuery.isError){
      setResponseMessage("Failed to get Tracks.")
    }else if (tracksQuery.isSuccess){
      setTracks(tracksQuery.data.data);
    }
  },[tracksQuery.isError,tracksQuery.isSuccess])

  useEffect(()=>{
    if(combinationsQuery.isError){
      setResponseMessage("Failed to get Combinations.")
    }else if (combinationsQuery.isSuccess){
      setCombinations(combinationsQuery.data.data);
    }
  },[combinationsQuery.isError,combinationsQuery.isSuccess])

  return (
    <div className='user-profile'>
      <UserSide user = {user}/>
      <div className="content">
        <ContainerWide>
          <header>
            <div className="top">
              <h2>{user?.username}'s Profile</h2>
              <div className="search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input type="text" />
              </div>
            </div>
            <div className="description">
              <p>Listen to what <span>{user?.username}</span> has published</p>
            </div>
            <div className="filter">
            <div className="switch">
              <Toggle toggleAction={setCurrentResource}/>
              <p>{currentResource?"Combinations":"Tracks"}</p>
            </div>
            <div className="category">
              <p>Filter: </p>
              <CustomSelect list={categories || [""]} setCurrentCategory ={setCurrentCategory}/>
            </div>

          </div>
          </header>
          {currentResource&&<div className="combinations">
          {combinationsQuery.isPending && <CircularProgress/>}
            {combinations.map(comb=>{
              return !currentCategory || currentCategory === "All" || comb.category === currentCategory?
              <Combination key={comb.id} combination={comb}/>
              :null
            })}
          </div>}
          {!currentResource&&<div className="tracks">
            {tracksQuery.isPending && <CircularProgress/>}
            {tracks.map((track,ind)=>{
              return (!currentCategory || currentCategory === "All" || currentCategory === track.category)
              ?<Track track={track} key={track.id} number = {ind+1} /> 
              :null;
            })}
          </div>}
          
        </ContainerWide>
      </div>
    </div>
  )
}
