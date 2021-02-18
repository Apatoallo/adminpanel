import { TRADE_VIEW_ACTIONS } from './TradeViewActions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case TRADE_VIEW_ACTIONS.SEND_ORDER_INFORMATION:
      return {
        ...state,
        clickedOrderInfo: action.payload.data
      };
    default:
      return state;
  }
};
