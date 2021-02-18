import React from 'react';
import StyledPaper from '../common/StyledPaper';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import DialogFooter from '../../components/dialog/DialogFooter';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import {
  IdVerificationIcon,
  AddressVerificationIcon,
  VerifiedIcon
} from '../icons/Icons';
import I18n from '../../common/i18n/I18n';
import IDVerificationPopup from './IDVerificationPopup';
import AddressVerificationPopup from './AddressVerificationPopup';
import { CancelIcon } from '../../components/icons/Icons';
import { formatBytes } from '../../common/utils/numberUtil';

const styles = theme => ({
  dialogContent: {
    overflowY: 'initial'
  },
  verificationFormContainer: {
    marginTop: theme.unit.margin,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    boxSizing: 'border-box',
    height: 'auto',
    top: '136px',
    padding: '16px 24px 16px 16px'
  },
  formLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  inputArea: {
    marginTop: '5px',
    width: '272px'
  },
  icons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '24px',
    marginRight: '24px',
    boxSizing: 'border-box',
    textAlign: 'center'
  },
  iconsRight: {
    marginLeft: '35px'
  },
  inputButton: {
    borderRadius: '19px',
    textTransform: 'none',
    marginBottom: '9px',
    marginRight: '-10px',
    height: '26px',
    minHeight: '26px',
    minWidth: '142px',
    lineHeight: '14px'
  },
  phoneNumberLabelWrap: {
    whiteSpace: 'nowrap'
  },
  verifiedLabel: {
    width: '42px',
    height: '14px',
    fontSize: '12px',
    fontWeight: '500',
    textAlign: 'center',
    color: '#3ab2ee',
    marginRight: '8px'
  },
  verifiedSection: {
    marginRight: '-8px',
    marginTop: '-4px'
  },
  formText: {
    color: theme.colors.textColor.input,
    '&:before': {
      borderBottomColor: 'rgba(0, 0, 0, 0.12);'
    },
    '&:after': {
      borderBottomColor: '#3ab2ee'
    }
  },
  formLabel: {
    opacity: '0.5',
    color: `${theme.colors.textColor.formLabel} !important`
  },
  formLabelFocused: {
    opacity: '0.5',
    color: '#3ab2ee'
  },
  fillColor: {
    fill: theme.colors.background.settingsIcon
  },
  dialog: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    width: '590px'
    // height: '453px'
  },
  fileContent: {
    display: 'table',
    width: '100%'
  },
  tableRow: {
    display: 'table-row',
    lineHeight: '22px',
    fontSize: '13px'
  },
  tableCell: {
    display: 'table-cell',
    whiteSpace: 'nowrap'
  },
  tableCellRight: {
    display: 'table-cell',
    whiteSpace: 'nowrap',
    textAlign: 'right'
  }
});

class VerificationForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: []
    };
  }

  componentWillMount() {
    this.props.getStatus();
  }

  filesAdded = (accepted, rejected) => {
    const { files } = this.state;
    if (rejected.length > 0) {
      let reason = 'type';
      rejected.forEach(file => {
        const fileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (fileTypes.includes(file.type)) {
          reason = 'size';
        }
      });
      this.showError(
        reason === 'size'
          ? 'settings_verification_file_size_error'
          : 'settings_verification_file_type_error'
      );
    } else {
      if (accepted.length + files.length > 2) {
        this.showError('settings_verification_file_count_error');
      } else {
        for (let a in accepted) {
          for (let f in this.state.files) {
            if (accepted[a].name === this.state.files[f].name) {
              return this.showError(
                I18n.translate(
                  'settings_verification_same_file_added_error',
                  accepted[a].name
                )
              );
            }
          }
        }
        this.setState(prevState => ({
          files: [...prevState.files, ...accepted]
        }));
      }
    }
  };

  showError = message => {
    this.props.showDialog({
      title: I18n.translate('general_error'),
      text: I18n.translate(message),
      okButtonText: I18n.translate('general_ok')
    });
  };

  submit = data => {
    const { files } = this.state;
    if (files.length === 0) {
      this.showError('settings_verification_no_file_error');
      return;
    }
    this.props.showLoading();
    const requestData = { ...data, files };
    this.setState({ open: false, files: [] });
    this.props
      .submit(requestData)
      .then(resp => {
        if (resp.payload.data.status === 'error') {
          this.props.hideLoading();
          this.showError(resp.payload.data.reason);
        } else {
          this.props.hideLoading();
          this.props.getStatus();
          this.props.showSnackbar(
            I18n.translate('settings_verification_submit_success_message')
          );
        }
      })
      .catch(() => {
        this.props.hideLoading();
        this.showError('general_error_description');
      });
  };

  removeFile = name => {
    this.setState(prevState => ({
      files: prevState.files.filter(file => file.name !== name)
    }));
  };

  handleClose = () => {
    this.setState({ open: false, files: [] });
  };

  openVerificationPopup = type => {
    this.setState({ open: true, popupType: type });
  };

  getLabelForStatus = status => {
    return status === 'W'
      ? 'settings_verification_status_pending'
      : status === 'A'
      ? 'settings_verification_status_verified'
      : 'settings_verification_status_none';
  };

  render() {
    const { classes, userInfo, idStatus, addressStatus } = this.props;
    const idVerificationStatus = I18n.translate(
      this.getLabelForStatus(idStatus)
    );
    const addressVerificationStatus = I18n.translate(
      this.getLabelForStatus(addressStatus)
    );
    return userInfo.verified_level > 0 ? (
      <div>
        <StyledPaper className={classes.verificationFormContainer}>
          <div className={classes.formLine}>
            <div className={classes.icons}>
              <IdVerificationIcon className={classes.fillColor} />
            </div>
            <TextField
              disabled={true}
              value={idVerificationStatus}
              label={I18n.translate('settings_id_verification_status_label')}
              className={classes.inputArea}
              margin="normal"
              InputProps={{
                classes: {
                  underline: classes.formText,
                  disabled: classes.formText
                },
                endAdornment: (
                  <InputAdornment position="start">
                    {(idStatus === 'N' || idStatus === 'R') && (
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        className={classes.inputButton}
                        onClick={() =>
                          this.openVerificationPopup('idVerification')
                        }
                      >
                        {I18n.translate('settings_upload_file')}
                      </Button>
                    )}
                    {idStatus === 'A' && (
                      <div className={classes.verifiedSection}>
                        <VerifiedIcon />
                      </div>
                    )}
                  </InputAdornment>
                )
              }}
              InputLabelProps={{
                classes: {
                  focused: classes.formLabelFocused,
                  root: classes.formLabel
                }
              }}
            />
          </div>
          <div className={classes.formLine}>
            <div className={classes.icons}>
              <AddressVerificationIcon className={classes.fillColor} />
            </div>
            <TextField
              disabled={true}
              value={addressVerificationStatus}
              label={I18n.translate(
                'settings_address_verification_status_label'
              )}
              className={classes.inputArea}
              margin="normal"
              InputProps={{
                classes: {
                  underline: classes.formText,
                  disabled: classes.formText
                },
                endAdornment: (
                  <InputAdornment position="start">
                    {(addressStatus === 'N' || addressStatus === 'R') && (
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        className={classes.inputButton}
                        onClick={() =>
                          this.openVerificationPopup('addressVerification')
                        }
                      >
                        {I18n.translate('settings_upload_file')}
                      </Button>
                    )}
                    {addressStatus === 'A' && (
                      <div className={classes.verifiedSection}>
                        <VerifiedIcon />
                      </div>
                    )}
                  </InputAdornment>
                )
              }}
              InputLabelProps={{
                classes: {
                  focused: classes.formLabelFocused,
                  root: classes.formLabel
                }
              }}
            />
          </div>
        </StyledPaper>
        <Dialog
          classes={{ paper: classes.dialog }}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent className={classes.dialogContent}>
            {this.state.popupType === 'idVerification' ? (
              <IDVerificationPopup
                showError={this.showError.bind(this)}
                onFilesAdd={this.filesAdded.bind(this)}
                submit={this.submit.bind(this)}
              />
            ) : (
              <AddressVerificationPopup
                showError={this.showError.bind(this)}
                onFilesAdd={this.filesAdded.bind(this)}
                submit={this.submit.bind(this)}
              />
            )}
          </DialogContent>
          <DialogFooter
            title={I18n.translate('settings_verification_files_panel_lable')}
          >
            <div className={classes.fileContent}>
              {this.state.files.map((file, i) => (
                <div key={i} className={classes.tableRow}>
                  <div className={classes.tableCell}>{file.name}</div>
                  <div className={classes.tableCell}>{file.type}</div>
                  <div className={classes.tableCell}>
                    {formatBytes(file.size)}
                  </div>
                  <div className={classes.tableCellRight}>
                    <CancelIcon onClick={this.removeFile} itemKey={file.name} />
                  </div>
                </div>
              ))}
            </div>
          </DialogFooter>
        </Dialog>
      </div>
    ) : (
      ''
    );
  }
}

export default withMobileDialog()(withStyles(styles)(VerificationForm));
