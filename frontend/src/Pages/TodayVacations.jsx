import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import { apiUrl } from '../constants/apiUrl';
import { useSelector } from 'react-redux';

const TodayVacations = ({ url, title }) => {
    const [numberOfVacations, setNumberOfVacations] = useState('');
    const { user } = useSelector(state => state.user);
    const fetchData = async () => {
        try {
            const res = await axios.get(`${apiUrl}/${url}`, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            setNumberOfVacations(res.data);
        } catch (error) {
            console.log('Error fetching data:', error);
            setNumberOfVacations('N/A');
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className='donut_wrapper'>
            <div className="donut_chart donut_chart_blue">
                <svg width="160" height="160" viewBox="0 0 40 40" className="donut">
                    <circle className="donut-hole" cx="20" cy="20" r="15.91549430918954" fill="#fff">
                    </circle>
                    <circle className="donut-ring" cx="20" cy="20" r="15.91549430918954" fill="transparent"
                        strokeWidth="3.5"></circle>
                    <circle className="donut-segment donut-segment-2" cx="20" cy="20" r="15.91549430918954"
                        fill="transparent" strokeWidth="3.5" strokeDasharray="100 0"
                        strokeDashoffset="25"></circle>
                    <g className="donut-text donut-text-1">

                        <text y="50%" transform="translate(0, 2)">
                            <tspan x="50%" textAnchor="middle" className="donut-percent">{numberOfVacations}</tspan>
                        </text>
                        <text y="60%" transform="translate(0, 2)">
                            <tspan x="50%" textAnchor="middle" className="donut-data">{title}</tspan>
                        </text>
                    </g>
                </svg>
            </div>
        </div>
    )
}

export default TodayVacations;
