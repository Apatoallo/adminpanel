import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { widget } from '../../../../charting_library/charting_library.min';
import { endpoints } from '../../../../common/config/config';
import I18n from '../../../../common/i18n/I18n';

const styles = theme => ({
  tvChartContainer: {}
});

export class TradeViewChart extends React.PureComponent {
  state = {
    chartReady: false
  };

  static defaultProps = {
    symbol: 'BTCTRY',
    interval: '1D',
    containerId: 'tv_chart_container',
    datafeedUrl: endpoints.chart,
    libraryPath: '/charting_library/',
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
    enabledFeatures: ['side_toolbar_in_fullscreen_mode']
  };

  tvWidget = null;

  componentDidMount() {
    if (this.props.onChartMounting) {
      this.props.onChartMounting();
    }

    const widgetOptions = {
      symbol: this.props.selectedMarket.market_code,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(
        this.props.datafeedUrl
      ),
      interval: this.props.interval,
      container_id: this.props.containerId,
      library_path: this.props.libraryPath,

      locale: I18n.currentLanguage.toLowerCase(),
      disabled_features: ['use_localstorage_for_settings', 'header_saveload'],
      enabled_features: this.props.enabledFeatures,
      fullscreen: this.props.fullscreen,
      autosize: this.props.autosize,
      studies_overrides: this.props.studiesOverrides,
      theme:
        this.props.theme && this.props.theme === 'darkTheme' ? 'Dark' : 'Light',
      toolbar_bg:
        this.props.theme && this.props.theme === 'darkTheme'
          ? '#26344e'
          : undefined,
      overrides: {
        'paneProperties.background':
          this.props.theme && this.props.theme === 'darkTheme'
            ? '#26344e'
            : undefined,
        'scalesProperties.backgroundColor':
          this.props.theme && this.props.theme === 'darkTheme'
            ? '#26344e'
            : undefined
      },
      custom_css_url: 'dark-theme-overrides.css',
      charts_storage_api_version: '1.1',
      charts_storage_url: 'https://saveload.tradingview.com',
      client_id: 'bitexen.com',
      loading_screen: { backgroundColor: '#26344e' },
      timezone: 'exchange'
    };

    const tvWidget = new widget(widgetOptions);
    this.tvWidget = tvWidget;

    tvWidget.onChartReady(() => {
      this.setState({ chartReady: true });
      if (this.props.onChartMounted) {
        this.props.onChartMounted();
      }
      const { onChangeMarket } = this.props;
      if (onChangeMarket) {
        tvWidget
          .chart()
          .onSymbolChanged()
          .subscribe(onChangeMarket, function(symbol) {
            onChangeMarket(symbol.ticker);
          });
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (
      this.state.chartReady &&
      prevProps.selectedMarket !== this.props.selectedMarket
    ) {
      const { interval } = this.tvWidget.symbolInterval();
      this.tvWidget.setSymbol(
        this.props.selectedMarket.market_code,
        interval,
        () => {}
      );
    }
  }

  componentWillUnmount() {
    if (this.state.chartReady && this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }

  render() {
    return (
      <div
        id={this.props.containerId}
        className={this.props.classes.tvChartContainer}
      />
    );
  }
}

export default withStyles(styles)(TradeViewChart);
