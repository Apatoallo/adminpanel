import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { changePassword } from './ChangePasswordActions';
import ChangePassword from './ChangePassword';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changePassword
    },
    dispatch
  );
}

export default withRouter(connect(null, mapDispatchToProps)(ChangePassword));
