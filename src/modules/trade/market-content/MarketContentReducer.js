import { MARKET_CONTENT_ACTIONS } from './MarketContentActions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case MARKET_CONTENT_ACTIONS.SEND_ORDER_INFORMATION:
      return {
        ...state,
        clickedOrderInfo: action.payload.data
      };
    default:
      return state;
  }
};
