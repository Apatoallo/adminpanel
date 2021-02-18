import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withSizes from 'react-sizes';
import Responsive from 'react-responsive';
import TradePaneContainer from '../trade-pane/TradePaneContainer';
import TradeViewDesktop from './desktop/TradeViewDesktop';
import TradeViewTablet from './tablet/TradeViewTablet';
import TradeViewMobile from './mobile/TradeViewMobile';

import TradeViewStyle from './TradeViewStyle';

const Desktop = props => <Responsive {...props} minWidth={1367} />;
const Tablet = props => (
  <Responsive {...props} minWidth={601} maxWidth={1366} />
);
const Mobile = props => <Responsive {...props} maxWidth={600} />;

class TradeView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tradePaneInitiator: 'default'
    };
  }

  componentDidMount() {
    this.props.changePreferences('advancedTradeView', true);
  }

  toggleFilter = () => {
    this.props.changePreferences(
      'showAllMarkets',
      !this.props.preferences.showAllMarkets
    );
  };

  toggleHideCancelledFilter = () => {
    this.props.changePreferences(
      'hideCancelled',
      !this.props.preferences.hideCancelled
    );
  };

  handleHistoryTypeChange = (event, value) => {
    this.props.changePreferences('historyType', value);
  };

  handleTabletTabTypeChange = (event, value) => {
    this.props.changePreferences('tabletTabType', value);
  };

  handleMobileTabTypeChange = (event, value) => {
    this.setState({
      tradePaneInitiator: event ? 'default' : 'orderBook'
    });
    this.props.changePreferences('mobileTabType', value);
  };

  getSliceSize = (isTablet, isMobile) => {
    const { windowHeight } = this.props;
    let sliceSize = 0;
    if (isTablet) {
      sliceSize = Math.floor((windowHeight * 0.7 - 152) / 24);
    } else if (isMobile) {
      sliceSize = Math.floor((windowHeight - 230) / 24);
    } else {
      sliceSize = Math.floor((windowHeight - 146) / 24);
    }
    return sliceSize % 2 === 0 ? sliceSize - 1 : sliceSize;
  };

  render() {
    const {
      classes,
      selectedMarket,
      changeMarket,
      windowWidth,
      isPreLoginMode,
      preferences
    } = this.props;

    const {
      historyType,
      tabletTabType,
      mobileTabType,
      showAllMarkets,
      hideCancelled
    } = preferences;

    const { tradePaneInitiator } = this.state;

    const isTablet = windowWidth > 601 && windowWidth < 1367;
    const isMobile = windowWidth <= 600;
    const sliceSize = this.getSliceSize(isTablet, isMobile);

    return (
      <div className={classes.pageStyle}>
        {!isMobile && (
          <div className={classes.tradePane}>
            <TradePaneContainer
              isPreLoginMode={isPreLoginMode}
              PaperProps={{
                classes: {
                  paperStyle: classes.paper
                }
              }}
            />
          </div>
        )}
        <Desktop>
          <TradeViewDesktop
            selectedMarket={selectedMarket}
            showAllMarkets={showAllMarkets}
            hideCancelled={hideCancelled}
            historyType={historyType}
            sliceSize={sliceSize}
            onMarketFilterChange={this.toggleFilter}
            onHideCancelledChange={this.toggleHideCancelledFilter}
            onHistoryTypeChange={this.handleHistoryTypeChange}
            onChangeMarket={changeMarket}
          />
        </Desktop>
        <Tablet>
          <TradeViewTablet
            selectedMarket={selectedMarket}
            showAllMarkets={showAllMarkets}
            hideCancelled={hideCancelled}
            historyType={historyType}
            tabletTabType={tabletTabType}
            sliceSize={sliceSize}
            onMarketFilterChange={this.toggleFilter}
            onHideCancelledChange={this.toggleHideCancelledFilter}
            onHistoryTypeChange={this.handleHistoryTypeChange}
            onTabletTabTypeChange={this.handleTabletTabTypeChange}
            onChangeMarket={changeMarket}
          />
        </Tablet>
        <Mobile>
          <TradeViewMobile
            selectedMarket={selectedMarket}
            showAllMarkets={showAllMarkets}
            historyType={historyType}
            mobileTabType={mobileTabType}
            sliceSize={sliceSize}
            isPreLoginMode={isPreLoginMode}
            tradePaneInitiator={tradePaneInitiator}
            onMobileTabTypeChange={this.handleMobileTabTypeChange}
            onChangeMarket={changeMarket}
          />
        </Mobile>
      </div>
    );
  }
}

const mapSizesToProps = ({ width, height }) => ({
  windowHeight: height,
  windowWidth: width
});

export default withStyles(TradeViewStyle, { withTheme: true })(
  withSizes(mapSizesToProps)(TradeView)
);
