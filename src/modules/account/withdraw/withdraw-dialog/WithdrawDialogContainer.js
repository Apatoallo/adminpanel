import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import WithdrawDialog from './WithdrawDialog';
import {
  getWithdrawalInfo,
  validateAddress,
  deleteWithdrawAddress,
  withdraw
} from './WithdrawDialogActions';
import { showDialog } from '../../../../components/page/PageActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getWithdrawalInfo,
      validateAddress,
      deleteWithdrawAddress,
      withdraw,
      showDialog
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    withdrawal: state.withdrawal,
    accountLines: state.market.accountLines
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WithdrawDialog)
);
