import { TRANSFER_HISTORY_ACTIONS } from './TransferHistoryActions';
import { PRIVATE_SOCKET_ACTIONS } from '../../../../api/PrivateSocketActions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${TRANSFER_HISTORY_ACTIONS.GET_OPEN_TRANSFERS}_SUCCESS`:
      return {
        ...state,
        openTransfers: action.payload.data.data
      };
    case `${TRANSFER_HISTORY_ACTIONS.GET_CLOSED_TRANSFERS}_SUCCESS`:
      return {
        ...state,
        closedTransfers: action.payload.data.data
      };
    case PRIVATE_SOCKET_ACTIONS.DEPOSIT:
    case PRIVATE_SOCKET_ACTIONS.WITHDRAW:
      return {
        ...state,
        updateAwaitingTransferListFlag: true,
        updateFinishedTransferListFlag: true
      };
    case TRANSFER_HISTORY_ACTIONS.CLEAR_UPDATE_AWAITING_TRANSFER_LIST_FLAG:
      return {
        ...state,
        updateAwaitingTransferListFlag: false
      };
    case TRANSFER_HISTORY_ACTIONS.CLEAR_UPDATE_FINISHED_TRANSFER_LIST_FLAG:
      return {
        ...state,
        updateFinishedTransferListFlag: false
      };
    default:
      return state;
  }
};
