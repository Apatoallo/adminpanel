export const EXEN_ACTIONS = {
  GET_PROFILE: 'GET_PROFILE',
  GET_REFERRAL_HISTORY: 'GET_REFERRAL_HISTORY',
  GET_COMPETITION_HISTORY: 'GET_COMPETITION_HISTORY',
  ADD_REFERRER: 'ADD_REFERRER',
  GET_COMPETITION: 'GET_COMPETITION',
  GET_COMPETITION_PUBLIC: 'GET_COMPETITION_PUBLIC',
  GET_STATS: 'GET_STATS'
};

export const getProfile = () => ({
  type: EXEN_ACTIONS.GET_PROFILE,
  payload: {
    request: {
      method: 'GET',
      url: `/p/v1/user/exen_profile/`,
      requireToken: true
    }
  }
});

export const getReferralHistory = pageNumber => ({
  type: EXEN_ACTIONS.GET_REFERRAL_HISTORY,
  payload: {
    request: {
      method: 'GET',
      url: `/p/v1/user/referral_history/${pageNumber}/`,
      requireToken: true
    }
  }
});

export const getCompetitionHistory = pageNumber => ({
  type: EXEN_ACTIONS.GET_COMPETITION_HISTORY,
  payload: {
    request: {
      method: 'GET',
      url: `/p/v1/user/competition_history/${pageNumber}/`,
      requireToken: true
    }
  }
});

export const addReferrer = data => ({
  type: EXEN_ACTIONS.ADD_REFERRER,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/user/add_referrer/`,
      requireToken: true,
      data
    }
  }
});

export const getCompetition = index => ({
  type: EXEN_ACTIONS.GET_COMPETITION,
  payload: {
    request: {
      method: 'GET',
      url: `/p/v1/user/competitions/${index}/`,
      requireToken: true
    }
  }
});

export const getCompetitionPublic = index => ({
  type: EXEN_ACTIONS.GET_COMPETITION_PUBLIC,
  payload: {
    request: {
      method: 'GET',
      url: `/p/v1/competitions/${index}/`
    }
  }
});

export const getExenStats = () => ({
  type: EXEN_ACTIONS.GET_STATS,
  payload: {
    request: {
      method: 'GET',
      url: `/p/v1/exen_stats/`
    }
  }
});
