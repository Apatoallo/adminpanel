import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as QRCode from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import history from '../../../../common/history';
import I18n from '../../../../common/i18n/I18n';
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
    color: theme.colors.textColor.white,
    backgroundColor: theme.colors.textColor.blue,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.colors.textColor.blueAccent
    }
  },
  descriptionText: {
    fontSize: '13px',
    color: theme.colors.textColor.grey87,
    padding: '4px 16px'
  },
  expansionPanel: {
    marginTop: '12px',
    backgroundColor: theme.colors.textColor.grey03,
    border: 'none',
    boxShadow: 'none',
    '&:before': {
      height: '0'
    }
  },
  expansionDetails: {
    borderTop: 'solid 1px white'
  },
  expansionDetailRow: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row'
  },
  expansionAddressContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    marginLeft: '16px'
  },
  qrCodeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '90px',
    minHeight: '90px',
    backgroundColor: theme.colors.textColor.white
  },
  addressTitle: {
    color: theme.colors.textColor.blue,
    fontWeight: '700'
  },
  addressText: {
    color: theme.colors.textColor.grey54,
    fontSize: '16px',
    lineHeight: '20px'
  },
  addressCopyLink: {
    marginTop: '6px',
    color: theme.colors.textColor.blue,
    fontWeight: '700',
    textDecoration: 'underline',
    lineHeight: '18px',
    cursor: 'pointer'
  }
});

class EthDepositContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      selectedIban: null,
      selectedBank: null,
      expandIndex: 0
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

  createAddress = () => {
    if (this.props.onCreateAddress) {
      this.props.onCreateAddress('ETH');
    }
  };

  handleChange = index => event => {
    this.setState({ expandIndex: index });
  };

  render() {
    const { classes, depositInfo, disableCreateAddressButton } = this.props;

    return this.props.depositInfo ? (
      <div className={classes.contentContainer}>
        <div className={classes.infoPaneContainer}>
          <InfoPane>
            <ul className={classes.infoPaneText}>
              <li>{I18n.translate('deposit_eth_address_warning', 'ETH')}</li>
              <li>
                {I18n.translate('deposit_eth_address_authenticity', 'ETH')}
              </li>
              <li>
                {I18n.translate(
                  'deposit_min_label',
                  `${depositInfo.limits.deposit.min_deposit_amount} ETH`
                )}
              </li>
            </ul>
          </InfoPane>
        </div>
        {this.props.depositInfo.address_list.length > 0 ? (
          <div className={classes.descriptionText}>
            {I18n.translate('deposit_eth_description_text')}
          </div>
        ) : null}
        {this.props.depositInfo.address_list.map((item, index) => (
          <ExpansionPanel
            key={item.address}
            className={classes.expansionPanel}
            expanded={index === this.state.expandIndex}
            onChange={this.handleChange(index)}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.addressTitle}>
                {item.address}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expansionDetails}>
              <div className={classes.expansionDetailRow}>
                <div className={classes.qrCodeContainer}>
                  <QRCode size={70} value={item.address} />
                </div>
                <div className={classes.expansionAddressContainer}>
                  <div className={classes.addressText}>{item.address}</div>
                  <CopyToClipboard
                    text={item.address}
                    className={classes.addressCopyLink}
                    onCopy={() =>
                      this.props.onShowSnackbar(
                        I18n.translate('deposit_copy_address_success')
                      )
                    }
                  >
                    <div>{I18n.translate('deposit_copy_address')}</div>
                  </CopyToClipboard>
                </div>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
        {this.props.depositInfo.address_list.length === 0 && (
          <Button
            variant="contained"
            disabled={disableCreateAddressButton}
            className={this.props.classes.depositButton}
            onClick={this.createAddress}
          >
            <div>{I18n.translate('deposit_create_address')}</div>
          </Button>
        )}
      </div>
    ) : (
      <div />
    );
  }
}

export default withStyles(styles)(EthDepositContent);
