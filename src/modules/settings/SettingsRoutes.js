import React from 'react';
import AccountsSettingContainer from './account-settings/AccountSettingsContainer';
import Security from './security/Security';
import NotificationSettingsContainer from './notifications-settings/NotificationSettingsContainer';
import { Route, Switch, Redirect } from 'react-router-dom';
import ActivityHistoryPage from './activity-history/ActivityHistoryPage';

const SettingsRoutes = props => (
  <Switch>
    <Route exact path="/settings/">
      <Redirect to="/settings/account" />
    </Route>
    <Route path="/settings/account" component={AccountsSettingContainer} />
    <Route path="/settings/security" component={Security} />
    <Route
      path="/settings/notification"
      component={NotificationSettingsContainer}
    />
    <Route path="/settings/activity-history" component={ActivityHistoryPage} />
  </Switch>
);

export default SettingsRoutes;
