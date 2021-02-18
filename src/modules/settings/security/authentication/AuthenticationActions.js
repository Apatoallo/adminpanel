export const AUTHENTICATION_ACTIONS = {
  ENABLE_OTP: 'ENABLE_OTP',
  DISABLE_OTP: 'DISABLE_OTP',
  VERIFY_OTP: 'VERIFY_OTP'
};

export const enableOtp = data => ({
  type: AUTHENTICATION_ACTIONS.ENABLE_OTP,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/user/enable_otp/`,
      requireToken: true,
      data
    }
  }
});

export const disableOtp = data => ({
  type: AUTHENTICATION_ACTIONS.DISABLE_OTP,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/user/disable_otp/`,
      requireToken: true,
      data
    }
  }
});

export const verifyOtp = data => ({
  type: AUTHENTICATION_ACTIONS.VERIFY_OTP,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/user/enable_otp_verify/`,
      requireToken: true,
      data
    }
  }
});
