import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NotificationSettings from './NotificationSettings';
import { saveSettings } from './NotificationSettingsActions';
import { showSnackbar, showDialog } from '../../../components/page/PageActions';
import { getDetail } from '../../user/UserActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      saveSettings,
      showSnackbar,
      showDialog,
      getDetail
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    settings: state.user.settings
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  NotificationSettings
);
