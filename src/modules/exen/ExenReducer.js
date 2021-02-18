import { EXEN_ACTIONS } from './ExenActions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${EXEN_ACTIONS.GET_PROFILE}_SUCCESS`:
      return {
        ...state,
        profile: action.payload.data.data
      };
    case `${EXEN_ACTIONS.GET_REFERRAL_HISTORY}_SUCCESS`:
      return {
        ...state,
        referralHistory: action.payload.data.data
      };
    case `${EXEN_ACTIONS.GET_COMPETITION_HISTORY}_SUCCESS`:
      return {
        ...state,
        competitionHistory: action.payload.data.data
      };
    case `${EXEN_ACTIONS.GET_COMPETITION}_SUCCESS`:
      return {
        ...state,
        competition: action.payload.data.data
      };
    case `${EXEN_ACTIONS.GET_COMPETITION_PUBLIC}_SUCCESS`:
      return {
        ...state,
        competitionPublic: action.payload.data.data
      };
    case `${EXEN_ACTIONS.GET_STATS}_SUCCESS`:
      return {
        ...state,
        exenStats: action.payload.data.data
      };
    default:
      return state;
  }
};
