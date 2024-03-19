import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { apiUrl } from '../constants/apiUrl';
import { useSelector } from 'react-redux';
import api from '../utils/api';

const CalendarComponent = () => {
    const [events, setEvents] = useState([]);
    const { user } = useSelector(state => state.user);
    const fetchApprovedVacations = async () => {
        try {
            const response = await api.get(`${apiUrl}/api/vacations/all/approved`);
            const approvedEvents = response.data.flatMap(vacation =>
                vacation.dates.map(date => ({
                    title: `${vacation.user.name} ${vacation.user.lastName}`,
                    start: date
                }))
            );
            setEvents(approvedEvents);
        } catch (error) {
            console.error('Error fetching approved vacations:', error);
        }
    };

    useEffect(() => {
        fetchApprovedVacations();
    }, [user]);

    return (
        <div>
            <div className="container mt-5">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                />
            </div>
        </div>
    );
};

export default CalendarComponent;
