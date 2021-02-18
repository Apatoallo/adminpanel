export const DEPOSIT_DIALOG_ACTIONS = {
  GET_DEPOSIT_INFO: 'GET_DEPOSIT_INFO',
  CREATE_ADDRESS: 'CREATE_ADDRESS',
  PAPARA_SEND_REQUEST: 'PAPARA_SEND_REQUEST'
};

export const getDepositInfo = currencyCode => ({
  type: DEPOSIT_DIALOG_ACTIONS.GET_DEPOSIT_INFO,
  payload: {
    request: {
      method: 'GET',
      url: `/p/v1/currency_ops/deposit/info/${currencyCode}/`,
      requireToken: true
    }
  }
});

export const createAddress = currencyCode => ({
  type: DEPOSIT_DIALOG_ACTIONS.CREATE_ADDRESS,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/currency_ops/deposit/new_address/${currencyCode}/`,
      requireToken: true
    }
  }
});

export const requestPapara = data => ({
  type: DEPOSIT_DIALOG_ACTIONS.PAPARA_SEND_REQUEST,
  payload: {
    request: {
      method: 'POST',
      url: '/p/v1/currency_ops/deposit/papara/request/',
      data,
      requireToken: true
    }
  }
});
