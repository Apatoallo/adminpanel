import { PREFERENCES_ACTIONS } from './PreferencesActions';

const initialState = {
  orderType: 'MARKET_ORDER',
  orderDirection: 'B',
  advancedTradeView: false,
  historyType: 'userHistory',
  tabletTabType: 'orderBook',
  mobileTabType: 'tradePane',
  chartType: 'tradeView',
  showAllMarkets: true,
  showAllOpenOrders: true,
  hideCancelled: true,
  collapseOpenOrders: false,
  selectedTickerGroup: {
    currency_code: 'TRY',
    name: 'Türk Lirası',
    precedence: 0
  },
  instantTradeFirstCoin: {
    currency_code: 'TRY',
    name: 'Türk Lirası',
    precedence: 0,
    min_amount: '10.00000000',
    max_amount: '10000.00000000',
    def_amount: '100.00000000',
    decimal_count: 2
  },
  instantTradeSecondCoin: {
    currency_code: 'BTC',
    name: 'Bitcoin',
    precedence: 10,
    min_amount: '0.00010000',
    max_amount: '10.00000000',
    def_amount: '0.10000000',
    decimal_count: 8
  },
  closedOrdersPageNumber: 0,
  hideZeroBalances: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PREFERENCES_ACTIONS.CHANGE_PREFERENCES:
      return {
        ...state,
        [action.payload.data.key]: action.payload.data.value
      };
    default:
      return state;
  }
};
