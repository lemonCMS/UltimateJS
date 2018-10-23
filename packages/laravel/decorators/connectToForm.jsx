import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';
import _has from 'lodash/has';
import {withRouter} from 'react-router';
import {post, update} from '../redux/store/actions';

export default custom => (Component) => {

  const config = Object.assign({}, {
    api: null,
    key: null
  }, custom);


  if (!config.api) {
    console.warn('Path to your `api` is required');
  }
  if (!config.key) {
    console.warn('Redux store `key` is required');
  }

  @withRouter
  class WrappedComponent extends React.Component {

    constructor(props) {
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
      this.state = {
        id: null,
        edit: false,
        confirm: false,
        close: false,
        newItem: false,
        location: ''
      };
    }

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      match: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired
    };

    static getDerivedStateFromProps(props) {
      const {history: {location: {pathname}}, match: {params}} = props;
      const edit = _has(pathname.match(/(edit|confirm|close)$/g), [0]);
      const id = edit ? params.id : null;

      return {
        id: id,
        edit: edit,
        confirm: _has(pathname.match(/confirm$/g), [0]),
        close: _has(pathname.match(/close/g), [0]),
        newItem: _has(pathname.match(/new/g), [0]),
      };
    }

    onSubmit = async (payload) => {
      return new Promise((resolve) => {
        let promise = null;
        if (!this.state.edit) {
          promise = this.props.dispatch(post(config.key, `${config.api}`, payload));
        } else {
          promise = this.props.dispatch(update(config.key, `${config.api}`, this.props.match.params.id, payload));
        }

        promise.then((ret) => {
          if (ret && ret.hasOwnProperty('error')) {
            resolve(ret.error);
          }
          if (this.state.newItem) {
            this.props.history.push(`${this.props.history.location.pathname}/${_get(ret, 'id', 'new')}/edit`);
          }
          resolve();

        }).catch((err) => {
          if (err && err.hasOwnProperty('error')) {
            resolve(err.error);
          }
          resolve(err);
        });
      });
    };

    render() {
      const props = {
        ...this.props,
        ...this.state,
        onSubmit: this.onSubmit
      };

      return (<Component {...props} />);
    }
  }

  return WrappedComponent;
};

