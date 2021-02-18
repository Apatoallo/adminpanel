import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CompetitionContainer from './CompetitionContainer';

const CompetitionRoutes = props => (
  <Switch>
    <Route exact path="/competitions/" component={CompetitionContainer} />
  </Switch>
);

export default CompetitionRoutes;
