import axios from 'axios';
import {
    apiUrl
} from '../constants/apiUrl';
import {
    signUpStart,
    signUpSuccess,
    signUpFailure,
    loginStart,
    loginSuccess,
    loginFailure,
    getAllUsersStart,
    getAllUsersSuccess,
    getAllUsersFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure
} from './userRedux';

import {
    getVacationsHistoryStart,
    getVacationsHistorySuccess,
    getVacationsHistoryFailure,
    getPendingVacationsStart,
    getPendingVacationsSuccess,
    getPendingVacationsFailure,
    getAllVacationsStart,
    getAllVacationsSuccess,
    getAllVacationsFailure
} from './vacationRedux';
import api from '../utils/api';

// user actions
export const allUsers = async (user, dispatch) => {
    dispatch(getAllUsersStart());
    try {
        const res = await api.get(`${apiUrl}/api/users`);
        dispatch(getAllUsersSuccess(res.data));
    } catch (error) {
        dispatch(getAllUsersFailure(error?.response?.data?.error));
    }
}

export const register = async (user, dispatch) => {
    dispatch(signUpStart());
    try {
        const res = await api.post(`${apiUrl}/api/users/register`, user);
        dispatch(signUpSuccess(res.data));
    } catch (error) {
        dispatch(signUpFailure(error?.response?.data?.error));
    }
}

export const login = async (formData, user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${apiUrl}/api/users/login`, formData, {
            headers: { Authorization: 'Bearer ' + user?.token }
        });
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure(error?.response?.data?.error));
    }
}

export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        const res = await api.delete(`${apiUrl}/api/users/${id}`);
        dispatch(deleteUserSuccess(res.data));
    } catch (error) {
        dispatch(deleteUserFailure(error?.response?.data?.error));
    }
}
// user actions

// vacations history
export const allVacationsHistory = async (user, dispatch) => {
    dispatch(getVacationsHistoryStart());
    try {
        const res = await api.get(`${apiUrl}/api/vacations/${user._id}`);
        dispatch(getVacationsHistorySuccess(res.data.vacations));
    } catch (error) {
        dispatch(getVacationsHistoryFailure(error?.response?.data?.error));
    }
}

export const allPendingVacations = async (dispatch) => {
    dispatch(getPendingVacationsStart());
    try {
        const res = await api.get(`${apiUrl}/api/vacations/status/Pending`);
        dispatch(getPendingVacationsSuccess(res.data));
    } catch (error) {
        dispatch(getPendingVacationsFailure(error?.response?.date?.error));
    }
}

export const entireVacations = async (user, dispatch) => {
    dispatch(getAllVacationsStart());
    try {
        const res = await api.get(`${apiUrl}/api/vacations/status/All`);
        dispatch(getAllVacationsSuccess(res.data));
    } catch (error) {
        dispatch(getAllVacationsFailure(error?.response?.data?.error));
    }
}
// vacations history
