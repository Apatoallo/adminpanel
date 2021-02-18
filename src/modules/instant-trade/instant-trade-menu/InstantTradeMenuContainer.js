import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import InstantTradeMenu from './InstantTradeMenu';
import { changePreferences } from '../../preferences/PreferencesActions';
import { getCurrencyList } from '../instant-trade-pane/InstantTradePaneActions';
import { showDialog } from '../../../components/page/PageActions';
import {
  changeMarket,
  getMarketsInfo
} from '../../../components/market-bar/MarketBarActions';

function mapStateToProps(state) {
  return {
    userInfo: state.user.info,
    preferences: state.preferences,
    currencyList: state.instantTradePane.currencyList,
    groupedTickers: state.groupedTickers,
    markets: state.market.markets
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changePreferences,
      getCurrencyList,
      showDialog,
      changeMarket,
      getMarketsInfo
    },
    dispatch
  );
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InstantTradeMenu)
);
