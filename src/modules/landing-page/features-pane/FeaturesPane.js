import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import icon1 from '../../../assets/images/security.png';
import icon2 from '../../../assets/images/icon-02.png';
import icon3 from '../../../assets/images/icon-03.png';
import I18n from '../../../common/i18n/I18n';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingTop: '60px',
    paddingBottom: '60px'
  },
  gridContainer: {
    display: 'flex',
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  gridItem: {
    '@media screen and (max-width: 960px)': {
      paddingBottom: '40px'
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  iconContainer: {
    width: '100%',
    display: 'flex',
    '@media screen and (max-width: 600px)': {
      justifyContent: 'center'
    },
    justifyContent: 'flex-start'
  },
  icon1: {
    backgroundImage: `url(${icon1})`,
    backgroundSize: 'cover',
    height: '135px',
    width: '214px'
  },
  icon2: {
    backgroundImage: `url(${icon2})`,
    backgroundSize: 'cover',
    height: '115px',
    width: '158px'
  },
  icon3: {
    backgroundImage: `url(${icon3})`,
    backgroundSize: 'cover',
    height: '114px',
    width: '140px'
  },
  header: {
    color: '#4a5975',
    fontSize: '30px',
    fontWeight: '300',
    paddingTop: '30px'
  },
  description: {
    fontSize: '18px',
    fontWeight: '300',
    lineHeight: '1.44',
    textAlign: 'left',
    color: '#4a5975',
    opacity: '.6',
    paddingTop: '18px',
    paddingRight: '12px'
  }
});

const FeaturesPane = ({ classes }) => (
  <div className={classes.root}>
    <div className="container">
      <Grid container spacing={0} className={classes.gridContainer}>
        <Grid xs={12} md={4} item className={classes.gridItem}>
          <div className={classes.container}>
            <div
              className={`${
                classes.iconContainer
              } jusift-content-center justify-content-md-start`}
            >
              <div className={classes.icon1} />
            </div>
            <div className={`${classes.header} text-center text-md-left`}>
              {I18n.translate('landing_page_commission_feature')}
            </div>
            <div className={`${classes.description} text-center text-md-left`}>
              {I18n.translate('landing_page_commission_description')}
            </div>
          </div>
        </Grid>
        <Grid xs={12} md={4} item className={classes.gridItem}>
          <div className={classes.container}>
            <div
              className={`${
                classes.iconContainer
              } jusift-content-center justify-content-md-start`}
            >
              <div className={classes.icon2} />
            </div>
            <div className={`${classes.header} text-center text-md-left`}>
              {I18n.translate('landing_page_api_feature')}
            </div>
            <div className={`${classes.description} text-center text-md-left`}>
              {I18n.translate('landing_page_api_description')}
            </div>
          </div>
        </Grid>
        <Grid xs={12} md={4} item className={classes.gridItem}>
          <div className={classes.container}>
            <div
              className={`${
                classes.iconContainer
              } jusift-content-center justify-content-md-start`}
            >
              <div className={classes.icon3} />
            </div>
            <div className={`${classes.header} text-center text-md-left`}>
              {I18n.translate('landing_page_clean_interface_feature')}
            </div>
            <div className={`${classes.description} text-center text-md-left`}>
              {I18n.translate('landing_page_clean_interface_description')}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  </div>
);

export default withStyles(styles)(FeaturesPane);
