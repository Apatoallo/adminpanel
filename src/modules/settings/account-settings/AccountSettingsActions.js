export const ACCOUNT_SETTINGS_ACTIONS = {
  SEND_SMS: 'SEND_SMS',
  VERIFY: 'VERIFY',
  CHANGE_LANGUAGE: 'CHANGE_LANGUAGE'
};

export const sendSms = data => ({
  type: ACCOUNT_SETTINGS_ACTIONS.SEND_SMS,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/user/phone_number/`,
      requireToken: true,
      data
    }
  }
});

export const verify = data => ({
  type: ACCOUNT_SETTINGS_ACTIONS.VERIFY,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/user/verify_phone_number/`,
      requireToken: true,
      data
    }
  }
});

export const changeLanguage = data => ({
  type: ACCOUNT_SETTINGS_ACTIONS.CHANGE_LANGUAGE,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/user/change_language/`,
      requireToken: true,
      data
    }
  }
});
