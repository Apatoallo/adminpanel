import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from '../../components/PrivateRoute';

import TradePaneContainer from '../../modules/trade/trade-pane/TradePaneContainer';
import AccountMenuContainer from '../../modules/account/account-menu/AccountMenuContainer';
import SettingsMenuContainer from '../../modules/settings/settings-menu/SettingsMenuContainer';
import ExenMenuContainer from '../../modules/exen/exen-menu/ExenMenuContainer';
import CompetitionMenuContainer from '../../modules/competition/competition-menu/CompetitionMenuContainer';

const LeftContentRoutes = props => (
  <Switch>
    <PrivateRoute exact path="/" component={TradePaneContainer} />
    <PrivateRoute path="/account" component={AccountMenuContainer} />
    <PrivateRoute path="/settings" component={SettingsMenuContainer} />
    <PrivateRoute path="/exen" component={ExenMenuContainer} />
    <PrivateRoute path="/competitions" component={CompetitionMenuContainer} />
  </Switch>
);

export default LeftContentRoutes;
