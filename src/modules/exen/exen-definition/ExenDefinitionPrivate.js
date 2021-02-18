import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import StyledPaper from '../../../components/common/StyledPaper';

const styles = theme => ({
  paper: {
    width: '100%',
    marginTop: theme.unit.margin
  },
  rightContainerInfoArea: {
    marginTop: theme.unit.margin,
    marginBottom: '24px',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    color: 'rgba(48, 66, 98, 0.87)',
    backgroundColor: theme.colors.background.paper
  },
  hyperLink: {
    color: theme.colors.textColor.blue,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  listStyle: {
    color: theme.colors.textColor.blue
  }
});

const ExenDefinitonPrivate = ({ classes }) => (
  <div>
    <StyledPaper className={classes.rightContainerInfoArea}>
      <ul style={{ marginTop: '10px' }} className={classes.listStyle}>
        <li>
          <a
            className={classes.hyperLink}
            href="https://www.bitexen.com/resources/exen-whitepaper.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            White Paper (PDF)
          </a>
        </li>
      </ul>
    </StyledPaper>
  </div>
);

export default withStyles(styles)(ExenDefinitonPrivate);
