import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChangePassword from './ChangePassword';
import { changePassword } from './ChangePasswordActions';
import {
  showSnackbar,
  showDialog
} from '../../../../components/page/PageActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changePassword,
      showSnackbar,
      showDialog
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(ChangePassword);
