import React from 'react'
import "./topbar-layout.scss";
import Topbar from '../../other/topbar/Topbar';
import { Outlet } from 'react-router-dom';
export default function TopbarLayout() {
  return (
    <div className='topbar-layout'>
      <Topbar/>
      <main>
          <Outlet />
      </main>
    </div>
  )
}
