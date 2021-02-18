import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Assets from './Assets';
import { showSnackbar, showDialog } from '../../../components/page/PageActions';
import { getInstantTickers } from '../../instant-trade/GroupedTickersActions';
import { changePreferences } from '../../preferences/PreferencesActions';
import { getCurrencyList } from '../../instant-trade/instant-trade-pane/InstantTradePaneActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      showSnackbar,
      showDialog,
      getInstantTickers,
      getCurrencyList,
      changePreferences
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    accountLines: state.market.accountLines,
    tickers: state.market.tickers,
    currentThemeName: state.theme.currentThemeName,
    tryTickers: state.groupedTickers.TRY,
    preferences: state.preferences,
    currencyList: state.instantTradePane.currencyList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Assets);
