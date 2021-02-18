export const NOTIFICATION_SETTINGS_ACTIONS = {
  SAVE_SETTINGS: 'SAVE_SETTINGS'
};

export const saveSettings = data => ({
  type: NOTIFICATION_SETTINGS_ACTIONS.SAVE_SETTINGS,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/user/update_cn_setting/`,
      requireToken: true,
      data
    }
  }
});
