import { GROUPED_TICKERS_ACTIONS } from './GroupedTickersActions';

const initialState = {
  TRY: {},
  BTC: {},
  ETH: {},
  USDT: {},
  BUSD: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GROUPED_TICKERS_ACTIONS.UPDATE_GROUPED_TICKERS:
      return {
        ...state,
        [action.payload.data.key]: constructGroupedTickersData(
          state,
          action.payload.data.value,
          action.payload.data.key
        )
      };
    case `${GROUPED_TICKERS_ACTIONS.GET_INSTANT_TICKERS}_SUCCESS`:
      const data = action.payload.data.data;
      const key = action.payload.config.reduxSourceAction.payload.key;
      return {
        ...state,
        [key]: data
      };
    default:
      return state;
  }
};

//Calculate price change and add flags accordingly
const constructGroupedTickersData = (
  prevTickers,
  incomingTickers,
  tickerGroup
) => {
  const newTickers = {};
  if (prevTickers && prevTickers[tickerGroup]) {
    Object.keys(incomingTickers).forEach(key => {
      let price_change = 0;
      if (prevTickers[tickerGroup][key]) {
        if (incomingTickers[key].ask > prevTickers[tickerGroup][key].ask) {
          price_change = 1;
        } else if (
          incomingTickers[key].ask < prevTickers[tickerGroup][key].ask
        ) {
          price_change = -1;
        }
      }
      newTickers[key] = { ...incomingTickers[key], price_change };
    });
    return newTickers;
  } else {
    return incomingTickers;
  }
};
