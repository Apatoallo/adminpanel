import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SettingsMenu from './SettingsMenu';

function mapStateToProps(state) {
  return {
    userInfo: state.user.info
  };
}

export default withRouter(connect(mapStateToProps, null)(SettingsMenu));
