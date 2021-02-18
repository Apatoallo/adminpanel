import { VERIFICATION_ACTIONS } from './VerificationActions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${VERIFICATION_ACTIONS.STATUS}_SUCCESS`:
      return {
        ...state,
        verificationStatus: action.payload.data.data
      };
    default:
      return state;
  }
};
