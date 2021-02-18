export const SIGN_UP_ACTIONS = {
  SAVE_EMAIL: 'SAVE_EMAIL',
  SIGN_UP: 'SIGN_UP'
};

export const saveEmail = data => ({
  type: SIGN_UP_ACTIONS.SAVE_EMAIL,
  payload: {
    request: {
      method: 'POST',
      url: '/p/v1/user/save_email/',
      data
    }
  }
});

export const signUp = data => ({
  type: SIGN_UP_ACTIONS.SAVE_EMAIL,
  payload: {
    request: {
      method: 'POST',
      url: '/p/v1/user/signup/',
      data
    }
  }
});
