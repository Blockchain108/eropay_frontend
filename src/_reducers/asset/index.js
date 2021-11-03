import { assetConstants } from '../../_constants';

const initialState = {
    data: {
        asset_type: 'native', 
        asset_name: 'Lumens',
        asset_anchorName: 'XLM'
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case assetConstants.ASSET_DATA:
            return { ...state, data : action.data }
        default:
            return state
    }
}