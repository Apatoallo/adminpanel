import React, { lazy, Suspense } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Divider from '@material-ui/core/Divider';
import classNames from 'classnames';
import I18n from '../../../../common/i18n/I18n';
import logo from '../../../../assets/images/Loading140.gif';
import queryString from 'query-string';

const TradeViewChart = lazy(() =>
  import('../../market-content/charts/TradeViewChart')
);

const DepthChartContainer = lazy(() =>
  import('../../market-content/charts/DepthChartContainer')
);

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    zIndex: 2
  },
  external: {
    backgroundColor: '#364a6e',
    height: '100vh'
  },
  tabsRoot: {
    minHeight: '40px',
    height: '40px'
  },
  tabIndicator: {
    backgroundColor: theme.colors.textColor.blue
  },
  checkbox: {
    color: theme.colors.background.checkboxBorder,
    '&$checked': {
      color: theme.colors.textColor.blue
    },
    padding: '2px 12px'
  },
  checked: {},
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: '40px'
  },
  dividerStyle: {
    height: '2px',
    marginTop: '-2px',
    backgroundColor: theme.colors.background.divider
  },
  tabStyle: {
    textTransform: 'none',
    fontFamily: 'Roboto',
    fontWeight: '400',
    height: '40px',
    minHeight: '40px',
    color: theme.colors.textColor.inactiveTab
  },
  defaultTabSelected: {
    color: theme.colors.textColor.activeTab,
    fontWeight: '500'
  },
  depthChartContainer: {
    display: 'flex',
    height: '100%',
    backgroundColor: theme.colors.background.content
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: theme.colors.background.content
  },
  chartContainer: {
    height: 'calc(100vh - 80px)',
    backgroundColor: theme.colors.background.content
  },
  chartContainerExternal: {
    height: 'calc(100vh - 40px)'
  }
});

class TabbedCharts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isExternal: false,
      chartsReady: false
    };
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    this.setState({ isExternal: values.ext });
    if (values.ext && values.lang) {
      I18n.language = values.lang;
    }
    if (values.ext && values.market_code) {
      this.props.getMarketsInfo().then(() => {
        this.props.changeMarket(values.market_code.toUpperCase());
        this.setState({ chartsReady: true });
      });
    }
  }

  getEnabledFeaturesForTradeViewChart = () => {
    let features = ['side_toolbar_in_fullscreen_mode'];
    if (this.state.isExternal) {
      features.push('hide_left_toolbar_by_default');
    }
    return features;
  };

  handleChartTypeChange = (event, value) => {
    this.props.changePreferences('chartType', value);
  };

  render() {
    const { classes, onChangeMarket, selectedMarket, preferences } = this.props;

    const { chartType } = preferences;
    return (
      <div
        className={classNames(classes.container, {
          [classes.external]: this.state.isExternal
        })}
      >
        <div className={classes.tabContainer}>
          <Tabs
            value={chartType}
            onChange={this.handleChartTypeChange}
            textColor="primary"
            classes={{
              root: classes.tabsRoot,
              indicator: classes.tabIndicator
            }}
          >
            <Tab
              classes={{
                root: classes.tabStyle,
                selected: classes.defaultTabSelected
              }}
              value="tradeView"
              label={I18n.translate('charts_tradeview')}
            />
            <Tab
              classes={{
                root: classes.tabStyle,
                selected: classes.defaultTabSelected
              }}
              value="depth"
              label={I18n.translate('charts_depth')}
            />
          </Tabs>
        </div>
        <Divider className={classes.dividerStyle} />
        {chartType === 'tradeView' &&
          (!this.state.isExternal || this.state.chartsReady) && (
            <Suspense
              fallback={
                <div className={classes.loading}>
                  <img src={logo} alt="loading..." width="55px" height="43px" />
                </div>
              }
            >
              <TradeViewChart
                theme="darkTheme"
                selectedMarket={selectedMarket}
                classes={{
                  tvChartContainer: classNames({
                    [classes.chartContainerExternal]: this.state.isExternal,
                    [classes.chartContainer]: !this.state.isExternal
                  })
                }}
                enabledFeatures={this.getEnabledFeaturesForTradeViewChart()}
                onChangeMarket={onChangeMarket}
              />
            </Suspense>
          )}
        {chartType === 'depth' && (
          <Suspense
            fallback={
              <div className={classes.loading}>
                <img src={logo} alt="loading..." width="55px" height="43px" />
              </div>
            }
          >
            <div className={classes.depthChartContainer}>
              <DepthChartContainer
                displayScaleLabels={!this.state.isExternal}
              />
            </div>
          </Suspense>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(TabbedCharts);
