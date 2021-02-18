export const TRADE_PANE_ACTIONS = {
  PLACE_LIMIT_ORDER: 'PLACE_LIMIT_ORDER',
  PLACE_MARKET_ORDER: 'PLACE_MARKET_ORDER',
  UPDATE_TICKERS: 'UPDATE_TICKERS'
};

export const placeLimitOrder = data => ({
  type: TRADE_PANE_ACTIONS.PLACE_LIMIT_ORDER,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/order/orders/`,
      requireToken: true,
      data
    }
  }
});

export const placeMarketOrder = data => ({
  type: TRADE_PANE_ACTIONS.PLACE_MARKET_ORDER,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/order/orders/`,
      requireToken: true,
      data
    }
  }
});

export const updateTickers = data => ({
  type: TRADE_PANE_ACTIONS.UPDATE_TICKERS,
  payload: data
});
