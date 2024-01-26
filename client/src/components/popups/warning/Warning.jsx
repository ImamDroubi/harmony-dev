import React from 'react'
import "./warning.scss";
import OverlayDark from '../../overlays/black/OverlayDark';
import track from "../../../assets/images/track.jpg";
import PopupLayout from '../popup-layout/PopupLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark,faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import ButtonStrong from "../../buttons/button-strong/ButtonStrong";
export default function Warning({text="Are you sure?",openPopup,confirm,cancel,confirmText = 'Yes', CancelText = 'No'}) {

  const handleConfirm = ()=>{
    confirm();
    openPopup(false);
  }
  return (
    <PopupLayout>
      <div className="warning">
        <button onClick={()=>openPopup(false)} className="close"><FontAwesomeIcon icon={faXmark} /></button>
        <div className="logo"><FontAwesomeIcon icon={faTriangleExclamation} /></div>
        <div className="message">
          <h4>{text}</h4>
        </div>
        <div className="buttons">
          <div onClick={handleConfirm}><ButtonStrong  text={confirmText}/></div>
          <div onClick={()=>openPopup(false)}><ButtonStrong  text={CancelText}/></div>
        </div>
      </div>
    </PopupLayout>
  )
}
