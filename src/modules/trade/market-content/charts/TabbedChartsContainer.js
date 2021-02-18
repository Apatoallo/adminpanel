import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TabbedCharts from './TabbedCharts';
import { changePreferences } from '../../../preferences/PreferencesActions';
import {
  changeMarket,
  getMarketsInfo
} from '../../../../components/market-bar/MarketBarActions';
import { withRouter } from 'react-router-dom';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changePreferences,
      getMarketsInfo,
      changeMarket
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    preferences: state.preferences,
    selectedMarket: state.market.selectedMarket
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TabbedCharts)
);
