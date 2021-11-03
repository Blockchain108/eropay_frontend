import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import auth from './auth';
import dashboard from './dashboard';
import asset from './asset';
import trade from './trade';
import ThemeOptions from './ThemeOptions';

const rootReducer = combineReducers({
    auth,
    dashboard,
    asset,
    authentication,
    registration,
    users,
    alert,
    trade,
    ThemeOptions
});

export default rootReducer;