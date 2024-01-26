import React from 'react'
import "./button-back.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
export default function ButtonBack() {
  const back = <FontAwesomeIcon icon={faCaretLeft} style={{color: "#5dbcbc",}} />; 
  return (
    <div className='button-back'>
      <a href='#'>{back}<span>Back</span></a>
    </div>
  )
}
