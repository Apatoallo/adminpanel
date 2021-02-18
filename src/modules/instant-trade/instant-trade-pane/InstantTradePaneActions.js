export const INSTANT_TRADE_PANE_ACTIONS = {
  GET_CURRENCY_LIST: 'GET_CURRENCY_LIST',
  GET_PRICE: 'GET_PRICE',
  ADD_PRICE_REFRESH_FLAG: 'ADD_PRICE_REFRESH_FLAG',
  REMOVE_PRICE_REFRESH_FLAG: 'REMOVE_PRICE_REFRESH_FLAG',
  PLACE_INSTANT_ORDER: 'PLACE_INSTANT_ORDER'
};

export const getCurrencyList = () => ({
  type: INSTANT_TRADE_PANE_ACTIONS.GET_CURRENCY_LIST,
  payload: {
    request: {
      method: 'GET',
      url: `/p/v1/order/currency_list/`
    }
  }
});

export const getPrice = (firstCoin, secondCoin) => ({
  type: INSTANT_TRADE_PANE_ACTIONS.GET_PRICE,
  payload: {
    request: {
      method: 'GET',
      url: `/p/v1/order/get_price/${secondCoin}/${firstCoin}/`
    }
  }
});

export const createInstantOrder = data => ({
  type: INSTANT_TRADE_PANE_ACTIONS.PLACE_INSTANT_ORDER,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/order/instant_order/`,
      requireToken: true,
      data
    }
  }
});
