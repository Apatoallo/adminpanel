export const DEVICE_CONFIRMATION_ACTIONS = {
  CHECK_CONFIRMATION: 'CHECK_CONFIRMATION'
};

export const checkConfirmation = () => ({
  type: DEVICE_CONFIRMATION_ACTIONS.CHECK_CONFIRMATION,
  payload: {
    request: {
      method: 'GET',
      url: `/p/v1/user/check_web_device/`,
      requireToken: true
    }
  }
});
