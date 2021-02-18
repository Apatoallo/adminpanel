import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AccountMenu from './AccountMenu';

function mapStateToProps(state) {
  return {
    userInfo: state.user.info
  };
}

export default withRouter(connect(mapStateToProps, null)(AccountMenu));
