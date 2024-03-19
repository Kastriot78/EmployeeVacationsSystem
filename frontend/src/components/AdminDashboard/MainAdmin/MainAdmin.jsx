import React from 'react'
import TopBar from './TopBar'
import { Outlet } from 'react-router-dom'

const MainAdmin = ({ setShowSidebar }) => {
  return (
    <div id='main-panel' className='main-panel'>
      <TopBar setShowSidebar={setShowSidebar} />
      <div className="container-fluid wrapper">
        <Outlet />
      </div>
    </div>
  )
}

export default MainAdmin
