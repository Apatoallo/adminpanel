export const MARKET_BAR_ACTIONS = {
  GET_MARKETS_INFO: 'GET_MARKETS_INFO',
  CHANGE_MARKET: 'CHANGE_MARKET',
  UPDATE_TICKERS: 'UPDATE_TICKERS',
  CLEAR_UPDATE_BALANCE_FLAG: 'CLEAR_UPDATE_BALANCE_FLAG',
  GET_ACCOUNT_LINES: 'GET_ACCOUNT_LINES'
};

export const getMarketsInfo = () => ({
  type: MARKET_BAR_ACTIONS.GET_MARKETS_INFO,
  payload: {
    request: {
      method: 'GET',
      url: '/p/v1/market_info/'
    }
  }
});

export const changeMarket = marketCode => {
  return {
    type: MARKET_BAR_ACTIONS.CHANGE_MARKET,
    payload: {
      data: marketCode
    }
  };
};

export const updateTickers = data => ({
  type: MARKET_BAR_ACTIONS.UPDATE_TICKERS,
  payload: data
});

export const getAccountLines = accountNumber => ({
  type: MARKET_BAR_ACTIONS.GET_ACCOUNT_LINES,
  payload: {
    request: {
      method: 'GET',
      url: `/p/v1/account/account_lines/${accountNumber}/`,
      requireToken: true
    }
  }
});
