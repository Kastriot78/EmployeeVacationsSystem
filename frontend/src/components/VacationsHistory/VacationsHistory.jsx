import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allVacationsHistory } from '../../redux/apiCalls';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import BlankVacations from '../../utils/BlankVacations';
import { apiUrl } from '../../constants/apiUrl';
import DeleteModal from '../../utils/DeleteModal';
import { formatDates } from '../../utils/utils';
import api from '../../utils/api';

import './style.css';
const VacationsHistory = () => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loadingDeleted, setLoadingDeleted] = useState(false);
    const [vacationId, setVacationId] = useState('');
    const { user } = useSelector(state => state.user);
    const { vacationsHistory, loading } = useSelector(state => state.vacation);
    const dispatch = useDispatch();

    const handleDeleteVacation = async () => {
        setLoadingDeleted(true);
        setOpenDeleteModal(true);
        setSuccess(false);

        await api.delete(`${apiUrl}/api/vacations/remove/${vacationId}`).then(res => {
            setOpenDeleteModal(false);
            setSuccess(true);
            setLoadingDeleted(false);
            // Refetch data after successful deletion
            allVacationsHistory(user, dispatch);
        }).catch(error => {
            setLoadingDeleted(false);
        })
    }

    const handleOpenModal = (id) => {
        setOpenDeleteModal(true);
        setVacationId(id);
    }

    useEffect(() => {
        allVacationsHistory(user, dispatch)
    }, [dispatch, user]);

    const [selectedDates, setSelectedDates] = useState([]);

    const getUserApprovedVacationsHistory = async () => {
        await api.get(`${apiUrl}/api/vacations/${user?._id}/approved`).then(res => {
            const dates = res.data.vacations.flatMap(vacation => vacation.dates);
            setSelectedDates(dates.map(date => new Date(date)));
        });
    }

    useEffect(() => {
        getUserApprovedVacationsHistory();
    }, [vacationsHistory, success]);

    return (
        <div className='vacation_history_wrapp mt-4'>
            <DeleteModal show={openDeleteModal} setShow={setOpenDeleteModal} handleDelete={handleDeleteVacation} loading={loadingDeleted} />
            <div className='container'>
                <h2 className="title">{user?.name} {user?.lastName}</h2>
                <h6 className='sub-title mb-4'>{selectedDates?.length} Vacation Days Used out of 18</h6>
                {
                    vacationsHistory?.length > 0 ? <div className="row">
                        <div className="col-md-7">
                            <div>
                                {loading ? <div className='d-flex align-items-center flex-wrap gap-4 mt-5 skeleton_wrap'>
                                    <div className='skeleton_line'></div>
                                    <div className='skeleton_line'></div>
                                    <div className='skeleton_line'></div>
                                    <div className='skeleton_line'></div>
                                    <div className='skeleton_line'></div>
                                </div> : vacationsHistory?.map(vacation => (
                                    <div key={vacation.id} className='vacation-border-bottom mb-3'>
                                        <span className='status_title'>
                                            Status: <span className={`status_span ${vacation.status === 'Approved' ? 'badge badge-light-success' : vacation.status === 'Declined' ? 'badge badge-light-danger' : 'badge badge-light-warning'}`}>{vacation?.status}</span>
                                        </span>
                                        <div className="d-flex justify-content-between gap-4 mt-3 items_wrapper">
                                            <div className='d-flex align-items-center gap-4 flex-wrap single_item_wrapper'>
                                                {formatDates(vacation.dates).map((formattedDate, index) => (
                                                    <div className='item' key={index}>
                                                        <span>{formattedDate}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            {vacation.status === 'Pending' && <div >
                                                <button className='btn badge-light-danger remove-btn' onClick={() => handleOpenModal(vacation?._id)}>Remove</button>
                                            </div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className='calendar_wrapper'>
                                <DayPicker
                                    mode="range"
                                    min={1}
                                    max={10}
                                    // selected={selectedDates} // Pass selected dates here
                                    selected={selectedDates}
                                    isLoading={true}
                                />
                            </div>
                        </div>
                    </div> : <BlankVacations />
                }
            </div>
        </div>
    )
}

export default VacationsHistory;

