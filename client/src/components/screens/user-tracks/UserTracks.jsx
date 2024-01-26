import React, { useEffect, useState } from 'react'
import "./user-tracks.scss";
import ContainerWide from '../../containers/container-wide/ContainerWide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass,faUpload} from '@fortawesome/free-solid-svg-icons';
import Track from '../../cards/track/Track';
import CustomSelect from '../../menus/custom-select/CustomSelect';
import UploadTrack from '../../popups/upload-track/UploadTrack';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../contexts/AuthContext';
import { getUserResources } from '../../../apiCalls/resources';
export default function UserTracks() {
  const {currentUser} = useAuth();
  const [user,setUser] = useState();
  const [uploadTrackPopupOpen, setUploadTrackPopupOpen] = useState(false);
  const [visibleTracks,setVisibleTracks] = useState(0);
  const [tracks,setTracks] = useState([]);
  const [currentCategory,setCurrentCategory] = useState();
  const uploadTrack = <FontAwesomeIcon icon={faUpload} />;

  const{isPending, isError,isSuccess, data, error} = useQuery({ // data here contains tracks
    queryKey: ['tracks', user?.id],
    queryFn: getUserResources,
    enabled : !!user
  });
  const {
    isPending:isPending_categories,
    isError: isError_categories,
    data:data_categories,
    error:error_categories
  } = useQuery({
    queryKey:['categories', user?.id],
    queryFn : getUserResources,
    enabled : !!user
  })
  useEffect(()=>{
    setUser(currentUser);
  },[currentUser])
  
  
  useEffect(()=>{
    setTracks(data?.data);
  },[isSuccess])
  useEffect(()=>{
    {tracks?.map((track)=>{
      if(!currentCategory || currentCategory === "All" || currentCategory === track.category){
        setVisibleTracks(prev=>prev+1);
      }
    })}
  },[currentCategory,tracks]);
  if(!user)return "Loading...";
  if(isPending || isPending_categories) return "Loading...";
  if(isError) return `Error: ${error.message}`
  if(isError_categories) return `Error: ${error_categories.message}`
  return (
    <div className='user-tracks'>
      <ContainerWide>
        {uploadTrackPopupOpen&&<UploadTrack openPopup={setUploadTrackPopupOpen}/>}
        <div onClick={()=>setUploadTrackPopupOpen(true)} className="upload">{uploadTrack}</div>
        <header>
          <div className="top">
            <h2>Your Tracks</h2>
            <div className="search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input type="text" />
            </div>
          </div>
          <div className="description">
            <p>Upload your favorite sounds.</p>
          </div>
          <div className="filter">
            <div className="category">
              <p>Filter: </p>
              <CustomSelect list={data_categories.data.map(category=>category.name)} setCurrentCategory ={setCurrentCategory}/>
            </div>
          </div>
          
        </header>
        <div className="tracks">
          {tracks?.map((track,ind)=>{
            if(!currentCategory || currentCategory === "All" || currentCategory === track.category){
              return <Track track={track} key={track.id} number = {ind+1} /> ;
            }
          })}
          { // This is for the layout 
            visibleTracks%3 == 2 && <div className="extra"></div>
          }
        </div>
        
      </ContainerWide>
    </div>
  )
}
