import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Carousel } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import tradeViewImageEn from '../../../assets/images/bitexen-tradeview-en.png';
import tradeViewImageTr from '../../../assets/images/bitexen-tradeview-tr.png';
import history from '../../../common/history';
import I18n from '../../../common/i18n/I18n';
import './info-pane.scss';

const styles = theme => ({
  container: {
    width: '100%',
    marginTop: '50px',
    '@media screen and (max-width: 600px)': {
      marginTop: '3px'
    }
  },
  gridContainer: {
    alignItems: 'flex-end'
  },
  leftGrid: {
    padding: '40px 16px 30px 0'
  },
  rightGrid: {
    borderRadius: '40px 0 0 0',
    border: 'solid 1px rgba(255, 255, 255, 0.2)',
    borderBottomStyle: 'none',
    borderRightStyle: 'none'
  },
  infoTextArea: {
    display: 'flex',
    flexDirection: 'column'
  },
  infoTextArea1: {
    display: 'flex',
    marginBottom: '10px',
    fontSize: '42px',
    '@media screen and (max-width: 600px)': {
      fontSize: '34px'
    },
    fontWeight: '300',
    textAlign: 'left',
    color: '#ffffff',
    '-webkit-margin-before': '0',
    '-webkit-margin-after': '0'
  },
  infoTextArea2: {
    display: 'flex',
    marginBottom: '20px',
    fontSize: '42px',
    '@media screen and (max-width: 600px)': {
      fontSize: '34px'
    },
    fontWeight: '500',
    textAlign: 'left',
    color: '#ffffff',
    '-webkit-margin-before': '0',
    '-webkit-margin-after': '0'
  },
  infoTextArea3: {
    opacity: '.6',
    lineHeight: '28px',
    fontSize: '18px',
    '@media screen and (max-width: 600px)': {
      fontSize: '16px'
    },
    fontWeight: '300',
    textAlign: 'left',
    color: '#ffffff',
    marginBottom: '30px'
  },
  emailRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing(3)
    },
    '@media screen and (max-width: 959px)': {
      marginBottom: '20px'
    }
  },
  emailInput: {
    height: '50px',
    borderRadius: '4px 0 0 4px',
    backgroundColor: theme.colors.background.white87,
    color: theme.colors.textColor.grey87,
    border: 'solid 1px rgba(255, 255, 255, 0.2)',
    borderRightStyle: 'none',
    fontSize: '14px',
    padding: '10px 12px',
    boxSizing: 'border-box',
    boxShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.05);',
    '@media screen and (max-width: 959px)': {
      textAlign: 'center',
      borderRadius: '4px',
      borderRightStyle: 'solid'
    }
  },
  emailLabel: {
    fontSize: '18px'
  },
  createAccountButton: {
    '@media screen and (max-width: 959px)': {
      borderRadius: '4px',
      borderLeftStyle: 'solid'
    },
    textTransform: 'none',
    height: '50px',
    borderRadius: '0 4px 4px 0',
    border: 'solid 1px rgba(255, 255, 255, 0.2)',
    borderLeftStyle: 'none',
    boxShadow: 'none',
    marginBottom: '10px',
    fontSize: '16px'
  },
  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '13px',
    marginTop: '5px',
    opacity: '.6',
    lineHeight: '28px',
    fontSize: '18px',
    '@media screen and (max-width: 600px)': {
      fontSize: '16px'
    },
    fontWeight: '300',
    textAlign: 'left',
    color: '#ffffff'
  },
  divider: {
    width: '100%',
    textAlign: 'center',
    borderBottom: '1px solid #67768f',
    lineHeight: '0.1em'
  },
  dividerText: {
    textAlign: 'center',
    padding: '0 20px',
    whiteSpace: 'nowrap'
  },
  tradeViewPane: {
    display: 'flex',
    justifyContent: 'center',
    '@media screen and (max-width: 600px)': {
      justifyContent: 'flex-start'
    },
    paddingBottom: '40px'
  },
  tradeViewButton: {
    textTransform: 'none',
    height: '50px',
    borderRadius: '4px',
    boxShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.05)',
    fontSize: '16px',
    backgroundColor: '#3ad09f',
    '&:hover': {
      backgroundColor: '#28a77e',
      color: theme.colors.textColor.white
    },
    color: theme.colors.textColor.white
  },
  tradeViewSample: {
    border: 'solid 1px #627691',
    borderRadius: '2px',
    boxShadow: '0 0 2px 0 rgba(255, 255, 255, 0.05)',
    borderBottomStyle: 'none',
    borderRightStyle: 'none',
    backgroundImage: `url(${
      I18n.language === 'EN' ? tradeViewImageEn : tradeViewImageTr
    })`,
    backgroundSize: 'cover',
    '@media screen and (max-width: 600px)': {
      height: '259px'
    },
    height: '464px',
    color: 'red',
    margin: '30px 0 0 29px'
  }
});

class InfoPane extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    };
  }

  handleCreateAccount = () => {
    const { userName } = this.state;
    //this.props.subscribeToMailList(userName);
    history.push('/sign-up', { step: 2, userName });
  };

  render() {
    const { classes } = this.props;

    return (
      <div id="info-pane">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-4">
              <div className="start">
                <h1 className="m-0">
                  {I18n.translate('landing_description_line_1')}
                </h1>
                <h2 className="m-0">
                  {I18n.translate('landing_description_line_2')}
                </h2>
                <p className="mt-3">
                  {I18n.translate('landing_description_line_3')}
                </p>

                <div className="d-flex mt-2">
                  <TextField
                    value={this.state.userName}
                    name="EMAIL"
                    onChange={event => {
                      this.setState({ userName: event.target.value });
                    }}
                    onKeyPress={event => {
                      if (event.key === 'Enter') {
                        this.handleCreateAccount();
                      }
                    }}
                    placeholder={I18n.translate('landing_email_text_field')}
                    id="bootstrap-input"
                    InputProps={{
                      disableUnderline: true,
                      classes: {
                        root: classes.emailRoot,
                        input: classes.emailInput
                      }
                    }}
                    InputLabelProps={{
                      shrink: true,
                      className: classes.emailLabel
                    }}
                    fullWidth
                  />

                  <Button
                    size="small"
                    type="submit"
                    color="primary"
                    className="create-account-button col-12 col-md-5"
                    variant="contained"
                    onClick={this.handleCreateAccount}
                  >
                    {I18n.translate('landing_create_account_label')}
                  </Button>
                </div>

                <div className={classes.dividerContainer}>
                  <div className={classes.divider} />
                  <div className={classes.dividerText}>
                    {I18n.translate('landing_or_label')}
                  </div>
                  <div className={classes.divider} />
                </div>

                <Button
                  component={Link}
                  size="small"
                  fullWidth
                  variant="contained"
                  to="/instant/market"
                  className={classes.tradeViewButton}
                >
                  {I18n.translate('landing_trade_view_label')}
                </Button>
              </div>
            </div>

            <div className="col-12 col-lg-8">
              <div className="carousel-container  ant-layout-has-sider mt-4 mb-4 mb-lg-0 mt-lg-0">
                <Carousel effect="fade" autoplay adaptiveHeight>
                  <div>
                    <img
                      style={{ objectFit: 'cover' }}
                      alt=""
                      className="w-100"
                      src="/images/slider/1banner.jpg"
                    />
                  </div>
                  <div>
                    <img
                      style={{ objectFit: 'cover' }}
                      alt=""
                      className="w-100"
                      src="/images/slider/2banner.jpg"
                    />
                  </div>
                  <div>
                    <img
                      style={{ objectFit: 'cover' }}
                      alt=""
                      className="w-100"
                      src="/images/slider/3banner.jpg"
                    />
                  </div>
                  <div>
                    <img
                      style={{ objectFit: 'cover' }}
                      alt=""
                      className="w-100"
                      src="/images/slider/4banner.jpg"
                    />
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
        </div>

        {/* <div className={classes.container}>
          <Grid container spacing={0} className={classes.gridContainer}>
            <Grid xs={12} sm={5} md={4} item>
              <Grid container spacing={0} className={classes.leftGrid}>
                <Grid xs={12} item></Grid>
                <Grid xs={12} item>
                  <Grid container spacing={0}>
                    <Grid xs={12} md={8} item>
                      <TextField
                        value={this.state.userName}
                        name="EMAIL"
                        onChange={event => {
                          this.setState({ userName: event.target.value });
                        }}
                        placeholder={I18n.translate("landing_email_text_field")}
                        id="bootstrap-input"
                        InputProps={{
                          disableUnderline: true,
                          classes: {
                            root: classes.emailRoot,
                            input: classes.emailInput
                          }
                        }}
                        InputLabelProps={{
                          shrink: true,
                          className: classes.emailLabel
                        }}
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} md={4} item>
                      <Button
                        size="small"
                        type="submit"
                        fullWidth
                        color="primary"
                        className={classes.createAccountButton}
                        variant="contained"
                        onClick={this.handleCreateAccount}
                      >
                        {I18n.translate("landing_create_account_label")}
                      </Button>
                    </Grid>
                    <Grid xs={12} item>
                      <div className={classes.dividerContainer}>
                        <div className={classes.divider} />
                        <div className={classes.dividerText}>
                          {I18n.translate("landing_or_label")}
                        </div>
                        <div className={classes.divider} />
                      </div>
                    </Grid>
                    <Grid xs={12} md={4} item>
                      <div />
                    </Grid>
                    <Grid xs={12} md={4} item>
                      <div className={classes.tradeViewPane}>
                        <Button
                          component={Link}
                          size="small"
                          fullWidth
                          variant="contained"
                          to="/instant/market"
                          className={classes.tradeViewButton}
                        >
                          {I18n.translate("landing_trade_view_label")}
                        </Button>
                      </div>
                    </Grid>
                    <Grid xs={12} md={4} item>
                      <div />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Hidden xsDown>
              <Grid sm={1} item />
            </Hidden>
            <Grid xs={12} sm={6} md={7} item className={classes.rightGrid}>
              <Carousel autoplay>
                <div>
                  <h3>1</h3>
                </div>
                <div>
                  <h3>2</h3>
                </div>
                <div>
                  <h3>3</h3>
                </div>
                <div>
                  <h3>4</h3>
                </div>
              </Carousel>
              <div className={classes.tradeViewSample} />
            </Grid>
          </Grid>
        </div> */}
      </div>
    );
  }
}

export default withStyles(styles)(InfoPane);
