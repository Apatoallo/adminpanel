export const MOBILE_ACCESS_ACTIONS = {
  CREATE_MOBILE_ACCESS: 'CREATE_MOBILE_ACCESS',
  DELETE_MOBILE_ACCESS: 'DELETE_MOBILE_ACCESS',
  LIST_MOBILE_ACCESS_KEYS: 'LIST_MOBILE_ACCESS_KEYS',
  CLEAR_UPDATE_MOBILE_KEYS_FLAG: 'CLEAR_UPDATE_MOBILE_KEYS_FLAG'
};

export const createMobileAccess = data => ({
  type: MOBILE_ACCESS_ACTIONS.CREATE_MOBILE_ACCESS,
  payload: {
    request: {
      method: 'POST',
      url: '/p/v1/user/enable_mobile_access/',
      requireToken: true,
      data
    }
  }
});

export const listMobileAccess = data => ({
  type: MOBILE_ACCESS_ACTIONS.LIST_MOBILE_ACCESS_KEYS,
  payload: {
    request: {
      method: 'GET',
      url: '/p/v1/user/list_mobile_access_keys/',
      requireToken: true,
      data
    }
  }
});

export const deleteMobileAccess = data => ({
  type: MOBILE_ACCESS_ACTIONS.DELETE_MOBILE_ACCESS,
  payload: {
    request: {
      method: 'POST',
      url: '/p/v1/user/remove_apikey/',
      requireToken: true,
      data
    }
  }
});

export const clearUpdateMobileKeysFlag = () => ({
  type: MOBILE_ACCESS_ACTIONS.CLEAR_UPDATE_MOBILE_KEYS_FLAG,
  payload: {}
});
