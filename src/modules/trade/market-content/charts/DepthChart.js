import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Line } from 'react-chartjs-2';
import I18n from '../../../../common/i18n/I18n';
import { formatMoney } from '../../../../common/utils/numberUtil';

const styles = theme => ({
  tvChartContainer: {
    height: 'calc(100vh - 80px)'
  }
});

export class DepthChart extends React.Component {
  state = {
    chartReady: false
  };

  static defaultProps = {
    displayScaleLabels: true
  };

  componentDidMount() {
    if (this.props.onChartMounting) {
      this.props.onChartMounting();
    }
  }

  componentWillUnmount() {
    if (this.state.chartReady) {
    }
  }

  shouldComponentUpdate(nextProps) {
    return (
      JSON.stringify(nextProps.buyers) !== JSON.stringify(this.props.buyers) ||
      JSON.stringify(nextProps.sellers) !== JSON.stringify(this.props.sellers)
    );
  }

  getSpread = () => {
    const { sellers, buyers, selectedMarket } = this.props;
    return sellers && sellers.length > 0 && buyers && buyers.length > 0
      ? formatMoney(
          sellers[0].orders_price - buyers[0].orders_price,
          selectedMarket.counter_currency_decimal
        )
      : '';
  };

  constructChartData = (buyers, sellers) => {
    const { selectedMarket } = this.props;

    let data = {
      labels: [],
      datasets: [
        {
          label: `${I18n.translate('general_amount')} (${I18n.translate(
            'trade_buy'
          )})`,
          datasetKeyProvider: 'B',
          backgroundColor: 'rgba(58, 208, 159,0.2)',
          borderColor: 'rgba(58, 208, 159,1)',
          pointHoverBorderColor: 'rgba(58, 208, 159,1)',
          pointHoverBackgroundColor: 'rgba(58, 208, 159,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(58, 208, 159,1)',
          pointRadius: 0,
          pointHoverRadius: 4,
          pointHitRadius: 20,
          steppedLine: 'after',
          data: []
        },
        {
          label: `${I18n.translate('general_amount')} (${I18n.translate(
            'trade_sell'
          )})`,
          datasetKeyProvider: 'S',
          backgroundColor: 'rgba(248, 121, 121,0.2)',
          borderColor: 'rgba(248, 121, 121,1)',
          pointHoverBorderColor: 'rgba(248, 121, 121,1)',
          pointHoverBackgroundColor: 'rgba(248, 121, 121,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(248, 121, 121,1)',
          pointRadius: 0,
          pointHoverRadius: 4,
          pointHitRadius: 20,
          steppedLine: 'after',
          data: []
        }
      ]
    };

    if (buyers && sellers) {
      this.buyersReversed = [...buyers].reverse();

      let cumulativeBuyOrderVolume = 0;
      this.buyersReversed.forEach(item => {
        cumulativeBuyOrderVolume += parseFloat(item.orders_total_amount);
      });

      this.buyersReversed.forEach(item => {
        data.labels.push(item.orders_price);
        data.datasets[0].data.push(
          cumulativeBuyOrderVolume.toFixed(selectedMarket.base_currency_decimal)
        );
        data.datasets[1].data.push(null);
        cumulativeBuyOrderVolume -= parseFloat(item.orders_total_amount);
      });

      let cumulativeSellOrderVolume = 0;
      sellers.forEach(item => {
        data.labels.push(item.orders_price);
        cumulativeSellOrderVolume += parseFloat(item.orders_total_amount);
        data.datasets[1].data.push(
          cumulativeSellOrderVolume.toFixed(
            selectedMarket.base_currency_decimal
          )
        );
        data.datasets[0].data.push(null);
      });
    }
    return data;
  };

  buyersReversed = [];
  chartData = {};

  getElementsAtEvent = el => {
    const { selectedMarket, buyers, sellers } = this.props;
    if (el.length > 0) {
      let index = el[0]._index;
      const datasetIndex = el[0]._datasetIndex;
      const price = this.chartData.labels[index];

      let orderTotal = 0,
        volumeTotal = 0,
        i = 0;

      if (datasetIndex === 1) {
        index -= this.buyersReversed.length;
        for (i = 0; i < index + 1; i++) {
          orderTotal +=
            sellers[i].orders_price * sellers[i].orders_total_amount;
          volumeTotal += parseFloat(sellers[i].orders_total_amount);
        }
      } else {
        for (i = 0; i < buyers.length - index; i++) {
          orderTotal += buyers[i].orders_price * buyers[i].orders_total_amount;
          volumeTotal += parseFloat(buyers[i].orders_total_amount);
        }
      }

      const data = {
        orderDirection: datasetIndex === 0 ? 'S' : 'B',
        price: price,
        volume: formatMoney(volumeTotal, selectedMarket.base_currency_decimal),
        totalAmount: formatMoney(
          orderTotal,
          selectedMarket.counter_currency_decimal
        )
      };

      this.props.sendOrderInformation(data);
    }
  };

  getChartOptions = props => ({
    responsive: true,
    maintainAspectRatio: false,
    spanGaps: false,
    legend: {
      display: false
    },
    tooltips: {
      mode: 'nearest',
      intersect: false,
      backgroundColor: 'rgba(38, 52, 78, 0.8)',
      callbacks: {
        label: function(tooltipItem, data) {
          let label = data.datasets[tooltipItem.datasetIndex].label || '';

          if (label) {
            label +=
              ': ' +
              Number(tooltipItem.yLabel).toFixed(
                props.selectedMarket.base_currency_decimal
              ) +
              ' ' +
              props.selectedMarket.base_currency;
          }
          return label;
        },
        title: function(tooltipItem, data) {
          return tooltipItem && tooltipItem.length > 0
            ? I18n.translate('general_price') +
                ': ' +
                Number(tooltipItem[0].xLabel).toFixed(
                  props.selectedMarket.counter_currency_decimal
                ) +
                ' ' +
                props.selectedMarket.counter_currency
            : '';
        }
      }
    },
    hover: {
      mode: 'nearest',
      intersect: false
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: 'rgba(255, 255, 255, 0.54)'
          },
          scaleLabel: {
            display: this.props.displayScaleLabels,
            labelString: `${I18n.translate('general_amount')} (${
              this.props.selectedMarket.base_currency
            })`,
            fontColor: 'rgba(255, 255, 255, 0.54)'
          },
          gridLines: {
            display: true,
            color: 'rgba(255, 255, 255, 0.03)'
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            fontColor: 'rgba(255, 255, 255, 0.54)'
          },
          scaleLabel: {
            display: this.props.displayScaleLabels,
            labelString: `${I18n.translate('general_price')} (${
              this.props.selectedMarket.counter_currency
            })`,
            fontColor: 'rgba(255, 255, 255, 0.54)'
          },
          gridLines: {
            display: true,
            color: 'rgba(255, 255, 255, 0.03)'
          }
        }
      ]
    },
    layout: {
      padding: {
        left: 0,
        right: 20,
        top: 20,
        bottom: 0
      }
    },
    title: {
      display: true,
      text: [
        `${I18n.translate('general_price')}: ${
          this.props.ticker
            ? `${this.props.ticker.last_price} ${
                this.props.selectedMarket.counter_currency
              }`
            : ''
        }`,
        `${I18n.translate(
          'trade_spread',
          this.props.selectedMarket
            ? this.props.selectedMarket.counter_currency
            : ''
        )}: ${this.getSpread()}`
      ],
      fontColor: 'rgba(255, 255, 255, 0.54)',
      fontSize: '14'
    }
  });

  render() {
    let { buyers, sellers } = this.props;
    this.chartData = this.constructChartData(buyers, sellers);
    const chartOptions = this.getChartOptions(this.props);

    return (
      <Line
        data={this.chartData}
        width={300}
        height={300}
        options={chartOptions}
        getElementAtEvent={this.getElementsAtEvent}
      />
    );
  }
}

export default withStyles(styles)(DepthChart);
