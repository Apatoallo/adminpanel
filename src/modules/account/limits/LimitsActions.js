export const LIMITS_ACTIONS = {
  GET_ACCOUNT_LIMITS: 'GET_ACCOUNT_LIMITS',
  GET_FEES_PUBLIC: 'GET_FEES_PUBLIC'
};

export const getAccountLimits = (currency = 'try') => ({
  type: LIMITS_ACTIONS.GET_ACCOUNT_LIMITS,
  payload: {
    request: {
      method: 'GET',
      url: `/p/v1/account/account_limits/${currency}/`,
      requireToken: true
    }
  }
});

export const getFeesPublic = () => ({
  type: LIMITS_ACTIONS.GET_FEES_PUBLIC,
  payload: {
    request: {
      method: 'GET',
      url: `/p/v1/account/transaction_fees/`
    }
  }
});
