import React from 'react';
import AssetsContainer from './assets/AssetsContainer';
import TransfersContainer from './transfers/TransfersContainer';
import LimitsContainer from './limits/LimitsContainer';
import { Route, Switch, Redirect } from 'react-router-dom';
import TradeHistoryPageContainer from './trade-history/TradeHistoryPageContainer';
import ExenProfileContainer from '../exen/exen-profile/ExenProfileContainer';
import ExenStatsContainer from '../exen/exen-stats/ExenStatsContainer';
import ExenDefinitionPrivate from '../exen/exen-definition/ExenDefinitionPrivate';

const AccountRoutes = props => (
  <Switch>
    <Route exact path="/account/">
      <Redirect to="/account/assets" />
    </Route>
    <Route path="/account/assets" component={AssetsContainer} />
    <Route path="/account/transfers" component={TransfersContainer} />
    <Route path="/account/profile" component={ExenProfileContainer} />
    <Route path="/account/stats" component={ExenStatsContainer} />
    <Route
      path="/account/exen-coin-information"
      component={ExenDefinitionPrivate}
    />
    <Route path="/account/limits" component={LimitsContainer} />
    <Route path="/account/history" component={TradeHistoryPageContainer} />
  </Switch>
);

export default AccountRoutes;
