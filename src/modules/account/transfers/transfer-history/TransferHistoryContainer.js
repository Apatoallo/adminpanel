import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getTransferHistory,
  cancelTransfer,
  clearUpdateAwaitingTransferListFlag,
  clearUpdateFinishedTransferListFlag
} from './TransferHistoryActions';
import {
  showSnackbar,
  showDialog
} from '../../../../components/page/PageActions';
import TransferHistory from './TransferHistory';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTransferHistory,
      cancelTransfer,
      clearUpdateAwaitingTransferListFlag,
      clearUpdateFinishedTransferListFlag,
      showSnackbar,
      showDialog
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    openTransfers: state.transferHistory.openTransfers,
    closedTransfers: state.transferHistory.closedTransfers,
    updateAwaitingTransferListFlag:
      state.transferHistory.updateAwaitingTransferListFlag,
    updateFinishedTransferListFlag:
      state.transferHistory.updateFinishedTransferListFlag
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferHistory);
