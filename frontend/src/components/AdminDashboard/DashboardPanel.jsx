import React, { useEffect } from 'react'
import CustomCard from '../../utils/CustomCard';
import { useDispatch, useSelector } from 'react-redux';
import AllUsers from './AllUsers/AllUsers';
import { allUsers, entireVacations, allPendingVacations } from '../../redux/apiCalls';
import TodayVacations from '../../Pages/TodayVacations';
import { apiUrlTodayVacations, apiUrlWeekVacations } from '../../constants/apiUrl';
import VacationChartData from '../../utils/VacationChartData';
import NoticePage from '../../Pages/NoticePage';

const DashboardPanel = () => {
  const { users, loading, user } = useSelector(state => state.user);
  const { allVacations, pendingVacations } = useSelector(state => state.vacation);
  const dispatch = useDispatch();

  useEffect(() => {
    allUsers(user, dispatch);
    entireVacations(user, dispatch);
    allPendingVacations(dispatch, user);
  }, [dispatch, user]);

  return (
    <div>
      <div className="page-header-admin-dashboard">
        <h2 className='title'>Welcome To Dashboard</h2>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            <div className="col-sm-12">
              <div className="bg-primary custom-card card-box card">
                <div className="p-4 card-body">
                  <div className="align-items-center row">
                    <div className="col-xl-8 col-sm-6 col-12 img-bg offset-lg-6  offset-xl-5 offset-sm-6 col">
                      <h4 className="d-flex  mb-3">
                        <span className="font-weight-bold text-white ">{user?.name} {user?.lastName}</span>
                      </h4>
                      <p className="text-white mb-1">Welcome again, here are your application data.</p>
                    </div>
                    <img src="/images/work3.png" alt='' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-sm-12">
              <CustomCard title="All Users" subTitle="Users on App" number={users?.length} />
            </div>
            <div className="col-xl-4 col-lg-6 col-sm-12">
              <CustomCard title="All Vacations" subTitle="Vacations on App" number={allVacations?.length} />
            </div>
            <div className="col-xl-4 col-lg-6 col-sm-12">
              <CustomCard title="Pending Vacations" subTitle="Pending on App" number={pendingVacations?.length} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="custom-card h-100">
                <div className="card-body">
                  <h3 className="vacations-title">Vacations</h3>
                  <div className="row">
                    <div className="col-sm-6">
                      <TodayVacations url={apiUrlTodayVacations} title="Today" />
                    </div>
                    <div className="col-sm-6">
                      <TodayVacations url={apiUrlWeekVacations} title="This Week" />
                    </div>
                  </div>
                  <NoticePage />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="custom-card h-100">
                <div className="card-body">
                  <VacationChartData />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="custom-card card">
            <div className="card-body">
              <div className="content-label">All Users</div>
              <table className='table'>
                <tbody>
                  <AllUsers users={users} loading={loading} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPanel;
