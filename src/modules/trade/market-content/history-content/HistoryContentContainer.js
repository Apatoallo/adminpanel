import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HistoryContent from './HistoryContent';
import { changePreferences } from '../../../preferences/PreferencesActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changePreferences
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    currentTradeViewStyle: state.theme.currentTradeViewStyle,
    selectedMarket: state.market.selectedMarket,
    currentThemeName: state.theme.currentThemeName,
    preferences: state.preferences
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContent);
