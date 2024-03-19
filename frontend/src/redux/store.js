import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userReducer from './userRedux';
import vacationReducer from './vacationRedux';

const rootReducer = combineReducers({
    user: userReducer,
    vacation: vacationReducer
});

const store = configureStore({
    reducer: rootReducer
})

export default store;