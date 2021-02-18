export const GROUPED_TICKERS_ACTIONS = {
  UPDATE_GROUPED_TICKERS: 'UPDATE_GROUPED_TICKERS',
  GET_INSTANT_TICKERS: 'GET_INSTANT_TICKERS'
};

export const updateGroupedTickers = (counterCurrencyCode, groupedTickers) => ({
  type: GROUPED_TICKERS_ACTIONS.UPDATE_GROUPED_TICKERS,
  payload: {
    data: {
      key: counterCurrencyCode,
      value: groupedTickers
    }
  }
});

export const getInstantTickers = currencyCode => ({
  type: GROUPED_TICKERS_ACTIONS.GET_INSTANT_TICKERS,
  payload: {
    request: {
      method: 'GET',
      url: `/p/v1/order/get_instant_tickers/${currencyCode}/`
    },
    key: currencyCode
  }
});
