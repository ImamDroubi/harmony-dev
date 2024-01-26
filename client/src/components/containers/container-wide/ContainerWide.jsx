import React from 'react'
import "./container-wide.scss";
export default function ContainerWide({children}) {
  return (
    <div className='container-wide'>
      {children}
    </div>
  )
}
