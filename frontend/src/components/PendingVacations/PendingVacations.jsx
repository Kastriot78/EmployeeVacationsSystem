import React, { useEffect, useState } from 'react';
import { allPendingVacations } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import handleUpdateStatus from '../../utils/vacationUtils';
import VacationsTable from '../../utils/VacationsTable';

import './style.css';

const PendingVacations = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [success, setSuccess] = useState(false); // refresh data when status is changed
    const { loading, pendingVacations } = useSelector(state => state.vacation);
    const { user } = useSelector(state => state.user);

    const handleStatusUpdate = async (vacationId, status) => {
        handleUpdateStatus(vacationId, status, user.token, setLoader, setSuccess);
    };


    useEffect(() => {
        allPendingVacations(dispatch, user);
        setSuccess(false);
    }, [user, dispatch, success]);
    return (
        <div className='pending_vacations_card'>
            <VacationsTable
                data={pendingVacations}
                status="Pending"
                loading={loading}
                title="Pending Vacations"
                user={user}
                handleUpdateStatus={handleStatusUpdate}
                loader={loader}
                success={success}
            />
        </div>
    )
}

export default PendingVacations
