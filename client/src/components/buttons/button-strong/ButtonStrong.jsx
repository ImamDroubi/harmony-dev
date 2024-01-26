import React from 'react'
import "./button-strong.scss";
export default function ButtonStrong({icon,text,width,height}) {
  return (
    <button className='button-strong' style={{width: width , height : height}}>
      {icon || null}
      {text || "Button"}
    </button>
  )
}
