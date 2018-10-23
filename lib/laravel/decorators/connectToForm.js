"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _reactRouter = require("react-router");

var _actions = require("../redux/store/actions");

var _default = function _default(custom) {
  return function (Component) {
    var _class;

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

    var WrappedComponent = (0, _reactRouter.withRouter)(_class =
    /*#__PURE__*/
    function (_React$Component) {
      (0, _inheritsLoose2.default)(WrappedComponent, _React$Component);

      function WrappedComponent(props) {
        var _this;

        _this = _React$Component.call(this, props) || this;

        _this.onSubmit =
        /*#__PURE__*/
        function () {
          var _ref = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee(payload) {
            return _regenerator.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    return _context.abrupt("return", new Promise(function (resolve) {
                      var promise = null;

                      if (!_this.state.edit) {
                        promise = _this.props.dispatch((0, _actions.post)(config.key, "" + config.api, payload));
                      } else {
                        promise = _this.props.dispatch((0, _actions.update)(config.key, "" + config.api, _this.props.match.params.id, payload));
                      }

                      promise.then(function (ret) {
                        if (ret && ret.hasOwnProperty('error')) {
                          resolve(ret.error);
                        }

                        if (_this.state.newItem) {
                          _this.props.history.push(_this.props.history.location.pathname + "/" + (0, _get2.default)(ret, 'id', 'new') + "/edit");
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

        _this.onSubmit = _this.onSubmit.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
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
        var edit = (0, _has2.default)(pathname.match(/(edit|confirm|close)$/g), [0]);
        var id = edit ? params.id : null;
        return {
          id: id,
          edit: edit,
          confirm: (0, _has2.default)(pathname.match(/confirm$/g), [0]),
          close: (0, _has2.default)(pathname.match(/close/g), [0]),
          newItem: (0, _has2.default)(pathname.match(/new/g), [0])
        };
      };

      var _proto = WrappedComponent.prototype;

      _proto.render = function render() {
        var props = (0, _extends2.default)({}, this.props, this.state, {
          onSubmit: this.onSubmit
        });
        return _react.default.createElement(Component, props);
      };

      return WrappedComponent;
    }(_react.default.Component)) || _class;

    return WrappedComponent;
  };
};

exports.default = _default;
module.exports = exports["default"];