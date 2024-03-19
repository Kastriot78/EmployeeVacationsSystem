import {
    createSlice
} from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('authUser') ?? 'null'),
    loading: false,
    error: false,
    errorMessage: '',
    success: false,
    users: [],
    isDeleted: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        signUpStart: (state) => {
            state.loading = true;
            state.success = false;
        },
        signUpSuccess: (state, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
        },
        signUpFailure: (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMessage = action.payload;
        },
        loginStart: (state) => {
            state.loading = true;
            state.success = false;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = false;
            localStorage.setItem('authUser', JSON.stringify(action.payload));
            state.success = true;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
            state.error = true;
            state.success = false;
        },
        getAllUsersStart: (state) => {
            state.loading = true;
            state.users = [];
        },
        getAllUsersSuccess: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        getAllUsersFailure: (state, action) => {
            state.loading = false;
            state.users = [];
            state.errorMessage = action.payload;
        },
        deleteUserStart: (state) => {
            state.loading = true;
            state.isDeleted = false;
        },
        deleteUserSuccess: (state, action) => {
            state.loading = false;
            state.users = state.users.filter(user => user.id !== action.payload._id);
            state.isDeleted = true;
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.isDeleted = false;
        },
        logout: (state) => {
            localStorage.removeItem("authUser");
            state.user = null;
        },
        //Reset all properties except 'user'
        clearState: (state) => {
            Object.assign(state, {
                loading: false,
                error: false,
                errorMsg: '',
                success: false,
                users: [],
                isDeleted: false,
            });
        },
    }
});

export const {
    getAllUsersStart,
    getAllUsersSuccess,
    getAllUsersFailure,
    signUpStart,
    signUpSuccess,
    signUpFailure,
    loginStart,
    loginSuccess,
    loginFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    logout
} = userSlice.actions;
export default userSlice.reducer;