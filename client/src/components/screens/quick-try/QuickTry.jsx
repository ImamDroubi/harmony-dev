import React from 'react'
import "./quick-try.scss";
import Topbar from '../../other/topbar/Topbar';
import TrackFlexible from '../../cards/track-flexible/TrackFlexible';
import ContainerWide from '../../containers/container-wide/ContainerWide';
import ocean from "../../../assets/images/ocean.jpg";
import birds from "../../../assets/images/birds.jpg";
import campfire from "../../../assets/images/campfire.jpg";
import waterfall from "../../../assets/images/waterfall.jpg";
import thunder from "../../../assets/images/thunder.jpg";
import rain from "../../../assets/images/rain.jpg";
import ocean_s from "../../../assets/sounds/ocean.mp3";
import birds_s from "../../../assets/sounds/birds.mp3";
import campfire_s from "../../../assets/sounds/campfire.mp3";
import waterfall_s from "../../../assets/sounds/waterfall.mp3";
import thunder_s from "../../../assets/sounds/thunder.mp3";
import rain_s from "../../../assets/sounds/rain.mp3";
import ButtonBack from '../../buttons/button-back/ButtonBack';
export default function QuickTry() {
  const tracks = [
    {
      "id" : "abc1234",
      "name" : "Ocean",
      "url" : ocean_s,
      "photoUrl" : ocean,
      "volume" : 50,
      "repeat" : true,
      "mute" : false
    },
    {
      "id" : "abc1235",
      "name" : "Birds",
      "url" : birds_s,
      "photoUrl" : birds,
      "volume" : 50,
      "repeat" : true,
      "mute" : false
    },
    {
      "id" : "abc1236",
      "name" : "Campfire",
      "url" : campfire_s,
      "photoUrl" : campfire,
      "volume" : 50,
      "repeat" : true,
      "mute" : false
    },
    {
      "id" : "abc1237",
      "name" : "Thunder",
      "url" : thunder_s,
      "photoUrl" : thunder,
      "volume" : 50,
      "repeat" : true,
      "mute" : false
    },
    {
      "id" : "abc1238",
      "name" : "Waterfall",
      "url" : waterfall_s,
      "photoUrl" : waterfall,
      "volume" : 50,
      "repeat" : true,
      "mute" : false
    },
    {
      "id" : "abc1239",
      "name" : "Rain",
      "url" : rain_s,
      "photoUrl" : rain,
      "volume" : 50,
      "repeat" : true,
      "mute" : false
    }
  ]

  return (
    <div className='quick-try'>
      <Topbar/>
      <ContainerWide>
        <ButtonBack/>
        <div className="title">
          <h1>QUICK TRY</h1>
        </div>
        <div className="tracks">
          {
            tracks.map((track)=>{
              return <TrackFlexible outsider={true} track={track} key={track.id}/>
            })
          }
        </div>
      </ContainerWide>
      
      
    </div>
  )
}
