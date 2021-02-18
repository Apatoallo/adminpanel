export const ERROR_ACTIONS = {
  SEND_CLIENT_ERROR: 'SEND_CLIENT_ERROR'
};

export const sendClientError = data => ({
  type: ERROR_ACTIONS.SEND_CLIENT_ERROR,
  payload: {
    request: {
      method: 'POST',
      url: '/p/v1/user/client_error/',
      data
    }
  }
});
