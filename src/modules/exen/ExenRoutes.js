import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ExenDefinitionPrivate from './exen-definition/ExenDefinitionPrivate';
import ExenStatsContainer from './exen-stats/ExenStatsContainer';

const ExenRoutes = props => (
  <Switch>
    <Route exact path="/exen/">
      <Redirect to="/exen/exen-coin-information" />
    </Route>
    <Route path="/exen/stats" component={ExenStatsContainer} />
    <Route
      path="/exen/exen-coin-information"
      component={ExenDefinitionPrivate}
    />
  </Switch>
);

export default ExenRoutes;
