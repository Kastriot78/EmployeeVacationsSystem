// vacationUtils.js

import axios from 'axios';
import {
    apiUrl
} from '../constants/apiUrl';
import {
    toast
} from 'react-toastify';

const handleUpdateStatus = async (vacationId, status, userToken, setLoader, setSuccess) => {
    setLoader(true);
    try {
        await axios.put(`${apiUrl}/api/vacations/update`, {
            vacationId,
            newStatus: status
        }, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }).then(res => {
            setSuccess(true); // set success to trigger component rerender
            setLoader(false);
            toast.success('Vacation status updated successfully');
        });
    } catch (error) {
        console.error('Error updating vacation status:', error);
        setLoader(false);
    }
};

export default handleUpdateStatus;