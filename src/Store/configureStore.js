import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../Reducers/rootReducers';
import thunk from 'redux-thunk';

const configureStore = () => {
    return{...createStore(rootReducer, applyMiddleware(thunk))}
};

export default configureStore