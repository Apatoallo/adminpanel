import { connect } from 'react-redux';
import LandingPage from './LandingPage';

function mapStateToProps(state) {
  return {
    tickers: state.market.tickers
  };
}

export default connect(mapStateToProps, null)(LandingPage);
