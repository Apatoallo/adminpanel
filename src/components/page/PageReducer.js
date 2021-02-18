import { PAGE_ACTIONS } from './PageActions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case PAGE_ACTIONS.SHOW_MODAL:
    case PAGE_ACTIONS.PUSH_NEW_ANNOUNCEMENT:
      return {
        ...state,
        modalItems: state.modalItems
          ? [...state.modalItems, action.payload]
          : [action.payload]
      };
    case PAGE_ACTIONS.SHOW_SNACKBAR:
      return {
        ...state,
        snackbarItem: action.payload
      };
    case PAGE_ACTIONS.SHOW_LOADING:
      return {
        ...state,
        showLoading: true
      };
    case PAGE_ACTIONS.HIDE_LOADING:
      return {
        ...state,
        showLoading: false
      };
    default:
      return state;
  }
};
