import ReduxStore from '../redux/ReduxStore';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';

export const getTheme = () => {
  const state = ReduxStore.store.getState();
  return state.theme.currentThemeName === 'darkTheme' ? darkTheme : lightTheme;
};
