import React from 'react';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import I18n from '../../../../common/i18n/I18n';
import { findDOMNode } from 'react-dom';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.colors.background.paper,
    marginTop: theme.unit.margin,
    boxSizing: 'border-box'
  },
  divider: {
    height: '2px',
    backgroundColor: theme.colors.background.menuDivider
  },
  line: {
    padding: '20px 10px 20px 26px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.colors.textColor.menuItem,
    boxSizing: 'border-box',
    fontSize: '14px',
    textDecoration: 'none'
  },
  item: {
    fontSize: '16px'
  },
  button: {
    borderRadius: '19px',
    textTransform: 'none',
    marginRight: '17px',
    height: '26px',
    minHeight: '26px',
    minWidth: '72px',
    lineHeight: '14px'
  },
  passwordMenuPaper: {
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.16)',
    minWidth: '290px',
    minHeight: '233px',
    boxSizing: 'border-box',
    padding: '4px 12px 13px 12px',
    backgroundColor: 'white'
  },
  changePasswordArea: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  passwordMenuPopoverStyle: {
    // color: theme.colors.textColor.white,
    boxSizing: 'border-box',
    padding: '4px 12px 13px 12px'
  },
  textFieldStyle: {
    width: '100%',
    color: 'rgba(48, 68, 98, 0.87)',
    '&:before': {
      borderBottomColor: 'rgba(0, 0, 0, 0.12);'
    },
    '&:after': {
      borderBottomColor: '#3ab2ee'
    }
  },
  inputLabelColor: {
    color: 'rgba(48, 68, 98, 0.38)'
  },
  focusedLabelColor: {
    color: '#3ab2ee'
  },
  formLine: {
    paddingTop: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  buttonStyle: {
    marginTop: '20px',
    width: '100%',
    height: '36px',
    color: 'white',
    textTransform: 'none'
  }
});

class ChangePassword extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      newPassword2: '',

      passwordMenuAnchor: findDOMNode(this.passwordMenuBase),
      passwordMenuOpen: false
    };
  }

  changePassword = () => {
    const { currentPassword, newPassword, newPassword2 } = this.state;
    if (newPassword.length < 8 || newPassword2.length < 8) {
      this.props.showDialog({
        title: I18n.translate('general_error'),
        text: I18n.translate('settings_password_min_length_error', 8),
        okButtonText: I18n.translate('general_ok')
      });
      return;
    }
    if (newPassword !== newPassword2) {
      this.props.showDialog({
        title: I18n.translate('general_error'),
        text: I18n.translate('settings_passwords_are_not_the_same'),
        okButtonText: I18n.translate('general_ok')
      });
      return;
    }
    if (currentPassword === newPassword2) {
      this.props.showDialog({
        title: I18n.translate('general_error'),
        text: I18n.translate('settings_passwords_should_be_different'),
        okButtonText: I18n.translate('general_ok')
      });
      return;
    }
    const data = { old_password: currentPassword, new_password: newPassword };
    this.props
      .changePassword(data)
      .then(resp => {
        if (resp.payload.data.status === 'error') {
          this.props.showDialog({
            title: I18n.translate('general_error'),
            text: resp.payload.data.reason,
            okButtonText: I18n.translate('general_ok')
          });
        } else {
          this.props.showSnackbar(
            I18n.translate('settings_password_change_success_message')
          );
          this.togglePasswordPopover();
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

  togglePasswordPopover = () => {
    if (!this.state.passwordMenuOpen) {
      this.props.showDialog(
        {
          title: I18n.translate('withdraw_confirmation_dialog_warning_label'),
          text: I18n.translate('withdraw_change_password_warning'),
          okButtonText: I18n.translate('general_ok')
        },
        {
          ok: () => {
            this.setState({
              passwordMenuOpen: !this.state.passwordMenuOpen,
              currentPassword: '',
              newPassword: '',
              newPassword2: ''
            });
          }
        }
      );
    } else {
      this.setState({
        passwordMenuOpen: !this.state.passwordMenuOpen,
        currentPassword: '',
        newPassword: '',
        newPassword2: ''
      });
    }
  };

  passwordMenuBase = null;

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.line}>
          <div className={classes.item}>
            {I18n.translate('settings_password_label')}
          </div>
          <div className={classes.item}>
            <div
              ref={node => {
                this.setState({ passwordMenuAnchor: findDOMNode(node) });
              }}
              className={classes.changePasswordArea}
            >
              <Button
                size="small"
                color="primary"
                variant="contained"
                className={classes.button}
                onClick={this.togglePasswordPopover}
              >
                {I18n.translate('settings_password_change_label')}
              </Button>
            </div>
            <Popover
              open={this.state.passwordMenuOpen}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorEl={this.state.passwordMenuAnchor}
              anchorReference="anchorEl"
              onClose={this.togglePasswordPopover}
              PaperProps={{
                elevation: 3,
                classes: { root: classes.passwordMenuPaper }
              }}
              transitionDuration={150}
            >
              <div className={classes.formLine}>
                <TextField
                  id="current_password"
                  label={I18n.translate('settings_old_password_label')}
                  type="password"
                  className={this.props.classes.textFieldStyle}
                  value={this.state.currentPassword}
                  onChange={event => {
                    this.setState({ currentPassword: event.target.value });
                  }}
                  InputProps={{
                    disableUnderline: true,
                    classes: {
                      underline: this.props.classes.textFieldStyle
                    }
                  }}
                  InputLabelProps={{
                    classes: {
                      focused: this.props.classes.focusedLabelColor,
                      root: this.props.classes.inputLabelColor
                    }
                  }}
                />
              </div>
              <Divider className={classes.divider} />
              <div className={classes.formLine}>
                <TextField
                  id="new_password"
                  label={I18n.translate('settings_new_password_label')}
                  type="password"
                  className={this.props.classes.textFieldStyle}
                  value={this.state.newPassword}
                  onChange={event => {
                    this.setState({ newPassword: event.target.value });
                  }}
                  InputProps={{
                    disableUnderline: true,
                    classes: {
                      underline: this.props.classes.textFieldStyle
                    }
                  }}
                  InputLabelProps={{
                    classes: {
                      focused: this.props.classes.focusedLabelColor,
                      root: this.props.classes.inputLabelColor
                    }
                  }}
                />
              </div>
              <Divider className={classes.divider} />
              <div className={classes.formLine}>
                <TextField
                  id="new_password2"
                  label={I18n.translate('settings_new_password_label')}
                  type="password"
                  className={this.props.classes.textFieldStyle}
                  value={this.state.newPassword2}
                  onChange={event => {
                    this.setState({ newPassword2: event.target.value });
                  }}
                  InputProps={{
                    disableUnderline: true,
                    classes: {
                      underline: this.props.classes.textFieldStyle
                    }
                  }}
                  InputLabelProps={{
                    classes: {
                      focused: this.props.classes.focusedLabelColor,
                      root: this.props.classes.inputLabelColor
                    }
                  }}
                />
              </div>
              <Divider className={classes.divider} />
              <Button
                variant="contained"
                color="primary"
                className={classes.buttonStyle}
                onClick={this.changePassword}
              >
                {I18n.translate('settings_update_password_button')}
              </Button>
            </Popover>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ChangePassword);
