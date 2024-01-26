import React, { useEffect, useState } from 'react'
import "./sidebar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders,faHeadphones,faGlobe,faPodcast,faBookOpen,faBookQuran,faMountainSun,faFan,faMosquito,faMusic} from '@fortawesome/free-solid-svg-icons'
import {NavLink } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
export default function Sidebar() {
  const [showMobileView, setShowMobileView] = useState(false);
  const {currentUser} = useAuth();
  const checkScreen = ()=>{
    if(window.innerWidth <= 768)setShowMobileView(true);
    else setShowMobileView(false);
  }
  useEffect(()=>{
    checkScreen();
  },[])
  useEffect(()=>{
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  })
  return (
    <>
    {!showMobileView && <div className='sidebar'>
      {currentUser&&<div className="category">
        <h3 className="title">Personal</h3>
        <ul>
          <li><NavLink to={'/user/mixing-zone'}><FontAwesomeIcon icon={faSliders} /> Mixing Zone</NavLink></li>
          <li><NavLink to={'/user/combinations'}><FontAwesomeIcon icon={faHeadphones} /> Combinations</NavLink></li>
          <li><NavLink to={'/user/tracks'}><FontAwesomeIcon icon={faMusic} /> Tracks</NavLink></li>
          <li><NavLink to={'/user/public'} ><FontAwesomeIcon icon={faGlobe} /> Public Profile</NavLink></li>
        </ul>
      </div>}
      <div className="category">
        <h3 className="title">Explore</h3>
        <ul>
          {/* <li><NavLink><FontAwesomeIcon icon={faHeadphones} /> Combinations</NavLink></li> */}
          <li><NavLink to={'/public/Nature'}><FontAwesomeIcon icon={faMountainSun} /> Nature</NavLink></li>
          <li><NavLink to={'/public/Podcasts'}><FontAwesomeIcon icon={faPodcast} /> Podcasts</NavLink></li>
          <li><NavLink to={'/public/Tales'}><FontAwesomeIcon icon={faBookOpen} /> Tales</NavLink></li>
          <li><NavLink to={'/public/Quran'}><FontAwesomeIcon icon={faBookQuran} /> Holy Qur'an</NavLink></li>
          <li><NavLink to={'/public/Machines'}><FontAwesomeIcon icon={faFan} /> Machines</NavLink></li>
          <li><NavLink to={'/public/Animals'}><FontAwesomeIcon icon={faMosquito} /> Animals</NavLink></li>
        </ul>
      </div>
    </div>}
    
    {showMobileView && <div className="sidebar-mobile">
      {currentUser&&<div className="category">
          <ul>
            <li><NavLink to={'/user/mixing-zone'}><FontAwesomeIcon icon={faSliders} /></NavLink></li>
            <li><NavLink to={'/user/combinations'}><FontAwesomeIcon icon={faHeadphones} /></NavLink></li>
            <li><NavLink to={'/user/tracks'}><FontAwesomeIcon icon={faMusic} /></NavLink></li>
            <li><NavLink to={'/user/public'}  ><FontAwesomeIcon icon={faGlobe} /></NavLink></li>
          </ul>
      </div> } 
      <div className="category">
        <ul>
          {/* <li><NavLink><FontAwesomeIcon icon={faHeadphones} /></NavLink></li> */}
          <li><NavLink to={'/public/Nature'}><FontAwesomeIcon icon={faMountainSun} /></NavLink></li>
          <li><NavLink to={'/public/Podcasts'}><FontAwesomeIcon icon={faPodcast} /></NavLink></li>
          <li><NavLink to={'/public/Tales'}><FontAwesomeIcon icon={faBookOpen} /></NavLink></li>
          <li><NavLink to={'/public/Quran'}><FontAwesomeIcon icon={faBookQuran} /></NavLink></li>
          <li><NavLink to={'/public/Machines'}><FontAwesomeIcon icon={faFan} /></NavLink></li>
          <li><NavLink to={'/public/Animals'}><FontAwesomeIcon icon={faMosquito} /></NavLink></li>
        </ul>
      </div>
    </div>}
    </>
  )
}
