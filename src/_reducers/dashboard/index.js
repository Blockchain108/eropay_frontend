import { dashboardConstants } from '../../_constants';

const initialState = {
    accData: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case dashboardConstants.STELLAR_ACCOUNT_INFO:
            return { ...state, ...action.data }
        default:
            return state
    }
}