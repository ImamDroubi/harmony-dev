import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import "./user-public.scss";
import {useAuth} from "../../../contexts/AuthContext";
import Combination from '../../cards/combination/Combination';
import CustomSelect from '../../menus/custom-select/CustomSelect';
import ContainerWide from '../../containers/container-wide/ContainerWide';
import Toggle from '../../other/toggle/Toggle';
import Track from '../../cards/track/Track';
import { useQuery } from '@tanstack/react-query';
import { getPublicUserResource, getUserResources } from '../../../apiCalls/resources';
export default function UserPublic() {
  const {currentUser} = useAuth();
  const [currentCategory,setCurrentCategory] = useState();
  const [currentResource,setCurrentResource] = useState(false); // false for tracks, true for combinations
  const [user, setUser]= useState(currentUser);
  const [tracks,setTracks]= useState([]);
  const [combinations,setCombinations]= useState([]);
  const [categories,setCategories]= useState([]);
  useEffect(()=>{
    setUser(currentUser);
  },[currentUser])
  // const categories = [
  //   "Nature","Animals","Night","sleep"
  // ]
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
  const tracksQuery = useQuery({
    queryKey:['tracks' , 'public'],
    queryFn : ()=>getPublicUserResource("tracks" , user?.id),
    enabled: !!user
  });
  useEffect(()=>{
    setTracks(tracksQuery.data?.data);
  },[tracksQuery?.isSuccess])
  const combinationsQuery = useQuery({
    queryKey:['combinations' , 'public'],
    queryFn : ()=>getPublicUserResource("combinations" , user?.id),
    enabled: !!user
  });
  useEffect(()=>{
    setCombinations(combinationsQuery.data?.data);
  },[combinationsQuery?.isSuccess])

  const categoriesQuery = useQuery({
    queryKey:['categories' , user?.id],
    queryFn : getUserResources,
    enabled: !!user
  });
  useEffect(()=>{
    setCategories(categoriesQuery.data?.data);
    
  },[categoriesQuery?.isSuccess])
  if(categoriesQuery.isError)return "Error";
  if(tracksQuery?.isPending 
    || combinationsQuery?.isPending 
    || categoriesQuery?.isPending) return "Loading...";
  return (
    <div className='user-public'>
    <ContainerWide>
      <header>
        <div className="top">
          <h2>Public Profile</h2>
          <div className="search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input type="text" />
          </div>
        </div>
        <div className="description">
          <p>Your public tracks and combinations that you shared with others.</p>
        </div>
        <div className="filter">
          <div className="switch">
            <Toggle toggleAction={setCurrentResource}/>
            <p>{currentResource?"Combinations":"Tracks"}</p>
          </div>
          <div className="category">
            <p>Filter: </p>
            <CustomSelect list={categories?.map(category=>category.name)} setCurrentCategory ={setCurrentCategory}/>
          </div>
        </div>
      </header>
      {currentResource&&<div className="combinations">
        {combinations?.map(comb=>{
          return !currentCategory || currentCategory === "All" || comb.category === currentCategory?
          <Combination key={comb.id} combination={comb}/>
          :null
        })}
      </div>}
      {!currentResource&&<div className="tracks">
        {tracks?.map((track,ind)=>{
          return (!currentCategory || currentCategory === "All" || currentCategory === track.category)
          ?<Track track={track} key={track.id} number = {ind+1} /> 
          :null;
        })}
        { // This is for the layout 
          tracks?.length %3 == 2 && <div className="extra"></div>
        }
      </div>}
    </ContainerWide>
  </div>
  )
}
