import React from 'react';
import { Route } from 'react-router-dom';
import withTracker from '../common/utils/withTracker';

const ConditionalRoute = ({
  whenTrue: ComponentWhenTrue,
  whenFalse: ComponentWhenFalse,
  testFunction: f,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      return f() ? (
        <ComponentWhenTrue {...props} />
      ) : (
        <ComponentWhenFalse {...props} />
      );
    }}
  />
);

export default withTracker(ConditionalRoute);
