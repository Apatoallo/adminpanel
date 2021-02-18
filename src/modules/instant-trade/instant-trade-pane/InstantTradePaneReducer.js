import { INSTANT_TRADE_PANE_ACTIONS } from './InstantTradePaneActions';

const initialState = {
  currencyList: {
    all: [],
    popular: []
  },
  defaultCurrencies: {}
};

const getDefaultCurrencies = data => {
  let defaultCurrencies = {};
  if (data && data.popular) {
    data.popular.concat(data.all).forEach(item => {
      if (item.currency_code === 'BTC' || item.currency_code === 'TRY') {
        defaultCurrencies[item.currency_code] = item;
      }
    });
  }
  return defaultCurrencies;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${INSTANT_TRADE_PANE_ACTIONS.GET_CURRENCY_LIST}_SUCCESS`:
      const data = action.payload.data.data;
      return {
        ...state,
        currencyList: data,
        defaultCurrencies: getDefaultCurrencies(data)
      };
    default:
      return state;
  }
};
