import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 'auto',
    height: 'auto'
  }
});

const getRelativePath = location => {
  const split = location.pathname.substring(1).split('/');
  let path = '';
  split.forEach(() => (path += '../'));
  return path === '' ? './' : path;
};

const CoinIcon = props => {
  const relativePath = getRelativePath(props.location);
  return (
    <div className={props.classes.container}>
      <img
        className={props.classes.image}
        alt={props.currency || 'no_logo'}
        src={`${relativePath}images/logos/${props.color}/${
          props.currency ? props.currency.toLowerCase() : 'no_logo'
        }.png`}
        onError={e => {
          e.target.onerror = null;
          e.target.src = `${relativePath}images/logos/no_logo.png`;
        }}
      />
    </div>
  );
};

CoinIcon.defaultProps = {
  color: 'color'
};

export default withRouter(withStyles(styles)(CoinIcon));
