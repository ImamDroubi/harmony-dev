import React, {useRef, useState } from 'react'
import "./track.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSliders,faPlay,faClone,faGlobe,faUserSecret,faPause,faEllipsisVertical,faPenToSquare,faXmark,faUser,faHeart as solidHeart} from '@fortawesome/free-solid-svg-icons';
import {faHeart as regularHeart} from "@fortawesome/free-regular-svg-icons";
import OverlayDark from '../../overlays/black/OverlayDark';
import MenuDropdown from '../../menus/dropdown/MenuDropdown';
import RangeTime from '../../other/range-time/RangeTime';
import EditTrack from '../../popups/edit-track/EditTrack';
import Warning from "../../popups/warning/Warning";
import trackDefaultPhoto from "../../../assets/images/track.jpg"
import { Link } from 'react-router-dom';
import { cloneResource, deleteUserResource, publishUserResource, toggleLikeResource, unpublishUserResource } from '../../../apiCalls/resources';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../contexts/AuthContext';
export default function Track({track,showPublicBagde}) {
  const [isPaused,setIsPaused] = useState(true);
  const {currentUser} = useAuth()
  const [optionsMenuOpen,setOptionsMenuOpen] = useState(false);
  const [editTrackPopupOpen,setEditTrackPopupOpen] = useState(false);
  const [warningPopupOpen,setWarningPopupOpen]= useState(false);
  const [publishWarningPopup,setPublishWarningPopup] = useState(false);
  const [cloneWarningPopup,setCloneWarningPopup] = useState(false);
  const [unpublishWarningPopup,setUnpublishWarningPopup] = useState(false);
  const [isLiked,setIsLiked] = useState(track.isLiked);
  const [likes,setLikes]= useState(track.likes);
  const audioRef = useRef();
  const queryClient = useQueryClient();

  const handleDeleteTrack = ()=>{
    setWarningPopupOpen(true);
    setOptionsMenuOpen(false);
  }
  const deletionConfirmed = ()=>{
    setWarningPopupOpen(false);
    const response = deleteUserResource("tracks", track.id);

  }
  const handlePublishTrack = ()=>{
    setPublishWarningPopup(true);
    setOptionsMenuOpen(false);
  }
  const publishConfirmed = ()=>{
    setPublishWarningPopup(false);
    const response = publishUserResource("tracks", track.id);
  }
  const handleUnpublishTrack = ()=>{
    setUnpublishWarningPopup(true);
    setOptionsMenuOpen(false);
  }
  const unpublishConfirmed = ()=>{
    setUnpublishWarningPopup(false);
    const response = unpublishUserResource("tracks", track.id);
  }
  const handleEditTrack = ()=>{
    setEditTrackPopupOpen(true);
    setOptionsMenuOpen(false);
  }
  const handleCloneTrack = ()=>{
    setCloneWarningPopup(true);
    setOptionsMenuOpen(false);
  }
  const cloneConfirmed = ()=>{
    setCloneWarningPopup(false);
    const response = cloneResource("tracks" , track.id);
  }
  const handleOpenOptionsMenu = ()=>{
    setOptionsMenuOpen((prev)=>!prev);
  }
  const handlePlay = ()=>{
    setIsPaused(false);
    audioRef.current.play();
  }
  const handlePause = ()=>{
    setIsPaused(true);
    audioRef.current.pause();

  }
  const toggleLike = ()=>{
    toggleLikeResource("track", track.id)
    if(isLiked){
      setLikes(prev=>prev-1);
    }else{
      setLikes(prev=>prev+1);
    }
    setIsLiked((prev)=>!prev);
  }
  const AddToMixingZone =<FontAwesomeIcon icon={faSliders} /> ;
  const playTrack = <FontAwesomeIcon icon={faPlay} />; 
  const pauseTrack = <FontAwesomeIcon icon={faPause} />; 
  const editTrack =<FontAwesomeIcon icon={faPenToSquare} style={{color: "#5dbcbc",}} />;
  const deleteTrack = <FontAwesomeIcon icon={faXmark} style={{color: "#5dbcbc",}} />
  const optionsDots = <FontAwesomeIcon icon={faEllipsisVertical} size="lg" style={{color: "#ffffff",}} /> ;
  const user = <FontAwesomeIcon icon={faUser} />; 
  const likeTrack = <FontAwesomeIcon icon={solidHeart} />;
  const unLikeTrack = <FontAwesomeIcon icon={regularHeart} />; 
  const publishTrack =<FontAwesomeIcon icon={faGlobe} />;
  const unpublishTrack =<FontAwesomeIcon icon={faUserSecret} />
  const cloneTrack = <FontAwesomeIcon icon={faClone} />
  const optionsList = [
    currentUser?.id === track.owner.id && <a onClick={handleEditTrack}>{editTrack}Edit Track</a>,
    currentUser?.id === track.owner.id && !track.isPublic&&<a onClick={handlePublishTrack}>{publishTrack}Publish Track</a>,
    currentUser?.id === track.owner.id &&track.isPublic&&<a onClick={handleUnpublishTrack}>{unpublishTrack}Unpublish Track</a>,
    currentUser?.id === track.owner.id &&<a onClick={handleDeleteTrack}>{deleteTrack}Delete Track</a>,
    currentUser?.id !== track.owner.id && <a onClick={handleCloneTrack}>{cloneTrack}Clone Track</a> 
  ]

  return (
    <div className='track' style={{backgroundImage:`url(${track.photoUrl || trackDefaultPhoto})`}}>
      {editTrackPopupOpen && <EditTrack track={track} openPopup={setEditTrackPopupOpen}/>}
      {/* Deletion Function */}
      {warningPopupOpen && <Warning openPopup={setWarningPopupOpen} text='Are You sure you want to delete this track?' confirm={deletionConfirmed}/>}
      {publishWarningPopup && <Warning openPopup={setPublishWarningPopup} text='Are You sure you want to publish this Track?' confirm={publishConfirmed}/>}
      {unpublishWarningPopup && <Warning openPopup={setUnpublishWarningPopup} text='Are You sure you want to unpublish this Track?' confirm={unpublishConfirmed}/>}
      {cloneWarningPopup && <Warning openPopup={setCloneWarningPopup} text='Are You sure you want to clone this Track?' confirm={cloneConfirmed}/>}
      <OverlayDark />
      <audio ref={audioRef} id={`sound${track.id}`} src={track.url}></audio> 
      <div onClick={handleOpenOptionsMenu} className="options">{optionsDots}</div>
      {track.isPublic&&showPublicBagde !== false&&<div className="public-badge">
        <div className="triangle"></div>
        <div className="rectangle">
          <p>Public</p>
        </div>
      </div>
      }
      {optionsMenuOpen && <MenuDropdown list={optionsList} />}
      <div className="top">
        <h4>{track.name}</h4>
      </div>
      <div className="bottom">
        <RangeTime trackRef={audioRef} setPaused={setIsPaused}/>
        <div className='control' onClick={isPaused?handlePlay:handlePause} >{isPaused?playTrack:pauseTrack}</div>
      </div>
      {track.isPublic&&showPublicBagde !== false&&<div className="likes-section">
          <div className="user-info">
            <div>{user}</div>
            <Link to={`/profile/${track.userId}`}>{track.owner?.username}</Link>
          </div>
          <div className="like-count">
            {isLiked?
            <div onClick={toggleLike}>{likeTrack}</div>
            :
            <div onClick={toggleLike} >{unLikeTrack}</div>
            }
            <p>{likes}</p>
          </div>
        </div>}

      
    </div>

  )
}
