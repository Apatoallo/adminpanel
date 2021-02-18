export const TRADE_HISTORY_ACTIONS = {
  GET_TRADE_HISTORY: 'GET_TRADE_HISTORY'
};

export const getTradeHistory = (
  order_direction,
  market_code,
  date_range,
  order_number,
  page_number
) => ({
  type: TRADE_HISTORY_ACTIONS.GET_TRADE_HISTORY,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/order/trade_history/`,
      requireToken: true,
      data: {
        filter_options: {
          order_direction,
          market_code,
          date_range,
          order_number,
          page_number
        }
      }
    }
  }
});
