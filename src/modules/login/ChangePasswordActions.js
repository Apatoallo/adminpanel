export const CHANGE_PASSWORD_ACTIONS = {
  CHANGE_PASSWORD: 'CHANGE_PASSWORD'
};

export const changePassword = data => ({
  type: CHANGE_PASSWORD_ACTIONS.CHANGE_PASSWORD,
  payload: {
    request: {
      method: 'POST',
      url: '/p/v1/user/change_password_via_email/',
      data: data
    }
  }
});
