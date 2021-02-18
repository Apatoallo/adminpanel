import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MarketBar from './MarketBar';
import { getDetail } from '../../modules/user/UserActions';
import {
  getAccountLines,
  getMarketsInfo,
  changeMarket
} from './MarketBarActions';
import { withRouter } from 'react-router-dom';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getAccountLines,
      getDetail,
      getMarketsInfo,
      changeMarket
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    ticker: state.orderBook.ticker,
    accountInfo: state.user.accountInfo,
    accountLines: state.market.accountLines,
    markets: state.market.markets,
    tickers: state.market.tickers,
    selectedMarket: state.market.selectedMarket,
    accountLinesUpdateTimeout: state.market.accountLinesUpdateTimeout
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MarketBar)
);
