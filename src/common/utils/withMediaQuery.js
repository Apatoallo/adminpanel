import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const withMediaQuery = (...args) => Component => props => {
  const matches = useMediaQuery(...args);
  return <Component mediaQueryMatches={matches} {...props} />;
};

export default withMediaQuery;
