import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import I18n from '../../common/i18n/I18n';

const styles = theme => {
  return {
    tableWrapper: {
      '@media screen and (max-width: 1179px)': {
        position: 'relative',
        overflow: 'auto',
        maxWidth: '100%',
        '-webkit-overflow-scrolling': 'touch',
        // scrolling shadows
        background: `linear-gradient(90deg, ${
          theme.colors.background.table
        } 0%, ${theme.colors.background.gradientColorA}),
        linear-gradient(-90deg, ${theme.colors.background.table} 0%, ${
          theme.colors.background.gradientColorA
        }) 100% 0,
        radial-gradient(farthest-side at 0% 50%,${
          theme.colors.background.gradientColorB
        },${theme.colors.background.gradientColorC}),
        radial-gradient(farthest-side at 100% 50%,${
          theme.colors.background.gradientColorB
        },${theme.colors.background.gradientColorC}) 100% 0%`,
        backgroundSize: '100px 100%, 100px 100%, 14px 100%, 14px 100%',
        backgroundColor: theme.colors.background.table,
        backgroundAttachment: 'local, local, scroll, scroll',
        backgroundRepeat: 'no-repeat'
      }
    },
    tableStyle: {
      '@media screen and (max-width: 600px)': {}
    },
    tableBody: {},
    tableHeaderStyle: {
      height: '30px',
      color: theme.colors.textColor.tableHeader,
      border: 'none'
    },
    tableHeaderCellStyle: {
      border: 'none',
      color: 'inherit',
      lineHeight: '1.1'
    },
    rowStyle: {
      height: '30px',
      border: 'none'
    },
    contrastRowStyle: {
      backgroundColor: theme.colors.background.contrastRow,
      '@media screen and (max-width: 600px)': {
        backgroundColor: theme.colors.background.contrastRowMobile
      }
    },
    plainRowStyle: {
      backgroundColor: theme.colors.background.plainRow
    },
    tableCellStyle: {
      color: theme.colors.textColor.tableCell,
      border: 'none',
      letterSpacing: '0.3px',
      fontSize: '0.8125rem'
    },
    hoverStyle: {
      '&:hover': {
        backgroundColor: theme.colors.background.tableRowHover
      }
    },
    actionButtonStyle: {
      cursor: 'pointer',
      border: 'none',
      width: '16px'
    },
    highlightStyle: {
      animationName: 'openOrdersHighlight',
      animationDuration: '1s',
      animationIterationCount: 3
    },
    incrementHighlightStyle: {
      animationName: 'incrementHighlight',
      animationDuration: '0.5s',
      animationIterationCount: 1
    },
    decrementHighlightStyle: {
      animationName: 'decrementHighlight',
      animationDuration: '0.5s',
      animationIterationCount: 1
    },
    pointer: {
      cursor: 'pointer'
    },
    tablePagination: {
      borderBottomColor: theme.colors.background.table
    },
    paginationCaption: {
      color: theme.colors.textColor.tableCell
    },
    paginationButton: {
      color: theme.colors.textColor.paginationButton
    },
    paginationButtonDisabled: {
      color: theme.colors.textColor.paginationButtonDisabled
    },
    paddingDense: {
      padding: '4px 18px'
    },
    paddingNone: {
      padding: '0',
      '&:first-child': {
        paddingRight: '6px',
        paddingLeft: '6px'
      },
      '&:last-child': {
        paddingRight: '12px',
        paddingLeft: '6px'
      }
    },
    fixedLayoutOnMobile: {
      '@media screen and (max-width: 600px)': {
        tableLayout: 'fixed'
      }
    },
    zeroValue: {
      fontStyle: 'normal',
      opacity: '0.2',
      fontWeight: '500'
    }
  };
};

class ContrastTable extends React.PureComponent {
  onRowClick = row => {
    if (this.props.onRowClick) {
      this.props.onRowClick(row);
    }
  };

  darkenTrailingZeros = cellValue => {
    if (isNaN(cellValue) || !cellValue) {
      return cellValue;
    }
    const floatValueAsString = parseFloat(cellValue).toString();
    if (cellValue.length === floatValueAsString.length) {
      return cellValue;
    }
    return (
      <span>
        {cellValue.substring(0, floatValueAsString.length)}
        <i className={this.props.classes.zeroValue}>
          {cellValue.substring(floatValueAsString.length)}
        </i>
      </span>
    );
  };

  render() {
    const {
      classes,
      paginationProps,
      headerItems,
      data,
      padding,
      hover,
      onRowClick,
      size
    } = this.props;
    return (
      <div className={classes.tableWrapper}>
        <Table
          className={classNames(classes.tableStyle, this.props.className, {
            [classes.fixedLayoutOnMobile]: this.props.fixedLayoutOnMobile
          })}
          size={size || 'small'}
        >
          {headerItems ? (
            <TableHead>
              <TableRow
                className={classNames(
                  classes.tableHeaderStyle,
                  this.props.tableHeaderStyle
                )}
              >
                {headerItems
                  .filter(item => !item.hidden)
                  .map((item, index) => (
                    <TableCell
                      key={item.key ? item.key : index}
                      align={item.numeric === false ? 'left' : 'right'}
                      style={item.style}
                      className={
                        item.isActionButton
                          ? classes.actionButtonStyle
                          : classes.tableHeaderCellStyle
                      }
                      size={
                        size ||
                        (item.padding === 'dense' || padding === 'dense'
                          ? 'small'
                          : 'medium')
                      }
                      padding={
                        item.padding === 'none' || padding === 'none'
                          ? 'none'
                          : 'default'
                      }
                      classes={{
                        sizeSmall: classes.paddingDense,
                        paddingNone: classes.paddingNone
                      }}
                    >
                      {item.preItem || null}
                      {item.value === undefined ? item : item.value}
                      {item.postItem || null}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody className={classes.tableBody}>
            {data ? (
              data.map((row, index) => {
                return (
                  <TableRow
                    hover={hover}
                    key={row.key || index}
                    className={classNames(
                      classes.rowStyle,
                      { [classes.plainRowStyle]: index % 2 !== 0 },
                      { [classes.contrastRowStyle]: index % 2 === 0 },
                      { [classes.highlightStyle]: row.highlight },
                      {
                        [classes.incrementHighlightStyle]:
                          row.incrementHighlight
                      },
                      {
                        [classes.decrementHighlightStyle]:
                          row.decrementHighlight
                      },
                      { [classes.pointer]: onRowClick }
                    )}
                    classes={{ hover: classes.hoverStyle }}
                    onClick={() => this.onRowClick(row)}
                    style={row.style}
                  >
                    {row.values
                      .filter(item => !item.hidden)
                      .map((item, index) => (
                        <TableCell
                          key={item.key ? item.key : index}
                          align={item.numeric === false ? 'left' : 'right'}
                          style={item.style}
                          className={
                            item.isActionButton
                              ? classes.actionButtonStyle
                              : classes.tableCellStyle
                          }
                          size={
                            size ||
                            (item.padding === 'dense' || padding === 'dense'
                              ? 'small'
                              : 'medium')
                          }
                          padding={
                            item.padding === 'none' || padding === 'none'
                              ? 'none'
                              : 'default'
                          }
                          classes={{
                            sizeSmall: classes.paddingDense,
                            paddingNone: classes.paddingNone
                          }}
                        >
                          {item.preItem || null}
                          {item.value === undefined
                            ? item
                            : item.darkenTrailingZeros
                            ? this.darkenTrailingZeros(item.value)
                            : item.value}
                          {item.postItem || null}
                        </TableCell>
                      ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow />
            )}
          </TableBody>
          {paginationProps && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={paginationProps.colSpan}
                  count={paginationProps.count}
                  backIconButtonProps={{
                    classes: {
                      root: classes.paginationButton,
                      disabled: classes.paginationButtonDisabled
                    }
                  }}
                  nextIconButtonProps={{
                    classes: {
                      root: classes.paginationButton,
                      disabled: classes.paginationButtonDisabled
                    }
                  }}
                  classes={{
                    root: classes.tablePagination,
                    caption: classes.paginationCaption
                  }}
                  rowsPerPage={paginationProps.rowsPerPage}
                  page={paginationProps.page}
                  onChangePage={paginationProps.onChangePage}
                  rowsPerPageOptions={paginationProps.rowsPerPageOptions}
                  labelDisplayedRows={({ from, to, count }) =>
                    I18n.translate('table_pagination_text', from, to, count)
                  }
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(ContrastTable);
