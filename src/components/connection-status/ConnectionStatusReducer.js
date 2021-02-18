import { PRIVATE_SOCKET_ACTIONS } from '../../api/PrivateSocketActions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRIVATE_SOCKET_ACTIONS.CONNECT:
    case PRIVATE_SOCKET_ACTIONS.RECONNECT:
      return {
        ...state,
        socketConnected: true
      };
    case PRIVATE_SOCKET_ACTIONS.DISCONNECT:
      return {
        ...state,
        socketConnected: false
      };
    default:
      return state;
  }
};
