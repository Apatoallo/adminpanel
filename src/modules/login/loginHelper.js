import LocalStorage from '../../common/utils/LocalStorage';
import history from '../../common/history';
import socketHelper from '../../api/socketHelper';

export const isUserLoggedIn = () => {
  return (
    LocalStorage.getItem('TOKEN') &&
    LocalStorage.getItem('USER_NAME') &&
    LocalStorage.getItem('USER_INFO')
  );
};

export const logoutUser = () => {
  socketHelper.logoutPrivateSocket();
  LocalStorage.removeItem('TOKEN');
  LocalStorage.removeItem('USER_NAME');
  LocalStorage.removeItem('USER_INFO');
  history.push('/');
};
