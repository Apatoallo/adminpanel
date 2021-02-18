import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from './../header/Header';
import socketHelper from '../../../api/socketHelper';
import DocumentTitle from 'react-document-title';
import { Route, Switch, Redirect } from 'react-router-dom';
import I18n from '../../../common/i18n/I18n';
import HeaderMenu from './../header/HeaderMenu';
import InstantTradeMenuContainer from '../../instant-trade/instant-trade-menu/InstantTradeMenuContainer';
import InstantTradePaneContainer from '../../instant-trade/instant-trade-pane/InstantTradePaneContainer';

const styles = theme => ({
  pageContainer: {},
  root: {
    backgroundColor: '#304262',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '@media screen and (max-width: 800px)': {
      paddingLeft: '16px'
    },
    '@media screen and (min-width: 801px)': {
      paddingLeft: '60px'
    },
    '@media screen and (min-width: 1280px)': {
      paddingLeft: '118px'
    },
    padding: '10px 0 10px 16px'
  },
  fullWidth: {
    width: '100%'
  },
  popoverStyle: {
    left: '0 !important'
  },
  contentContainer: {
    width: '100%',
    minHeight: 'calc(100vh - 80px)',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '@media screen and (max-width: 800px)': {
      padding: '0 16px'
    },
    '@media screen and (min-width: 801px)': {
      padding: '0 60px'
    },
    '@media screen and (min-width: 1280px)': {
      padding: '0 118px'
    },
    backgroundColor: theme.colors.background.content
  },
  content: {
    boxSizing: 'border-box',
    width: '1170px',
    '@media screen and (max-width: 1279px)': {
      width: '100%',
      minWidth: 'auto'
    }
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '@media screen and (min-width: 1280px)': {
      width: '1296px'
    }
  }
});

class InstantTradeDemo extends React.PureComponent {
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
            <div className={classes.headerContainer}>
              <Header
                onClick={this.toggleView}
                tradeViewMode={false}
                classes={{
                  headerStyle: classes.headerTradeView
                }}
              />
              {showMenu ? <HeaderMenu /> : ''}
            </div>
          </div>
          {showMenu ? (
            ''
          ) : (
            <div className={classes.contentContainer}>
              <div className={classes.content}>
                <Switch>
                  <Route exact path="/instant/">
                    <Redirect to="/instant/market" />
                  </Route>
                  <Route
                    path="/instant/market"
                    component={InstantTradeMenuContainer}
                  />
                  <Route
                    path="/instant/trade"
                    component={InstantTradePaneContainer}
                  />
                </Switch>
              </div>
            </div>
          )}
        </div>
      </DocumentTitle>
    );
  }
}

export default withStyles(styles)(InstantTradeDemo);
