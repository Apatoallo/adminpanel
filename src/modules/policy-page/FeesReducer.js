import { LIMITS_ACTIONS } from '../account/limits/LimitsActions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${LIMITS_ACTIONS.GET_FEES_PUBLIC}_SUCCESS`:
      return {
        ...state,
        commissions: action.payload.data.commissions
      };
    default:
      return state;
  }
};
