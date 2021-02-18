export const PREFERENCES_ACTIONS = {
  CHANGE_PREFERENCES: 'CHANGE_PREFERENCES'
};

export const changePreferences = (key, value) => ({
  type: PREFERENCES_ACTIONS.CHANGE_PREFERENCES,
  payload: {
    data: {
      key,
      value
    }
  }
});
