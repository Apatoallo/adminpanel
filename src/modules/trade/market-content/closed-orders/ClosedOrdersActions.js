export const CLOSED_ORDER_ACTIONS = {
  GET_CLOSED_ORDERS: 'GET_CLOSED_ORDERS'
};

export const getClosedOrders = filter_options => ({
  type: CLOSED_ORDER_ACTIONS.GET_CLOSED_ORDERS,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/order/order_history/`,
      data: {
        filter_options
      },
      requireToken: true
    }
  }
});
