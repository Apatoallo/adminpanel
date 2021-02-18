import { BULLETIN_ACTIONS } from './BulletinActions';

const initialState = {
  posts: [],
  post: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${BULLETIN_ACTIONS.GET_BULLETIN}_SUCCESS`:
      return {
        ...state,
        posts: action.payload.data.body
      };
    case `${BULLETIN_ACTIONS.GET_BULLETIN_POST}_SUCCESS`:
      return {
        ...state,
        post: action.payload.data.body
      };
    default:
      return state;
  }
};
