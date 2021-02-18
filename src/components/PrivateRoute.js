import React from 'react';
import { Route } from 'react-router-dom';
import { logout } from '../modules/login/LoginActions';
import { isUserLoggedIn } from '../modules/login/loginHelper';
import withTracker from '../common/utils/withTracker';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (isUserLoggedIn()) {
        return <Component {...props} />;
      } else {
        logout();
        return null;
      }
    }}
  />
);

export default withTracker(PrivateRoute);
