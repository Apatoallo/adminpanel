export const INFO_PANE_ACTIONS = {
  SUBSCRIBE_TO_MAIL_LIST: 'SUBSCRIBE_TO_MAIL_LIST'
};

export const subscribeToMailList = emailAddress => ({
  type: INFO_PANE_ACTIONS.SUBSCRIBE_TO_MAIL_LIST,
  payload: {
    request: {
      method: 'POST',
      url: `https://bitexen.us18.list-manage.com/subscribe/post?u=1de878a20f55c5557640a23a4&amp;id=43fe091c2d`,
      data: {
        EMAIL: emailAddress
      }
    }
  }
});
