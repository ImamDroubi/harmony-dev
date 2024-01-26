import React from 'react';
import "./button-light.scss";
export default function ButtonLight({icon,text,width,height}) {
  return (
    <button className='button-light' style={{width: width , height : height}}>
      {icon || null}
      {text || "Button"}
    </button>
  )
}
