import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass,faUpload} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import "./public-content.scss";
import Combination from '../../cards/combination/Combination';
import ContainerWide from '../../containers/container-wide/ContainerWide';
import Toggle from '../../other/toggle/Toggle';
import Track from '../../cards/track/Track';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPublicResourceByCategory } from '../../../apiCalls/resources';
export default function UserPublic() {
  const {category} = useParams();
  const [currentCategory,setCurrentCategory] = useState();
  const [currentResource,setCurrentResource] = useState(false); // false for tracks, true for combinations
  const [tracks,setTracks]= useState([]);
  const [combinations,setCombinations]= useState([]);
  const queryClient = useQueryClient();
  useEffect(()=>{
    setCurrentCategory(category);
  },[category])
  const tracksQuery = useQuery({
    queryKey:['tracks' , 'public', currentCategory],
    queryFn : async ()=>getPublicResourceByCategory("tracks" , currentCategory),
    enabled:!!currentCategory
  });
  useEffect(()=>{
    setTracks(tracksQuery.data?.data);
  },[tracksQuery?.isSuccess, tracksQuery?.isFetching])
  const combinationsQuery = useQuery({
    queryKey:['combinations' , 'public', currentCategory],
    queryFn : async ()=>getPublicResourceByCategory("combinations" , currentCategory),
    enabled:!!currentCategory
  });
  useEffect(()=>{
    setCombinations(combinationsQuery.data?.data);
  },[combinationsQuery?.isSuccess, combinationsQuery?.isFetching])
  return (
    <div className='public-content'>
    <ContainerWide>
      <header>
        <div className="top">
          <h2>{currentCategory}</h2>
          <div className="search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input type="text" />
          </div>
        </div>
        <div className="description">
          <p>Public tracks & combinations for this category.</p>
        </div>
        <div className="filter">
          <div className="switch">
            <Toggle toggleAction={setCurrentResource}/>
            <p>{currentResource?"Combinations":"Tracks"}</p>
          </div>
        </div>
      </header>
      {currentResource&&<div className="combinations">
        {combinations?.map(comb=>{
          // console.log(comb)
          return !currentCategory || currentCategory === "All" || comb.category === currentCategory?
          <Combination combination={comb}/>
          
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
