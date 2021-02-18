import React from 'react';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import StyledPaper from '../common/StyledPaper';
import I18n from '../../common/i18n/I18n';
import { MenuArrow } from '../icons/Icons';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '270px',
    backgroundColor: theme.colors.background.paper,
    boxSizing: 'border-box',
    '@media screen and (max-width: 600px)': {
      top: 'initial',
      position: 'initial',
      marginTop: '0',
      width: 'auto',
      minWidth: 'auto',
      marginBottom: '3px'
    }
  },
  divider: {
    height: '2px',
    backgroundColor: theme.colors.background.menuDivider
  },
  menuItems: {
    paddingLeft: '14px'
  },
  link: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px',
    color: theme.colors.textColor.menuItem,
    cursor: 'pointer',
    paddingRight: '10.5px',
    boxSizing: 'border-box',
    fontSize: '16px',
    textDecoration: 'none'
  },
  subLink: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '45px',
    color: theme.colors.textColor.menuItem,
    cursor: 'pointer',
    paddingRight: '10.5px',
    boxSizing: 'border-box',
    fontSize: '13px',
    textDecoration: 'none'
  },
  linkSelected: {
    color: theme.colors.textColor.menuItemSelected,
    fontWeight: '500'
  },
  icon: {
    stroke: theme.colors.textColor.menuItem
  },
  iconSelected: {
    stroke: theme.colors.textColor.menuItemSelected
  }
});

const LeftMenu = props => {
  return (
    <StyledPaper className={props.classes.container}>
      {props.header ? (
        <div className={props.classes.header}>{props.header}</div>
      ) : null}
      <div className={props.classes.menuItems}>
        {props.items.map((item, index) => (
          <div key={item.to}>
            <Link
              className={classNames(props.classes.link, {
                [props.classes.linkSelected]:
                  props.location.pathname === item.to
              })}
              to={item.to}
              target={item.target}
            >
              {I18n.translate(item.i18nKey)}
              <MenuArrow
                className={classNames(props.classes.icon, {
                  [props.classes.iconSelected]:
                    props.location.pathname === item.to
                })}
              />
            </Link>
            {item.sub &&
              item.sub.length &&
              (props.location.pathname === item.to ||
                item.sub.find(i => i.to === props.location.pathname)) && (
                <div style={{ marginTop: '-15px' }}>
                  {item.sub.map((sub, index) => (
                    <div key={sub.to} className="pl-4">
                      <Link
                        className={classNames(props.classes.subLink, {
                          [props.classes.linkSelected]:
                            props.location.pathname === sub.to
                        })}
                        to={sub.to}
                        target={sub.target}
                      >
                        {I18n.translate(sub.i18nKey)}
                        <MenuArrow
                          className={classNames(props.classes.icon, {
                            [props.classes.iconSelected]:
                              props.location.pathname === sub.to
                          })}
                        />
                      </Link>
                      {index < item.sub.length - 1 && (
                        <Divider className={props.classes.divider} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            {index < props.items.length - 1 && (
              <Divider className={props.classes.divider} />
            )}
          </div>
        ))}
      </div>
    </StyledPaper>
  );
};
export default withRouter(withStyles(styles)(LeftMenu));
