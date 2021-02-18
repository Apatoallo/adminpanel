import { ORDER_HISTORY_ACTIONS } from './OrderHistoryActions';
import { PRIVATE_SOCKET_ACTIONS } from '../../../../api/PrivateSocketActions';
import { TIMEOUTS } from '../marketContentConstants';
import { LOGIN_ACTIONS } from '../../../login/LoginActions';

const initialState = {};

export default (state = initialState, action) => {
  let returnObj = { ...state };
  let elementIndex = -1;

  switch (action.type) {
    case `${ORDER_HISTORY_ACTIONS.GET_OPEN_ORDERS}_SUCCESS`:
      return {
        ...state,
        openOrders:
          action.payload.data.status === 'success'
            ? action.payload.data.data.orders
            : [],
        ordersUpdateTimeout: 0
      };
    case `${ORDER_HISTORY_ACTIONS.GET_CLOSED_ORDERS}_SUCCESS`:
      if (action.payload.data.status === 'success') {
        const { orders, ...rest } = action.payload.data.data;
        return {
          ...state,
          closedOrders: orders,
          closedOrdersParams: rest,
          ordersUpdateTimeout: 0
        };
      } else {
        return {
          ...state,
          closedOrders: [],
          closedOrdersParams: {},
          ordersUpdateTimeout: 0
        };
      }
    case PRIVATE_SOCKET_ACTIONS.NEW_ORDER:
      returnObj = {
        ...state,
        openOrders: state.openOrders
          ? [action.payload].concat(state.openOrders)
          : [action.payload],
        ordersUpdateTimeout: TIMEOUTS.ORDER_HISTORY_TIMEOUT
      };
      return returnObj;
    case PRIVATE_SOCKET_ACTIONS.PARTIAL_ORDER:
      if (state.openOrders) {
        elementIndex = state.openOrders.findIndex(
          item => item.order_number === action.payload.order_number
        );

        if (elementIndex >= 0) {
          returnObj = {
            ...state,
            openOrders: [
              ...state.openOrders.slice(0, elementIndex),
              action.payload,
              ...state.openOrders.slice(elementIndex + 1)
            ]
          };
        }
      }
      return {
        ...returnObj,
        ...{ ordersUpdateTimeout: TIMEOUTS.ORDER_HISTORY_TIMEOUT }
      };
    case PRIVATE_SOCKET_ACTIONS.FILL_ORDER:
      if (state.openOrders) {
        elementIndex = state.openOrders.findIndex(
          item => item.order_number === action.payload.order_number
        );

        if (elementIndex >= 0) {
          returnObj = {
            ...state,
            openOrders: [
              ...state.openOrders.slice(0, elementIndex),
              action.payload,
              ...state.openOrders.slice(elementIndex + 1)
            ]
          };
        }
      }
      return {
        ...returnObj,
        ...{ ordersUpdateTimeout: TIMEOUTS.ORDER_HISTORY_TIMEOUT }
      };
    case PRIVATE_SOCKET_ACTIONS.CANCEL_ORDER:
      if (state.openOrders) {
        elementIndex = state.openOrders.findIndex(
          item => item.order_number === action.payload.order_number
        );

        if (elementIndex >= 0) {
          returnObj = {
            ...state,
            openOrders: [
              ...state.openOrders.slice(0, elementIndex),
              action.payload,
              ...state.openOrders.slice(elementIndex + 1)
            ]
          };
        }
      }
      return {
        ...returnObj,
        ...{ ordersUpdateTimeout: TIMEOUTS.ORDER_HISTORY_TIMEOUT }
      };
    case LOGIN_ACTIONS.LOGOUT:
      return {
        ...state,
        openOrders: [],
        closedOrders: []
      };
    case PRIVATE_SOCKET_ACTIONS.RECONNECT: {
      return {
        ...state,
        ordersUpdateTimeout: TIMEOUTS.ORDER_HISTORY_TIMEOUT
      };
    }
    default:
      return state;
  }
};
