import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TradeView from './TradeView';
import { sendOrderInformation } from './TradeViewActions';
import { changeMarket } from '../../../components/market-bar/MarketBarActions';
import { changePreferences } from '../../preferences/PreferencesActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      sendOrderInformation,
      changeMarket,
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
    showAllMarkets: state.theme.preferences
      ? state.theme.preferences.showAllMarkets
      : true,
    hideCancelled: state.theme.preferences
      ? state.theme.preferences.hideCancelled
      : true,
    preferences: state.preferences
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeView);
