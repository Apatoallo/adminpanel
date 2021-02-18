import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import StyledPaper from '../../../components/common/StyledPaper';
import * as QRCode from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classNames from 'classnames';
import I18n from '../../../common/i18n/I18n';
import ReferralHistoryContainer from './referral-history/ReferralHistoryContainer';
import CompetitionHistoryContainer from './competition-history/CompetitionHistoryContainer';
import {
  FacebookIcon,
  LinkedInShareIcon,
  TwitterIcon
} from '../../../components/icons/Icons';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton
} from 'react-share';
import { SERVER_ERROR_STATUS_CODES } from '../../../common/constants';

const styles = theme => ({
  paper: {
    width: '100%',
    marginTop: theme.unit.margin
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: '18px'
  },
  qrCode: {
    border: 'solid 6px white',
    display: 'flex',
    alignItems: 'center'
  },
  refCodeArea: {
    display: 'table',
    paddingRight: '12px',
    '@media screen and (max-width: 599px)': {
      paddingBottom: '20px'
    }
  },
  exenGainArea: {
    display: 'table',
    '@media screen and (max-width: 599px)': {
      borderTop: theme.colors.borderColor.rowSeperatorBorder,
      paddingTop: '20px'
    },
    '@media screen and (min-width: 600px)': {
      borderLeft: theme.colors.borderColor.rowSeperatorBorder
    }
  },
  keyValueRow: {
    display: 'table-row',
    color: theme.colors.textColor.input,
    fontSize: '14px',
    lineHeight: '24px'
  },
  key: {
    display: 'table-cell',
    textAlign: 'right',
    paddingLeft: '12px'
  },
  value: {
    display: 'table-cell',
    textAlign: 'left',
    fontWeight: '500',
    paddingLeft: '12px'
  },
  alignRight: {
    textAlign: 'right'
  },
  socialMediaArea: {
    display: 'flex',
    textAlign: 'left',
    fontWeight: '500',
    paddingLeft: '5px'
  },
  addressCopyLink: {
    cursor: 'pointer',
    marginLeft: '6px',
    marginBottom: '2px',
    verticalAlign: 'middle',
    fontSize: '16px'
  },
  link: {
    color: theme.colors.textColor.blue,
    textDecoration: 'none'
  },
  amount: {
    color: theme.colors.textColor.orange,
    fontWeight: '700'
  },
  referrer: {
    color: theme.colors.textColor.orange,
    fontWeight: '700',
    paddingTop: '6px'
  },
  divider: {
    height: '0',
    backgroundColor: theme.colors.background.divider,
    margin: '12px 0'
  },
  historyTypeTabStyle: {
    fontFamily: 'Roboto',
    fontSize: '14px !important',
    fontWeight: '400',
    color: theme.colors.textColor.inactiveTab
  },
  referralSelected: {
    color: `${theme.colors.textColor.blue} !important`,
    fontWeight: '500'
  },
  competitionSelected: {
    color: `${theme.colors.textColor.orange} !important`,
    fontWeight: '500'
  },
  tabDivider: {
    height: '2px',
    marginTop: '-2px',
    backgroundColor: theme.colors.background.divider
  },
  iconButton: {
    padding: '5px'
  },
  facebookIcon: {
    fill: theme.colors.background.facebookFill
  },
  twitterIcon: {
    fill: theme.colors.background.twitterFill
  },
  linkedInIcon: {
    fill: theme.colors.background.linkedInFill,
    backgroundColor: 'white'
  },
  formLabel: {
    whiteSpace: 'nowrap',
    opacity: '.8',
    color: theme.colors.textColor.formLabel,
    fontWeight: 'initial',
    '&$formLabelFocused': {
      color: '#3ab2ee',
      opacity: '1'
    }
  },
  formText: {
    fontWeight: '400',
    color: theme.colors.textColor.input,
    '&:before': {
      borderBottomColor: 'rgba(0, 0, 0, 0.12);'
    },
    '&:after': {
      borderBottomColor: '#3ab2ee'
    }
  },
  formLabelFocused: {},
  alignBottom: {
    verticalAlign: 'bottom'
  },
  tabIndicatorReferral: {
    backgroundColor: theme.colors.textColor.blue
  },
  tabIndicatorCompetition: {
    backgroundColor: theme.colors.textColor.orange
  }
});

class ExenProfile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'REFERRAL',
      referrerCode: ''
    };
  }

  componentDidMount() {
    this.props.getProfile();
  }

  handleTabChange = (evt, value) => {
    this.setState({ selectedTab: value });
  };

  shareFacebook = () => {};

  shareTwitter = () => {};

  shareLinkedIn = () => {};

  addReferrer = () => {
    const referrerCode = this.state.referrerCode.trim();

    if (this.props.addReferrer) {
      this.props
        .addReferrer({ referrer_code: referrerCode })
        .then(resp => {
          if (resp.payload.data.status === 'error') {
            let errorMessage = '';
            if (
              resp.payload.data.status_code ===
              SERVER_ERROR_STATUS_CODES.APPROVED_USERS_CANNOT_ADD_REFERRER
            ) {
              errorMessage = I18n.translate(
                'add_referrer_level_not_match_message'
              );
            } else if (
              resp.payload.data.status_code ===
              SERVER_ERROR_STATUS_CODES.INVALID_REF_CODE
            ) {
              errorMessage = I18n.translate(
                'add_referrer_invalid_ref_code_message'
              );
            } else {
              errorMessage = I18n.translate('general_error_description');
            }
            this.props.showDialog({
              title: I18n.translate('general_error'),
              text: errorMessage,
              okButtonText: I18n.translate('general_ok')
            });
          } else {
            this.props.getProfile();
            this.props.showSnackbar(
              I18n.translate('add_referrer_success_message')
            );
          }
        })
        .catch(() => {
          this.props.showDialog({
            title: I18n.translate('general_error'),
            text: I18n.translate('general_error_description'),
            okButtonText: I18n.translate('general_ok')
          });
        });
    }
  };

  render() {
    const { classes, profile } = this.props;
    return (
      <StyledPaper
        className={classes.paper}
        title={I18n.translate('exen_menu_exen_profile')}
      >
        {profile && (
          <div className={classes.profileContainer}>
            <div className={classes.qrCode}>
              <QRCode size={80} value={profile.referral_url} />
            </div>
            <div className={classes.refCodeArea}>
              <div className={classes.keyValueRow}>
                <div className={classes.key}>
                  {I18n.translate('ref_code_label')}
                </div>
                <div className={classes.value}>
                  {profile.referral_code}
                  <Tooltip title={I18n.translate('general_copy')}>
                    <CopyToClipboard
                      text={profile.referral_code}
                      onCopy={() =>
                        this.props.showSnackbar(
                          I18n.translate('general_copy_success')
                        )
                      }
                    >
                      <Icon className={classes.addressCopyLink}>
                        content_copy
                      </Icon>
                    </CopyToClipboard>
                  </Tooltip>
                </div>
              </div>
              <div className={classes.keyValueRow}>
                <div className={classes.key}>
                  {I18n.translate('ref_url_label')}
                </div>
                <div className={classes.value}>
                  <a
                    href={profile.referral_url}
                    className={classes.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profile.referral_url}
                  </a>
                  <Tooltip title={I18n.translate('general_copy')}>
                    <CopyToClipboard
                      text={profile.referral_url}
                      onCopy={() =>
                        this.props.showSnackbar(
                          I18n.translate('general_copy_success')
                        )
                      }
                    >
                      <Icon className={classes.addressCopyLink}>
                        content_copy
                      </Icon>
                    </CopyToClipboard>
                  </Tooltip>
                </div>
              </div>
              <div className={classes.keyValueRow}>
                <div className={classes.key}>
                  {I18n.translate('exen_share_label')}
                </div>
                <div className={classes.socialMediaArea}>
                  <FacebookShareButton url={profile.referral_url}>
                    <IconButton
                      className={classes.iconButton}
                      onClick={this.shareFacebook}
                    >
                      <FacebookIcon
                        size={26}
                        className={classes.facebookIcon}
                      />
                    </IconButton>
                  </FacebookShareButton>
                  <TwitterShareButton url={profile.referral_url}>
                    <IconButton
                      className={classes.iconButton}
                      onClick={this.shareTwitter}
                    >
                      <TwitterIcon size={25} className={classes.twitterIcon} />
                    </IconButton>
                  </TwitterShareButton>
                  <LinkedinShareButton url={profile.referral_url}>
                    <IconButton
                      className={classes.iconButton}
                      onClick={this.shareLinkedIn}
                    >
                      <LinkedInShareIcon
                        size={26}
                        className={classes.linkedInIcon}
                      />
                    </IconButton>
                  </LinkedinShareButton>
                </div>
              </div>
            </div>
            <div className={classes.exenGainArea}>
              <div className={classes.keyValueRow}>
                <div className={classes.key}>
                  {I18n.translate('exen_earning_total')}
                </div>
                <div
                  className={classNames(
                    classes.value,
                    classes.amount,
                    classes.alignRight
                  )}
                >
                  {profile.total_exen_gain}
                </div>
              </div>
              <div className={classes.keyValueRow}>
                <div className={classes.key}>
                  {I18n.translate('exen_earning_referral')}
                </div>
                <div
                  className={classNames(
                    classes.value,
                    classes.amount,
                    classes.alignRight
                  )}
                >
                  {profile.referral_gain}
                </div>
              </div>
              <div className={classes.keyValueRow}>
                <div className={classes.key}>
                  {I18n.translate('exen_earning_competitions')}
                </div>
                <div
                  className={classNames(
                    classes.value,
                    classes.amount,
                    classes.alignRight
                  )}
                >
                  {profile.tournament_gain}
                </div>
              </div>
              {profile.can_add_referrer ? (
                <div className={classes.keyValueRow}>
                  <div className={classNames(classes.value, classes.referrer)}>
                    <TextField
                      id="referrerCode"
                      className={classes.textFieldStyle}
                      value={this.state.referrerCode}
                      onChange={event => {
                        this.setState({ referrerCode: event.target.value });
                      }}
                      label={I18n.translate('referrer_code')}
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
                    />
                  </div>
                  <div
                    className={classNames(classes.value, classes.alignBottom)}
                  >
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      className={classes.inputButton}
                      onClick={this.addReferrer}
                    >
                      {I18n.translate('add_referrer_button')}
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
        <Divider className={classes.divider} />
        <Tabs
          value={this.state.selectedTab}
          onChange={this.handleTabChange}
          classes={{
            indicator: classNames({
              [classes.tabIndicatorReferral]:
                this.state.selectedTab === 'REFERRAL',
              [classes.tabIndicatorCompetition]:
                this.state.selectedTab !== 'REFERRAL'
            })
          }}
          textColor="primary"
        >
          <Tab
            classes={{
              root: classes.historyTypeTabStyle,
              selected: classes.referralSelected
            }}
            value="REFERRAL"
            label={I18n.translate('exen_tab_label_referral')}
          />
          <Tab
            classes={{
              root: classes.historyTypeTabStyle,
              selected: classes.competitionSelected
            }}
            value="COMPETITION"
            label={I18n.translate('exen_tab_label_competition')}
          />
        </Tabs>
        <Divider className={classes.tabDivider} />
        {this.state.selectedTab === 'REFERRAL' ? (
          <ReferralHistoryContainer />
        ) : (
          <CompetitionHistoryContainer />
        )}
      </StyledPaper>
    );
  }
}

export default withStyles(styles)(ExenProfile);
