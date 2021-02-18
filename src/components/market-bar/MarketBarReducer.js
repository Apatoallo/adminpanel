import { MARKET_BAR_ACTIONS } from './MarketBarActions';
import { PRIVATE_SOCKET_ACTIONS } from '../../api/PrivateSocketActions';
import { LOGIN_ACTIONS } from '../../modules/login/LoginActions';

const initialState = {
  selectedMarket: {
    base_currency: 'BTC',
    base_currency_decimal: 8,
    counter_currency: 'TRY',
    counter_currency_decimal: 2,
    market_code: 'BTCTRY',
    minimum_order_amount: '0.00000000',
    url_symbol: 'btctry'
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${MARKET_BAR_ACTIONS.GET_MARKETS_INFO}_SUCCESS`:
      const marketCode = state.selectedMarket.market_code;
      return {
        ...state,
        markets: action.payload.data.data.markets,
        selectedMarket: action.payload.data.data.markets.filter(
          market => market.market_code === marketCode
        )[0] || { ...initialState.selectedMarket }
      };
    case MARKET_BAR_ACTIONS.CHANGE_MARKET:
      return {
        ...state,
        selectedMarket: state.markets.filter(
          market => market.market_code === action.payload.data
        )[0]
      };
    case MARKET_BAR_ACTIONS.UPDATE_TICKERS:
      return {
        ...state,
        tickers: action.payload
      };
    case PRIVATE_SOCKET_ACTIONS.DEPOSIT:
    case PRIVATE_SOCKET_ACTIONS.WITHDRAW:
    case PRIVATE_SOCKET_ACTIONS.NEW_ORDER:
    case PRIVATE_SOCKET_ACTIONS.FILL_ORDER:
    case PRIVATE_SOCKET_ACTIONS.PARTIAL_ORDER:
    case PRIVATE_SOCKET_ACTIONS.CANCEL_ORDER:
    case PRIVATE_SOCKET_ACTIONS.RECONNECT:
      return {
        ...state,
        accountLinesUpdateTimeout: 2000
      };
    case `${MARKET_BAR_ACTIONS.GET_ACCOUNT_LINES}_SUCCESS`:
      return {
        ...state,
        accountLines: action.payload.data.data.account_lines,
        accountLinesUpdateTimeout: 0
      };
    case LOGIN_ACTIONS.LOGOUT:
      return {
        ...state,
        accountLines: undefined
      };
    default:
      return state;
  }
};
