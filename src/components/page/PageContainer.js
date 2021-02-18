import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Page from './Page';
import { sendAnnouncementResponse } from './PageActions';
import { changePreferences } from '../../modules/preferences/PreferencesActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { sendAnnouncementResponse, changePreferences },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    modalItems: state.page.modalItems,
    snackbarItem: state.page.snackbarItem,
    showLoading: state.page.showLoading,
    showDeviceConfirmation: state.user.showLoginConfirmationDialog,
    announcements: state.user.announcements
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Page)
);
