import React, { useState } from 'react'
import "./range-volume.scss";
export default function RangeVolume({trackRef,change,trackId}) {

  const [currentVolume, setCurrentVolume] = useState(50);
  const handleChange = (e)=>{
    change(e);
    let sound = trackRef.current;
    setCurrentVolume(e.target.value);
    sound.volume= currentVolume/100.0;
    
  }
  return (
    <input id={`volume-${trackId}`} onChange={(e)=>handleChange(e)} value={currentVolume} type='range' className='range-input' min={1} step={1}></input>
  )
}
