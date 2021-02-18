import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import { Input, List, Tabs } from 'antd';
import { Formik, ErrorMessage } from 'formik';
import React from 'react';
import history from '../../../../common/history';
import I18n from '../../../../common/i18n/I18n';
import lightTheme from '../../../../common/theme/lightTheme';
import ContrastTable from '../../../../components/common/ContrastTable';
import InfoPane from '../../../../components/common/InfoPane';

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
  depositButton: {
    marginTop: '16px',
    width: '100%',
    color: theme.colors.textColor.white,
    backgroundColor: theme.colors.textColor.blue,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.colors.textColor.blueAccent
    }
  },
  table: {
    marginTop: '24px'
  },
  infoTextInRed: {
    color: theme.colors.textColor.red
  }
});

class TryDepositContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      selectedIban: null,
      selectedBank: null,
      paparaAmount: 0,
      paparaFee: 1,
      KDV: 0.18,
      paparaCalculatedAmount: 0,
      paparaCalculatedFee: 0,
      paparaCalculatedKdv: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.depositInfo) {
      this.setState({ filteredItems: nextProps.depositInfo.addresses });
      if (
        nextProps.depositInfo.address_list &&
        nextProps.depositInfo.address_list.length > 0
      ) {
        const default_bank = nextProps.depositInfo.address_list[0];
        this.setState({
          selectedBank: default_bank[0],
          selectedIban: default_bank[1]
        });
      }
    }
  }
  calculateFee = amount => {
    var fee = ((amount / 100) * this.state.paparaFee).toFixed(2);
    this.setState({ paparaCalculatedFee: fee });
    return fee;
  };
  calculateKDV = amount => {
    var kdv = ((amount / 100) * this.state.KDV).toFixed(2);

    this.setState({ paparaCalculatedKdv: kdv });
    return kdv;
  };

  calculateAmount = amount => {
    var calculatedAmount = (
      amount -
      ((this.state.paparaFee + this.state.KDV) * amount) / 100
    ).toFixed(2);

    this.setState({ paparaCalculatedAmount: calculatedAmount });
    return calculatedAmount;
  };

  handleClose = () => {
    this.setState({ open: false });
    history.push('/account/assets');
  };

  handleBankChange = event => {
    const splitArr = event.target.value.split('|');
    this.setState({ selectedBank: splitArr[0], selectedIban: splitArr[1] });
  };
  requestPapara = data => {
    this.props.onPaparaAccept(data);
  };

  render() {
    const { classes, depositInfo } = this.props;

    return this.props.depositInfo ? (
      <div className={classes.contentContainer}>
        <Tabs type="card">
          <Tabs.TabPane tab="Havale/EFT" key="1">
            <div className={classes.infoPaneContainer}>
              <InfoPane>
                <ul className={classes.infoPaneText}>
                  <li>
                    <strong className={classes.infoTextInRed}>
                      {I18n.translate('deposit_try_vakifbank_warning')}
                    </strong>
                  </li>
                  <li>
                    <strong>
                      {I18n.translate('deposit_try_name_warning')}
                    </strong>
                  </li>
                  <li>
                    <strong>{I18n.translate('deposit_try_tag_warning')}</strong>
                  </li>
                  <li>
                    {I18n.translate('deposit_try_account_control_warning')}
                  </li>
                  <li>
                    {I18n.translate(
                      'deposit_remaining_limits',
                      `${Math.max(
                        parseFloat(depositInfo.limits.deposit.daily_remaining),
                        0
                      )} TRY`,
                      `${Math.max(
                        parseFloat(
                          depositInfo.limits.deposit.monthly_remaining
                        ),
                        0
                      )} TRY`
                    )}
                  </li>
                  <li>
                    {I18n.translate(
                      'deposit_min_label',
                      `${depositInfo.limits.deposit.min_deposit_amount} TRY`
                    )}
                  </li>
                  <li>
                    {I18n.translate('deposit_multiple_deposit_description')}
                  </li>
                  <li>{I18n.translate('withdraw_first_deposit_warning')}</li>
                </ul>
              </InfoPane>
            </div>

            <TextField
              id="select-currency-native"
              select
              label={I18n.translate('deposit_bank_select_label')}
              InputLabelProps={{ shrink: true }}
              className={classes.textField}
              onChange={this.handleBankChange}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                }
              }}
              style={{ width: '100%', marginTop: 0 }}
              margin="normal"
            >
              {this.props.depositInfo.address_list.map((option, i) => (
                <option key={option[1]} value={`${option[0]}|${option[1]}`}>
                  {option[0]}
                </option>
              ))}
            </TextField>
            {this.state.selectedBank && (
              <MuiThemeProvider theme={createMuiTheme(lightTheme)}>
                <ContrastTable
                  padding="none"
                  theme={lightTheme}
                  className={classes.table}
                  data={[
                    {
                      key: 'title',
                      values: [
                        {
                          numeric: false,
                          value: I18n.translate('deposit_company_name')
                        },
                        this.props.depositInfo.company_name
                      ]
                    },
                    {
                      key: 'iban',
                      values: [
                        {
                          numeric: false,
                          value: I18n.translate('transfers_iban_label')
                        },
                        this.state.selectedIban
                      ]
                    },
                    {
                      key: 'description',
                      values: [
                        {
                          numeric: false,
                          value: I18n.translate('deposit_transfer_description')
                        },
                        this.props.depositInfo.transfer_code
                      ]
                    }
                  ]}
                />
              </MuiThemeProvider>
            )}
            <Button
              variant="contained"
              className={this.props.classes.depositButton}
              onClick={this.handleClose}
            >
              {I18n.translate('general_ok')}
            </Button>
          </Tabs.TabPane>
          {/* <Tabs.TabPane tab="Papara" key="2">
            <h6>{I18n.translate('deposit_papara_amount_label')}</h6>
            <Formik
              initialValues={{ paparaAmount: 100 }}
              validate={({ paparaAmount }) => {
                const errors = {};
                if (!paparaAmount || paparaAmount < 2) {
                  errors.paparaAmount = I18n.translate('deposit_min_label', [
                    '100 TL'
                  ]);
                }
                return errors;
              }}
              onSubmit={({ paparaAmount }, { setSubmitting }) => {
                this.setState({ submitButtonDisabled: true });
                let data = {
                  amount: String(paparaAmount),
                  calculated_amount: this.state.paparaCalculatedAmount,
                  kdv_amount: this.state.paparaCalculatedKdv,
                  papara_fee: this.state.paparaCalculatedFee,
                  currency_code: 'TRY',
                  payment_network: 'PAPARA'
                };
                this.requestPapara(data);
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldError,
                setFieldValue
              }) => (
                <form onSubmit={handleSubmit}>
                  <Input
                    size="large"
                    type="number"
                    style={{ textAlign: 'right' }}
                    addonAfter="TL"
                    name="paparaAmount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.paparaAmount}
                    defaultValue={100}
                  />

                  <ErrorMessage
                    className="text-danger"
                    name="paparaAmount"
                    component="div"
                  />

                  <div className="mt-3">
                    <h6>{I18n.translate('deposit_papara_process_detail')}</h6>
                    <List bordered className="bg-light">
                      <List.Item>
                        <div className="d-flex w-100 flex-row justify-content-between">
                          <strong>
                            {I18n.translate('deposit_papara_amount_label')}
                          </strong>
                          <span>
                            {values.paparaAmount &&
                              values.paparaAmount.toFixed(2)}{' '}
                            TL
                          </span>
                        </div>
                      </List.Item>
                      <List.Item>
                        <div className="d-flex w-100 flex-row justify-content-between">
                          <strong>
                            {I18n.translate('deposit_papara_fee_label')}
                          </strong>
                          <span className="text-danger">
                            {this.calculateFee(values.paparaAmount)}
                            TL
                          </span>
                        </div>
                      </List.Item>
                      <List.Item>
                        <div className="d-flex w-100 flex-row justify-content-between">
                          <strong>KDV</strong>
                          <span className="text-danger">
                            {this.calculateKDV(values.paparaAmount)}
                            TL
                          </span>
                        </div>
                      </List.Item>
                      <List.Item>
                        <div className="d-flex w-100 flex-row justify-content-between">
                          <strong>
                            {I18n.translate(
                              'deposit_papara_calculated_amount_label'
                            )}
                          </strong>
                          <span>
                            {values.paparaAmount &&
                              this.calculateAmount(values.paparaAmount)}
                            TL
                          </span>
                        </div>
                      </List.Item>
                    </List>
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                    className={this.props.classes.depositButton}
                  >
                    {I18n.translate('deposit_papara_submit_button_text')}
                  </Button>
                </form>
              )}
            </Formik>
          </Tabs.TabPane> */}
        </Tabs>
      </div>
    ) : (
      <div />
    );
  }
}

export default withStyles(styles)(TryDepositContent);
