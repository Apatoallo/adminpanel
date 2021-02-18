import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

class ProgressBar extends React.PureComponent {
  timer = 0;

  constructor(props) {
    super(props);
    this.state = {
      completed: 0
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 400);
  }

  componentWillUnmount() {
    this.setState({ completed: 0 });
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    const { onCompleted = f => f } = this.props;
    if (completed === 100) {
      this.setState({ completed: 0 });
      onCompleted();
    } else {
      this.setState({ completed: completed + 2 });
    }
  };

  render() {
    const { completed } = this.state;
    return (
      <LinearProgress color="primary" variant="determinate" value={completed} />
    );
  }
}

export default ProgressBar;
