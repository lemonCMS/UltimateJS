import PropTypes from 'prop-types';
import React, {Component} from 'react';
import _get from 'lodash/get';
import _has from 'lodash/has';
import _flatten from 'lodash/flatten';
import _compact from 'lodash/compact';
import _cloneDeep from 'lodash/cloneDeep';
import _isFunction from 'lodash/isFunction';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {provideHooks} from '@wicked_query/redial';
import {load, clearItem, destroyItem} from '../redux/store/actions';
import DataTable from '../components/DataTable';
import connectToFilter, {createAllParamsForFetch} from './connectToFilter';
import connectToConfirm from './connectToConfirm';
import Search from '../components/Search';
import Pending from '../components/Pending';

export default function connnectToList(properties) {
  return (WrappedComponent) => {
    @provideHooks({
      fetch: ({store: {dispatch, getState}, params, location}) => {
        const promises = [];
        const state = createAllParamsForFetch(getState(), location);
        const api = () => {
          if (_isFunction(properties.api)) {
            return properties.api(params);
          }
          return properties.api;
        };

        promises.push(dispatch(load(properties.key, api(), state)));
        return Promise.all(promises);
      }
    })
    @withRouter
    @connectToFilter()
    @connectToConfirm()
    @connect(state => (
      {
        data: state.store[properties.key],
        auth: state.auth,
      }))
    class Connection extends Component {
      constructor() {
        super();
        this.filter = this.filter.bind(this);
        this.show = this.show.bind(this);
        this.edit = this.edit.bind(this);
        this.destroy = this.destroy.bind(this);
        this.path = this.path.bind(this);
        this.state = {
          forceUpdate: false,
          path: ''
        };
      }

      static propTypes = {
        children: PropTypes.oneOfType([
          PropTypes.array,
          PropTypes.object,
          PropTypes.string
        ]),
        auth: PropTypes.object,
        data: PropTypes.object,
        match: PropTypes.object,
        history: PropTypes.object,
        switchPage: PropTypes.func,
        pushSearch: PropTypes.func,
        pushOnState: PropTypes.func,
        pushStateAttempt: PropTypes.func,
        inputOnStack: PropTypes.func,
        dispatch: PropTypes.func,
        showModal: PropTypes.func,
      };

      path() {
        let path = properties.path;
        if (_isFunction(properties.path)) {
          path = properties.path(this.props.match.params);
        }
        this.setState({path: path});
      }

      componentWillMount() {
        this.path();
      }

      componentWillReceiveProps() {
        this.path();
      }

      componentWillUpdate(nextProps) {
        if (_get(nextProps, ['data', 'item', 'deleted'], false) === true) {
          this.props.dispatch(clearItem(properties.key));
          this.props.pushStateAttempt();
        }
      }

      filter() {
        return (
          <div className="panel panel-border-tb">
            <div className="panel-heading">
              <Link to={`${properties.path}/new`} className="pull-right"><i className="fa fa-plus" /> nieuw item
                aanmaken</Link>
              <h4 className="panel-title">Verfijn</h4>
            </div>
            <div className="panel-body">
              <Search
                pushSearch={this.props.pushSearch}
                inputOnStack={this.props.inputOnStack}
                query={this.props.inputOnStack('q')} />
            </div>
          </div>);
      }

      show(item) {
        this.props.history.push(`${this.state.path}/${item.id}`);
      }

      edit(item) {
        this.props.history.push(`${this.state.path}/${item.id}/edit`);
      }

      destroy(item) {
        this.props.dispatch(destroyItem(properties.key, `${properties.api}`, item.id));
      }

      render() {
        const dropDown = {};
        if (!properties.noDropDown) {
          dropDown.name = 'Acties';

          if (!properties.noEdit) {
            dropDown.dropdownButton = [
              {name: 'bekijken', onClick: this.show},
              {name: 'wijzigen', onClick: this.edit},
            ];
          }

          if (!properties.noDelete) {
            if (!dropDown.dropdownButton) {
              dropDown.dropdownButton = [];
            }

            dropDown.dropdownButton.push({divider: true});
            dropDown.dropdownButton.push({
              name: 'verwijderen',
              onClick: (item) => {
                this.setState({forceUpdate: true}, () => {
                  this.props.showModal(item, this.destroy);
                });

              }
            });
          }
        }

        const rows = _cloneDeep(_has(properties, 'rows') ? properties.rows : [{cols: properties.cols}]);
        if (Object.keys(dropDown).length > 0) {
          rows[0].cols = _compact(_flatten([rows[0].cols, [dropDown]]));
        }

        const getTable = () => {
          if (_get(this.props, ['data', 'success'], false) === true) {
            return (
              <DataTable
                records={this.props.data.list.data}
                rows={rows}
                dispatch={this.props.dispatch}
                pushOnState={this.props.pushOnState}
                inputOnStack={this.props.inputOnStack}
                order={this.props.inputOnStack('order')}
                auth={this.props.auth}
                edit={this.edit}
                show={this.show}
                paginator={{
                  currPage: this.props.data.list.current_page,
                  lastPage: this.props.data.list.last_page,
                  onChange: this.props.switchPage
                }}
              />);
          }
        };

        const state = {
          pending: _get(this.props.data, 'pending', false),
          failed: _get(this.props.data, 'failed', false)
        };

        const warning = () => {
          if (_has(this.props, ['data', 'item', 'error'])) {
            return (<Alert bsStyle="danger">{_get(this.props, ['data', 'item', 'error'])}</Alert>);
          }
        };

        return (
          <WrappedComponent {...this.props}>
            {this.filter()}
            {warning()}
            <Pending state={state}>
              {getTable()}
            </Pending>
            {this.props.children}
          </WrappedComponent>
        );
      }
    }

    return Connection;
  };
}
