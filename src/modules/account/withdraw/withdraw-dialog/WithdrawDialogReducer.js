import { WITHDRAW_DIALOG_ACTIONS } from './WithdrawDialogActions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${WITHDRAW_DIALOG_ACTIONS.GET_WITHDRAWAL_INFO}_SUCCESS`:
      return {
        ...state,
        withdrawalInfo: action.payload.data.data
      };
    case `${WITHDRAW_DIALOG_ACTIONS.WITHDRAW}_SUCCESS`:
      return {
        ...state,
        withdrawalRequestResult: action.payload.data.data
          ? {
              message: action.payload.data.data.message,
              resultCode: action.payload.data.data.result_code
            }
          : {}
      };
    default:
      return state;
  }
};
