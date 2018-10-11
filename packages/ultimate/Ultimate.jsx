import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {renderRoutes} from 'react-router-config';

class Ultimate extends Component {
  render() {
    return (
      <div>
        {renderRoutes(this.props.routes)}
      </div>
    );
  }
}

Ultimate.propTypes = {
  routes: PropTypes.array.isRequired
};
Ultimate.defaultProps = {};

export default Ultimate;
