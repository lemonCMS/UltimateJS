"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _reactPlupload = _interopRequireDefault(require("react-plupload"));

var _Button = _interopRequireDefault(require("react-bootstrap/lib/Button"));

var _Table = _interopRequireDefault(require("react-bootstrap/lib/Table"));

var _clone2 = _interopRequireDefault(require("lodash/clone"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var PluploadBinder =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(PluploadBinder, _React$Component);

  function PluploadBinder() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.renderTable = _this.renderTable.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.addedFiles = _this.addedFiles.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.editRender = _this.editRender.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.fileDelete = _this.fileDelete.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.fileUploaded = _this.fileUploaded.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.stateChange = _this.stateChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.staticRender = _this.staticRender.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.allFiles = [];
    return _this;
  }

  var _proto = PluploadBinder.prototype;

  _proto.stateChange = function stateChange(plupload) {
    if (plupload.state === 2) {
      // Starting with uploading
      this.setState({
        pending: true
      });
      return true;
    }

    this.setState({
      pending: false
    });
  };

  _proto.addedFiles = function addedFiles(plupload, files) {
    var fileList = [];
    (0, _map2.default)(files, function (file) {
      fileList.push(file.name);
    });
  };

  _proto.fileUploaded = function fileUploaded(plupload, file, response) {
    var _this2 = this;

    var uploadResponse = JSON.parse(response.response);

    if ((0, _get2.default)(this.props.field.config, 'multi_selection', true) === false) {
      this.allFiles = [uploadResponse.result];
      this.setState({
        changed: Date.now()
      }, function () {
        _this2.props.input.onChange(_this2.allFiles);
      });
    } else {
      var files = (0, _clone2.default)(this.allFiles);
      files.push(uploadResponse.result);
      this.allFiles = files;
      this.setState({
        changed: Date.now()
      }, function () {
        _this2.props.input.onBlur();

        _this2.props.input.onChange(_this2.allFiles);
      });
    }
  };

  _proto.fileDelete = function fileDelete(index) {
    var _this3 = this;

    this.allFiles = this.props.input.value;
    this.allFiles[index].deleted = 1;
    this.setState({
      changed: Date.now()
    }, function () {
      _this3.props.input.onBlur();

      _this3.props.input.onChange(_this3.allFiles);

      _this3.forceUpdate();
    });
  };

  _proto.editRender = function editRender(files) {
    var _this4 = this;

    if (files.length > 0) {
      return _react.default.createElement(_Table.default, {
        striped: true,
        bordered: true,
        condensed: true,
        hover: true
      }, _react.default.createElement("thead", null, _react.default.createElement("tr", null, _react.default.createElement("th", null, "Bestand"), _react.default.createElement("th", null))), _react.default.createElement("tbody", null, (0, _map2.default)(files, function (file, key) {
        return !file.deleted && _react.default.createElement("tr", {
          key: key
        }, _react.default.createElement("td", null, file.file_original_name, " ", file.deleted), _react.default.createElement("td", null, _react.default.createElement(_Button.default, {
          onClick: function onClick() {
            _this4.fileDelete(key);
          }
        }, _react.default.createElement("i", {
          className: "fa fa-trash-o"
        }))));
      })));
    }
  };

  _proto.staticRender = function staticRender(files) {
    if (files.length > 0) {
      return _react.default.createElement(_Table.default, {
        striped: true,
        bordered: true,
        condensed: true,
        hover: true
      }, _react.default.createElement("thead", null, _react.default.createElement("tr", null, _react.default.createElement("th", null, "Bestand"))), _react.default.createElement("tbody", null, (0, _map2.default)(files, function (file, key) {
        return !file.deleted && _react.default.createElement("tr", {
          key: key
        }, _react.default.createElement("td", null, file.file_original_name, " ", file.deleted));
      })));
    }
  };

  _proto.renderTable = function renderTable() {
    var staticForm = (0, _get2.default)(this.props, 'static', false);
    var files = [];

    if (Array.isArray(this.props.input.value) && this.props.input.value.length > 0) {
      files = this.props.input.value;
    }

    files = (0, _filter2.default)(this.props.input.value, function (file) {
      return !file.deleted;
    });

    if (files.length > 0) {
      return staticForm ? this.staticRender(files) : this.editRender(files);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        field = _this$props.field,
        input = _this$props.input;
    return _react.default.createElement("div", null, _react.default.createElement(_reactPlupload.default, (0, _extends2.default)({
      className: field.className,
      onFileUploaded: this.fileUploaded,
      id: "plupload_" + input.name
    }, field.config)), this.renderTable());
  };

  return PluploadBinder;
}(_react.default.Component);

var _default = function _default(_ref) {
  var input = _ref.input,
      field = _ref.field;
  return _react.default.createElement(PluploadBinder, {
    input: input,
    field: field
  });
};

exports.default = _default;
module.exports = exports["default"];