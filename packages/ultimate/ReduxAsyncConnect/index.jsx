import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter, Route, Redirect} from 'react-router';
import {authorize, trigger} from '../../redial';
import NProgress from 'nprogress';
import asyncMap from '../asyncMap';
import asyncMatchRoutes from '../asyncMatchRoutes';

// require('./nprogress.css');

class ReduxAsyncConnect extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired
  };

  constructor() {
    super();
    this.getAsyncData = this.getAsyncData.bind(this);
  }

  state = {
    previousLocation: null,
    authorized: true
  };

  componentDidMount() {
    NProgress.configure({trickleSpeed: 200});
    const {
      history, location, routes, store, helpers
    } = this.props;
    this.getAsyncData(history, location, routes, store, helpers);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      history, location, routes, store, helpers
    } = prevProps;
    const navigated = this.props.location !== location;

    if (navigated) {
      this.getAsyncData(history, location, routes, store, helpers);
    }
  }

  async getAsyncData(history, location, routes, store, helpers) {
    // save the location so we can render the old screen
    NProgress.start();
    this.setState({previousLocation: location, authorized: true});

    // load data while the old screen remains
    const {components, match, params} = await asyncMatchRoutes(routes, this.props.location.pathname);
    await asyncMap(components, component => authorize('authorized', component, {
      ...helpers,
      store,
      match,
      params,
      history,
      location: this.props.location
    })).then(async () => {
      const fetchers = async () => {
        await trigger('fetch', components, {
          ...helpers,
          store,
          match,
          params,
          history,
          location: this.props.location
        });
      };

      if (process.env.BUILD_TARGET === 'client') {
        trigger('defer', components, {
          ...helpers,
          store,
          match,
          params,
          history,
          location: this.props.location
        });
      }
      await fetchers();
      this.setState({authorized: true});
    }).catch(() => {
      this.setState({authorized: false});
    });

    // clear previousLocation so the next screen renders
    this.setState({previousLocation: null});
    NProgress.done();
  }


  render() {
    const {children, location} = this.props;
    const {previousLocation} = this.state;
    if (this.state.authorized === false) {
      return <Redirect to="/" />;
    }

    // use a controlled <Route> to trick all descendants into
    // rendering the old location
    return <Route location={previousLocation || location}
                  render={() => children} />;
  }
}

export default withRouter(ReduxAsyncConnect);
