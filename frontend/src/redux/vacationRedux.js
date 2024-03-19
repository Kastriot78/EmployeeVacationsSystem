import {
    createSlice
} from '@reduxjs/toolkit';

const initialState = {
    vacationsHistory: [],
    pendingVacations: [],
    allVacations: [],
    loading: false,
    error: '',
    success: false
}

const vacationSlice = createSlice({
    name: 'vacation',
    initialState,
    reducers: {
        getVacationsHistoryStart: (state) => {
            state.loading = true;
            state.success = false;
            state.error = '';
        },
        getVacationsHistorySuccess: (state, action) => {
            state.loading = false;
            state.vacationsHistory = action.payload;
            state.success = true;
            state.error = '';
        },
        getVacationsHistoryFailure: (state, action) => {
            state.loading = false;
            state.vacationsHistory = [];
            state.error = action.payload;
        },
        getPendingVacationsStart: (state) => {
            state.loading = true;
            state.pendingVacations = [];
            state.error = '';
        },
        getPendingVacationsSuccess: (state, action) => {
            state.loading = false;
            state.pendingVacations = action.payload;
            state.error = '';
        },
        getPendingVacationsFailure: (state, action) => {
            state.loading = false;
            state.pendingVacations = [];
            state.error = action.payload;
        },
        getAllVacationsStart: (state) => {
            state.loading = true;
            state.allVacations = [];
            state.error = '';
        },
        getAllVacationsSuccess: (state, action) => {
            state.loading = false;
            state.allVacations = action.payload;
            state.error = '';
        },
        getAllVacationsFailure: (state, action) => {
            state.loading = false;
            state.allVacations = [];
            state.error = action.payload;
        }
    }
});

export const {
    getVacationsHistoryStart,
    getVacationsHistorySuccess,
    getVacationsHistoryFailure,
    getPendingVacationsStart,
    getPendingVacationsSuccess,
    getPendingVacationsFailure,
    getAllVacationsStart,
    getAllVacationsSuccess,
    getAllVacationsFailure
} = vacationSlice.actions;
export default vacationSlice.reducer;