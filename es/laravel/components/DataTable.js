import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _has from 'lodash/has';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import _isString from 'lodash/isString';
import _isArray from 'lodash/isArray';
import _compact from 'lodash/compact';
import _find from 'lodash/find';
import React, { Component } from 'react';
import { Alert, ButtonToolbar, DropdownButton, MenuItem, Image } from 'react-bootstrap';
import { withRouter } from 'react-router';
import Paginator from './Paginator';
import moment from '../utils/moment';
import numeral from '../utils/numeral';

var DataTable =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(DataTable, _Component);

  function DataTable() {
    var _this;

    _this = _Component.call(this) || this;
    _this.renderRows = _this.renderRows.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderCols = _this.renderCols.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderRecords = _this.renderRecords.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderRecordCols = _this.renderRecordCols.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderRecordRows = _this.renderRecordRows.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderDropDownItems = _this.renderDropDownItems.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderPaginator = _this.renderPaginator.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getValue = _this.getValue.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.check = _this.check.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.pushIds = _this.pushIds.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      orderCol: null,
      checked: {},
      current: {},
      ids: {},
      idsTouched: {}
    };
    return _this;
  }

  var _proto = DataTable.prototype;

  _proto.pushIds = function pushIds(props) {
    var ids = this.state.ids;
    var current = [];

    _map(props.records, function (record) {
      if (!_find(ids, {
        id: record.id
      })) {
        ids.push({
          id: record.id,
          checked: false,
          clicked: false
        });
        current.push(record.id);
      }
    });

    this.setState({
      ids: ids,
      current: current
    });
  };

  _proto.renderRows = function renderRows() {
    var _this2 = this;

    if (_has(this.props, 'rows')) {
      return _map(this.props.rows, function (row, key) {
        return React.createElement("tr", {
          key: key
        }, _this2.renderCols(row.cols));
      });
    }

    return React.createElement("tr", null, this.renderCols(this.props.cols));
  };

  _proto.check = function check(event, key) {
    var checked = Object.assign(this.state.checked);
    var idsTouched = Object.assign(this.state.idsTouched);
    var ids = Object.assign(this.state.ids);

    if (!ids["box-" + key]) {
      ids["box-" + key] = [];
    }

    if (!idsTouched["box-" + key]) {
      idsTouched["box-" + key] = [];
    }

    _map(this.props.records, function (record) {
      var index = ids["box-" + key].indexOf(record.id);

      if (index > -1) {
        ids["box-" + key].splice(index, 1);
      }

      if (event.target.checked) {
        ids["box-" + key].push(record.id);
      }

      var touched = idsTouched["box-" + key].indexOf(record.id);

      if (touched === -1) {
        idsTouched["box-" + key].push(record.id);
      }
    });

    checked["box-" + key] = event.target.checked;
    this.setState({
      ids: ids,
      idsTouched: idsTouched,
      checked: checked
    });
  };

  _proto.renderCols = function renderCols(cols) {
    var _this3 = this;

    return _map(cols, function (col, key) {
      var orderName = 'order-' + key;

      var dbCol = function dbCol(orderType) {
        if (_has(col, 'show')) {
          if (_isString(col.show)) {
            return col.show + orderType;
          }

          if (_isArray(col.show)) {
            return _get(col.show, [0]) + orderType;
          }
        }
      };

      var select1 = function select1() {
        var state = _this3.state;
        state[orderName] = 'A ... Z';
        state.orderCol = dbCol();

        _this3.setState(state, function () {
          _this3.props.pushOnState('order', dbCol('Asc'));
        });
      };

      var select2 = function select2() {
        var state = _this3.state;
        state[orderName] = 'Z ... A';
        state.orderCol = dbCol();

        _this3.setState(state, function () {
          _this3.props.pushOnState('order', dbCol('Desc'));
        });
      };

      var filter = function filter(value) {
        var state = _this3.state;
        state[_get(col, 'show')] = value;

        _this3.setState(state, function () {
          _this3.props.pushOnState(_get(col, 'show'), value);
        });
      };

      var actions = false;

      if (_has(col, 'actions')) {
        actions = _map(col.actions, function (button, key2) {
          return React.createElement(MenuItem, {
            key: key2,
            eventKey: key2,
            onSelect: function onSelect() {
              button.action(_get(_this3.state.ids, "box-" + key, []), _this3.props.dispatch);
            }
          }, button.name);
        });
      }

      var title = function title() {
        if (_get(col, 'filterBy', false) !== false) {
          var onStack = _this3.props.inputOnStack(_get(col, 'show'));

          if (onStack) {
            return _get(col, "filterBy[" + onStack + "].desc", '');
          }

          if (_this3.state[_get(col, 'show')]) {
            return _get(col, "filterBy[" + _this3.state[_get(col, 'show')] + "].desc", '');
          }
        }

        if (_this3.state.orderCol === dbCol()) {
          if (_get(_this3.state, orderName)) {
            return _this3.state[orderName];
          }
        }

        if (_this3.state.orderCol === null) {
          if (dbCol('Asc') === _get(_this3.props, 'order')) {
            return 'A ... Z';
          }

          if (dbCol('Desc') === _get(_this3.props, 'order')) {
            return 'Z ... A';
          }
        }

        return _get(col, 'name', '');
      };

      var filterBy = _get(col, 'filterBy', false);

      if (filterBy !== false) {
        return React.createElement("th", {
          key: key,
          width: _get(col, 'width', 'auto'),
          colSpan: _get(col, 'colSpan', '1')
        }, React.createElement(ButtonToolbar, null, React.createElement(DropdownButton, {
          bsStyle: "link",
          title: title(),
          id: 'dropdown-size-extra-small' + key
        }, _map(_get(col, 'filterBy', []), function (item, itemKey) {
          return React.createElement(MenuItem, {
            key: itemKey,
            eventKey: itemKey,
            onSelect: function onSelect() {
              filter(item.value);
            }
          }, item.desc);
        }), React.createElement(MenuItem, {
          divider: true
        }), React.createElement(MenuItem, {
          eventKey: 999,
          onSelect: function onSelect() {
            filter('');
          }
        }, "reset"), actions && React.createElement(MenuItem, {
          divider: true
        }), actions && actions)));
      }

      var order = _get(col, 'order', false);

      if (order === true) {
        return React.createElement("th", {
          key: key,
          width: _get(col, 'width', 'auto'),
          colSpan: _get(col, 'colSpan', '1')
        }, React.createElement(ButtonToolbar, null, React.createElement(DropdownButton, {
          bsStyle: "link",
          title: title(),
          id: 'dropdown-size-extra-small' + key
        }, React.createElement(MenuItem, {
          eventKey: "1",
          onSelect: select1
        }, "A ... Z"), React.createElement(MenuItem, {
          eventKey: "2",
          onSelect: select2
        }, "Z ... A"), actions && React.createElement(MenuItem, {
          divider: true
        }), actions && actions)));
      }

      if (actions) {
        return React.createElement("th", {
          key: key,
          width: _get(col, 'width', 'auto'),
          colSpan: _get(col, 'colSpan', '1')
        }, React.createElement("input", {
          type: "checkbox",
          onChange: function onChange(event) {
            _this3.check(event, key);
          },
          defaultChecked: _this3.state.checked["box-" + key]
        }), React.createElement(ButtonToolbar, null, React.createElement(DropdownButton, {
          bsStyle: "link",
          title: title(),
          id: 'dropdown-size-extra-small' + key
        }, actions)));
      }

      return React.createElement("th", {
        key: key,
        width: _get(col, 'width', 'auto'),
        colSpan: _get(col, 'colSpan', '1')
      }, _get(col, 'name', ''));
    });
  };

  _proto.renderRecords = function renderRecords() {
    var _this4 = this;

    return _map(this.props.records, function (record, key) {
      return _this4.renderRecordRows(key, record);
    });
  };

  _proto.renderRecordRows = function renderRecordRows(key, record) {
    var _this5 = this;

    if (_has(this.props, 'rows')) {
      return _map(this.props.rows, function (row, keyRow) {
        return React.createElement("tr", {
          key: key + "-" + keyRow,
          className: "data-table-row" + keyRow
        }, _this5.renderRecordCols(row.cols, record));
      });
    }

    return React.createElement("tr", {
      key: key
    }, this.renderRecordCols(this.props.cols, record));
  };

  _proto.renderRecordCols = function renderRecordCols(cols, record) {
    var _this6 = this;

    return _map(cols, function (col, key) {
      var value = _this6.getValue(record, col, key);

      return React.createElement("td", {
        key: key,
        colSpan: _get(col, 'colSpan', '1'),
        className: _get(col, 'className', '')
      }, value);
    });
  };

  _proto.getValue = function getValue(record, col, key) {
    var _this7 = this;

    var cell = [];

    if (_has(col, 'checkbox')) {
      var click = function click(event) {
        col.checkbox(event, record, _this7.props.dispatch);
        var ids = _this7.state.ids;
        var idsTouched = _this7.state.idsTouched;

        if (!ids["box-" + key]) {
          ids["box-" + key] = [];
        }

        if (!idsTouched["box-" + key]) {
          idsTouched["box-" + key] = [];
        }

        var index = ids["box-" + key].indexOf(record.id);

        if (index > -1) {
          ids["box-" + key].splice(index, 1);
        }

        if (event.target.checked) {
          ids["box-" + key].push(record.id);
        }

        var touched = idsTouched["box-" + key].indexOf(record.id);

        if (touched === -1) {
          idsTouched["box-" + key].push(record.id);
        }

        _this7.setState({
          ids: ids,
          idsTouched: idsTouched
        });
      };

      var defaultChecked = _get(record, _get(col, 'show'), false);

      var checked = function checked() {
        var ids = _this7.state.ids;
        var idsTouched = _this7.state.idsTouched;

        if (!idsTouched["box-" + key] || !ids["box-" + key]) {
          return defaultChecked;
        }

        var touched = idsTouched["box-" + key].indexOf(record.id);

        if (touched === -1) {
          return defaultChecked;
        }

        var checkedId = ids["box-" + key].indexOf(record.id);

        if (checkedId > -1) {
          return true;
        }

        return false;
      };

      return React.createElement("input", {
        key: 'checkbox' + record.id,
        type: "checkbox",
        onChange: click,
        checked: checked()
      });
    }

    if (_has(col, 'image')) {
      if (_has(record, col.image)) {
        cell.push(React.createElement(Image, {
          key: "image",
          src: "/image/small/" + _get(record, col.image),
          responsive: true,
          thumbnail: true
        }));
      }
    }

    if (_has(col, 'text')) {
      cell.push(React.createElement("span", {
        key: "text",
        className: "data-table-static-text"
      }, col.text));
    }

    if (_has(col, 'edit')) {
      cell.push(React.createElement("button", {
        className: "btn btn-link",
        key: "link",
        onClick: function onClick() {
          _this7.props.edit(record);
        }
      }, _get(record, col.show, '')));
    } else if (_has(col, 'link') && _has(col, 'onClick')) {
      var _click = function _click(event) {
        event.preventDefault();
        col.onClick(record, _this7.props.history);
      };

      cell.push(React.createElement("button", {
        className: "btn btn-link",
        key: "link",
        onClick: _click
      }, _get(col, 'link')));
    }

    if (_has(col, 'array') && _has(col, 'arrayShow') && _has(col, 'onClick')) {
      _map(_get(record, col.array, []), function (item, key2) {
        var show = '';

        if (_isArray(col.arrayShow)) {
          _map(col.arrayShow, function (arrayCol) {
            show = show.concat(_get(item, arrayCol, ''), ' ');
          });

          show.trim();
        } else {
          show = _get(item, col.arrayShow, '');
        }

        cell.push(React.createElement("button", {
          type: "button",
          key: key2,
          className: "btn btn-link",
          onClick: function onClick() {
            col.onClick(item, _this7.props.history);
          }
        }, show));
      });
    } else if (_has(col, 'array') && _has(col, 'arrayShow')) {
      _map(_get(record, col.array, []), function (item) {
        cell.push(React.createElement("span", null, _get(item, col.arrayShow, '')));
      });
    }

    if (_has(col, 'show') && _has(col, 'onClick')) {
      if (!_isEmpty(record, col.show, '')) {
        var _click2 = function _click2(event) {
          event.preventDefault();
          col.onClick(record, _this7.props.history);
        };

        cell.push(React.createElement("button", {
          className: "btn btn-link",
          key: "showClick",
          onClick: _click2
        }, _get(record, col.show, '')));
      }
    }

    if (_has(col, 'show') && !_has(col, 'onClick') && !_has(col, 'edit')) {
      if (_isString(col.show)) {
        if (_has(col, 'translate')) {
          cell.push(React.createElement("span", {
            key: "'show'"
          }, _get(col, ['translate', _get(record, col.show, '')], '')));
        } else if (_has(col, 'append')) {
          if (!_isEmpty(record, col.show, '')) {
            cell.push(React.createElement("span", {
              key: "'show'"
            }, _get(record, col.show, 0) + _get(col, 'append')));
          }
        } else if (_has(col, 'filter') && col.filter === 'numeral') {
          cell.push(React.createElement("span", {
            key: "'show'"
          }, numeral(Number(_get(record, col.show, 0))).format('$0.00')));
        } else if (_has(col, 'filter') && col.filter === 'date') {
          cell.push(React.createElement("span", {
            key: "'show'"
          }, moment(_get(record, col.show, '')).format(_get(col, 'format', 'YYYY-MM-DD'))));
        } else if (_has(col, 'filter') && col.filter === 'dateTime') {
          cell.push(React.createElement("span", {
            key: "'show'"
          }, moment(_get(record, col.show, '')).format(_get(col, 'format', 'YYYY-MM-DD HH:mm'))));
        } else if (_has(col, 'filter') && col.filter === 'unixDate') {
          cell.push(React.createElement("span", {
            key: "'show'"
          }, moment.unix(_get(record, col.show, '')).format(_get(col, 'format', 'YYYY-MM-DD'))));
        } else if (_has(col, 'filter') && col.filter === 'unixDateTime') {
          cell.push(React.createElement("span", {
            key: "'show'"
          }, moment.unix(_get(record, col.show, '')).format(_get(col, 'format', 'YYYY-MM-DD HH:mm'))));
        } else {
          cell.push(React.createElement("span", {
            key: "'show'"
          }, _get(record, col.show, '')));
        }
      } else if (_isArray(col.show)) {
        var value = [];

        _map(col.show, function (field) {
          value.push(React.createElement("span", {
            key: "'show'"
          }, _get(record, field, '')));
        });

        return cell.push(React.createElement("span", {
          key: "'show'"
        }, _compact(value).join(' ')));
      }
    }

    if (_has(col, 'fa')) {
      return React.createElement("div", {
        className: "btn-group",
        role: "group",
        "aria-label": "Basic example"
      }, _map(col.fa, function (item, itemKey) {
        var click = function click() {
          if (_has(item, 'onClick')) {
            var currPage = _this7.props.paginator.currPage;
            item.onClick({
              record: record,
              currPage: currPage,
              router: _this7.props.history,
              dispatch: _this7.props.dispatch
            });
          }
        };

        return React.createElement("button", {
          key: itemKey,
          className: "btn btn-sm",
          onClick: click
        }, React.createElement("i", {
          className: "fa fa-" + item.icon
        }));
      }));
    }

    if (_has(col, 'dropdownButton')) {
      var dropDownItems = this.renderDropDownItems(_get(col, 'dropdownButton'), record);
      cell.push(React.createElement(DropdownButton, {
        key: "dbbutton",
        bsStyle: "default",
        bsSize: "xsmall",
        title: col.name,
        id: 'dropDown' + key
      }, dropDownItems));
    }

    return cell;
  };

  _proto.renderDropDownItems = function renderDropDownItems(buttons, record) {
    var _this8 = this;

    return _map(buttons, function (button, key) {
      var click = function click() {
        if (_has(button, 'onClick')) {
          button.onClick(record, _this8.props.history);
        }
      };

      if (_has(button, 'divider')) {
        return React.createElement(MenuItem, {
          key: key,
          divider: true
        });
      }

      return React.createElement(MenuItem, {
        key: key,
        eventKey: key,
        onSelect: click
      }, button.name);
    });
  };

  _proto.renderPaginator = function renderPaginator() {
    var _this$props$paginator = this.props.paginator,
        currPage = _this$props$paginator.currPage,
        lastPage = _this$props$paginator.lastPage,
        onChange = _this$props$paginator.onChange;
    return React.createElement(Paginator, {
      currPage: currPage,
      lastPage: lastPage,
      onChange: onChange
    });
  };

  _proto.render = function render() {
    var _this9 = this;

    var noRecords = function noRecords() {
      if (_this9.props.records.length === 0) {
        return React.createElement(Alert, {
          bsStyle: "warning"
        }, "No records found.");
      }
    };

    var paged = !_isEmpty(this.props.paginator) ? this.renderPaginator() : '';
    var rows = this.renderRows();
    var records = this.renderRecords();
    return React.createElement("div", null, React.createElement("div", {
      className: "table-responsive"
    }, React.createElement("table", {
      className: "table table-bordered table-condensed table-data"
    }, React.createElement("thead", null, rows), React.createElement("tbody", null, records))), noRecords(), paged);
  };

  return DataTable;
}(Component);

DataTable.contextTypes = {
  router: PropTypes.object.isRequired
};
export { DataTable as default };