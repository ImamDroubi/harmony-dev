import React, { useRef, useState } from 'react'
import "./custom-select.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowDown,faArrowUp} from '@fortawesome/free-solid-svg-icons';
export default function CustomSelect({list,setCurrentCategory}) {

  const [selected,setSelected] = useState();
  const [isOpen,setIsOpen] = useState(false);
  const arrowDown = <FontAwesomeIcon icon={faArrowDown} />;
  const customSelectRef = useRef();

  const handleSelect = (e)=>{
    setSelected(e.target.innerText);
    setCurrentCategory(e.target.innerText);
    customSelectRef.current.className = 'custom-select-closed';
    setIsOpen(false);
  }
  const handleOpen = ()=>{
    customSelectRef.current.className = 'custom-select-opened';
    setIsOpen(true);
  }
  return (
    <>
    {isOpen&&<div className='filling-div'></div>}
    <div ref={customSelectRef} className='custom-select-closed'>
      <ul>
        <li onClick={handleOpen} className='first-element'>{selected || "Select"}<div className='arrow-icon'>{arrowDown}</div></li>
        <li onClick={(e)=>handleSelect(e)}  className={selected?'selected':'hidden'}>All</li>
        {list?.map((item,ind)=>{
          return <li key={`category${ind}`} onClick={(e)=>handleSelect(e)} title={item} className={selected?'selected':'hidden'}>{item.length>10?`${item.slice(0,7)}...`:item}</li>
        })}
      </ul>
      
    </div>
    </>
  )
}
