import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import React from 'react';
import Plupload from 'react-plupload';
import Button from 'react-bootstrap/lib/Button';
import Table from 'react-bootstrap/lib/Table';
import _clone from 'lodash/clone';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _filter from 'lodash/filter';

var PluploadBinder =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PluploadBinder, _React$Component);

  function PluploadBinder() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.renderTable = _this.renderTable.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.addedFiles = _this.addedFiles.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.editRender = _this.editRender.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.fileDelete = _this.fileDelete.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.fileUploaded = _this.fileUploaded.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.stateChange = _this.stateChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.staticRender = _this.staticRender.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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

    _map(files, function (file) {
      fileList.push(file.name);
    });
  };

  _proto.fileUploaded = function fileUploaded(plupload, file, response) {
    var _this2 = this;

    var uploadResponse = JSON.parse(response.response);

    if (_get(this.props.field.config, 'multi_selection', true) === false) {
      this.allFiles = [uploadResponse.result];
      this.setState({
        changed: Date.now()
      }, function () {
        _this2.props.input.onChange(_this2.allFiles);
      });
    } else {
      var files = _clone(this.allFiles);

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
      return React.createElement(Table, {
        striped: true,
        bordered: true,
        condensed: true,
        hover: true
      }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "Bestand"), React.createElement("th", null))), React.createElement("tbody", null, _map(files, function (file, key) {
        return !file.deleted && React.createElement("tr", {
          key: key
        }, React.createElement("td", null, file.file_original_name, " ", file.deleted), React.createElement("td", null, React.createElement(Button, {
          onClick: function onClick() {
            _this4.fileDelete(key);
          }
        }, React.createElement("i", {
          className: "fa fa-trash-o"
        }))));
      })));
    }
  };

  _proto.staticRender = function staticRender(files) {
    if (files.length > 0) {
      return React.createElement(Table, {
        striped: true,
        bordered: true,
        condensed: true,
        hover: true
      }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "Bestand"))), React.createElement("tbody", null, _map(files, function (file, key) {
        return !file.deleted && React.createElement("tr", {
          key: key
        }, React.createElement("td", null, file.file_original_name, " ", file.deleted));
      })));
    }
  };

  _proto.renderTable = function renderTable() {
    var staticForm = _get(this.props, 'static', false);

    var files = [];

    if (Array.isArray(this.props.input.value) && this.props.input.value.length > 0) {
      files = this.props.input.value;
    }

    files = _filter(this.props.input.value, function (file) {
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
    return React.createElement("div", null, React.createElement(Plupload, _extends({
      className: field.className,
      onFileUploaded: this.fileUploaded,
      id: "plupload_" + input.name
    }, field.config)), this.renderTable());
  };

  return PluploadBinder;
}(React.Component);

export default (function (_ref) {
  var input = _ref.input,
      field = _ref.field;
  return React.createElement(PluploadBinder, {
    input: input,
    field: field
  });
});