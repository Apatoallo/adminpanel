export const VERIFY_ACTIONS = {
  GET_VERIFY_STATUS: 'GET_VERIFY_STATUS'
};

export const getVerifyStatus = hash => ({
  type: VERIFY_ACTIONS.GET_VERIFY_STATUS,
  payload: {
    request: {
      method: 'GET',
      url: `/p/v1/user/verify/${hash}/`
    }
  }
});
