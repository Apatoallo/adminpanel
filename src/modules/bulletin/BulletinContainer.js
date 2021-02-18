import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Bulletin from './Bulletin';
import { getBulletin } from './BulletinActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getBulletin
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    posts: state.bulletin.posts
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bulletin);
