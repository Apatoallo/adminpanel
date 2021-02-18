import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import ReactGA from 'react-ga';
import ReduxStore from './common/redux/ReduxStore';
import history from './common/history';
import socketHelper from './api/socketHelper';
import { getTheme } from './common/theme/themeProvider';
import { PersistGate } from 'redux-persist/lib/integration/react';
import PageContainer from './components/page/PageContainer';
import LoginContainer from './modules/login/LoginContainer';
import Login2FAContainer from './modules/login/Login2FAContainer';
import ForgotPasswordContainer from './modules/forgot-password/ForgotPasswordContainer';
import ForgotPasswordSuccess from './modules/forgot-password/ForgotPasswordSuccess';
import SignUpContainer from './modules/sign-up/SignUpContainer';
import PublicRoute from './components/PublicRoute';
import ConditionalRoute from './components/ConditionalRoute';
import PolicyPage from './modules/policy-page/PolicyPage';
import ExenDefinitionPublic from './modules/exen/exen-definition/ExenDefinitionPublic';
import VerifyContainer from './modules/verify/VerifyContainer';
import BulletinContainer from './modules/bulletin/BulletinContainer';
import withTracker from './common/utils/withTracker';
import { configKeys } from './common/config/config';
import ChangePasswordContainer from './modules/login/ChangePasswordContainer';
import LandingPageDemo from './modules/landing-page/LandingPageDemo';
import TradeViewDemo from './modules/landing-page/trade-view-demo/TradeViewDemo';
import I18n from './common/i18n/I18n';
import { Helmet } from 'react-helmet';
import { isUserLoggedIn } from './modules/login/loginHelper';
import CompetitionsPublicContainer from './modules/competition/CompetitionsPublicContainer';
import LandingPageContainer from './modules/landing-page/LandingPageContainer';
import InstantTradeDemo from './modules/landing-page/instant-trade-demo/InstantTradeDemo';
import LocalStorage from './common/utils/LocalStorage';
import { sendClientError } from './components/exception/ClientExceptionActions';
import ScrollToTop from './components/ScrollToTop';
import TabbedChartsContainer from './modules/trade/market-content/charts/TabbedChartsContainer';
import darkTheme from './common/theme/darkTheme';
import BulletinPostContainer from './modules/bulletin/BulletinPostContainer';

//import NoMatch from './modules/no-match/NoMatch';

//import { whyDidYouUpdate } from 'why-did-you-update';

//whyDidYouUpdate(React, {exclude:/^(TransitionGroup|WithStyles|TouchRipple|Connect|_class)/});

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentTheme: getTheme(),
      currentThemeName: 'lightTheme'
    };

    ReactGA.initialize(configKeys.GAKey, {
      debug: process.env.REACT_APP_ENV_NAME === 'LOCAL',
      titleCase: false
    });

    ReduxStore.store.subscribe(this.setCurrentTheme);
    ReduxStore.store.subscribe(socketHelper.subscribeToOrderBook);
  }

  componentDidCatch(error, info) {
    const username = LocalStorage.getItem('USER_NAME') || '-';
    let data = {
      username: username,
      error: error && error.toString(),
      info: info,
      type: 'W',
      path: window.location.href
    };
    ReduxStore.store
      .dispatch(sendClientError(data))
      .then(resp => {
        if (resp.payload.data && resp.payload.data.force_to_refresh) {
          LocalStorage.clear();
        }
      })
      .catch(() => {
        LocalStorage.clear();
      });
  }

  setCurrentTheme = () => {
    let theme = getTheme();
    if (theme !== this.state.currentTheme) {
      this.setState({ currentTheme: theme });
    }
  };

  render() {
    return (
      <MuiThemeProvider theme={createMuiTheme(this.state.currentTheme)}>
        <Helmet>
          <title>{I18n.translate('site_title')}</title>
        </Helmet>
        <Provider store={ReduxStore.store}>
          <PersistGate loading={null} persistor={ReduxStore.persistor}>
            <Router history={history}>
              <ScrollToTop>
                <Switch>
                  <Route
                    path="/verify/:hash"
                    component={withTracker(VerifyContainer)}
                  />
                  <Route
                    path="/change-password/:hash"
                    component={withTracker(ChangePasswordContainer)}
                  />
                  <Route
                    path="/charts"
                    component={withTracker(() => (
                      <MuiThemeProvider theme={createMuiTheme(darkTheme)}>
                        <TabbedChartsContainer />
                      </MuiThemeProvider>
                    ))}
                  />
                  <Route path="/help" component={withTracker(PolicyPage)} />
                  <ConditionalRoute
                    path="/exen-coin-information"
                    testFunction={isUserLoggedIn}
                    whenTrue={() => <Redirect to={{ pathname: '/exen' }} />}
                    whenFalse={withTracker(ExenDefinitionPublic)}
                  />
                  <ConditionalRoute
                    path="/exen/exen-coin-information"
                    testFunction={isUserLoggedIn}
                    whenTrue={withTracker(PageContainer)}
                    whenFalse={() => (
                      <Redirect to={{ pathname: '/exen-coin-information' }} />
                    )}
                  />
                  <ConditionalRoute
                    path="/exen-stats"
                    testFunction={isUserLoggedIn}
                    whenTrue={() => (
                      <Redirect to={{ pathname: '/exen/stats' }} />
                    )}
                    whenFalse={withTracker(ExenDefinitionPublic)}
                  />
                  <ConditionalRoute
                    path="/exen/stats"
                    testFunction={isUserLoggedIn}
                    whenTrue={withTracker(PageContainer)}
                    whenFalse={() => (
                      <Redirect to={{ pathname: '/exen-stats' }} />
                    )}
                  />
                  <Route path="/competition">
                    <Redirect to="/competitions" />
                  </Route>
                  <ConditionalRoute
                    path="/competitions"
                    testFunction={isUserLoggedIn}
                    whenTrue={withTracker(PageContainer)}
                    whenFalse={withTracker(CompetitionsPublicContainer)}
                  />
                  <PublicRoute
                    exact
                    path="/market"
                    component={LandingPageDemo}
                  />
                  <Route
                    path="/bulletin/:contentType/:filter"
                    component={withTracker(BulletinContainer)}
                  />
                  <Route
                    path="/bulletin-post/:contentType/:id"
                    component={withTracker(BulletinPostContainer)}
                  />
                  <PublicRoute
                    exact
                    path="/market/advanced"
                    component={TradeViewDemo}
                  />
                  <Route path="/tradeview">
                    <Redirect to="/advanced" />
                  </Route>
                  <ConditionalRoute
                    path="/advanced"
                    testFunction={isUserLoggedIn}
                    whenTrue={withTracker(PageContainer)}
                    whenFalse={() => (
                      <Redirect to={{ pathname: '/market/advanced' }} />
                    )}
                  />
                  <ConditionalRoute
                    path="/market/advanced"
                    testFunction={isUserLoggedIn}
                    whenTrue={() => <Redirect to={{ pathname: '/advanced' }} />}
                    whenFalse={withTracker(TradeViewDemo)}
                  />
                  <PublicRoute path="/login" component={LoginContainer} />
                  <PublicRoute path="/login2fa" component={Login2FAContainer} />
                  <PublicRoute path="/sign-up" component={SignUpContainer} />
                  <ConditionalRoute
                    path="/instant"
                    testFunction={isUserLoggedIn}
                    whenTrue={withTracker(PageContainer)}
                    whenFalse={withTracker(InstantTradeDemo)}
                  />
                  <PublicRoute
                    path="/forgot-password"
                    component={ForgotPasswordContainer}
                  />
                  <PublicRoute
                    path="/forgot-password-success"
                    component={ForgotPasswordSuccess}
                  />
                  <ConditionalRoute
                    path="/"
                    testFunction={isUserLoggedIn}
                    whenTrue={withTracker(PageContainer)}
                    whenFalse={withTracker(LandingPageContainer)}
                  />
                </Switch>
              </ScrollToTop>
            </Router>
          </PersistGate>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
