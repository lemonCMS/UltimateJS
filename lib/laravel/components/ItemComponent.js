"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _reactRouter = require("react-router");

var _actions = require("../redux/store/actions");

var _class;

var TestComponent = (0, _reactRouter.withRouter)(_class =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(TestComponent, _React$Component);

  function TestComponent(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;

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
                    promise = _this.context.store.dispatch((0, _actions.post)(_this.key, "" + _this.apiPath, payload));
                  } else {
                    promise = _this.context.store.dispatch((0, _actions.update)(_this.key, "" + _this.apiPath, _this.context.router.route.match.params.id, payload));
                  }

                  promise.then(function (ret) {
                    if (ret && ret.hasOwnProperty('error')) {
                      resolve(ret.error);
                    }

                    if (_this.state.newItem) {
                      _this.props.history.push(_this.path + "/" + (0, _get2.default)(ret, 'id', 'new') + "/edit");
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

    _this.edit = _this.edit.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onSubmit = _this.onSubmit.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = TestComponent.prototype;

  _proto.componentWillMount = function componentWillMount() {
    var edit = (0, _has2.default)(this.props.history.location.pathname.match(/(edit|confirm|close)$/g), [0]);
    var id = edit ? this.props.route.match.params.id : null;
    this.setState({
      id: id,
      edit: edit,
      confirm: (0, _has2.default)(this.props.history.location.pathname.match(/confirm$/g), [0]),
      close: (0, _has2.default)(this.props.history.location.pathname.match(/close/g), [0]),
      newItem: (0, _has2.default)(this.props.history.location.pathname.match(/new/g), [0])
    });
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps() {
    var edit = (0, _has2.default)(this.props.history.location.pathname.match(/(edit|confirm|close)$/g), [0]);
    var id = edit ? this.props.route.match.params.id : null;
    this.setState({
      id: id,
      edit: (0, _has2.default)(this.props.history.location.pathname.match(/(edit|confirm|close)$/g), [0]),
      confirm: (0, _has2.default)(this.props.history.location.pathname.match(/confirm$/g), [0]),
      close: (0, _has2.default)(this.props.history.location.pathname.match(/close/g), [0]),
      newItem: (0, _has2.default)(this.props.history.location.pathname.match(/new/g), [0])
    });
  };

  _proto.edit = function edit() {
    this.props.history.push(this.path + "/" + this.props.params.id + "/edit");
  };

  _proto.render = function render() {
    return _react.default.createElement("div", null, "Please implement render method in own class.");
  };

  return TestComponent;
}(_react.default.Component)) || _class;

TestComponent.defaultProps = {};
var _default = TestComponent;
exports.default = _default;
module.exports = exports["default"];