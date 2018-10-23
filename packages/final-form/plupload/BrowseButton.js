import _omit from 'lodash/omit';
import React from 'react';
import PropTypes from 'prop-types';

class BrowseButton extends React.Component {
  static propTypes = {
    content: PropTypes.string,
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <button type="button" {..._omit(this.props, 'content')}>
        {this.props.content}
      </button>
    );
  }
}

export default BrowseButton;
