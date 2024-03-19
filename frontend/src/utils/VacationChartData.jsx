import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { apiUrl } from '../constants/apiUrl';
import { useSelector } from 'react-redux';

const VacationChartData = () => {
    const [chartData, setChartData] = useState({ series: [], options: {} });
    const [loading, setLoading] = useState(true);
    const { user } = useSelector(state => state.user);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${apiUrl}/api/vacations/chart/chartData`, {
                    headers: { Authorization: `Bearer ${user?.token}` }
                });
                const data = res.data;

                const newSeries = [{
                    name: 'Vacations',
                    data: data.map(month => month.data)
                }];

                const newOptions = {
                    chart: {
                        type: 'bar',
                        height: 350
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '55%',
                            endingShape: 'rounded'
                        },
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ['transparent']
                    },
                    xaxis: {
                        categories: data.map(month => month.name),
                    },
                    yaxis: {
                        title: {
                            text: 'Vacations'
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return val + ' vacations';
                            }
                        }
                    }
                };

                setChartData({ series: newSeries, options: newOptions });
            } catch (error) {
                console.error('Error fetching chart data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    return (
        <div>
            {loading ? (
                <div className='skeleton_line w-100 h-350'></div>
            ) : (
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                />
            )}
        </div>
    );
};

export default VacationChartData;
