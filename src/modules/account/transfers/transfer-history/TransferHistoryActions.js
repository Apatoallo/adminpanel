export const TRANSFER_HISTORY_ACTIONS = {
  GET_OPEN_TRANSFERS: 'GET_OPEN_TRANSFERS',
  GET_CLOSED_TRANSFERS: 'GET_CLOSED_TRANSFERS',
  CANCEL_TRANSFER: 'CANCEL_TRANSFER',
  CLEAR_UPDATE_AWAITING_TRANSFER_LIST_FLAG:
    'CLEAR_UPDATE_AWAITING_TRANSFER_LIST_FLAG',
  CLEAR_UPDATE_FINISHED_TRANSFER_LIST_FLAG:
    'CLEAR_UPDATE_FINISHED_TRANSFER_LIST_FLAG'
};

export const getTransferHistory = (
  transfer_type,
  currency_code,
  transfer_status,
  page_number
) => ({
  type:
    transfer_status === 'O'
      ? TRANSFER_HISTORY_ACTIONS.GET_OPEN_TRANSFERS
      : TRANSFER_HISTORY_ACTIONS.GET_CLOSED_TRANSFERS,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/currency_ops/transfer/`,
      requireToken: true,
      data: {
        filter_options: {
          transfer_type,
          currency_code,
          transfer_status,
          page_number
        }
      }
    }
  }
});

export const cancelTransfer = transferId => ({
  type: TRANSFER_HISTORY_ACTIONS.CANCEL_TRANSFER,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/currency_ops/withdrawal/cancel/${transferId}/`,
      requireToken: true
    }
  }
});

export const clearUpdateAwaitingTransferListFlag = () => ({
  type: TRANSFER_HISTORY_ACTIONS.CLEAR_UPDATE_AWAITING_TRANSFER_LIST_FLAG,
  payload: {}
});

export const clearUpdateFinishedTransferListFlag = () => ({
  type: TRANSFER_HISTORY_ACTIONS.CLEAR_UPDATE_FINISHED_TRANSFER_LIST_FLAG,
  payload: {}
});
