import _omit from 'lodash/omit';
import React from 'react';
import PropTypes from 'prop-types';

class UploadButton extends React.Component {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <button type="button" {..._omit(this.props, 'content')}>
        {this.props.content}
      </button>
    );
  }
}

UploadButton.propTypes = {
  content: PropTypes.string,
};

export default UploadButton;
