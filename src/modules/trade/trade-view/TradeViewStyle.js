const styles = theme => ({
  pageStyle: {
    paddingTop: '112px',
    display: 'flex',
    width: '100%',
    minHeight: '100vh',
    flexDirection: 'row',
    backgroundColor: theme.colors.background.content,
    boxSizing: 'border-box',
    overflow: 'hidden',

    position: 'relative',
    zIndex: 2
  },
  orderBookVerticalStyle: {
    marginTop: '0',
    minWidth: '280px',
    width: '280px'
  },
  orderBookVerticalStyleTablet: {
    marginTop: '0',
    minWidth: '280px',
    width: '280px'
  },
  orderBookVerticalStyleMobile: {
    marginTop: '0',
    minWidth: '280px',
    width: '100vw',
    maxWidth: '100vw'
  },
  paper: {
    boxSizing: 'border-box',
    borderWidth: '4px 2px',
    borderColor: theme.colors.background.content,
    borderStyle: 'solid',
    borderRadius: '0 !important',
    boxShadow: 'none'
  },
  mobilePaper: {
    border: 'none'
  },
  marketHistory: {
    width: '280px',
    tableLayout: 'fixed'
  },
  marketHistoryTablet: {
    width: '280px',
    tableLayout: 'fixed'
  },
  marketHistoryMobile: {
    width: '%100',
    tableLayout: 'fixed'
  },
  tableStyle: {
    tableLayout: 'initial',
    height: 'calc(100vh - 120px)'
  },
  tableStyleTablet: {
    tableLayout: 'initial',
    height: 'calc(70vh - 126px)'
  },
  tableStyleMobile: {
    tableLayout: 'initial',
    height: 'calc(100vh - 204px)'
  },
  tableCellStyle: {
    fontSize: '11.5px !important',
    letterSpacing: '0.2px',
    '@media screen and (max-width: 1439px)': {
      fontSize: '11px !important'
    }
  },
  tableRowStyle: {
    height: '24px'
  },
  actionButtonStyle: {
    marginRight: '0'
  },
  chartContainer: {
    display: 'flex',
    height: '100% !important',
    marginRight: '-12px'
  },
  chartContainerDesktop: {
    display: 'flex',
    height: '100% !important',
    marginRight: '-12px'
  },
  openOrdersContainer: {
    marginTop: '0',
    width: 'auto'
  },
  midPane: {
    width: 'calc(100% - 554px)',
    height: 'calc(100vh - 112px)'
  },
  chartWrapper: {
    height: '70%',
    marginRight: '12px'
  },
  historyTypeTabStyle: {
    textTransform: 'none',
    fontFamily: 'Roboto',
    fontWeight: '400',
    height: '40px',
    minHeight: '40px',
    color: theme.colors.textColor.inactiveTab
  },
  tabletTabStyle: {
    minWidth: '140px',
    textTransform: 'none',
    fontFamily: 'Roboto',
    fontWeight: '400',
    height: '40px',
    minHeight: '40px',
    color: theme.colors.textColor.inactiveTab
  },
  defaultTabSelected: {
    color: theme.colors.textColor.activeTab,
    fontWeight: '500'
  },
  dividerStyle: {
    height: '2px',
    marginTop: '-2px',
    backgroundColor: theme.colors.background.divider
  },
  tabsRoot: {
    minHeight: '40px',
    height: '40px'
  },
  tabIndicator: {
    backgroundColor: theme.colors.textColor.blue
  },
  checkbox: {
    color: theme.colors.background.checkboxBorder,
    '&$checked': {
      color: theme.colors.textColor.blue
    },
    padding: '2px 12px'
  },
  checked: {},
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: '40px'
  },
  marketFilterContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  historyPanel: {
    boxSizing: 'border-box',
    borderWidth: '4px 2px',
    borderColor: theme.colors.background.content,
    borderStyle: 'solid',
    borderRadius: '0 !important',
    boxShadow: 'none',
    marginRight: '12px',
    height: '30%',
    overflow: 'hidden',
    display: 'block'
  },
  historyPanelTablet: {
    height: '100%',
    borderWidth: '0px 2px 4px 2px',
    marginRight: '0'
  },
  switchLabel: {
    color: theme.colors.textColor.paperHeader,
    fontSize: '13px',
    cursor: 'pointer',
    marginRight: '-8px'
  },
  historyTablesContainer: {
    height: 'auto'
  },
  scrollbar: {
    backgroundColor: theme.colors.background.paper
  },
  tabletViewContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  tabletViewUpperPanel: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 'calc(70vh - 78.4px)'
  },
  tabletViewLowerPanel: {
    height: 'calc(30vh - 33.6px)',
    width: '100%'
  },
  chartWrapperTablet: {
    width: '100%'
  },
  mobileContainer: {
    display: 'flex',
    width: '100%',
    marginTop: '50px',
    marginBottom: '41px'
  },
  mobileTabsContainer: {
    position: 'fixed',
    width: '100%',
    bottom: 0
  },
  mobileTabsRoot: {
    minHeight: '40px',
    height: '40px',
    backgroundColor: '#304262'
  },
  mobileTab: {
    textTransform: 'none',
    fontFamily: 'Roboto',
    fontWeight: '400',
    height: '40px',
    minHeight: '40px',
    color: theme.colors.textColor.inactiveTab,
    border: `1px solid #26344e`
  },
  tradePaneMobile: {
    width: '100%'
  },
  orderHistoryMobile: {
    margin: '4px 0 8px',
    overflowX: 'auto'
  },
  orderHistoryMobileTabContainer: {
    width: '100%'
  },
  displayRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  }
});

export default styles;
