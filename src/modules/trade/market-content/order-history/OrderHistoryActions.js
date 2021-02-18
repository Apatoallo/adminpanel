export const ORDER_HISTORY_ACTIONS = {
  GET_OPEN_ORDERS: 'GET_OPEN_ORDERS',
  GET_CLOSED_ORDERS: 'GET_CLOSED_ORDERS',
  CANCEL_ORDER: 'CANCEL_ORDER'
};

export const getOpenOrders = marketCode => ({
  type: ORDER_HISTORY_ACTIONS.GET_OPEN_ORDERS,
  payload: {
    request: {
      method: 'GET',
      url: `/p/v1/order/orders/Main/O/${marketCode ? `${marketCode}/` : ''}`,
      requireToken: true
    }
  }
});

export const cancelOrder = orderNumber => ({
  type: ORDER_HISTORY_ACTIONS.CANCEL_ORDER,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/order/cancel/${orderNumber}/`,
      requireToken: true
    }
  }
});
