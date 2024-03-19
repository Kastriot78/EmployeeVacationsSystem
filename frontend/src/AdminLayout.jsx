import { Outlet } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';

const AdminLayout = () => {
  return (
    <div>
      <AdminDashboard />
    </div>
  )
}

export default AdminLayout
