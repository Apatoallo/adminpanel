export const ACTIVITY_HISTORY_ACTIONS = {
  GET_ACTIVITY_HISTORY: 'GET_ACTIVITY_HISTORY'
};

export const getActivityHistory = (
  activity_type,
  channel_code,
  date_range,
  page_number
) => ({
  type: ACTIVITY_HISTORY_ACTIONS.GET_ACTIVITY_HISTORY,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/user/activity_history/`,
      requireToken: true,
      data: {
        filter_options: {
          activity_type,
          channel_code,
          date_range,
          page_number
        }
      }
    }
  }
});
