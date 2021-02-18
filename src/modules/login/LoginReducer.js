import { LOGIN_ACTIONS } from './LoginActions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${LOGIN_ACTIONS.LOGIN_FIRST_FACTOR}_SUCCESS`:
      return {
        ...state,
        fullName: action.payload.data.full_name,
        secondFactorType: action.payload.data.twofa_type
      };
    case `${LOGIN_ACTIONS.LOGIN_FIRST_FACTOR}_FAIL`:
      return {
        ...state,
        result: action.payload
      };
    case `${LOGIN_ACTIONS.LOGIN_SECOND_FACTOR}_SUCCESS`:
      return {
        ...state,
        result: action.payload.data
      };
    case `${LOGIN_ACTIONS.LOGIN_SECOND_FACTOR}_FAIL`:
      return {
        ...state,
        result: action.payload
      };
    default:
      return state;
  }
};
