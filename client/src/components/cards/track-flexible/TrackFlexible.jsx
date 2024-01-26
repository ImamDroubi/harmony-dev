import React, { useEffect, useRef, useState } from 'react'
import "./track-flexible.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRepeat,faForward,faVolumeXmark,faPlay,faVolumeLow,faVolumeHigh,faPause,faEllipsisVertical,faXmark,faPenToSquare} from '@fortawesome/free-solid-svg-icons' ;
import OverlayDark from "../../overlays/black/OverlayDark";
import RangeTime from '../../other/range-time/RangeTime';
import RangeVolume from '../../other/range-volume/RangeVolume';
import MenuDropdown from '../../menus/dropdown/MenuDropdown';
import Warning from '../../popups/warning/Warning';
import EditTrack from '../../popups/edit-track/EditTrack';

export default function TrackFlexible({outsider,track,volume=50,removeFromMixing}) {
  const [currentVolume,setCurrentVolume] = useState(volume);
  const [isPaused,setIsPaused] = useState(true);
  const [isMuted,setIsMuted] = useState(false);
  const [isHigh,setIsHigh] = useState(true);
  const [isRepeated,setIsRepeated] = useState(true);
  const [optionsMenuOpen,setOptionsMenuOpen] = useState(false);
  const [editTrackPopupOpen,setEditTrackPopupOpen] = useState(false);
  const [warningPopupOpen,setWarningPopupOpen]= useState(false);
  const audioRef = useRef();

  const handlePlay = ()=>{
    let sound = audioRef.current;
    sound.play();
    setIsPaused(false);
  }
  const handlePause = ()=>{
    let sound = audioRef.current;
    sound.pause();
    setIsPaused(true);
  }
  const handleMute = ()=>{
    let sound = audioRef.current;
    sound.muted =  true;
    setIsMuted(true);
  }
  const handleUnMute = ()=>{
    let sound = audioRef.current;
    sound.muted =  false;
    setIsMuted(false);
  }
  const handleForward = ()=>{
    let sound = audioRef.current;
    sound.currentTime = sound.currentTime + 5 ;
  }
  const handleBackward = ()=>{
    let sound = audioRef.current;
    sound.currentTime = Math.max(0 , sound.currentTime - 5);
  }
  const handleRepeat = ()=>{
    let sound = audioRef.current;
    sound.loop = !sound.loop ;
    setIsRepeated((prev)=>!prev);
  }
  const handleVolumeChange = (e)=>{
    setCurrentVolume(e.target.value);
    setIsMuted(false);
    handleUnMute();
    if(currentVolume >= 50)setIsHigh(true);
    else setIsHigh(false);
  }
  const handleOpenOptionsMenu = ()=>{
    setOptionsMenuOpen((prev)=>!prev);
  }

  const handleRemoveTrack = ()=>{
    setWarningPopupOpen(true);
    setOptionsMenuOpen(false);
  }
  const handleEditTrack = ()=>{
    setEditTrackPopupOpen(true);
    setOptionsMenuOpen(false);
  }
  const postRemoveTrack = ()=>{
    removeFromMixing(track);
    setWarningPopupOpen(false);
  }

  const repeat = <FontAwesomeIcon  icon={faRepeat} size="lg" style={{color: "#fff",}} />;
  const forward = <FontAwesomeIcon icon={faForward} size="lg" style={{color: "#fff",transform:"translateX(7%)"}} />; 
  const play = <FontAwesomeIcon  icon={faPlay} size="lg" style={{color: "#fff",transform:"translateX(10%)"}} />
  const pause = <FontAwesomeIcon icon={faPause} size="lg" style={{color: "#fff",}} /> ;
  const backward = <FontAwesomeIcon icon={faForward} size="lg" style={{color: "#fff",transform:"translateX(-8%) rotate(-180deg)"}}/>;
  const mute = <FontAwesomeIcon icon={faVolumeXmark} size="lg" style={{color: "#fff",}} />; 
  const lowVolume = <FontAwesomeIcon  icon={faVolumeLow} size="lg" style={{color: "#fff",}} />;
  const highVolume = <FontAwesomeIcon  icon={faVolumeHigh} size="lg" style={{color: "#fff",}} />;
  const optionsDots = <FontAwesomeIcon icon={faEllipsisVertical} size="lg" style={{color: "#ffffff",}} /> ;
  const editTrack =<FontAwesomeIcon icon={faPenToSquare} style={{color: "#5dbcbc",}} />;
  const removeTrack = <FontAwesomeIcon icon={faXmark} style={{color: "#5dbcbc",}} />

  const optionsList = [
    <a onClick={handleEditTrack}>{editTrack}Edit Track</a>,
    <a onClick={handleRemoveTrack}>{removeTrack}Remove from mixing zone</a>
  ]
  useEffect(()=>{
    let sound = audioRef.current;
    sound.loop =true ;
  },[])
  useEffect(()=>{
    let sound = audioRef.current;
    sound.onpause = ()=>{
      handlePause();
    }
    sound.onvolumechange = ()=>{
      if(sound.muted)handleMute();
      else handleUnMute();
    }
    
  },[])

  return (
    <div className='track-flexible' style={{backgroundImage:`url(${track.photoUrl})`}}> 
    {editTrackPopupOpen && <EditTrack track={track} openPopup={setEditTrackPopupOpen}/>}
    {warningPopupOpen && <Warning openPopup={setWarningPopupOpen} text='Are You sure you want to remove the track from the mixing zone?' confirm={postRemoveTrack}/>}
      <OverlayDark />
      <audio ref={audioRef} id={`sound${track.id}`} src={track.url}></audio> 
      {/* Remove the id  */}
      {!outsider && <div onClick={handleOpenOptionsMenu} className="options">{optionsDots}</div>}
      {optionsMenuOpen && <MenuDropdown list={optionsList} />}
      <div className="left">
        <h4>{track.name}</h4>
        <div className="track-progress">
          <RangeTime setPaused={setIsPaused} trackRef={audioRef} />
        </div>
        <div className="controls">
          <div onClick={handleBackward}>{backward}</div>
          <div onClick={isPaused?handlePlay:handlePause} >{isPaused?play:pause}</div>
          <div onClick={handleForward}>{forward}</div>
          <div onClick={handleRepeat} style={isRepeated?{backgroundColor:"rgba(255,255,255,0.5)"}:null} >{repeat}</div>
        </div>
      </div>
      <div className="right">
        <p>{currentVolume}</p>
        <div className="track-volume">
          <RangeVolume trackId={track.id} trackRef={audioRef} change={handleVolumeChange} />
        </div>
        <div onClick={isMuted?handleUnMute:handleMute}  className='icon-div'>{isMuted?mute:isHigh?highVolume:lowVolume}</div>
      </div>
      
    </div>
  )
}
