import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

// material-ui components
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

const profileCardStyle = {
  card: {
    marginTop: '30px',
    textAlign: 'center',
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    margin: '25px 0',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    borderRadius: '6px',
    color: 'rgba(0, 0, 0, 0.87)',
    background: '#fff',
    overflow: 'initial'
  },
  cardHeader: {
    display: 'inline-block',
    width: '100%',
    padding: '0px'
  },
  cardAvatar: {
    maxWidth: '130px',
    maxHeight: '130px',
    margin: '-50px auto 0',
    borderRadius: '50%',
    overflow: 'hidden',
    boxShadow:
      '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
  },
  img: {
    width: '100%',
    height: 'auto',
    verticalAlign: 'middle',
    border: '0'
  },
  textAlign: {
    textAlign: 'center'
  },
  cardSubtitle: {
    color: '#999999',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '300',
    lineHeight: '1.5em',
    fontSize: '14px',
    textTransform: 'uppercase',
    marginTop: '10px'
  },
  cardTitle: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '300',
    lineHeight: '1.5em',
    fontSize: '18px',
    minHeight: '60px',
    verticalAlign: 'middle',
    marginBottom: '3px'
  },
  cardDescription: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '300',
    lineHeight: '1.5em',
    color: '#999999',
    fontSize: '14px',
    margin: '0 0 10px'
  },
  cardActions: {
    height: 'auto',
    display: 'inline'
  },
  cardContent: {
    padding: '15px 20px !important',
    position: 'relative'
  },
  cardFooter: {
    margin: '0 20px 10px',
    paddingTop: '10px',
    borderTop: '1px solid #eeeeee'
  }
};

function ProfileCard({ ...props }) {
  const {
    classes,
    subtitle,
    title,
    description,
    avatar,
    content,
    footer,
    customCardClass,
    customCardAvatarClass,
    customCardFooterClass
  } = props;
  const cardClasses =
    classes.card +
    ' ' +
    cx({
      [customCardClass]: customCardClass !== undefined
    });
  const cardAvatarClass =
    classes.cardAvatar +
    ' ' +
    cx({
      [customCardAvatarClass]: customCardAvatarClass !== undefined
    });
  const cardFooterClass =
    classes.cardFooter +
    ' ' +
    cx({
      [customCardFooterClass]: customCardFooterClass !== undefined
    });
  return (
    <Card className={cardClasses}>
      <CardHeader
        classes={{
          root: classes.cardHeader,
          avatar: cardAvatarClass
        }}
        avatar={
          avatar ? <img src={avatar} alt="..." className={classes.img} /> : null
        }
      />
      <CardContent className={classes.textAlign + ' ' + classes.cardContent}>
        {subtitle !== undefined ? (
          <Typography component="h6" className={classes.cardSubtitle}>
            {subtitle}
          </Typography>
        ) : null}
        {title !== undefined ? (
          <Typography component="h4" className={classes.cardTitle}>
            {title}
          </Typography>
        ) : null}
        {description !== undefined ? (
          <Typography component="p" className={classes.cardDescription}>
            {description}
          </Typography>
        ) : null}
        {content !== undefined ? content : null}
      </CardContent>
      {footer !== undefined ? (
        <div className={cardFooterClass}>{footer}</div>
      ) : null}
    </Card>
  );
}

ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  description: PropTypes.node,
  content: PropTypes.node,
  footer: PropTypes.node,
  avatar: PropTypes.string,
  customCardClass: PropTypes.string,
  customCardAvatarClass: PropTypes.string
};

export default withStyles(profileCardStyle)(ProfileCard);
