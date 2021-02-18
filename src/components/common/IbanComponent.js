import React from 'react';
import NumberFormat from 'react-number-format';

class IbanComponent extends React.PureComponent {
  input = null;

  handleRefInput = node => {
    this.input = node;

    if (this.props.inputRef) {
      this.props.inputRef(node);
    } else if (this.props.inputProps && this.props.inputProps.ref) {
      this.props.inputProps.ref(node);
    }
  };

  render() {
    const { inputRef, ...rest } = this.props;
    return (
      <NumberFormat
        format="TR## #### #### #### #### #### ##"
        {...rest}
        getInputRef={this.handleRefInput}
      />
    );
  }
}

export default IbanComponent;
