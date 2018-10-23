"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _FormGroup = _interopRequireDefault(require("react-bootstrap/lib/FormGroup"));

var _ControlLabel = _interopRequireDefault(require("react-bootstrap/lib/ControlLabel"));

var _FormControl = _interopRequireDefault(require("react-bootstrap/lib/FormControl"));

var _Button = _interopRequireDefault(require("react-bootstrap/lib/Button"));

var _InputGroup = _interopRequireDefault(require("react-bootstrap/lib/InputGroup"));

var Search =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Search, _React$Component);

  function Search() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.pushSearch = _this.pushSearch.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.clearSearch = _this.clearSearch.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      q: '',
      skip: 0
    };
    return _this;
  }

  var _proto = Search.prototype;

  _proto.componentWillMount = function componentWillMount() {
    this.setState({
      q: this.props.query,
      skip: 0
    });
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.state.skip === 0) {
      this.setState({
        q: nextProps.query
      });
    }

    if (this.state.skip > 0) {
      this.setState({
        skip: this.state.skip - 1
      });
    }
  };

  _proto.pushSearch = function pushSearch(e) {
    var _this2 = this;

    var value = e.target.value;
    this.setState({
      q: value,
      skip: 6
    }, function () {
      _this2.props.pushSearch(value);
    });
  };

  _proto.clearSearch = function clearSearch() {
    this.setState({
      q: ''
    }, this.props.pushSearch(''));
  };

  _proto.render = function render() {
    return _react.default.createElement(_FormGroup.default, {
      controlId: "q"
    }, _react.default.createElement(_ControlLabel.default, null, "Zoeken"), _react.default.createElement(_InputGroup.default, null, _react.default.createElement(_FormControl.default, {
      type: "text",
      value: this.state.q,
      placeholder: "Zoeken",
      onChange: this.pushSearch
    }), _react.default.createElement(_InputGroup.default.Button, null, _react.default.createElement(_Button.default, {
      disabled: this.state.q === '',
      onClick: this.clearSearch
    }, _react.default.createElement("i", {
      className: "fa fa-remove"
    })))));
  };

  return Search;
}(_react.default.Component);

var _default = Search;
exports.default = _default;
module.exports = exports["default"];