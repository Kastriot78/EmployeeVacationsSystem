import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/LoginSignup/SignUp';
import Login from './components/LoginSignup/Login';
import AdminLayout from './AdminLayout';
import DashboardPanel from './components/AdminDashboard/DashboardPanel';
import PrivateRoute from './utils/PrivateRoute';
import AdminRoute from './utils/AdminRoute';
import Notfound from './Pages/Notfound';
import RequestVacation from './components/CreateVacation/RequestVacation';
import Home from './Pages/Home';
import VacationsHistory from './components/VacationsHistory/VacationsHistory';
import PageLayout from './PageLayout';
import PendingVacations from './components/PendingVacations/PendingVacations';
import AllVacations from './components/AdminDashboard/AllVacations/AllVacations';
import CalendarComponent from './Pages/AllVacationView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path='' element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/my-vacations" element={<VacationsHistory />} />
            <Route path="/full-calendar" element={<CalendarComponent />} />
          </Route>
        </Route>
        <Route element={<AdminLayout />}>
          <Route path='' element={<AdminRoute />}>
            <Route path="/admin/admin-dashboard" element={<DashboardPanel />} />
            <Route path="/admin/pending-vacations" element={<PendingVacations />} />
            <Route path="/admin/all/vacations" element={<AllVacations />} />
          </Route>
        </Route>

        <Route path='*' element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
