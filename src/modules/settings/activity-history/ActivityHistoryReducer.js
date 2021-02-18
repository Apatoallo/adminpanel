import { ACTIVITY_HISTORY_ACTIONS } from './ActivityHistoryActions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIVITY_HISTORY_ACTIONS.GET_ACTIVITY_HISTORY}_SUCCESS`:
      return {
        ...state,
        result: action.payload.data.data
      };
    default:
      return state;
  }
};
