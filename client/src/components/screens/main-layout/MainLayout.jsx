import React from 'react'
import "./main-layout.scss";
import Topbar from '../../other/topbar/Topbar';
import Sidebar from '../../menus/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
export default function MainLayout() {
  return (
    <div className='main-layout'>
      <Topbar/>
      <main>
        <Sidebar/>
        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
