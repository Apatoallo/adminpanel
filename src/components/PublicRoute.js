import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isUserLoggedIn } from '../modules/login/loginHelper';
import withTracker from '../common/utils/withTracker';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (isUserLoggedIn()) {
        return (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
        );
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

export default withTracker(PublicRoute);
