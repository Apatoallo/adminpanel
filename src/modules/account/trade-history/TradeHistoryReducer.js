import { TRADE_HISTORY_ACTIONS } from './TradeHistoryActions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${TRADE_HISTORY_ACTIONS.GET_TRADE_HISTORY}_SUCCESS`:
      return {
        ...state,
        result: action.payload.data.data
      };
    default:
      return state;
  }
};
