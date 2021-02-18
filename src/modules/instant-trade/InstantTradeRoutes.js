import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import InstantTradeMenuContainer from './instant-trade-menu/InstantTradeMenuContainer';
import InstantTradePaneContainer from './instant-trade-pane/InstantTradePaneContainer';

const InstantTradeRoutes = () => (
  <Switch>
    <Route exact path="/instant/">
      <Redirect to="/instant/market" />
    </Route>
    <Route path="/instant/market" component={InstantTradeMenuContainer} />
    <Route path="/instant/trade" component={InstantTradePaneContainer} />
  </Switch>
);
export default InstantTradeRoutes;
