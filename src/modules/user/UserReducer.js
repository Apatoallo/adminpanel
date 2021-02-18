import { USER_ACTIONS } from './UserActions';
import { LOGIN_ACTIONS } from '../login/LoginActions';
import { DEVICE_CONFIRMATION_ACTIONS } from '../device-confirmation/DeviceConfirmationActions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${USER_ACTIONS.GET_DETAIL}_SUCCESS`:
      return {
        ...state,
        info: action.payload.data.info,
        accountInfo: action.payload.data.accounts.filter(
          account => account.main_account_flag === true
        )[0],
        settings: action.payload.data.settings
      };
    case `${USER_ACTIONS.GET_ANNOUNCEMENTS}_SUCCESS`:
      return {
        ...state,
        announcements: action.payload.data.data
          ? action.payload.data.data.announcements
          : undefined
      };
    case LOGIN_ACTIONS.LOGOUT:
      return initialState;
    case `${LOGIN_ACTIONS.LOGIN_FIRST_FACTOR}_SUCCESS`:
      return {
        ...state,
        showLoginConfirmationDialog: action.payload.data.show_login_confirmation
      };
    case `${LOGIN_ACTIONS.LOGIN_SECOND_FACTOR}_SUCCESS`:
      return {
        ...state,
        showLoginConfirmationDialog: action.payload.data.show_login_confirmation
      };
    case `${DEVICE_CONFIRMATION_ACTIONS.CHECK_CONFIRMATION}_SUCCESS`:
      return {
        ...state,
        showLoginConfirmationDialog: action.payload.data.show_login_confirmation
      };
    default:
      return state;
  }
};
