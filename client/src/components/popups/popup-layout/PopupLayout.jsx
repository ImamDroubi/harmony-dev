import React from 'react'
import "./popup-layout.scss";
import { createPortal } from 'react-dom';
import OverlayDark from '../../overlays/black/OverlayDark';
export default function PopupLayout({children}) {
  return (
    createPortal(<>
      <div className='popup-layout'>
        <OverlayDark/>
        {children}
      </div>
    </>,document.body)
  )
}
