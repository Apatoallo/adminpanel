import { API_ACCESS_ACTIONS } from './APIAccessActions';
import { PRIVATE_SOCKET_ACTIONS } from '../../../../api/PrivateSocketActions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${API_ACCESS_ACTIONS.LIST_API_ACCESS_KEYS}_SUCCESS`:
      return {
        ...state,
        apiKeys: action.payload.data.data.apikeys
      };
    case PRIVATE_SOCKET_ACTIONS.APIKEY_CHANGED:
      return {
        ...state,
        updateApiKeysFlag: true
      };
    case API_ACCESS_ACTIONS.CLEAR_UPDATE_API_KEYS_FLAG:
      return {
        ...state,
        updateApiKeysFlag: false
      };
    default:
      return state;
  }
};
