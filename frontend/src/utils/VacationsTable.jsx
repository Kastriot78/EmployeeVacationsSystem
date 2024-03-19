import React, { useCallback, useEffect, useState } from 'react';
import BtnLoader from '../utils/BtnLoader';
import { useSelector } from 'react-redux';
import { apiUrl } from '../constants/apiUrl';
import axios from 'axios';
import { formatDates } from '../utils/utils';

const VacationsTable = ({ data, status, loading, title, handleUpdateStatus, loader, success }) => {
    const [statusFilter, setStatusFilter] = useState(status); // Initial filter value
    const [filteredData, setFilteredData] = useState(data);
    const [searchQuery, setSearchQuery] = useState('');

    const { user } = useSelector(state => state.user);

    const getDataByStatus = useCallback(async (status) => {
        setStatusFilter(status);
        try {
            const res = await axios.get(`${apiUrl}/api/vacations/status/${status}`, {
                headers: { Authorization: `Bearer ${user?.token}` }
            })
            setFilteredData(res.data);
        } catch (error) {
            console.log('error: ', error);
        }
    }, [user]);

    const handleSearch = (searchQuery) => {
        const filteredData = data.filter(vacation =>
            (statusFilter === 'All' || vacation.status === statusFilter) &&
            (vacation.user.name.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredData(filteredData);
    };
    useEffect(() => {
        getDataByStatus(statusFilter);
    }, [statusFilter, success, getDataByStatus]);

    return (
        <div>
            <div className="top__head mt-5 pt-4">
                <div className="top__head_title">
                    <h3 className='mb-1'>{title}</h3>
                    <h4 className='text-gray-400'>Total - {filteredData?.length}</h4>
                </div>
                {
                    data?.length > 0 && <div className="toolbar_wrapp my-1">
                        <div className="me-4 my-1">
                            <select value={statusFilter} onChange={(e) => getDataByStatus(e.target.value)} className="w-125px form-select form-select-solid" tabIndex="-1" aria-hidden="true">
                                <option value="All">All</option>
                                <option value="Approved">Approved</option>
                                <option value="Declined">Declined</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>
                        <div className="d-flex align-items-center position-relative my-1">
                            <i className="fa-solid fa-magnifying-glass position-absolute ms-3 fs-15"></i>
                            <input
                                type="text"
                                className="form-control form-control-solid form-select-sm w-150px ps-9"
                                placeholder="Search User"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    handleSearch(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                }
            </div>
            <div className="card-body vacations_card_body">
                <div className="table-responsive">
                    {
                        filteredData?.length > 0 ? <table className='w-100 m-0'>
                            {
                                loading ? <tbody>
                                    <tr>
                                        <td className='w-100 skeleton_line mb-2 d-block'></td>
                                    </tr>
                                    <tr>
                                        <td className='w-100 skeleton_line mb-2 d-block'></td>
                                    </tr>
                                </tbody> : <>
                                    <thead>
                                        <tr>
                                            <th className='min-w-250px'>User</th>
                                            <th className='min-w-150px'>Date</th>
                                            <th className='min-w-90px'>Comment</th>
                                            <th className='min-w-90px'>Status</th>
                                            <th className='min-w-50px text-end'>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData?.map(vacation => <tr className='odd' key={vacation?._id}>
                                            <td>
                                                <div className='d-flex flex-column justify-content-center'>
                                                    <div className='fs-14 text-gray-800 text-hover-primary user_table_name'>{vacation?.user?.name} {vacation?.user?.lastName}</div>
                                                    <div className='text-gray-400 fs-14'>{vacation?.user?.email}</div>
                                                </div>
                                            </td>
                                            <td className='fs-14 date'>{formatDates(vacation.dates).join(', ')}</td>
                                            <td className='fs-14 text-gray-700'>{vacation.comment.length > 0 ? vacation.comment : 'No comment'}</td>
                                            {/* <td className='fs-14 date'>{vacation?.dates?.map(date => date).join(', ')}</td> */}
                                            <td>
                                                <span className={`badge ${vacation?.status === 'Pending' ? 'badge-light-warning' : vacation?.status === 'Approved' ? 'badge-light-success' : 'badge-light-danger'}`}>{vacation?.status}</span>
                                            </td>
                                            <td className='text-end'>
                                                <div className='d-flex justify-content-end gap-3'>
                                                    {
                                                        vacation?.status !== 'Approved' && <button className='btn btn-light btn-sm' onClick={() => handleUpdateStatus(vacation?._id, 'Approved')}>
                                                            {loader ? <BtnLoader /> : 'Approve'}
                                                        </button>
                                                    }
                                                    <button className='btn btn-light btn-sm decline-btn' onClick={() => handleUpdateStatus(vacation?._id, 'Declined')}>
                                                        {loader ? <BtnLoader /> : 'Decline'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>)
                                        }
                                    </tbody>
                                </>
                            }
                        </table>
                            : <div className='text-center'>
                                <img src='/images/empty_state.svg' alt='empty data' />
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default VacationsTable
