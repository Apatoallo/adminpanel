import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import I18n from '../../../common/i18n/I18n';
import { FacebookIcon, TwitterIcon } from '../../../components/icons/Icons';
import './footer.scss';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#304262'
  },
  footerItemsWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center'
  },
  gridContainer: {
    display: 'flex',
    padding: '30px 0',
    boxSizing: 'border-box'
  },
  gridItem: {
    '@media screen and (max-width: 960px)': {
      paddingBottom: '30px'
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  addressAreaWrapper: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#26344e',
    justifyContent: 'center'
  },
  addressContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: '20px 0',
    boxSizing: 'border-box',
    color: 'white',
    '@media screen and (max-width: 475px)': {
      flexDirection: 'column'
    }
  },
  addressPart: {
    flexDirection: 'column',
    '@media screen and (max-width: 959px)': {
      textAlign: 'center'
    }
  },
  copyrightPart: {
    '@media screen and (max-width: 959px)': {
      textAlign: 'center'
    },
    opacity: '.6',
    color: 'white',
    fontSize: '14px',
    marginBottom: '6px',
    display: 'flex',
    alignSelf: 'center'
  },
  rightGridItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    color: '#fff',
    opacity: '.6',
    fontSize: '14px',
    marginBottom: '6px'
  },
  header: {
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '20px'
  },
  languageHeader: {
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  link: {
    color: '#fff',
    fontSize: '14px',
    opacity: '.5',
    marginBottom: '10px',
    cursor: 'pointer',
    textDecoration: 'none'
  },
  selectArea: {
    marginBottom: '10px'
  },
  inputArea: {
    color: 'rgba(255, 255, 255, 0.87)',
    width: '120px'
  },
  menu: {
    color: 'rgba(255, 255, 255, 0.87)',
    background: '#364a6e',
    marginLeft: '-12px',
    width: '120px'
  },
  menuItem: {
    background: '#364a6e',
    color: 'rgba(255, 255, 255, 0.87)',
    fontSize: '14px',
    lineHeight: '18px',
    height: '18px'
  },
  selectIcon: {
    color: '#fff'
  },
  formText: {
    color: 'rgba(255, 255, 255, 0.87)',
    '&:before': {
      borderBottomColor: '#26344e'
    },
    '&:after': {
      borderBottomColor: '#26344e'
    },
    fontSize: '14px',
    backgroundColor: '#26344e',
    paddingLeft: '12px'
  },
  iconContainer: {
    display: 'flex',
    marginTop: '10px'
  },
  icon: {
    marginRight: '10px',
    cursor: 'pointer'
  },
  tradeViewMode: {
    '@media screen and (min-width: 1171px)': {
      width: '1170px',
      padding: '12px 0'
    }
  }
});

class Footer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      language: 'TR'
    };
  }

  componentWillMount() {
    if (I18n.language) {
      this.setState({
        language: I18n.language
      });
    }
  }

  handleLanguageChange = event => {
    const language = event.target.value;
    if (language !== this.state.language) {
      I18n.language = language;
      this.setState({ language: language });
      window.location.reload();
    }
  };

  render() {
    const { classes, tradeViewMode } = this.props;
    return (
      <div className={classes.root}>
        <div className="container">
          <div className={classes.footerItemsWrapper}>
            <Grid
              container
              spacing={0}
              className={classNames(classes.gridContainer, {
                [classes.tradeViewMode]: tradeViewMode
              })}
            >
              <Grid sm={4} xs={6} md={2} item className={classes.gridItem}>
                <div className={classes.container}>
                  <div className={classes.header}>
                    {I18n.translate('landing_page_footer_legal')}
                  </div>
                  <Link
                    className={classes.link}
                    to="/help/user-agreement"
                    target="_top"
                  >
                    {I18n.translate('landing_page_footer_user_aggr')}
                  </Link>
                  <Link
                    className={classes.link}
                    to="/help/kyc-policy"
                    target="_top"
                  >
                    {I18n.translate('landing_page_footer_kyc')}
                  </Link>
                  <Link
                    className={classes.link}
                    to="/help/aml-policy"
                    target="_top"
                  >
                    {I18n.translate('landing_page_footer_aml')}
                  </Link>
                </div>
              </Grid>
              <Grid sm={4} xs={6} md={2} item className={classes.gridItem}>
                <div className={classes.container}>
                  <div className={classes.header}>
                    {I18n.translate('landing_page_footer_about')}
                  </div>
                  <Link
                    className={classes.link}
                    to="/help/about-us"
                    target="_top"
                  >
                    {I18n.translate('landing_page_footer_who_we_are')}
                  </Link>
                  <Link className={classes.link} to="/help/fees" target="_top">
                    {I18n.translate('landing_fees_link')}
                  </Link>
                  <Link
                    className={classes.link}
                    to="/help/limits"
                    target="_top"
                  >
                    {I18n.translate('landing_limits_link')}
                  </Link>
                  <Link
                    className={classes.link}
                    to="/help/security"
                    target="_top"
                  >
                    {I18n.translate('landing_page_footer_security')}
                  </Link>
                </div>
              </Grid>
              <Grid sm={4} xs={6} md={2} item className={classes.gridItem}>
                <div className={classes.container}>
                  <div className={classes.header}>
                    {I18n.translate('landing_page_footer_docs')}
                  </div>
                  <a
                    className={classes.link}
                    href="http://docs.bitexen.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {I18n.translate('landing_page_footer_api')}
                  </a>
                </div>
              </Grid>
              <Grid sm={4} xs={6} md={2} item className={classes.gridItem}>
                <div className={classes.container}>
                  <div className={classes.header}>
                    {I18n.translate('landing_page_footer_contact')}
                  </div>
                  <Link
                    className={classes.link}
                    to="/help/contact-us"
                    target="_top"
                  >
                    {I18n.translate('landing_page_footer_contact_us')}
                  </Link>
                  <a
                    className={classes.link}
                    href="https://support.bitexen.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {I18n.translate('landing_page_footer_support')}
                  </a>
                  <div className={classes.iconContainer}>
                    <div className={classes.icon}>
                      <a
                        href="https://facebook.com/bitexen"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FacebookIcon />
                      </a>
                    </div>
                    <div className={classes.icon}>
                      <a
                        href="https://twitter.com/bitexencom"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <TwitterIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid sm={4} xs={6} md={2} item className={classes.gridItem}>
                <div className={classes.container}>
                  <div className={classes.languageHeader}>
                    {I18n.translate('landing_page_footer_language')}
                  </div>
                  <div className={classes.selectMenu}>
                    <TextField
                      id="language"
                      select
                      className={classes.inputArea}
                      value={this.state.language}
                      onChange={this.handleLanguageChange.bind(this)}
                      SelectProps={{
                        MenuProps: {
                          classes: { paper: classes.menu }
                        },
                        classes: { icon: classes.selectIcon }
                      }}
                      InputProps={{
                        classes: {
                          underline: classes.formText
                        }
                      }}
                      InputLabelProps={{
                        classes: {
                          focused: classes.formLabelFocused,
                          root: classes.formLabel
                        }
                      }}
                    >
                      {[
                        {
                          value: 'TR',
                          label: I18n.translate('general_language_tr')
                        },
                        {
                          value: 'EN',
                          label: I18n.translate('general_language_en')
                        }
                      ].map(option => (
                        <MenuItem
                          classes={{ root: classes.menuItem }}
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>

        <div className={classes.addressAreaWrapper}>
          <div className="container">
            <div
              className={classNames(classes.addressContainer, {
                [classes.tradeViewMode]: tradeViewMode
              })}
            >
              <div className={classes.addressPart}>
                <div className={classes.item}>
                  {I18n.translate('landing_page_address_pane_company_name')}
                </div>
                <div className={classes.item}>
                  <strong>
                    {I18n.translate(
                      'landing_page_address_pane_address_management_office_title'
                    )}
                  </strong>{' '}
                  {I18n.translate(
                    'landing_page_address_pane_address_management_office'
                  )}
                </div>
                <div className={classes.item}>
                  <strong>
                    {I18n.translate(
                      'landing_page_address_pane_address_center_office_title'
                    )}
                  </strong>{' '}
                  {I18n.translate('landing_page_address_pane_address')}
                </div>
              </div>
              <div className={`${classes.copyrightPart} flex-column`}>
                {I18n.translate('landing_page_address_pane_copyright')}
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex banks py-2 flex-row justify-content-center">
          <img
            alt="ziraat bankası"
            height="40"
            src="/images/logos/banks/ziraat-bankasi.svg"
          />
          <img
            height="40"
            alt="vakıf bankası"
            className="ml-2"
            src="/images/logos/banks/vakif-bankasi.svg"
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Footer);
