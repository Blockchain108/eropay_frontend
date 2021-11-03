import { tradeConstants } from '../../_constants';

const initialState = {
    baseAsset: {
        asset_type: 'native',
        asset_anchorName: 'XLM'
    },
    counterAsset: {
        asset_image: "https://www.centre.io/images/usdc/usdc-icon-86074d9d49.png",
        asset_anchorName: "USDC",
        asset_issuer: "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN"
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case tradeConstants.TRADE_ASSET:
            return { ...state, ...action.data }
        default:
            return state
    }
}