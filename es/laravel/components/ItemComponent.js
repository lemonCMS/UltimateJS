import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import React from 'react';
import _get from 'lodash/get';
import _has from 'lodash/has';
import { post, update } from '../redux/store/actions';

var TestComponent =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TestComponent, _React$Component);

  function TestComponent(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;

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
                    promise = _this.context.store.dispatch(post(_this.key, "" + _this.apiPath, payload));
                  } else {
                    promise = _this.context.store.dispatch(update(_this.key, "" + _this.apiPath, _this.context.router.route.match.params.id, payload));
                  }

                  promise.then(function (ret) {
                    if (ret && ret.hasOwnProperty('error')) {
                      resolve(ret.error);
                    }

                    if (_this.state.newItem) {
                      _this.context.router.history.push(_this.path + "/" + _get(ret, 'id', 'new') + "/edit");
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

    _this.edit = _this.edit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = TestComponent.prototype;

  _proto.componentWillMount = function componentWillMount() {
    var edit = _has(this.context.router.history.location.pathname.match(/(edit|confirm|close)$/g), [0]);

    var id = edit ? this.context.router.route.match.params.id : null;
    this.setState({
      id: id,
      edit: edit,
      confirm: _has(this.context.router.history.location.pathname.match(/confirm$/g), [0]),
      close: _has(this.context.router.history.location.pathname.match(/close/g), [0]),
      newItem: _has(this.context.router.history.location.pathname.match(/new/g), [0])
    });
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps() {
    var edit = _has(this.context.router.history.location.pathname.match(/(edit|confirm|close)$/g), [0]);

    var id = edit ? this.context.router.route.match.params.id : null;
    this.setState({
      id: id,
      edit: _has(this.context.router.history.location.pathname.match(/(edit|confirm|close)$/g), [0]),
      confirm: _has(this.context.router.history.location.pathname.match(/confirm$/g), [0]),
      close: _has(this.context.router.history.location.pathname.match(/close/g), [0]),
      newItem: _has(this.context.router.history.location.pathname.match(/new/g), [0])
    });
  };

  _proto.edit = function edit() {
    this.context.router.push(this.path + "/" + this.props.params.id + "/edit");
  };

  _proto.render = function render() {
    return React.createElement("div", null, "Please implement render method in own class.");
  };

  return TestComponent;
}(React.Component);

TestComponent.defaultProps = {};
export default TestComponent;