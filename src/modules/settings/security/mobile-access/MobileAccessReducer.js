import { MOBILE_ACCESS_ACTIONS } from './MobileAccessActions';
import { PRIVATE_SOCKET_ACTIONS } from '../../../../api/PrivateSocketActions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${MOBILE_ACCESS_ACTIONS.LIST_MOBILE_ACCESS_KEYS}_SUCCESS`:
      return {
        ...state,
        mobileKeys: action.payload.data.data.api_key_list,
        mobileStatus: action.payload.data.data.mobile_status
      };
    case PRIVATE_SOCKET_ACTIONS.MOBILE_KEY_CHANGED:
      return {
        ...state,
        updateMobileKeysFlag: true
      };
    case MOBILE_ACCESS_ACTIONS.CLEAR_UPDATE_MOBILE_KEYS_FLAG:
      return {
        ...state,
        updateMobileKeysFlag: false
      };
    default:
      return state;
  }
};
