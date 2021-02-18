import React from 'react';
import moment from 'moment';
import ContrastTable from '../../../../components/common/ContrastTable';
import { formatMoney } from '../../../../common/utils/numberUtil';
import I18n from '../../../../common/i18n/I18n';
import { Arrow } from '../../../../components/icons/Icons';
import { CURRENCY_DECIMALS } from '../../../../common/constants';

const getHeaderItems = (market, omitTotalValue) => {
  const headerItems = [
    {
      value: I18n.translate('general_time'),
      numeric: false,
      style: { whiteSpace: 'pre' }
    },
    {
      value: `${I18n.translate('general_price')} (${market.counter_currency})`,
      style: { whiteSpace: 'pre' }
    },
    {
      value: `${I18n.translate('general_amount')} (${market.base_currency})`,
      style: { whiteSpace: 'pre' }
    }
  ];

  if (!omitTotalValue) {
    headerItems.push({
      value: `${I18n.translate('general_total')} (${market.counter_currency})`,
      style: { whiteSpace: 'pre' }
    });
  }

  return headerItems;
};

const getFormattedOrders = (orders, market, omitTotalValue, sliceSize) => {
  if (orders) {
    const slicedOrders = orders.slice(0, sliceSize);
    return slicedOrders.map(item => {
      const orderRow = {
        key: item.order_number,
        values: [
          {
            value: moment.unix(item.time).format('HH:mm:ss'),
            numeric: false,
            style: { opacity: '0.7' }
          },
          {
            value: formatMoney(item.price, market.counter_currency_decimal),
            style: {
              color: item.type === 'B' ? '#3ad09f' : '#f87979',
              whiteSpace: 'pre'
            },
            preItem: (
              <Arrow
                rotate={item.type === 'B' ? 45 : -135}
                translate={item.type === 'B' ? '0' : '-8 -15'}
                fillColor={item.type === 'B' ? '#3ad09f' : '#f87979'}
              />
            )
          },
          {
            value: formatMoney(item.amount, market.base_currency_decimal),
            darkenTrailingZeros: true
          }
        ]
      };

      if (!omitTotalValue) {
        orderRow.values.push({
          value: formatMoney(
            item.amount * item.price,
            CURRENCY_DECIMALS[market.counter_currency]
          ),
          style: { opacity: '0.7' }
        });
      }
      return orderRow;
    });
  } else {
    return null;
  }
};

const MarketHistory = ({
  selectedMarket,
  lastTransactions,
  padding,
  className,
  omitTotalValue,
  TableProps,
  sliceSize
}) => (
  <ContrastTable
    hover={true}
    className={className}
    headerItems={getHeaderItems(selectedMarket, omitTotalValue)}
    data={getFormattedOrders(
      lastTransactions,
      selectedMarket,
      omitTotalValue,
      sliceSize || 25
    )}
    padding={padding ? padding : 'default'}
    size="small"
    {...TableProps}
  />
);

export default MarketHistory;
