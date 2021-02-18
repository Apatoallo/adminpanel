import React from 'react';
import MarketContainer from './MarketContainer';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#4b5a76'
  },
  gridContainer: {
    display: 'flex',
    backgroundColor: '#4b5a76',
    justifyContent: 'flex-start',
    alignItems: 'center',

    paddingLeft: '15px',
    paddingRight: '15px'
  },
  gridItem: {
    paddingBottom: '20px',
    paddingTop: '20px'
  }
});

const MarketPane = ({ classes, tickers = [] }) => (
  <div className={classes.root}>
    <div className="container">
      <Grid container spacing={0} className={classes.gridContainer}>
        {tickers.map(
          (ticker, i) =>
            ticker && (
              <Grid
                xs={6}
                sm={4}
                md={3}
                lg={2}
                item
                key={i}
                className={classes.gridItem}
              >
                <MarketContainer {...ticker} />
              </Grid>
            )
        )}
      </Grid>
    </div>
  </div>
);
export default withStyles(styles)(MarketPane);
