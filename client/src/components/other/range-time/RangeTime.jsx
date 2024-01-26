import React, { useEffect, useState } from 'react'
// the css of this file is in the Range Volume folder 
export default function RangeTime({trackRef,setPaused}) {
  const [currentTrackTime,setCurrentTrackTime] = useState(0);
  const handleChange = (e)=>{
    let sound = trackRef.current;
    let percentage = e.target.value/100.0; 
    let timeInSeconds = percentage*sound.duration;
    setCurrentTrackTime(e.target.value);
    sound.currentTime = timeInSeconds;
  }
  const handlePlay = ()=>{
    let sound = trackRef.current;
    const interval = setInterval(() => { 
      setCurrentTrackTime(sound.currentTime/sound.duration*100);
      if(sound.paused)clearInterval(interval);
    }, 500);
  }

  useEffect(()=>{
    let sound = trackRef.current;
    setCurrentTrackTime((sound.currentTime/sound.duration)*100);
    sound.onplay = ()=>{
      handlePlay();
      setPaused(false);
    }
  },[]);

  return (
    <input type='range' value={currentTrackTime || 0} className='range-input' onChange={(e)=>handleChange(e)}></input>
  )
}
