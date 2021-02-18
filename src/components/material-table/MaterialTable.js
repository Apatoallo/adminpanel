import React, { forwardRef } from 'react';
import { connect } from 'react-redux';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import PureMaterialTable from 'material-table';
import lightTheme from '../../common/theme/lightTheme';
import darkTheme from '../../common/theme/darkTheme';

const createTheme = themeName => {
  const theme = themeName === 'darkTheme' ? darkTheme : lightTheme;
  return createMuiTheme({
    palette: theme.palette,
    overrides: {
      MuiPaper: {
        root: {
          backgroundColor: theme.colors.background.paper
        },
        elevation2: {
          boxShadow: 'none'
        },
        rounded: {
          borderRadius: '0'
        }
      },
      MuiInputLabel: {
        root: {
          color: theme.colors.textColor.inputLabel
        }
      },
      MuiInput: {
        root: {
          color: theme.colors.textColor.input,
          height: '48px'
        },
        underline: {
          '&:before': {
            borderBottomColor: 'rgba(0, 0, 0, 0.12)'
          },
          '&:after': {
            borderBottomColor: theme.colors.textColor.blue
          },
          '&:hover': {
            '&:not(.Mui-disabled)': {
              '&:before': {
                borderBottom: `${
                  theme.colors.borderColor.rowSeperatorBorder
                } !important`
              }
            }
          }
        }
      },
      MuiInputAdornment: {
        positionEnd: {
          color: `${theme.colors.textColor.tableHeader} !important`
        }
      },
      MuiIconButton: {
        root: {
          color: theme.colors.textColor.tableCell,
          '&.Mui-disabled': {
            color: theme.colors.textColor.tableHeader
          }
        }
      },
      MuiTableRow: {
        root: {
          color: theme.colors.textColor.tableCell,
          borderBottom: `${
            theme.colors.borderColor.rowSeperatorBorder
          } !important`
        }
      },
      MuiTableHead: {
        root: {
          color: `${theme.colors.textColor.tableHeader} !important`,
          backgroundColor: `${theme.colors.background.paper} !important`
        }
      },
      MuiTableCell: {
        root: {
          color: theme.colors.textColor.tableCell,
          padding: '4px 40px 4px 16px',
          lineHeight: '1.1',
          whiteSpace: 'pre'
        },
        body: {
          color: theme.colors.textColor.tableCell
        },
        head: {
          color: `${theme.colors.textColor.tableHeader} !important`,
          backgroundColor: `${theme.colors.background.paper} !important`,
          '@media screen and (max-width: 800px)': {
            padding: '6px',
            '&:last-child': {
              paddingRight: '6px'
            }
          }
        },
        sizeSmall: {
          padding: '6px',
          '&:last-child': {
            paddingRight: '6px'
          }
        }
      },
      MuiTableSortLabel: {
        root: {
          color: `${theme.colors.textColor.tableHeader} !important`,
          '&:hover': {
            color: `${theme.colors.textColor.tableCell} !important`
          }
        },
        active: {
          color: `${theme.colors.textColor.tableCell} !important`
        },
        icon: {
          color: `${theme.colors.textColor.tableCell} !important`
        },
        iconDirectionAsc: {
          transform: `rotate(0deg) !important`
        },
        iconDirectionDesc: {
          transform: `rotate(180deg) !important`
        }
      }
    }
  });
};

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const materialTableThemes = {
  darkTheme: createTheme('darkTheme'),
  lightTheme: createTheme('lightTheme')
};

const MaterialTable = props => (
  <MuiThemeProvider theme={materialTableThemes[props.currentThemeName]}>
    <PureMaterialTable icons={tableIcons} {...props} />
  </MuiThemeProvider>
);
function mapStateToProps(state) {
  return {
    currentThemeName: state.theme.currentThemeName
  };
}

export default connect(
  mapStateToProps,
  null
)(MaterialTable);
