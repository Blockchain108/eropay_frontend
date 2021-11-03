import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './_reducers';

const store = preloadState => (
    createStore(
        rootReducer,
        preloadState,
        applyMiddleware(
            thunkMiddleware
        )
    )
);

export default store;