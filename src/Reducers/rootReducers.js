import { combineReducers } from 'redux';
import accountReducer from '../Reducers/account.reducer';


const rootReducer = combineReducers({
    account: accountReducer,
  
})

export default rootReducer;
