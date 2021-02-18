export const API_ACCESS_ACTIONS = {
  CREATE_API_ACCESS: 'CREATE_API_ACCESS',
  DEACTIVATE_API_ACCESS: 'DEACTIVATE_API_ACCESS',
  ACTIVATE_API_ACCESS: 'ACTIVATE_API_ACCESS',
  DELETE_API_ACCESS: 'DELETE_API_ACCESS',
  LIST_API_ACCESS_KEYS: 'LIST_API_ACCESS_KEYS',
  CLEAR_UPDATE_API_KEYS_FLAG: 'CLEAR_UPDATE_API_KEYS_FLAG'
};

export const createApiAccess = data => ({
  type: API_ACCESS_ACTIONS.CREATE_API_ACCESS,
  payload: {
    request: {
      method: 'POST',
      url: '/p/v1/user/new_apikey/',
      requireToken: true,
      data
    }
  }
});

export const listApiAccess = data => ({
  type: API_ACCESS_ACTIONS.LIST_API_ACCESS_KEYS,
  payload: {
    request: {
      method: 'GET',
      url: '/p/v1/user/list_apikey/',
      requireToken: true,
      data
    }
  }
});

export const deleteApiAccess = data => ({
  type: API_ACCESS_ACTIONS.DELETE_API_ACCESS,
  payload: {
    request: {
      method: 'POST',
      url: '/p/v1/user/remove_apikey/',
      requireToken: true,
      data
    }
  }
});

export const activateApiAccess = data => ({
  type: API_ACCESS_ACTIONS.ACTIVATE_API_ACCESS,
  payload: {
    request: {
      method: 'POST',
      url: '/p/v1/user/enable_apikey/',
      requireToken: true,
      data
    }
  }
});

export const deactivateApiAccess = data => ({
  type: API_ACCESS_ACTIONS.DEACTIVATE_API_ACCESS,
  payload: {
    request: {
      method: 'POST',
      url: '/p/v1/user/disable_apikey/',
      requireToken: true,
      data
    }
  }
});

export const clearUpdateApiKeysFlag = () => ({
  type: API_ACCESS_ACTIONS.CLEAR_UPDATE_API_KEYS_FLAG,
  payload: {}
});
