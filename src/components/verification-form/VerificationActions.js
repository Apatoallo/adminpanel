export const VERIFICATION_ACTIONS = {
  SUBMIT: 'SUBMIT',
  STATUS: 'STATUS'
};

export const submit = data => ({
  type: VERIFICATION_ACTIONS.SUBMIT,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/user/start_identity_verification/`,
      requireToken: true,
      data
    }
  }
});

export const getStatus = () => ({
  type: VERIFICATION_ACTIONS.STATUS,
  payload: {
    request: {
      method: 'GET',
      url: `/p/v1/user/get_identity_verification_status/`,
      requireToken: true
    }
  }
});
