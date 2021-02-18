import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import InstantTradePane from './InstantTradePane';
import { changePreferences } from '../../preferences/PreferencesActions';
import {
  getPrice,
  getCurrencyList,
  createInstantOrder
} from './InstantTradePaneActions';
import { showDialog } from '../../../components/page/PageActions';
import { changeMarket } from '../../../components/market-bar/MarketBarActions';

function mapStateToProps(state) {
  return {
    accountLines: state.market.accountLines,
    currencyList: state.instantTradePane.currencyList,
    defaultCurrencies: state.instantTradePane.defaultCurrencies,
    price: state.instantTradePane.price,
    preferences: state.preferences
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changePreferences,
      getPrice,
      getCurrencyList,
      showDialog,
      changeMarket,
      createInstantOrder
    },
    dispatch
  );
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InstantTradePane)
);
