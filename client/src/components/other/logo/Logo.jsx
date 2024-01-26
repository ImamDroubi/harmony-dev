import React from 'react'
import "./logo.scss"
import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <div className='logo'><Link to={"/"}>HARMONY</Link></div>
  )
}
