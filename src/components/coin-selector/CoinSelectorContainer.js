import { connect } from 'react-redux';
import CoinSelector from './CoinSelector';

function mapStateToProps(state) {
  return {
    currencyList: state.instantTradePane.currencyList,
    currentThemeName: state.theme.currentThemeName,
    accountLines: state.market.accountLines
  };
}

export default connect(
  mapStateToProps,
  null
)(CoinSelector);
