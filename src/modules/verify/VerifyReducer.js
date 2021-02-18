import { VERIFY_ACTIONS } from './VerifyActions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${VERIFY_ACTIONS.GET_VERIFY_STATUS}_SUCCESS`:
      return {
        ...state,
        verifyResult: action.payload.data
      };
    default:
      return state;
  }
};
