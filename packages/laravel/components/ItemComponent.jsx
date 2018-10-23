import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';
import _has from 'lodash/has';
import {withRouter} from 'react-router';
import {post, update} from '../redux/store/actions';

@withRouter
class TestComponent extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.edit = this.edit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const edit = _has(this.props.history.location.pathname.match(/(edit|confirm|close)$/g), [0]);
    const id = edit ? this.props.route.match.params.id : null;

    this.setState({
      id: id,
      edit: edit,
      confirm: _has(this.props.history.location.pathname.match(/confirm$/g), [0]),
      close: _has(this.props.history.location.pathname.match(/close/g), [0]),
      newItem: _has(this.props.history.location.pathname.match(/new/g), [0])
    });
  }

  componentWillReceiveProps() {
    const edit = _has(this.props.history.location.pathname.match(/(edit|confirm|close)$/g), [0]);
    const id = edit ? this.props.route.match.params.id : null;

    this.setState({
      id: id,
      edit: _has(this.props.history.location.pathname.match(/(edit|confirm|close)$/g), [0]),
      confirm: _has(this.props.history.location.pathname.match(/confirm$/g), [0]),
      close: _has(this.props.history.location.pathname.match(/close/g), [0]),
      newItem: _has(this.props.history.location.pathname.match(/new/g), [0])
    });
  }

  onSubmit = async (payload) => {
    return new Promise((resolve) => {
      let promise = null;
      if (!this.state.edit) {
        promise = this.context.store.dispatch(post(this.key, `${this.apiPath}`, payload));
      } else {
        promise = this.context.store.dispatch(update(this.key, `${this.apiPath}`, this.props.match.params.id, payload));
      }

      promise.then((ret) => {
        if (ret && ret.hasOwnProperty('error')) {
          resolve(ret.error);
        }
        if (this.state.newItem) {
          this.props.history.push(`${this.path}/${_get(ret, 'id', 'new')}/edit`);
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

  edit() {
    this.props.history.push(`${this.path}/${this.props.params.id}/edit`);
  }

  render() {
    return (<div>Please implement render method in own class.</div>);
  }

}

TestComponent.propTypes = {
  params: PropTypes.object,
  history: PropTypes.object
};
TestComponent.defaultProps = {};

export default TestComponent;
