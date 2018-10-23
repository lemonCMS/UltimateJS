import _extends from "@babel/runtime/helpers/esm/extends";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import React from 'react';
import _get from 'lodash/get';
import _has from 'lodash/has';
import { withRouter } from 'react-router';
import { post, update } from '../redux/store/actions';
export default (function (custom) {
  return function (Component) {
    var _dec, _class;

    var config = Object.assign({}, {
      api: null,
      key: null
    }, custom);

    if (!config.api) {
      console.warn('Path to your `api` is required');
    }

    if (!config.key) {
      console.warn('Redux store `key` is required');
    }

    var WrappedComponent = (_dec = withRouter(), _dec(_class =
    /*#__PURE__*/
    function (_React$Component) {
      _inheritsLoose(WrappedComponent, _React$Component);

      function WrappedComponent(props) {
        var _this;

        _this = _React$Component.call(this, props) || this;

        _this.onSubmit =
        /*#__PURE__*/
        function () {
          var _ref = _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee(payload) {
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    return _context.abrupt("return", new Promise(function (resolve) {
                      var promise = null;

                      if (!_this.state.edit) {
                        promise = _this.props.dispatch(post(config.key, "" + config.api, payload));
                      } else {
                        promise = _this.props.dispatch(update(config.key, "" + config.api, _this.props.match.params.id, payload));
                      }

                      promise.then(function (ret) {
                        if (ret && ret.hasOwnProperty('error')) {
                          resolve(ret.error);
                        }

                        if (_this.state.newItem) {
                          _this.props.history.push(_this.props.history.location.pathname + "/" + _get(ret, 'id', 'new') + "/edit");
                        }

                        resolve();
                      }).catch(function (err) {
                        if (err && err.hasOwnProperty('error')) {
                          resolve(err.error);
                        }

                        resolve(err);
                      });
                    }));

                  case 1:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }();

        _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.state = {
          id: null,
          edit: false,
          confirm: false,
          close: false,
          newItem: false,
          location: ''
        };
        return _this;
      }

      WrappedComponent.getDerivedStateFromProps = function getDerivedStateFromProps(props) {
        var pathname = props.history.location.pathname,
            params = props.match.params;

        var edit = _has(pathname.match(/(edit|confirm|close)$/g), [0]);

        var id = edit ? params.id : null;
        return {
          id: id,
          edit: edit,
          confirm: _has(pathname.match(/confirm$/g), [0]),
          close: _has(pathname.match(/close/g), [0]),
          newItem: _has(pathname.match(/new/g), [0])
        };
      };

      var _proto = WrappedComponent.prototype;

      _proto.render = function render() {
        var props = _extends({}, this.props, this.state, {
          onSubmit: this.onSubmit
        });

        return React.createElement(Component, props);
      };

      return WrappedComponent;
    }(React.Component)) || _class);
    return WrappedComponent;
  };
});