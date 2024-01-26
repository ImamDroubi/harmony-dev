import React from 'react'
import "./menu-dropdown.scss"
export default function MenuDropdown({list}) {
  return (
    <ul className='menu-dropdown'>
      {list.map((item,idx)=>{
        return <li key={idx}>{item}</li>;
      })}
    </ul>
  )
}
