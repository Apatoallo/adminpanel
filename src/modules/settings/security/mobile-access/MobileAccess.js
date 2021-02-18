import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import I18n from '../../../../common/i18n/I18n';
import * as QRCode from 'qrcode.react';
import InfoPane from '../../../../components/common/InfoPane';
import MobileDevice from '../../../../components/mobile-device/MobileDevice';
import classNames from 'classnames';
import { AddIcon } from '../../../../components/icons/Icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const styles = theme => ({
  container: {
    padding: '10px 22px 10px 26px'
  },
  line: {
    padding: '7px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: theme.colors.textColor.menuItem,
    boxSizing: 'border-box',
    fontSize: '14px',
    textDecoration: 'none'
  },
  item: {
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'column'
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    flexDirection: 'row'
  },
  hint: {
    height: '24px',
    fontSize: '14px',
    lineHeight: '1.71',
    opacity: '.5'
  },
  buttonContainer: {
    width: '16px',
    height: '16px'
  },
  addButton: {
    color: theme.colors.textColor.white,
    borderRadius: '19px',
    backgroundColor: theme.colors.textColor.menuItemSelected
  },
  createText: {
    fontSize: '14px',
    paddingLeft: '8px',
    color: theme.colors.textColor.blue,
    fontWeight: '500'
  },
  waitingApproval: {
    width: '14px',
    height: '14px',
    borderRadius: '12px',
    border: 'solid 3px #3ab2ee'
  },
  waitingApprovalText: {
    fontSize: '14px',
    paddingLeft: '8px',
    fontWeight: '500'
  },
  qrCodeContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.colors.background.paper
  },
  qrCode: {
    margin: '15px 30px 15px 20px',
    border: 'solid 5px white',
    display: 'flex',
    alignItems: 'center'
  },
  infoPaneContainer: {
    lineHeight: '2',
    width: '100%',
    backgroundColor: theme.colors.background.informationArea
  },
  infoPaneText: {
    margin: '0',
    fontSize: '13px'
  },
  pointer: {
    cursor: 'pointer'
  },
  credentials: {
    marginTop: theme.unit.margin,
    display: 'block'
  },
  keyValueRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: theme.colors.textColor.menuItem,
    lineHeight: '22px'
  },
  key: {},
  value: {
    display: 'flex',
    flexDirection: 'row',
    fontWeight: '500'
  },
  addressCopyLink: {
    cursor: 'pointer',
    margin: '6px',
    fontSize: '18px'
  },
  infoPaneWrapper: {
    display: 'flex',
    flexDirection: 'column'
  }
});

class MobileAccess extends React.PureComponent {
  componentWillMount() {
    this.props.listMobileAccess();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.updateMobileKeysFlag) {
        this.props.listMobileAccess();
        this.props.clearUpdateMobileKeysFlag();
      }
    }
  }

  createNewAccessCode = () => {
    this.props
      .createMobileAccess({})
      .then(resp => {
        if (resp.payload.data.status === 'error') {
          this.props.showDialog({
            title: I18n.translate('general_error'),
            text: resp.payload.data.reason,
            okButtonText: I18n.translate('general_ok')
          });
        } else {
          this.props.showSnackbar(
            I18n.translate('settings_mobile_access_created_success_message')
          );
          this.props.listMobileAccess();
        }
      })
      .catch(() => {
        this.props.showDialog({
          title: I18n.translate('general_error'),
          text: I18n.translate('general_error_description'),
          okButtonText: I18n.translate('general_ok')
        });
      });
  };

  removeMobileAccess = apikey => {
    const data = { apikey };

    this.props
      .deleteMobileAccess(data)
      .then(resp => {
        if (resp.payload.data.status === 'error') {
          this.props.showDialog({
            title: I18n.translate('general_error'),
            text: resp.payload.data.reason,
            okButtonText: I18n.translate('general_ok')
          });
        } else {
          this.props.showSnackbar(
            I18n.translate('settings_mobile_access_created_fail_message')
          );
          this.props.listMobileAccess();
        }
      })
      .catch(() => {
        this.props.showDialog({
          title: I18n.translate('general_error'),
          text: I18n.translate('general_error_description'),
          okButtonText: I18n.translate('general_ok')
        });
      });
  };

  render() {
    const { classes, mobileStatus = 'none', mobileKeys } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.line}>
          <div className={classes.item}>
            <div>{I18n.translate('settings_mobile_access_label')}</div>
            <div className={classes.hint}>
              {mobileStatus === 'none'
                ? I18n.translate('settings_no_mobile_access_yet')
                : mobileStatus === 'waiting'
                  ? I18n.translate('settings_mobile_access_approvement_label')
                  : mobileStatus === 'qr'
                    ? I18n.translate('settings_mobile_access_qr_label')
                    : I18n.translate(
                        'settings_mobile_access_hint',
                        mobileKeys.length
                      )}
            </div>
          </div>
        </div>
        <div className={classes.line}>
          {mobileStatus === 'none' ? (
            <div
              className={classNames(classes.itemRow, classes.pointer)}
              onClick={this.createNewAccessCode}
            >
              <AddIcon strokeClassName={classes.strokeColor} />
              <div className={classes.createText}>
                {I18n.translate('settings_new_mobile_access_button')}
              </div>
            </div>
          ) : mobileStatus === 'waiting' ? (
            <div className={classes.itemRow}>
              <div className={classes.waitingApproval} />
              <div className={classes.waitingApprovalText}>
                {I18n.translate('settings_mobile_access_waiting_approval')}
              </div>
            </div>
          ) : mobileStatus === 'qr' ? (
            <div className={classes.qrCodeContainer}>
              <div className={classes.qrCode}>
                <QRCode size={150} value={mobileKeys[0].qr_code} />
              </div>
              <div className={classes.infoPaneContainer}>
                <InfoPane>
                  <div className={classes.infoPaneWrapper}>
                    <ul className={classes.infoPaneText}>
                      <li>{I18n.translate('mobile_access_info_line1')}</li>
                      <li>{I18n.translate('mobile_access_info_line2')}</li>
                      <li>{I18n.translate('mobile_access_info_line3')}</li>
                      <li>{I18n.translate('mobile_access_info_line4')}</li>
                    </ul>
                    <div className={classes.credentials}>
                      <div className={classes.keyValueRow}>
                        <div className={classes.key}>
                          {I18n.translate('mobile_access_info_email')}
                        </div>
                        <div className={classes.value}>
                          {this.props.userInfo
                            ? this.props.userInfo.username
                            : ''}
                          <Tooltip title={I18n.translate('general_copy')}>
                            <CopyToClipboard
                              text={
                                this.props.userInfo
                                  ? this.props.userInfo.username
                                  : ''
                              }
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
                          {I18n.translate('mobile_access_info_api_key')}
                        </div>
                        <div className={classes.value}>
                          {mobileKeys[0].apikey}
                          <Tooltip title={I18n.translate('general_copy')}>
                            <CopyToClipboard
                              text={mobileKeys[0].apikey}
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
                          {I18n.translate('mobile_access_info_secret')}
                        </div>
                        <div className={classes.value}>
                          {mobileKeys[0].secret}
                          <Tooltip title={I18n.translate('general_copy')}>
                            <CopyToClipboard
                              text={mobileKeys[0].secret}
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
                    </div>
                  </div>
                </InfoPane>
              </div>
            </div>
          ) : (
            <div>
              {mobileKeys.map((mobileKey, i) => (
                <MobileDevice
                  key={i}
                  {...mobileKey}
                  onClick={() => this.removeMobileAccess(mobileKey.apikey)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MobileAccess);
