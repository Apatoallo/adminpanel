import { ORDER_BOOK_ACTIONS } from './orderBookActions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_BOOK_ACTIONS.UPDATE_ORDER_BOOK:
      return {
        ...state,
        ticker: action.payload.ticker,
        buyers: action.payload.buyers,
        wholeBuyers: action.payload.buyers,
        sellers: action.payload.sellers,
        wholeSellers: action.payload.sellers,
        lastTransactions: action.payload.last_transactions
      };
    default:
      return state;
  }
};
