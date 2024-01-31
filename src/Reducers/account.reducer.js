import * as ActionTypes from '../Constants/ActionTypes';
import jwt_decode from 'jwt-decode';

const initialState = {
    token: localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null,
    isLoading: false,
    changePasswordIsLoading: false,
    currentUser: localStorage.getItem('authTokens') ? jwt_decode(JSON.parse(localStorage.getItem('authTokens'))['access']) : null,
    transferDetails: [],
}



const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.LOGIN:
            return {...state, token: action.token, isLoading: false};
        case ActionTypes.LOGOUT:
            return {...state, state: initialState};
        case ActionTypes.LOGIN_IS_LOADING:
            return {...state, isLoading: action.isLoading}
        case ActionTypes.SET_CURRENT_USER:
            return {...state, currentUser: action.currentUser}
        case ActionTypes.USER_DETAILS:
            return {...state, currentUser: action.userdetails}
        case ActionTypes.TRANSFER_SUCCESS:
                return{
                    ...state,
                    transferDetails:action.payload,
                }    
        // case ActionTypes.CHANGE_PASSWORD_IS_LOADING:
        //     return{...state, changePasswordIsLoading: action.changePasswordIsLoading}
        default:
            return state;
    }
}

// const transferReducer = (state = initialState,action)=>{
//     switch (action.type) {
        
//         case ActionTypes.TRANSFER_SUCCESS:
//             return{
//                 ...state,
//                 transferDetails:action.payload,
//             }  
    
//         default:
//             return state;
//     }
// }

export default loginReducer;



