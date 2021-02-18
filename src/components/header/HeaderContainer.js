import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import {
  changeTheme,
  changeTradeViewStyle
} from '../../common/theme/themeActions';
import { logoutAction } from '../../modules/login/LoginActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeTheme,
      changeTradeViewStyle,
      logoutAction
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    currentThemeName: state.theme.currentThemeName,
    currentTradeViewStyle: state.theme.currentTradeViewStyle,
    userInfo: state.user.info,
    preferences: state.preferences
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
