import Sidebar from './Sidebar/Sidebar';
import MainAdmin from './MainAdmin/MainAdmin';
import { useState } from 'react';

const AdminDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <MainAdmin showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </div>
  )
}

export default AdminDashboard
