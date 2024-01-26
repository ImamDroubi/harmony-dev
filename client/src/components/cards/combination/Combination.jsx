import React, {useEffect, useState } from 'react'
import "./combination.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlay,faEllipsis,faClone,faGlobe,faUser,faHeart as solidHeart,faPenToSquare,faXmark,faPause,faUserSecret} from "@fortawesome/free-solid-svg-icons";
import {faHeart as regularHeart} from "@fortawesome/free-regular-svg-icons";
import OverlayDark from '../../overlays/black/OverlayDark';
import combinationDefaultPhoto from "../../../assets/images/track.jpg";
import MenuDropdown from '../../menus/dropdown/MenuDropdown';
import EditCombination from '../../popups/edit-combination/EditCombination';
import Warning from '../../popups/warning/Warning';
import { cloneResource, deleteUserResource, publishUserResource, toggleLikeResource, unpublishUserResource } from '../../../apiCalls/resources';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';


export default function Combination({combination}) {
  const {currentUser} = useAuth();

  const [isLiked,setIsLiked] = useState(combination.isLiked);
  const [optionsMenuOpen,setOptionsMenuOpen] = useState(false);
  const [isPaused,setIsPaused] = useState(true);
  const [editCombinationPopupOpen,setEditCombinationPopupOpen] = useState(false);
  const [warningPopupOpen,setWarningPopupOpen]= useState(false);
  const [publishWarningPopup,setPublishWarningPopup] = useState(false);
  const [unpublishWarningPopup,setUnpublishWarningPopup] = useState(false);
  const [cloneWarningPopup,setCloneWarningPopup] = useState(false);
  const [tracks,setTracks] = useState(combination.tracks);
  const [likes,setLikes]= useState(combination.likes);
  useEffect(()=>{
    const reformedTracks = combination.Tracks?.map(item=>{
      return {
        volume : item.Tracks_Combination.volume, 
        ...item
      }
    })
    combination.user = combination.User;
    setTracks(reformedTracks);
    setLikes(combination.likes)
  },[combination])

  const combinationStyles = {
    backgroundImage : `url(${combination.photoUrl || combinationDefaultPhoto})`,
    backgroundSize : 'cover',
    backgroundPosition : "20%"
  }
  const user = <FontAwesomeIcon icon={faUser} />; 
  const optionsDots = <FontAwesomeIcon icon={faEllipsis} size="lg" /> ;
  const editCombination =<FontAwesomeIcon icon={faPenToSquare} />;
  const deleteCombination = <FontAwesomeIcon icon={faXmark}/>;
  const playCombination = <FontAwesomeIcon style={{transform: "translateX(10%)"}} icon={faPlay} />;
  const pauseCombination = <FontAwesomeIcon icon={faPause} />;
  const likeCombination = <FontAwesomeIcon icon={solidHeart} />;
  const unLikeCombination = <FontAwesomeIcon icon={regularHeart} />; 
  const publishCombination =<FontAwesomeIcon icon={faGlobe} />;
  const unpublishCombination =<FontAwesomeIcon icon={faUserSecret} />
  const cloneCombination = <FontAwesomeIcon icon={faClone} />
  // reform the combination 


  const handleDeleteCombination = ()=>{
    setWarningPopupOpen(true);
    setOptionsMenuOpen(false);
  }
  const deletionConfirmed = ()=>{
    setWarningPopupOpen(false);
    const response = deleteUserResource("combinations", combination.id);
  }
  const handleCloneCombination = ()=>{
    setCloneWarningPopup(true);
    setOptionsMenuOpen(false);
  }
  const cloneConfirmed = ()=>{
    setCloneWarningPopup(false);
    const response = cloneResource("combinations" , combination.id);
  }
  const handlePublishCombination = ()=>{
    setPublishWarningPopup(true);
    setOptionsMenuOpen(false);
  }
  const publishConfirmed = ()=>{
    setPublishWarningPopup(false);
    const response = publishUserResource("combinations", combination.id);
  }
  const handleUnpublishCombination = ()=>{
    setUnpublishWarningPopup(true);
    setOptionsMenuOpen(false);
  }
  const unpublishConfirmed = ()=>{
    setUnpublishWarningPopup(false);
    const response = unpublishUserResource("combinations", combination.id);
  }
  const handleEditCombination = ()=>{
    setEditCombinationPopupOpen(true);
    setOptionsMenuOpen(false);
  }
  const handlePlayCombination = ()=>{
    tracks?.map(track=>{
      let sound = document.getElementById(`track${track.id}-combination${combination.id}`);
      sound.volume = track.volume/100;
      sound.muted = track.muted ;
      sound.loop = track.repeat;
      sound.play();
    })
    setIsPaused(false);
  }
  const handlePauseCombination = ()=>{
    tracks?.map(track=>{
      let sound = document.getElementById(`track${track.id}-combination${combination.id}`);
      sound.pause();
    })
    setIsPaused(true);
  }
  const toggleLike = ()=>{
    toggleLikeResource("combination", combination.id)
    if(isLiked){
      setLikes(prev=>prev-1);
    }else{
      setLikes(prev=>prev+1);
    }
    setIsLiked((prev)=>!prev);
  }
  const optionsList = [
    currentUser?.id === combination.owner.id &&<a onClick={handleEditCombination}>{editCombination}Edit Combination</a>,
    currentUser?.id === combination.owner.id &&!combination.isPublic&&<a onClick={handlePublishCombination}>{publishCombination}Publish Combination</a>,
    currentUser?.id === combination.owner.id &&combination.isPublic&&<a onClick={handleUnpublishCombination}>{unpublishCombination}Unpublish Combination</a>,
    currentUser?.id === combination.owner.id &&<a onClick={handleDeleteCombination}>{deleteCombination}Delete Combination</a>,
    currentUser?.id !== combination.owner.id && <a onClick={handleCloneCombination}>{cloneCombination}Clone Combination</a> 
  ]
  return (
    <div className='combination' style={{...combinationStyles}}>
      {editCombinationPopupOpen && <EditCombination combination={combination} openPopup={setEditCombinationPopupOpen}/>}
      {/* Deletion Function */}
      {warningPopupOpen && <Warning openPopup={setWarningPopupOpen} text='Are You sure you want to delete this combination?' confirm={deletionConfirmed}/>}
      {publishWarningPopup && <Warning openPopup={setPublishWarningPopup} text='Are You sure you want to publish this combination?' confirm={publishConfirmed}/>}
      {unpublishWarningPopup && <Warning openPopup={setUnpublishWarningPopup} text='Are You sure you want to unpublish this combination?' confirm={unpublishConfirmed}/>}
      {cloneWarningPopup && <Warning openPopup={setCloneWarningPopup} text='Are You sure you want to clone this Combination?' confirm={cloneConfirmed}/>}
      {tracks?.map((track,ind)=>{
        return <audio key={track.id} id={`track${track.id}-combination${combination.id}`} src={`${track.url}`}></audio>
      })}
      <OverlayDark/>
      <div onClick={()=>setOptionsMenuOpen((prev)=>!prev)} className="options">{optionsDots}</div>
      {optionsMenuOpen&&<MenuDropdown list={optionsList}/>}
      {combination.isPublic&&<div className="public-badge">
        <div className="triangle"></div>
        <div className="rectangle">
          <p>Public</p>
        </div>
      </div>}
      <div className="top">
        <h6 className="name">{combination.name}</h6>
        {combination.description
          &&<p title={combination.description} className="description">{combination.description?.slice(0,40) + (combination.description?.length>40?"..." : "") }</p>
        }
      </div>
      <div className="bottom">
        {combination.isPublic?
        <div className="left">
          <div className="user-info">
            <div>{user}</div>
            <Link to={`/profile/${combination.owner?.id}`}>{combination.owner?.username}</Link>
          </div>
          <div className="like-count">
            {isLiked?
            <div onClick={toggleLike}>{likeCombination}</div>
            :
            <div onClick={toggleLike} >{unLikeCombination}</div>
            }
            <p>{likes}</p>
          </div>
        </div>
        :
        <div></div>
        }
        <div className="right">
          {isPaused?
          <div onClick={handlePlayCombination}>{playCombination}</div>
          :
          <div onClick={handlePauseCombination} >{pauseCombination}</div>
          }
        </div>
      </div>
    </div>
  )
}
