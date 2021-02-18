export const USER_ACTIONS = {
  GET_DETAIL: 'GET_DETAIL',
  GET_ANNOUNCEMENTS: 'GET_ANNOUNCEMENTS'
};

export const getDetail = data => ({
  type: USER_ACTIONS.GET_DETAIL,
  payload: {
    request: {
      method: 'POST',
      url: '/p/v1/user/get_detail/',
      requireToken: true,
      data
    }
  }
});

export const getAnnouncements = () => ({
  type: USER_ACTIONS.GET_ANNOUNCEMENTS,
  payload: {
    request: {
      method: 'GET',
      url: '/p/v1/user/announcement/',
      requireToken: true
    }
  }
});
