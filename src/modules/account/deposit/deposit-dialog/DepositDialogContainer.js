import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import DepositDialog from './DepositDialog';
import {
  showSnackbar,
  showDialog
} from '../../../../components/page/PageActions';
import {
  getDepositInfo,
  createAddress,
  requestPapara
} from './DepositDialogActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getDepositInfo,
      createAddress,
      showSnackbar,
      showDialog,
      requestPapara
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    deposit: state.deposit
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DepositDialog)
);
