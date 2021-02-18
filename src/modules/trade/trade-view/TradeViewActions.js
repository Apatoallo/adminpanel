export const TRADE_VIEW_ACTIONS = {
  SEND_ORDER_INFORMATION: 'SEND_ORDER_INFORMATION'
};

export const sendOrderInformation = data => ({
  type: TRADE_VIEW_ACTIONS.SEND_ORDER_INFORMATION,
  payload: {
    data
  }
});
