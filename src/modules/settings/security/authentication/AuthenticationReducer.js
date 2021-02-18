import { AUTHENTICATION_ACTIONS } from './AuthenticationActions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${AUTHENTICATION_ACTIONS.ENABLE_OTP}_SUCCESS`:
      return {
        ...state,
        googleSecretKey: action.payload.data.data.secretkey,
        googleUri: action.payload.data.data.uri
      };
    default:
      return state;
  }
};
