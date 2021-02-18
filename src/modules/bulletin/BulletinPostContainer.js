import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBulletinPost } from './BulletinActions';
import BulletinPost from './BulletinPost';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getBulletinPost
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    posts: state.bulletin.post
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BulletinPost);
