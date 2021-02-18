import I18n from '../../common/i18n/I18n';

export const BULLETIN_ACTIONS = {
  GET_BULLETIN: 'GET_BULLETIN',
  GET_BULLETIN_POST: 'GET_BULLETIN_POST'
};

export const getBulletin = (contentType, filter) => ({
  type: BULLETIN_ACTIONS.GET_BULLETIN,
  payload: {
    client: 'bulletin',
    request: {
      method: 'GET',
      url: `/bulletin?lang=${
        I18n.currentLanguage
      }&content_type=${contentType}&filter=${filter}`
    }
  }
});

export const getBulletinPost = (id, contentType) => ({
  type: BULLETIN_ACTIONS.GET_BULLETIN_POST,
  payload: {
    client: 'bulletin',
    request: {
      method: 'GET',
      url: `/bulletin?lang=${
        I18n.currentLanguage
      }&content_type=${contentType}&post_id=${id}`
    }
  }
});
