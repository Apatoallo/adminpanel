import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import classNames from 'classnames';
import * as queue from 'fifo';
import Linkify from 'react-linkify';
import HeaderContainer from './../header/HeaderContainer';
import MarketBarContainer from './../market-bar/MarketBarContainer';
import { MODAL_TYPES } from './pageConstants';
import SnackbarList from '../snackbar-list/SnackbarList';

import LeftContentRoutes from '../../common/routes/LeftContentRoutes';
import RightContentRoutes from '../../common/routes/RightContentRoutes';
import InstantTradeRoutes from '../../modules/instant-trade/InstantTradeRoutes';
import I18n from '../../common/i18n/I18n';
import logo from '../../assets/images/Loading140.gif';
import { pushAnnouncementIfNeeded } from '../../common/utils/announcementHelper';
import DeviceConfirmationContainer from '../../modules/device-confirmation/DeviceConfirmationContainer';
import lightTheme from '../../common/theme/lightTheme';
import darkTheme from '../../common/theme/darkTheme';
import TradeViewContainer from '../../modules/trade/trade-view/TradeViewContainer';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  contentContainerStyle: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    top: '112px',
    width: '100%',
    minHeight: '100%',
    minWidth: '1079px',
    boxSizing: 'border-box',
    backgroundColor: theme.colors.background.content,
    '@media screen and (max-width: 600px)': {
      minWidth: 'auto',
      top: '160px',
      padding: theme.unit.margin
    }
  },
  contentStyle: {
    display: 'flex',
    flexDirection: 'row',
    width: '1170px',
    minWidth: '1079px',
    minHeight: '100%',
    '@media screen and (max-width: 600px)': {
      flexDirection: 'column',
      width: '100%',
      minWidth: 'auto'
    },
    '@media screen and (min-width: 601px) and (max-width: 1279px)': {},
    '@media screen and (min-width: 1280px)': {}
  },
  instantTradeContentStyle: {
    '@media screen and (min-width: 601px) and (max-width: 1279px)': {
      width: '100%',
      minWidth: 'auto'
    }
  },
  leftContentStyle: {
    minWidth: '270px',
    width: '270px',
    height: 'calc(100vh - 136px)',
    position: 'fixed',
    top: '136px',
    '@media screen and (max-width: 600px)': {
      position: 'initial',
      width: 'auto',
      height: 'auto',
      minWidth: 'auto'
    }
  },
  rightContentStyle: {
    marginLeft: '294px',
    width: '100%',
    minHeight: '1200px',
    maxWidth: '876px',
    backgroundColor: theme.colors.background.content,
    '@media screen and (max-width: 600px)': {
      marginLeft: '0',
      width: 'auto'
    }
  },
  dialogText: {
    whiteSpace: 'pre-line'
  },
  snackbarList: {
    position: 'absolute',
    left: '0',
    bottom: '12px',
    '@media screen and (max-width: 600px)': {
      position: 'fixed',
      width: '100vw',
      top: '0',
      left: '0',
      bottom: 'auto !important'
    }
  },
  loading: {
    position: 'fixed',
    left: '0',
    top: '0',
    color: 'red',
    backgroundColor: 'black',
    opacity: '0.5',
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '2001'
  },
  spinner: {
    color: theme.colors.background.settingsIcon
  },
  dialogPaper: {
    maxWidth: '770px'
  },
  dialogContent: {
    color: 'rgba(0, 0, 0, 0.54)',
    margin: '0',
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1.5em'
  },
  label: {
    fontSize: '1rem',
    color: 'rgba(0, 0, 0, 0.70)'
  },
  dialogButton: {
    fontSize: '1rem'
  },
  fullWidth: {
    width: '100%'
  },
  headerTradeView: {
    width: '100%',
    padding: '0 16px'
  },
  popoverStyle: {
    left: '0 !important'
  },
  checkbox: {
    color: 'rgba(48, 66, 98, 0.12)',
    '&$checked': {
      color: theme.colors.textColor.blue
    },
    padding: '0 8px 0 0'
  },
  checked: {},
  dialogDismissLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '24px'
  },
  dialogDismissText: {},
  noHeight: {
    height: '0',
    overflow: 'hidden'
  },
  instantTradeContainer: {
    position: 'absolute',
    boxSizing: 'border-box',
    width: '100%',
    minHeight: 'calc(100% - 60px)',
    backgroundColor: theme.colors.background.content,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  instantTradeOuterContainer: {
    top: '60px',
    '@media screen and (min-width: 601px) and (max-width: 1279px)': {
      width: '100%',
      minWidth: 'auto',
      padding: '12px'
    },
    '@media screen and (max-width: 600px)': {
      padding: '12px'
    }
  }
});

class Page extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      modalItem: null,
      responseValue: null,
      dismissAlert: false
    };

    this.modalQueue = queue();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (this.props.modalItems !== nextProps.modalItems) {
        const difference = nextProps.modalItems.filter(
          x => !this.queueContains(this.modalQueue, x)
        );
        difference.forEach(item => {
          if (!this.props.modalItems || !this.props.modalItems.includes(item)) {
            this.modalQueue.push(item);
          }
        });
        if (!this.state.modalItem) {
          this.setState({
            modalItem: this.modalQueue.shift()
          });
        }
      }

      if (
        nextProps.announcements &&
        this.props.announcements !== nextProps.announcements &&
        nextProps.announcements.length > 0
      ) {
        nextProps.announcements.forEach(ann => pushAnnouncementIfNeeded(ann));
      }
    }
  }

  queueContains = (sourceQueue, item) => {
    let found = false;
    sourceQueue.forEach(value => {
      if (value === item) {
        found = true;
      }
    });
    return found;
  };

  shouldModalOpen = modalType =>
    this.state.modalItem !== null &&
    this.state.modalItem.modalType === modalType;

  handleOk = () => {
    const modalItem = Object.assign({}, this.state.modalItem);
    this.handleClose();

    if (
      this.state.dismissAlert &&
      modalItem &&
      modalItem.content &&
      modalItem.content.dismissable &&
      modalItem.content.dismissPreferenceKey
    ) {
      this.props.changePreferences(
        modalItem.content.dismissPreferenceKey,
        true
      );
      this.setState({ dismissAlert: false });
    }

    if (modalItem.announcementType === 'T' && this.state.responseValue) {
      this.props
        .sendAnnouncementResponse({
          announcement_id: modalItem.announcementId.toString(),
          result: this.state.responseValue
        })
        .then(() => {
          this.setState({ responseValue: null });
        });
    } else if (modalItem.callbacks && modalItem.callbacks.ok) {
      modalItem.callbacks.ok(modalItem.content.key);
    }
  };

  handleCancel = () => {
    const modalItem = Object.assign({}, this.state.modalItem);
    this.handleClose();

    if (modalItem.callbacks && modalItem.callbacks.cancel) {
      modalItem.callbacks.cancel(modalItem.content.key);
    }
  };

  handleClose = () => {
    this.setState({ modalItem: null }, () => {
      if (this.modalQueue.length > 0) {
        const nextModalItem = this.modalQueue.shift();
        this.setState({
          modalItem: nextModalItem
        });
      }
    });
  };

  handleResponseChange = event => {
    this.setState({ responseValue: event.target.value });
  };

  handleDismissAlertChange = () => {
    this.setState({ dismissAlert: !this.state.dismissAlert });
  };

  render() {
    const {
      classes,
      showLoading = false,
      showDeviceConfirmation = false
    } = this.props;
    const { modalItem, dismissAlert, responseValue } = this.state;
    const tradeViewMode = this.props.location.pathname === '/advanced';
    const instantTradeMode =
      this.props.location.pathname.indexOf('/instant') > -1;

    return (
      <div>
        {showLoading && (
          <div className={classes.loading}>
            <img src={logo} alt="loading..." width="55px" height="43px" />
          </div>
        )}
        <div className={classes.root}>
          <HeaderContainer
            classes={{
              headerStyle: tradeViewMode ? classes.headerTradeView : undefined
            }}
          />
          {showDeviceConfirmation ? (
            <MuiThemeProvider theme={createMuiTheme(lightTheme)}>
              <DeviceConfirmationContainer />
            </MuiThemeProvider>
          ) : tradeViewMode ? (
            <div>
              <MuiThemeProvider theme={createMuiTheme(darkTheme)}>
                <MarketBarContainer
                  classes={{
                    marketBarStyle: tradeViewMode
                      ? classes.fullWidth
                      : undefined,
                    popoverPaper: tradeViewMode
                      ? classes.popoverStyle
                      : undefined
                  }}
                />
                <TradeViewContainer />
                <SnackbarList
                  snackbarItem={this.props.snackbarItem}
                  className={classes.snackbarList}
                />
              </MuiThemeProvider>
            </div>
          ) : instantTradeMode ? (
            <div className={classes.instantTradeContainer}>
              <MarketBarContainer
                classes={{
                  marketBarContainerStyle: instantTradeMode
                    ? classes.noHeight
                    : undefined
                }}
              />
              <div
                className={classNames(
                  classes.contentContainerStyle,
                  classes.instantTradeOuterContainer
                )}
              >
                <div
                  className={classNames(
                    classes.contentStyle,
                    classes.instantTradeContentStyle
                  )}
                >
                  <InstantTradeRoutes />
                </div>
              </div>
              <SnackbarList
                snackbarItem={this.props.snackbarItem}
                className={classes.snackbarList}
              />
            </div>
          ) : (
            <div>
              <MarketBarContainer
                classes={{
                  marketBarStyle: tradeViewMode ? classes.fullWidth : undefined,
                  popoverPaper: tradeViewMode ? classes.popoverStyle : undefined
                }}
              />
              <div className={classes.contentContainerStyle}>
                <div className={classes.contentStyle}>
                  <div className={classes.leftContentStyle}>
                    <LeftContentRoutes />
                    <SnackbarList
                      snackbarItem={this.props.snackbarItem}
                      className={classes.snackbarList}
                    />
                  </div>
                  <div className={classes.rightContentStyle}>
                    <RightContentRoutes />
                  </div>
                </div>
              </div>
            </div>
          )}
          {modalItem && (
            <Dialog
              open={this.shouldModalOpen(MODAL_TYPES.DIALOG)}
              onClose={this.handleClose}
              disableBackdropClick={
                this.shouldModalOpen(MODAL_TYPES.DIALOG) &&
                ((modalItem.content && modalItem.content.strict) ||
                  modalItem.force_response)
              }
              disableEscapeKeyDown={
                this.shouldModalOpen(MODAL_TYPES.DIALOG) &&
                ((modalItem.content && modalItem.content.strict) ||
                  modalItem.force_response)
              }
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-text"
              PaperProps={{
                classes: {
                  root: classes.dialogPaper
                }
              }}
            >
              <DialogTitle id="alert-dialog-title">
                {(modalItem.content && modalItem.content.title) ||
                  I18n.translate('general_announcement')}
              </DialogTitle>
              <DialogContent className={this.props.classes.dialogContent}>
                {modalItem.content && modalItem.content.text}
                {modalItem.type === 'ANNOUNCEMENT' ? (
                  <Linkify
                    properties={{
                      target: modalItem.target_blank ? '_blank' : undefined,
                      style: { color: '#3ab2ee', fontWeight: '500' }
                    }}
                  >
                    {modalItem.paragraphs[I18n.currentLanguage].map(
                      (paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      )
                    )}
                    {modalItem.announcementType === 'T' && (
                      <FormControl
                        component="fieldset"
                        className={classes.formControl}
                      >
                        <RadioGroup
                          aria-label="Response"
                          name="response"
                          className={classes.group}
                          value={responseValue}
                          onChange={this.handleResponseChange}
                        >
                          {modalItem.responses.map(option => (
                            <FormControlLabel
                              classes={{ label: classes.label }}
                              key={option.value}
                              value={option.value}
                              control={<Radio />}
                              label={option[`text_${I18n.currentLanguage}`]}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    )}
                  </Linkify>
                ) : null}
                {modalItem.content &&
                  modalItem.content.dismissable &&
                  modalItem.content.dismissPreferenceKey && (
                    <div className={classes.dialogDismissLine}>
                      <Checkbox
                        checked={dismissAlert}
                        classes={{
                          root: classes.checkbox,
                          checked: classes.checked
                        }}
                        onChange={this.handleDismissAlertChange}
                        aria-label="dismissAlert"
                      />
                      <div className={classes.dialogDismissText}>
                        {I18n.translate('general_do_not_show_this_again')}
                      </div>
                    </div>
                  )}
              </DialogContent>
              <DialogActions>
                {modalItem.content && modalItem.content.cancelButtonText ? (
                  <Button
                    className={classes.dialogButton}
                    onClick={this.handleCancel}
                    color="primary"
                  >
                    {modalItem.content.cancelButtonText}
                  </Button>
                ) : null}
                <Button
                  onClick={this.handleOk}
                  className={classes.dialogButton}
                  disabled={
                    modalItem.announcementType === 'T' && responseValue === null
                  }
                  color="primary"
                  autoFocus
                >
                  {(modalItem.content && modalItem.content.okButtonText) ||
                    I18n.translate('general_ok')}
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Page);
