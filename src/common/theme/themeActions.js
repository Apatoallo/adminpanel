export const THEME_ACTIONS = {
  CHANGE_THEME: 'CHANGE_THEME',
  CHANGE_TRADE_VIEW_STYLE: 'CHANGE_TRADE_VIEW_STYLE'
};

export const changeTheme = theme => ({
  type: THEME_ACTIONS.CHANGE_THEME,
  payload: theme
});

export const changeTradeViewStyle = viewStyle => ({
  type: THEME_ACTIONS.CHANGE_TRADE_VIEW_STYLE,
  payload: viewStyle
});
