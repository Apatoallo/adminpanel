import { LIMITS_ACTIONS } from './LimitsActions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${LIMITS_ACTIONS.GET_ACCOUNT_LIMITS}_SUCCESS`:
      return {
        ...state,
        limits: action.payload.data.limits,
        commissions: action.payload.data.commissions
      };
    default:
      return state;
  }
};
