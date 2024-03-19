import React, { useState } from 'react';
import axios from 'axios';
import BtnLoader from '../../utils/BtnLoader';
import { apiUrl } from '../../constants/apiUrl';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './style.css';
import api from '../../utils/api';

const RequestVacation = () => {
    const [loading, setLoading] = useState(false);
    const [days, setDays] = useState([]);
    const [comment, setComment] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();

    const isSameDay = (dateA, dateB) => {
        return (
            dateA.getDate() === dateB.getDate() &&
            dateA.getMonth() === dateB.getMonth() &&
            dateA.getFullYear() === dateB.getFullYear()
        );
    };

    const handleDayClick = (newDay) => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const isAlreadySelected = days.some(day => isSameDay(day, newDay));

        if (newDay < now) {
            // Ignore clicks on past dates
            return;
        }

        if (isAlreadySelected) {
            const updatedDays = days.filter(day => !isSameDay(day, newDay));
            setDays(updatedDays);
        } else {
            setDays([...days, newDay]);
        }
    };

    const timeZoneOffset = new Date().getTimezoneOffset() * 60000; // Get local time zone offset in milliseconds

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert selected dates to ISO strings in UTC
        const formattedDates = days.map(date => {
            const utcDate = new Date(date.getTime() - timeZoneOffset);
            return format(utcDate, 'yyyy-MM-dd');
        });

        // Check if any days are selected
        if (days.length === 0) {
            setErrorMsg('Please select days for vacations!');
            return;
        }

        try {
            setLoading(true);
            formattedDates.sort();

            await api.post(`${apiUrl}/api/vacations/request`, {
                dates: formattedDates,
                comment: comment,
                userId: user._id
            }).then(res => {
                toast.success('Vacation request saved successfully!');
                setDays([]);
            });

            setComment('');
            setErrorMsg('');
            setLoading(false);
            navigate('/my-vacations');
        } catch (error) {
            console.error('Error saving vacation dates.');
            setErrorMsg(error?.response?.data?.error);
            setLoading(false);
        }
    };

    return (
        <div className='request_vacation_wrapper mt-5'>
            <h1 className='title'>Vacation Request Form</h1>
            <p className='description'>Fill in this form to request your vacation and get it quickly approved</p>
            <form action="" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="">Select Start/End Dates</label>
                            <DayPicker
                                mode="multiple"
                                min={1}
                                max={10}
                                selected={days}
                                // onSelect={setDays}
                                onDayClick={handleDayClick}
                            />
                            {errorMsg ? <span className='input_error'>{errorMsg}</span> : ''}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="">Additional Comments</label>
                            <textarea
                                type="text"
                                className='form-control'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-12">
                        <button className='auth-btn'>
                            {loading ? <BtnLoader /> : 'Save'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RequestVacation;



