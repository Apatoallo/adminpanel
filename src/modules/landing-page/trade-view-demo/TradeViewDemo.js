import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from './../header/Header';
import socketHelper from '../../../api/socketHelper';
import DocumentTitle from 'react-document-title';
import I18n from '../../../common/i18n/I18n';
import MarketBarContainer from '../../../components/market-bar/MarketBarContainer';
import TradeViewContainer from '../../trade/trade-view/TradeViewContainer';
import HeaderMenu from './../header/HeaderMenu';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import darkTheme from '../../../common/theme/darkTheme';

const styles = theme => ({
  pageContainer: {},
  root: {
    backgroundColor: theme.colors.background.header,
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    width: '100%'
  },
  fullWidth: {
    width: '100%'
  },
  headerTradeView: {
    width: '100%',
    padding: '0 16px'
  },
  popoverStyle: {
    left: '0 !important'
  }
});

class TradeViewDemo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleView = this.toggleView.bind(this);

    this.state = {
      showMenu: false
    };
  }

  componentDidMount() {
    socketHelper.subscribeToTickers();
  }

  componentWillUnmount() {
    socketHelper.unsubscribeFromTickers();
  }

  toggleView(open) {
    this.setState({ showMenu: open });
  }

  render() {
    const { classes, tickers } = this.props;
    const { showMenu } = this.state;

    return (
      <DocumentTitle
        title={
          tickers && tickers.length > 0 && tickers[0]
            ? `(${tickers[0].last_price} ${
                tickers[0].market.counter_currency_code
              }) ${I18n.translate('site_title')}`
            : I18n.translate('site_title')
        }
      >
        <div className={classes.pageContainer}>
          <MuiThemeProvider theme={createMuiTheme(darkTheme)}>
            <div className={classes.root}>
              <Header
                onClick={this.toggleView}
                tradeViewMode={true}
                classes={{
                  headerStyle: classes.headerTradeView
                }}
              />
              {showMenu ? <HeaderMenu /> : ''}
            </div>
            {showMenu ? (
              ''
            ) : (
              <div>
                <MarketBarContainer
                  classes={{
                    marketBarStyle: classes.fullWidth,
                    popoverPaper: classes.popoverStyle
                  }}
                />
                <TradeViewContainer isPreLoginMode={true} />
              </div>
            )}
          </MuiThemeProvider>
        </div>
      </DocumentTitle>
    );
  }
}

export default withStyles(styles)(TradeViewDemo);
