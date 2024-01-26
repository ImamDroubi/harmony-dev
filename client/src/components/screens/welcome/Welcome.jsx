import React, { useEffect, useState } from 'react'
import "./welcome.scss";
import ContainerWide from '../../containers/container-wide/ContainerWide';
import backgroundImage from "../../../assets/images/headphone.jpg";
import OverlayDark from '../../overlays/black/OverlayDark';
import ButtonStrong from '../../buttons/button-strong/ButtonStrong';
import ButtonLight from '../../buttons/button-light/ButtonLight';
import { useAuth } from '../../../contexts/AuthContext';
import UserIcon from '../../other/user-icon/UserIcon';
import Logo from '../../other/logo/Logo';
import AuthButtons from '../../other/auth-buttons/AuthButtons';
import { Link } from 'react-router-dom';
export default function Welcome() {
  const {currentUser} = useAuth();

  return (
    <div className='welcome-page' style={{backgroundImage:`url(${backgroundImage})`}}>
      <OverlayDark/>
      <ContainerWide>
        <div className="top">
          <Logo/>
        {
          !currentUser?
            <AuthButtons/>
          :
          <UserIcon/>
        }
        </div>
        <div className="hero">
          <h1>Soundscapes for Inner Peace...</h1>
          <h4><span>Harmonize</span> Your Environment</h4>
          <div className="buttons">
            <Link to={currentUser?"/user/mixing-zone":"/public/Nature"}><ButtonStrong text="Get Started" width="10rem" height="3.5rem"/></Link>
            <Link to={"/try"}><ButtonLight text="Quick Try" width="10rem" height="3.5rem"/></Link>
          </div>
        </div>
      </ContainerWide>
    </div>
  )
}
