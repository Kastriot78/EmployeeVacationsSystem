import React, { useEffect, useState } from 'react';
import { entireVacations } from '../../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import VacationsTable from '../../../utils/VacationsTable';
import handleUpdateStatus from '../../../utils/vacationUtils';

const AllVacationsComponent = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [success, setSuccess] = useState(false); // refresh data when status is changed
    const { loading, allVacations } = useSelector(state => state.vacation);
    const { user } = useSelector(state => state.user);

    const handleStatusUpdate = async (vacationId, status) => {
        handleUpdateStatus(vacationId, status, user.token, setLoader, setSuccess);
    };


    useEffect(() => {
        entireVacations(user, dispatch);
        setSuccess(false); // reset success state after fetching data
    }, [user, dispatch, success]);

    return (
        <div className='pending_vacations_card'>
            <VacationsTable
                data={allVacations}
                status="All"
                loading={loading}
                title="All Vacations"
                user={user}
                handleUpdateStatus={handleStatusUpdate}
                loader={loader}
                success={success}
            />
        </div>
    );
};

export default AllVacationsComponent;
