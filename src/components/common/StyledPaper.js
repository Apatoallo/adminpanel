import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import classNames from 'classnames';
import { DropdownIcon } from '../icons/Icons';

const styles = theme => ({
  paperStyle: {
    backgroundColor: theme.colors.background.paper,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.colors.boxShadow.paper
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    height: '38px',
    boxSizing: 'border-box'
  },
  titleStyle: {
    display: 'flex',
    fontFamily: 'Roboto',
    fontSize: '13px',
    fontWeight: '500',
    color: theme.colors.textColor.paperHeader
  },
  dividerStyle: {
    height: '2px',
    backgroundColor: theme.colors.background.divider
  },
  flip: {
    transform: 'rotate(-180deg)',
    transition: 'transform 300ms'
  },
  dropdownIcon: {
    cursor: 'pointer'
  },
  dropdownIconPath: {
    stroke: theme.colors.textColor.paperHeader
  },
  cursorPointer: {
    cursor: 'pointer'
  }
});

const StyledPaper = ({
  classes,
  className,
  title,
  children,
  collapsable,
  ...paperProps
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Paper
      className={classNames(classes.paperStyle, className)}
      elevation={2}
      {...paperProps}
    >
      {title || collapsable ? (
        <div>
          <div
            className={classNames(classes.titleRow, {
              [classes.cursorPointer]: collapsable
            })}
            onClick={collapsable ? () => setCollapsed(!collapsed) : undefined}
          >
            <div className={classes.titleStyle}>{title}</div>
            {collapsable && (
              <DropdownIcon
                className={classNames(classes.dropdownIcon, {
                  [classes.flip]: !collapsed
                })}
                pathClassName={classes.dropdownIconPath}
                onClick={() => setCollapsed(!collapsed)}
              />
            )}
          </div>
          <Divider className={classes.dividerStyle} />
        </div>
      ) : null}
      {!collapsed && children}
    </Paper>
  );
};

export default withStyles(styles)(StyledPaper);
