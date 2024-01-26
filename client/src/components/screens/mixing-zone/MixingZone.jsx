import React, { useEffect, useState } from 'react'
import "./mixing-zone.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass}from '@fortawesome/free-solid-svg-icons';
import ContainerWide from '../../containers/container-wide/ContainerWide';
import TrackFlexible from '../../cards/track-flexible/TrackFlexible';
import MixingControls from '../../menus/mixing-controls/MixingControls';
import AddToMixingZone from '../../popups/add-to-mixing-zone/AddToMixingZone';
import SaveCombination from '../../popups/save-combination/SaveCombination';
import Warning from '../../popups/warning/Warning';

export default function MixingZone() {
  const storageTracks = JSON.parse(localStorage.getItem('storageTracks') || "[]");
  const [isPaused, setIsPaused] = useState(true);
  const [isMuted,setIsMuted] = useState(false);
  const [showAddTrackPopup,setShowAddTrackPopup] = useState(false);
  const [showSaveCombinationPopup,setShowSaveCombinationPopup] = useState(false);
  const [showWarningPopup,setShowWarningPopup] = useState(false);
  const [mixingTracks , setMixingTracks] = useState(storageTracks);
  
  const playAll = ()=>{
    mixingTracks.map((track)=>{
      document.getElementById(`sound${track.id}`).play();
    })
    setIsPaused(false);
  }
  const pauseAll = ()=>{
    mixingTracks.map((track)=>{
      document.getElementById(`sound${track.id}`).pause();
    })
    setIsPaused(true);
  }
  const muteAll = ()=>{
    mixingTracks.map((track)=>{
      document.getElementById(`sound${track.id}`).muted = true;
    })
    setIsMuted(true);
  }
  const unMuteAll = ()=>{
    mixingTracks.map((track)=>{
      document.getElementById(`sound${track.id}`).muted = false;
    })
    setIsMuted(false);
  }
  const resetAll = ()=>{
    mixingTracks.map((track)=>{
      document.getElementById(`sound${track.id}`).currentTime = 0;
    })
  }
  const clearAll = ()=>{
    setMixingTracks([]);
    localStorage.removeItem('storageTracks');
    setIsMuted(false);
    setIsPaused(true);
  }
  const props = {
    "play" : playAll,
    "pause" : pauseAll,
    "mute" : muteAll,
    "unmute" : unMuteAll,
    "reset" : resetAll,
    "clear" : clearAll,
    "isPaused" : isPaused,
    "isMuted" : isMuted,
    "setIsPaused" : setIsPaused,
    "setIsMuted" : setIsMuted,
    "showAddTrackPopup" : setShowAddTrackPopup,
    "showSaveCombinationPopup" : setShowSaveCombinationPopup,
    "showWarningPopup": setShowWarningPopup
  }
  const removeTrack= (track)=>{
    const newTracks = mixingTracks.filter(item=>{
      return JSON.stringify(track) !== JSON.stringify(item)
    });
    setMixingTracks(newTracks);
  }
  useEffect(()=>{
    localStorage.setItem('storageTracks', JSON.stringify(mixingTracks));
  },[mixingTracks]);

  return (
    <div className='mixing-zone'>
      {showAddTrackPopup&&<AddToMixingZone openPopup = {setShowAddTrackPopup} mixingTracks={mixingTracks} setMixingTracks={setMixingTracks} />}
      {showSaveCombinationPopup&&<SaveCombination openPopup = {setShowSaveCombinationPopup}/>}
      {showWarningPopup&&<Warning openPopup={setShowWarningPopup} text='Are you sure you want to clear the mixing zone?' confirm={clearAll}/> }
      <ContainerWide>
        <header>
          <div className="top">
            <h2>Mixing Zone</h2>
            <div className="search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input type="text" />
            </div>
          </div>
          <div className="description">
            <p>Adjust the volume sliders to find your perfect balance of sounds.</p>
          </div>
        </header>
        <MixingControls {...props} />
        {
        <div className="tracks">
          {
            mixingTracks.map((track)=>{
              return <TrackFlexible removeFromMixing={removeTrack} track={track} key={track.id}/>
            })
            
          }
          { // This is for the layout 
            mixingTracks.length %3 == 2 && <div className="extra"></div>
          }
          {!mixingTracks.length && <h3>There are no tracks in the mixing zone... </h3>}
        </div>
        }
        
      </ContainerWide>
    </div>
  )
}
