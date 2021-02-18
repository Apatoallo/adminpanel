import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import Fade from '@material-ui/core/Fade';
import { InfoIcon } from '../icons/Icons';

const DEFAULT_MAX_ITEM_COUNT = 3;

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column-reverse',
    '@media screen and (max-width: 600px)': {
      boxSizing: 'border-box',
      flexDirection: 'column',
      zIndex: '500000',
      width: '100vw'
    }
  },
  snackbarAnchor: {},
  snackbar: {
    width: '270px',
    minWidth: '270px',
    marginTop: '12px',
    height: '60px',
    boxSizing: 'border-box',
    backgroundColor: theme.colors.background.paper,
    fontSize: '12px',
    padding: '0 12px 0 0',
    position: 'initial',
    '@media screen and (max-width: 600px)': {
      width: '100%',
      marginTop: '0',
      padding: '0',
      marginBottom: '12px',
      bottom: 'auto !important'
    }
  },
  snackbarContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    boxSizing: 'border-box',
    maxWidth: '270px',
    minWidth: '270px',
    backgroundColor: 'transparent',
    '@media screen and (max-width: 600px)': {
      width: '100vw',
      maxWidth: '100vw'
    }
  },
  snackbarText: {
    marginLeft: '12px',
    maxWidth: '200px',
    color: theme.colors.textColor.tableCell
  },
  action: {
    paddingLeft: '0'
  },
  close: {
    fontSize: '16px',
    cursor: 'pointer',
    margin: ' 0 10px',
    color: theme.colors.textColor.tableCell
  },
  fadeOut: {
    animationName: 'fadeOut',
    animationDuration: '1s'
  },
  leftPart: {
    display: 'flex',
    flexDirection: 'row'
  }
});

class SnackbarList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      queue: [],
      closingIndex: -1
    };

    this.maxItemCount = DEFAULT_MAX_ITEM_COUNT;
  }

  lastHeight = 0;
  onElementHeightChangeTimer = 0;

  onElementHeightChange = callback => {
    let newHeight = window.innerHeight;
    let self = this;
    (function run() {
      newHeight = window.innerHeight;
      if (self.lastHeight !== newHeight) callback();
      self.lastHeight = newHeight;

      if (self.onElementHeightChangeTimer)
        clearTimeout(self.onElementHeightChangeTimer);

      self.onElementHeightChangeTimer = setTimeout(run, 60000);
    })();
  };

  componentDidMount() {
    this.lastHeight = window.innerHeight;
    this.setMaxItemCount();
    this.onElementHeightChange(this.setMaxItemCount);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.snackbarItem !== nextProps.snackbarItem) {
      this.enqueue(nextProps.snackbarItem);
    }
  }

  setMaxItemCount = () => {
    this.maxItemCount =
      window.innerWidth > 600
        ? Math.floor((window.innerHeight - 590) / 60)
        : DEFAULT_MAX_ITEM_COUNT;
  };

  enqueue = item => {
    this.setState({
      queue: [...this.state.queue, item]
    });
  };

  dequeue = (item, event, reason) => {
    if (!item.auto_dismiss && reason === 'clickaway') {
      return;
    }
    this.setState({ closingIndex: item.id });
    window.setTimeout(() => {
      const itemIndex = this.state.queue.findIndex(i => i.id === item.id);
      this.setState({
        queue: [
          ...this.state.queue.slice(0, itemIndex),
          ...this.state.queue.slice(itemIndex + 1)
        ],
        closingIndex: -1
      });
    }, 900);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classNames(classes.container, this.props.className)}>
        {this.state.queue.map((item, index) => {
          return index < this.maxItemCount ? (
            <Snackbar
              key={item.id}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              classes={{
                root: classNames(classes.snackbar, {
                  [classes.fadeOut]: this.state.closingIndex === item.id
                }),
                anchorOriginBottomLeft: classes.snackbarAnchor
              }}
              open={true}
              onClose={(event, reason) => this.dequeue(item, event, reason)}
              autoHideDuration={item.data.auto_dismiss === false ? null : 4000}
              TransitionComponent={Fade}
              transitionDuration={{ enter: 1000 }}
              ContentProps={{
                'aria-describedby': 'message-id',
                className: classes.snackbar,
                classes: { action: classes.action }
              }}
            >
              <div className={classes.snackbarContent}>
                <div className={classes.leftPart}>
                  <InfoIcon />
                  <div className={classes.snackbarText}>
                    {item.content.text}
                  </div>
                </div>
                <Icon
                  className={classes.close}
                  onClick={() => this.dequeue(item)}
                >
                  close
                </Icon>
              </div>
            </Snackbar>
          ) : null;
        })}
      </div>
    );
  }
}

export default withStyles(styles)(SnackbarList);
