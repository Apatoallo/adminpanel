import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

const styles = theme => ({
  carouselContainer: {
    position: 'relative',
    display: 'flex'
  },
  leftContent: {
    position: 'absolute',
    top: '245px',
    left: '0',
    cursor: 'pointer'
  },
  rightContent: {
    position: 'absolute',
    top: '245px',
    right: '0',
    cursor: 'pointer'
  },
  content: {},
  narrowContent: {
    paddingLeft: '30px',
    paddingRight: '30px'
  },
  chevronStyle: {
    fill: theme.colors.textColor.formLabel,
    width: '40px',
    height: '40px',
    '&:hover': {
      fill: theme.colors.textColor.blueAccent
    }
  }
});

const Carousel = ({
  children,
  className,
  classes,
  narrowContent = false,
  showLeft = true,
  showRight = true,
  onLeft = f => f,
  onRight = f => f
}) => (
  <div className={classNames(className, classes.carouselContainer)}>
    {showLeft && (
      <div className={classes.leftContent} onClick={() => onLeft()}>
        <ChevronLeft className={classes.chevronStyle} />
      </div>
    )}
    <div
      className={classNames(classes.content, {
        [classes.narrowContent]: narrowContent
      })}
    >
      {children}
    </div>
    {showRight && (
      <div className={classes.rightContent} onClick={() => onRight()}>
        <ChevronRight className={classes.chevronStyle} />
      </div>
    )}
  </div>
);

export default withStyles(styles)(Carousel);
