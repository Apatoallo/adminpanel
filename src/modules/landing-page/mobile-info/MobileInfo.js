import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import appStore from '../../../assets/images/appstore-logo.png';
import siteView from '../../../assets/images/bitexen-orderbook-mobile.png';
import googlePlay from '../../../assets/images/google-play-logo.png';
import phone from '../../../assets/images/phone.png';
import I18n from '../../../common/i18n/I18n';
import './MobileInfo.scss';

const styles = theme => ({
  root: {
    backgroundColor: '#fafafa',
    paddingTop: '60px'
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  gridItem: {},
  phone: {
    backgroundImage: `url(${phone})`,
    backgroundSize: 'cover',
    '@media screen and (max-width: 1200px)': {
      height: '429px',
      width: '343px',
      paddingTop: '63px'
    },
    '@media screen and (max-width: 359px)': {
      height: '429px',
      width: '303px',
      paddingTop: '63px'
    },
    height: '532px',
    width: '415px',
    paddingTop: '70px'
  },
  siteView: {
    backgroundImage: `url(${siteView})`,
    backgroundSize: 'cover',
    '@media screen and (max-width: 1200px)': {
      height: '429px',
      width: '303px',
      marginLeft: '20px'
    },
    '@media screen and (max-width: 359px)': {
      height: '366px',
      width: '263px',
      paddingTop: '63px'
    },
    marginLeft: '20px',
    height: '532px',
    width: '375px'
  },
  rightGrid: {
    marginLeft: '30px',
    '@media screen and (max-width: 960px)': {
      marginLeft: '0',
      paddingBottom: '40px'
    }
  },
  header: {
    fontSize: '42px',
    fontWeight: '100',
    color: '#4a5975',
    marginBottom: '20px'
  },
  boldHeader: {
    fontSize: '42px',
    fontWeight: '500',
    color: '#4a5975'
  },
  description: {
    color: '#4a5975',
    opacity: '0.6',
    fontSize: '18px',
    '@media screen and (max-width: 600px)': {
      fontSize: '16px'
    },
    lineHeight: '28px',
    fontWeight: '300',
    marginBottom: '30px'
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  googlePlay: {
    backgroundImage: `url(${googlePlay})`,
    backgroundSize: 'cover',
    width: '131px',
    height: '39px',
    marginTop: '0.5px',
    marginLeft: '16px',
    cursor: 'pointer'
  },
  appStore: {
    backgroundImage: `url(${appStore})`,
    backgroundSize: 'cover',
    width: '120px',
    height: '40px',
    cursor: 'pointer'
  },
  descriptionIos: {
    marginTop: '24px',
    color: '#4a5975',
    opacity: '0.6',
    fontSize: '14x',
    '@media screen and (max-width: 600px)': {
      fontSize: '12px'
    },
    lineHeight: '28px',
    fontWeight: '300',
    marginBottom: '30px'
  }
});

const MobileInfo = ({ classes }) => (
  <div className={classes.root}>
    <div className="container">
      <div className="d-flex flex-column-reverse align-items-center flex-md-row flex-grow-1">
        <div className="phone" />
        <div className="d-flex flex-grow-1 flex-column justify-content-center align-items-center">
          <div className="ml-md-4 d-flex flex-column align-items-center align-items-md-start ml-0 my-3 my-md-0">
            <div className={classes.header}>
              {I18n.translate('landing_page_mobile_label')}
              <span className={classes.boldHeader}>
                {I18n.translate('landing_page_applications_label')}
              </span>
            </div>
            <div className={classes.description}>
              {I18n.translate('landing_page_mobile_description')}
            </div>
            <div className={classes.iconContainer}>
              <div className={classes.icon}>
                <a
                  href="https://itunes.apple.com/tr/app/bitexen/id1388036461"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={classes.appStore} />
                </a>
              </div>
              <div className={classes.icon}>
                <a
                  href="https://play.google.com/store/apps/details?id=com.bitexen.exchange"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={classes.googlePlay} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  // <div className={classes.root}>
  //   <Grid container spacing={0} className={classes.gridContainer}>
  //     <Hidden smDown>
  //       <Grid xs={12} md={5} item className={classes.gridItem}>
  //         <div className={classes.phone}>
  //           <div className={classes.siteView} />
  //         </div>
  //       </Grid>
  //     </Hidden>
  //     <Grid xs={12} md={5} item className={classes.gridItem}>
  //       <div className={classes.rightGrid}>
  //         <div className={classes.header}>
  //           {I18n.translate('landing_page_mobile_label')}
  //           <span className={classes.boldHeader}>
  //             {I18n.translate('landing_page_applications_label')}
  //           </span>
  //         </div>
  //         <div className={classes.description}>
  //           {I18n.translate('landing_page_mobile_description')}
  //         </div>
  //         <div className={classes.iconContainer}>
  //           <div className={classes.icon}>
  //             <a
  //               href="https://itunes.apple.com/tr/app/bitexen/id1388036461"
  //               target="_blank"
  //               rel="noopener noreferrer"
  //             >
  //               <div className={classes.appStore} />
  //             </a>
  //           </div>
  //           <div className={classes.icon}>
  //             <a
  //               href="https://play.google.com/store/apps/details?id=com.bitexen.exchange"
  //               target="_blank"
  //               rel="noopener noreferrer"
  //             >
  //               <div className={classes.googlePlay} />
  //             </a>
  //           </div>
  //         </div>
  //       </div>
  //     </Grid>
  //     <Hidden mdUp>
  //       <Grid xs={12} md={5} item className={classes.gridItem}>
  //         <div className={classes.phone}>
  //           <div className={classes.siteView} />
  //         </div>
  //       </Grid>
  //     </Hidden>
  //     <Grid md={2} item />
  //   </Grid>
  // </div>
);
export default withStyles(styles)(MobileInfo);
