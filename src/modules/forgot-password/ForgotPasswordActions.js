export const FORGOT_PASSWORD_ACTIONS = {
  FORGOT_PASSWORD: 'FORGOT_PASSWORD'
};

export const forgotPassword = data => ({
  type: FORGOT_PASSWORD_ACTIONS.FORGOT_PASSWORD,
  payload: {
    request: {
      method: 'POST',
      url: '/p/v1/user/forgot_password/',
      data
    }
  }
});
