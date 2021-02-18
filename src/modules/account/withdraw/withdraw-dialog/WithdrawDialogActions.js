export const WITHDRAW_DIALOG_ACTIONS = {
  GET_WITHDRAWAL_INFO: 'GET_WITHDRAWAL_INFO',
  DELETE_WITHDRAW_ADDRESS: 'DELETE_WITHDRAW_ADDRESS',
  VALIDATE_ADDRESS: 'VALIDATE_ADDRESS',
  WITHDRAW: 'WITHDRAW'
};

export const getWithdrawalInfo = currencyCode => ({
  type: WITHDRAW_DIALOG_ACTIONS.GET_WITHDRAWAL_INFO,
  payload: {
    request: {
      method: 'GET',
      url: `/p/v1/currency_ops/withdrawal/info/${currencyCode}/`,
      requireToken: true
    }
  }
});

export const validateAddress = data => ({
  type: WITHDRAW_DIALOG_ACTIONS.VALIDATE_ADDRESS,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/currency_ops/validate_address/`,
      requireToken: true,
      data
    }
  }
});

export const deleteWithdrawAddress = data => ({
  type: WITHDRAW_DIALOG_ACTIONS.DELETE_WITHDRAW_ADDRESS,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/currency_ops/withdrawal/delete_withdraw_address/`,
      requireToken: true,
      data
    }
  }
});

export const withdraw = (currencyCode, data) => ({
  type: WITHDRAW_DIALOG_ACTIONS.WITHDRAW,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/currency_ops/withdrawal/request/${currencyCode}/`,
      requireToken: true,
      data
    }
  }
});
