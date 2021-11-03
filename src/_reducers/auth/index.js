import { userConstants } from '../../_constants';

const initialState = {
    isAuth: false,
    isLoading: false,
    userData: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case userConstants.AUTH_DATA:
            return { ...state, ...action.data }
        case userConstants.PAGE_LOADING:
            return { ...state, isLoading: action.data }
        default:
            return state
    }
}