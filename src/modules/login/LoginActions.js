import socketHelper from '../../api/socketHelper';
import { logoutUser } from './loginHelper';
import ReduxStore from '../../common/redux/ReduxStore';

export const LOGIN_ACTIONS = {
  LOGIN_FIRST_FACTOR: 'LOGIN_FIRST_FACTOR',
  LOGIN_SECOND_FACTOR: 'LOGIN_SECOND_FACTOR',
  RESEND_SMS: 'RESEND_SMS',
  LOGIN_PRIVATE_SOCKET: 'LOGIN_PRIVATE_SOCKET',
  LOGOUT: 'LOGOUT'
};

export const loginFirstFactor = data => ({
  type: LOGIN_ACTIONS.LOGIN_FIRST_FACTOR,
  payload: {
    request: {
      method: 'POST',
      url: '/p/v1/user/login/',
      data: data
    }
  }
});

export const loginSecondFactor = data => ({
  type: LOGIN_ACTIONS.LOGIN_SECOND_FACTOR,
  payload: {
    request: {
      requireToken: true,
      method: 'POST',
      url: '/p/v1/user/login_second_factor/',
      data: data
    }
  }
});

export const resendSms = data => ({
  type: LOGIN_ACTIONS.RESEND_SMS,
  payload: {
    request: {
      requireToken: true,
      method: 'POST',
      url: '/p/v1/user/resend_sms/',
      data: data
    }
  }
});

export const loginPrivateSocket = () => ({
  type: LOGIN_ACTIONS.LOGIN_FIRST_FACTOR,
  payload: socketHelper.loginPrivateSocket()
});

export const logoutAction = () => ({
  type: LOGIN_ACTIONS.LOGOUT,
  payload: logoutUser()
});

export const logout = () => ReduxStore.store.dispatch(logoutAction());
