import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from './header/Header';
import socketHelper from '../../api/socketHelper';
import DocumentTitle from 'react-document-title';
import Footer from './footer/Footer';
import I18n from '../../common/i18n/I18n';
import MarketBarContainer from '../../components/market-bar/MarketBarContainer';
import TradePaneContainer from '../trade/trade-pane/TradePaneContainer';
import MarketContentContainer from '../trade/market-content/MarketContentContainer';
import HeaderMenu from './header/HeaderMenu';
const styles = theme => ({
  pageContainer: {
    height: '100vh'
  },
  root: {
    backgroundColor: theme.colors.background.header,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '10px'
  },
  contentContainerStyle: {
    display: 'flex',
    flex: '1',
    justifyContent: 'center',
    width: '100%',
    minWidth: '1079px',
    boxSizing: 'border-box',
    backgroundColor: theme.colors.background.content,
    '@media screen and (max-width: 600px)': {
      minWidth: 'auto',
      top: '122px',
      padding: theme.unit.margin
    }
  },
  contentStyle: {
    display: 'flex',
    flexDirection: 'row',
    width: '1170px',
    minWidth: '1079px',
    '@media screen and (max-width: 600px)': {
      flexDirection: 'column',
      width: '100%',
      minWidth: 'auto'
    },
    '@media screen and (min-width: 601px) and (max-width: 1279px)': {},
    '@media screen and (min-width: 1280px)': {}
  },
  leftContentStyle: {},
  rightContentStyle: {
    marginLeft: '24px',
    width: '100%',
    maxWidth: '876px',
    '@media screen and (max-width: 600px)': {
      marginLeft: '0',
      width: 'auto'
    },
    marginBottom: '24px'
  },
  footerContainer: {
    width: '100%',
    '@media screen and (max-width: 600px)': {
      display: 'none'
    }
  },
  marketBarContainerStyle: {
    display: 'flex',
    backgroundColor: theme.colors.background.marketBar,
    color: theme.colors.textColor.white,
    boxSizing: 'border-box',
    justifyContent: 'center',
    width: '100%',
    height: '52px',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.08)'
  },
  tradePaneStyle: {
    display: 'flex',
    flexDirection: 'column',
    width: '270px',
    height: 'auto',
    marginTop: '24px',
    '@media screen and (max-width: 600px)': {
      position: 'initial',
      marginTop: '0',
      width: 'auto',
      minWidth: 'auto'
    }
  }
});

class LandingPage extends React.PureComponent {
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
          <div className={classes.root}>
            <Header onClick={this.toggleView} tradeViewMode={true} />
            {showMenu ? <HeaderMenu /> : ''}
          </div>
          {showMenu ? (
            ''
          ) : (
            <div>
              <MarketBarContainer className={classes.marketBarContainerStyle} />
              <div className={classes.contentContainerStyle}>
                <div className={classes.contentStyle}>
                  <div className={classes.leftContentStyle}>
                    <TradePaneContainer
                      className={classes.tradePaneStyle}
                      isPreLoginMode={true}
                    />
                  </div>
                  <div className={classes.rightContentStyle}>
                    <MarketContentContainer tradeViewStyle="horizontal" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className={classes.footerContainer}>
            <Footer tradeViewMode={true} />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default withStyles(styles)(LandingPage);
