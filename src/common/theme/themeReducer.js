import { THEME_ACTIONS } from './themeActions';

const initialState = {
  currentThemeName: 'lightTheme'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case THEME_ACTIONS.CHANGE_THEME:
      return {
        ...state,
        currentThemeName: action.payload
      };
    case THEME_ACTIONS.CHANGE_TRADE_VIEW_STYLE:
      return {
        ...state,
        currentTradeViewStyle: action.payload
      };
    default:
      return state;
  }
};
