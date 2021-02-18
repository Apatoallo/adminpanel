import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from '../../components/PrivateRoute';

import MarketContentContainer from '../../modules/trade/market-content/MarketContentContainer';
import AccountRoutes from '../../modules/account/AccountRoutes';
import SettingsRoutes from '../../modules/settings/SettingsRoutes';
import ExenRoutes from '../../modules/exen/ExenRoutes';
import CompetitionRoutes from '../../modules/competition/CompetitionRoutes';

const Routes = props => (
  <Switch>
    <PrivateRoute exact path="/" component={MarketContentContainer} scrollTop />
    <PrivateRoute path="/account" component={AccountRoutes} scrollTop />
    <PrivateRoute path="/settings" component={SettingsRoutes} scrollTop />
    <PrivateRoute path="/exen" component={ExenRoutes} scrollTop />
    <PrivateRoute
      path="/competitions"
      component={CompetitionRoutes}
      scrollTop
    />
  </Switch>
);

export default Routes;
