import React from 'react';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withStyles } from '@material-ui/core/styles';

import history from '../../../../common/history';
import I18n from '../../../../common/i18n/I18n';
import InfoPane from '../../../../components/common/InfoPane';
import ContrastTable from '../../../../components/common/ContrastTable';
import lightTheme from '../../../../common/theme/lightTheme';

const styles = theme => ({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  },
  infoPaneText: {
    margin: '0',
    color: theme.colors.textColor.grey87,
    fontSize: '13px'
  },
  infoPaneContainer: {
    marginBottom: '12px'
  },
  descriptionText: {
    fontSize: '13px',
    color: theme.colors.textColor.grey87,
    padding: '4px 16px'
  },
  addressCopyLink: {
    cursor: 'pointer',
    margin: '6px',
    fontSize: '18px'
  },
  table: {
    margin: '16px'
  },
  valueRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  depositButton: {
    marginTop: '16px',
    color: theme.colors.textColor.white,
    backgroundColor: theme.colors.textColor.blue,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.colors.textColor.blueAccent
    }
  },
  addressContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  checkboxLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: theme.colors.textColor.grey87
  },
  checkbox: {
    color: 'rgba(48, 66, 98, 0.12)',
    '&$checked': {
      color: theme.colors.textColor.blue
    }
  },
  checked: {},
  showTagText: {
    cursor: 'pointer'
  }
});

class XrpDepositContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      showTagChecked: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.depositInfo) {
      this.setState({ filteredItems: nextProps.depositInfo.addresses });
    }
  }

  handleClose = () => {
    this.setState({ open: false });
    history.push('/account/assets');
  };

  toggleShowTagChecked = () => {
    this.setState({
      showTagChecked: !this.state.showTagChecked
    });
  };

  render() {
    const { classes, depositInfo } = this.props;

    return depositInfo && depositInfo.address_list ? (
      depositInfo.address_list.map(item => (
        <div className={classes.contentContainer}>
          <div className={classes.infoPaneContainer}>
            <InfoPane>
              <ul className={classes.infoPaneText}>
                <li>
                  <strong>{I18n.translate('deposit_xrp_tag_warning')}</strong>
                </li>
                <li>
                  {I18n.translate(
                    'deposit_min_label',
                    `${depositInfo.limits.deposit.min_deposit_amount} XRP`
                  )}
                </li>
              </ul>
            </InfoPane>
          </div>
          <div className={classes.checkboxLine}>
            <Checkbox
              checked={this.state.showTagChecked}
              classes={{
                root: classes.checkbox,
                checked: classes.checked
              }}
              onChange={this.toggleShowTagChecked}
              aria-label="verticalView"
            />
            <div
              className={classes.showTagText}
              onClick={this.toggleShowTagChecked}
            >
              {I18n.translate('deposit_show_tag_label')}
            </div>
          </div>
          {this.state.showTagChecked && (
            <div className={classes.addressContent}>
              <div className={classes.descriptionText}>
                {I18n.translate('deposit_xrp_description_text')}
              </div>
              <div className={classes.table}>
                <MuiThemeProvider theme={createMuiTheme(lightTheme)}>
                  <ContrastTable
                    padding="none"
                    theme={lightTheme}
                    data={[
                      {
                        key: 'address',
                        values: [
                          {
                            numeric: false,
                            value: I18n.translate('transfers_xrp_address_label')
                          },
                          {
                            numeric: true,
                            value: (
                              <div className={classes.valueRow}>
                                <div>{item}</div>
                                <Tooltip
                                  title={I18n.translate('deposit_copy_address')}
                                >
                                  <CopyToClipboard
                                    text={item}
                                    onCopy={() =>
                                      this.props.onShowSnackbar(
                                        I18n.translate(
                                          'deposit_copy_address_success'
                                        )
                                      )
                                    }
                                  >
                                    <Icon className={classes.addressCopyLink}>
                                      content_copy
                                    </Icon>
                                  </CopyToClipboard>
                                </Tooltip>
                              </div>
                            )
                          }
                        ]
                      },
                      {
                        key: 'tag',
                        values: [
                          {
                            numeric: false,
                            value: I18n.translate('transfers_xrp_tag_label')
                          },
                          {
                            numeric: true,
                            value: (
                              <div className={classes.valueRow}>
                                <div>{depositInfo.transfer_code}</div>
                                <Tooltip
                                  title={I18n.translate('deposit_copy_tag')}
                                >
                                  <CopyToClipboard
                                    text={depositInfo.transfer_code}
                                    onCopy={() =>
                                      this.props.onShowSnackbar(
                                        I18n.translate(
                                          'deposit_copy_tag_success'
                                        )
                                      )
                                    }
                                  >
                                    <Icon className={classes.addressCopyLink}>
                                      content_copy
                                    </Icon>
                                  </CopyToClipboard>
                                </Tooltip>
                              </div>
                            )
                          }
                        ]
                      }
                    ]}
                  />
                </MuiThemeProvider>
              </div>
              <Button
                variant="contained"
                className={this.props.classes.depositButton}
                onClick={this.handleClose}
              >
                {I18n.translate('general_ok')}
              </Button>
            </div>
          )}
        </div>
      ))
    ) : (
      <div />
    );
  }
}

export default withStyles(styles)(XrpDepositContent);
