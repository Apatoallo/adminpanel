import { DEPOSIT_DIALOG_ACTIONS } from './DepositDialogActions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${DEPOSIT_DIALOG_ACTIONS.GET_DEPOSIT_INFO}_SUCCESS`:
      return {
        ...state,
        [`depositInfo${action.payload.data.data.currency_code}`]: action.payload
          .data.data
      };
    case `${DEPOSIT_DIALOG_ACTIONS.DEPOSIT}_SUCCESS`:
      return {
        ...state,
        depositRequestResult: action.payload.data.data
          ? action.payload.data.data.message
          : null
      };
    case `${DEPOSIT_DIALOG_ACTIONS.PAPARA_SEND_REQUEST}_SUCCESS`:
      return {
        ...state,
        ...action.payload.data.data
      };
    default:
      return state;
  }
};
