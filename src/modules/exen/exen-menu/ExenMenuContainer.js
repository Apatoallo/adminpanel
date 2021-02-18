import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ExenMenu from './ExenMenu';

function mapStateToProps(state) {
  return {
    userInfo: state.user.info
  };
}

export default withRouter(connect(mapStateToProps, null)(ExenMenu));
