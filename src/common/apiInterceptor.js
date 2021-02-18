import LocalStorage from './utils/LocalStorage';
import exceptions from './exceptions';
import signRequest from './utils/signRequest';
import { logout } from '../modules/login/LoginActions';
import { forceToRefresh } from '../components/page/PageActions';
import packageJson from '../../package.json';
import { isRefreshRequired } from './utils/stringUtil';

export default {
  request: [
    function(getState, config) {
      const sourceAction = getState.getSourceAction(config);

      if (
        config &&
        sourceAction.payload.request &&
        sourceAction.payload.request.requireToken &&
        (!sourceAction.payload.client ||
          sourceAction.payload.client === 'default')
      ) {
        const token = LocalStorage.getItem('TOKEN');
        const userName = LocalStorage.getItem('USER_NAME');
        config.data = config.data || {};

        if (!token || !userName) {
          throw exceptions.TokenException(
            'Signature parameters are not present!'
          );
        } else {
          const timestamp = new Date().getTime();
          const signature = signRequest(
            userName,
            timestamp,
            token,
            config.data
          );

          config.headers['ACCESS-USER'] = userName;
          config.headers['ACCESS-TIMESTAMP'] = timestamp;
          config.headers['ACCESS-SIGN'] = signature;
        }
      }

      return config;
    }
  ],
  response: [
    {
      success: function(getState, res) {
        if (res && res.data && res.data.token) {
          LocalStorage.setItem('TOKEN', res.data.token);
          LocalStorage.setItem('USER_NAME', res.data.username);
        }
        if (res && res.headers && res.headers['api-version']) {
          if (
            isRefreshRequired(packageJson.version, res.headers['api-version'])
          ) {
            forceToRefresh();
          }
        }
        return res;
      }
    },
    {
      error: function(getState, err) {
        if (err.type === 'TokenException') {
          logout();
          return Promise.reject(err);
        }
        switch (err.response.status) {
          case 401:
            logout();
            return Promise.reject(err);
          default:
            break;
        }
        return Promise.reject(err);
      }
    }
  ]
};
