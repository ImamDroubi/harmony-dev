import React from 'react'
import "./mixing-controls.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlay,faVolumeXmark,faRotateLeft,faStop,faFileAudio,faTrash,faPlus,faVolumeHigh} from '@fortawesome/free-solid-svg-icons' ;
export default function MixingControls(props) {
  const playAll = <FontAwesomeIcon icon={faPlay} /> ;
  const unMuteAll = <FontAwesomeIcon icon={faVolumeXmark} /> ;
  const muteAll = <FontAwesomeIcon icon={faVolumeHigh} />;
  const resetAll = <FontAwesomeIcon icon={faRotateLeft} />;
  const stopAll = <FontAwesomeIcon icon={faStop} />;
  const saveCombination = <FontAwesomeIcon icon={faFileAudio} />;
  const clearAll = <FontAwesomeIcon icon={faTrash} />;
  const addTrack = <FontAwesomeIcon icon={faPlus} />; 
  return (
    <div className='mixing-controls'>
     <div className="icons">
        <div onClick={()=>props.showAddTrackPopup(true)} title='Add a track' className="icon-box">{addTrack}</div>
        {props.isPaused?
          <div onClick={props.play} title='Play all' className="icon-box">{playAll}</div>
         :
         <div onClick={props.pause} title='Pause all' className="icon-box">{stopAll}</div>
        }
        {!props.isMuted?
          <div onClick={props.mute} title='Mute all' className="icon-box">{muteAll}</div>
         :
         <div onClick={props.unmute} title='unmute all' className="icon-box">{unMuteAll}</div>
        }
        <div onClick={props.reset} title='Reset all' className="icon-box">{resetAll}</div>
        <div onClick={()=>props.showSaveCombinationPopup(true)} title='Save combination' className="icon-box">{saveCombination}</div>
        <div onClick={()=>props.showWarningPopup(true)} title='Clear all' className="icon-box">{clearAll}</div>
     </div>
    </div>
  )
}
