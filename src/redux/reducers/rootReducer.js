import { combineReducers } from 'redux';
import accountReducer from '../reducers/accountReducer';

import counterReducer from '../reducers/counterReducer';


const rootReducer = combineReducers({

    counter: counterReducer,
    account: accountReducer,

});

export default rootReducer;