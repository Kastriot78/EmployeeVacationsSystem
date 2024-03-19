import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './components/AdminDashboard/MainAdmin/TopBar';
import { useSelector } from 'react-redux';

const PageLayout = () => {
    const { user } = useSelector(state => state.user);
    return (
        <>
            {user && <TopBar />}
            <Outlet />
        </>
    )
}

export default PageLayout