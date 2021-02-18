import React from 'react';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import ContrastTable from '../../../../components/common/ContrastTable';
import I18n from '../../../../common/i18n/I18n';
import { CancelIcon } from '../../../../components/icons/Icons';
import StyledPaper from '../../../../components/common/StyledPaper';

const ROWS_PER_PAGE = 20;

const styles = theme => ({
  scrollOnMobile: {
    '@media screen and (max-width: 600px)': {
      overflowX: 'auto'
    }
  },
  hyperLink: {
    color: theme.colors.textColor.blue,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
});

class TransferHistory extends React.PureComponent {
  constructor(props) {
    super(props);
    this.transferStatus =
      props.transferStatus === 'O' ? 'openTransfers' : 'closedTransfers';
  }

  componentWillMount() {
    this.getHistory(this.props, this.pageNumber);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.transferType !== nextProps.transferType ||
      this.props.currencyCode !== nextProps.currencyCode ||
      this.props.transferStatus !== nextProps.transferStatus
    ) {
      this.pageNumber = 0;
      this.getHistory(nextProps, this.pageNumber);
    }

    if (
      this.props.transferStatus === 'O' &&
      nextProps.updateAwaitingTransferListFlag
    ) {
      this.pageNumber = 0;
      this.getHistory(nextProps, this.pageNumber);
      this.props.clearUpdateAwaitingTransferListFlag();
    }

    if (
      this.props.transferStatus === 'C' &&
      nextProps.updateFinishedTransferListFlag
    ) {
      this.pageNumber = 0;
      this.getHistory(nextProps, this.pageNumber);
      this.props.clearUpdateFinishedTransferListFlag();
    }
  }

  pageNumber = 0;

  onChangePage = (event, pageNumber) => {
    this.pageNumber = pageNumber;
    this.getHistory(this.props, this.pageNumber);
  };

  headerItems = {
    O: [
      { value: I18n.translate('general_date_time'), numeric: false },
      { value: I18n.translate('transfer_transfer_type'), numeric: false },
      { value: I18n.translate('general_currency'), numeric: false },
      { value: I18n.translate('general_amount') },
      { value: I18n.translate('general_info'), numeric: false },
      { value: I18n.translate('general_status'), numeric: false },
      { value: '', padding: 'none', isActionButton: true }
    ],
    C: [
      { value: I18n.translate('general_date_time'), numeric: false },
      { value: I18n.translate('transfer_transfer_type'), numeric: false },
      { value: I18n.translate('general_currency'), numeric: false },
      { value: I18n.translate('general_amount') },
      { value: I18n.translate('general_info'), numeric: false },
      { value: I18n.translate('general_status'), numeric: false }
    ]
  };

  getHistory = (props, pageNumber) => {
    props
      .getTransferHistory(
        props.transferType,
        props.currencyCode,
        props.transferStatus,
        pageNumber + 1
      )
      .then(() => {});
  };

  getFormattedTransfers = () => {
    return this.props[this.transferStatus]
      ? this.props[this.transferStatus]['transfers'].map(item => {
          let mapResult = {
            key: item.id,
            values: [
              {
                value: moment(item.add_date).format('DD.MM.YYYY - HH:mm:ss'),
                numeric: false,
                style: { whiteSpace: 'nowrap' }
              },
              {
                value: I18n.translate(
                  `transfer_transfer_types_${item.transfer_type}`
                ),
                numeric: false
              },
              {
                value: item.currency_code,
                numeric: false
              },
              { value: item.amount },
              {
                value: item.alias ? (
                  <Tooltip title={item.to_address}>
                    {item.trx_url ? (
                      <a
                        className={this.props.classes.hyperLink}
                        href={item.trx_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.alias}
                      </a>
                    ) : (
                      <div>{item.alias}</div>
                    )}
                  </Tooltip>
                ) : item.trx_url ? (
                  <a
                    className={this.props.classes.hyperLink}
                    href={item.trx_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.to_address && item.to_address.length > 22
                      ? item.to_address.substring(0, 22) + '...'
                      : item.to_address}
                  </a>
                ) : (
                  <div>{this.get_to_address(item)}</div>
                ),
                numeric: false
              },
              {
                value: I18n.translate(`status_${item.status}`),
                numeric: false
              }
            ]
          };

          if (this.props.transferStatus === 'O') {
            mapResult.values.push({
              value: item.cancelable ? (
                <Tooltip
                  title={I18n.translate('trade_cancel_transfer_tooltip')}
                >
                  <div>
                    <CancelIcon
                      onClick={this.showCancelTransferDialog}
                      fillColor={this.props.theme.colors.background.cancelIcon}
                      fillOpacity={this.props.theme.colors.opacity.cancelIcon}
                      itemKey={item.id}
                    />
                  </div>
                </Tooltip>
              ) : null,
              isActionButton: true,
              padding: 'none'
            });
          }
          return mapResult;
        })
      : null;
  };

  get_to_address(item) {
    if (item.currency_code === 'TRY' && item.transfer_type === 'D') {
      try {
        return JSON.parse(item.to_address_detail).transfer_message;
      } catch (exp) {
        return item.to_address;
      }
    } else {
      return item.to_address && item.to_address.length > 22
        ? item.to_address.substring(0, 22) + '...'
        : item.to_address;
    }
  }

  cancelTransfer = transferId => {
    this.props
      .cancelTransfer(transferId)
      .then(resp => {
        this.props.showSnackbar(
          I18n.translate('trade_cancel_transfer_success')
        );
        window.setTimeout(() => this.getHistory(this.props), 3000);
      })
      .catch(err => {
        this.props.showDialog({
          title: I18n.translate('general_error'),
          text: I18n.translate('general_error_description')
        });
      });
  };

  showCancelTransferDialog = transferId => {
    this.props.showDialog(
      {
        title: I18n.translate('trade_cancel_transfer_dialog_title'),
        text: I18n.translate('trade_cancel_transfer_dialog_message'),
        okButtonText: I18n.translate('general_ok'),
        cancelButtonText: I18n.translate('general_cancel'),
        key: transferId
      },
      {
        ok: this.cancelTransfer
      }
    );
  };

  render() {
    const { openTransfers, closedTransfers, transferStatus } = this.props;
    const transfers = transferStatus === 'O' ? openTransfers : closedTransfers;

    return !this.props.hideWhenEmpty ||
      (transfers && transfers['transfers'].length > 0) ? (
      <StyledPaper title={this.props.title} className={this.props.className}>
        <div className={this.props.classes.scrollOnMobile}>
          <ContrastTable
            hover={true}
            headerItems={this.headerItems[this.props.transferStatus]}
            padding="dense"
            data={this.getFormattedTransfers()}
            paginationProps={{
              colSpan: this.headerItems.length,
              count: (transfers && transfers.total_count) || 0,
              rowsPerPage: ROWS_PER_PAGE,
              page: this.pageNumber,
              onChangePage: this.onChangePage,
              rowsPerPageOptions: [ROWS_PER_PAGE]
            }}
          />
        </div>
      </StyledPaper>
    ) : null;
  }
}

export default withStyles(styles, { withTheme: true })(TransferHistory);
