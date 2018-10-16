"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _BrowseButton = _interopRequireDefault(require("./BrowseButton"));

var _UploadButton = _interopRequireDefault(require("./UploadButton"));

var EVENTS = ['PostInit', 'Browse', 'Refresh', 'StateChanged', 'QueueChanged', 'OptionChanged', 'BeforeUpload', 'UploadProgress', 'FileFiltered', 'FilesAdded', 'FilesRemoved', 'FileUploaded', 'ChunkUploaded', 'UploadComplete', 'Destroy', 'Error'];

var Plupload =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Plupload, _React$Component);

  function Plupload() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.id = new Date().valueOf();
    _this.state = {
      files: [],
      uploadState: false,
      progress: {}
    };
    _this.runUploader = _this.runUploader.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.getComponentId = _this.getComponentId.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.refresh = _this.refresh.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.initUploader = _this.initUploader.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.list = _this.list.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.clearAllFiles = _this.clearAllFiles.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.clearFailedFiles = _this.clearFailedFiles.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.removeFile = _this.removeFile.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.doUpload = _this.doUpload.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.container = null;
    return _this;
  }

  var _proto = Plupload.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (this.checkUploader()) {
      this.runUploader();
    } else {
      setTimeout(function () {
        if (_this2.checkUploader()) {
          _this2.runUploader();
        } else {
          console.warn('Plupload has not initialized');
        }
      }, 500);
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this.checkUploader()) {
      this.refresh();
    }
  };

  _proto.getComponentId = function getComponentId() {
    return this.props.id || "react_plupload_" + this.id;
  };

  _proto.runUploader = function runUploader() {
    var _this3 = this;

    this.initUploader();
    this.uploader.init();
    EVENTS.forEach(function (event) {
      var handler = _this3.props["on" + event];

      if (typeof handler === 'function') {
        _this3.uploader.bind(event, handler);
      }
    }); // Put the selected files into the current state

    this.uploader.bind('FilesAdded', function (up, files) {
      if (_lodash.default.get(_this3.props, 'multi_selection') === false) {
        _this3.clearAllFiles();
      } else {
        _this3.clearFailedFiles();
      }

      _this3.setState(function (prevState) {
        var stateFiles = prevState.files;

        _lodash.default.map(files, function (file) {
          stateFiles.push(file);
        });

        return {
          files: stateFiles
        };
      }, function () {
        if (_this3.props.autoUpload === true) {
          _this3.uploader.start();
        }
      });
    });
    /* this.uploader.bind('FilesRemoved', (up, rmFiles) => {
    }); */

    this.uploader.bind('StateChanged', function (up) {
      if (up.state === window.plupload.STARTED && _this3.state.uploadState === false) {
        _this3.setState({
          uploadState: true
        });
      }

      if (up.state !== window.plupload.STARTED && _this3.state.uploadState === true) {
        _this3.setState({
          uploadState: false
        });
      }
    });
    this.uploader.bind('FileUploaded', function (up, file) {
      _this3.setState(function (prevState) {
        var stateFiles = prevState.files;

        _lodash.default.map(stateFiles, function (val, key) {
          if (val.id === file.id) {
            val.uploaded = true;
            stateFiles[key] = val;
          }
        });

        _this3.removeFile(file.id);

        return {
          files: stateFiles
        };
      });
    });
    this.uploader.bind('Error', function (up, err) {
      if (_lodash.default.isUndefined(err.file) !== true) {
        _this3.setState(function (prevState) {
          var stateFiles = prevState.files;

          _lodash.default.map(stateFiles, function (val, key) {
            if (val.id === err.file.id) {
              val.error = err;
              stateFiles[key] = val;
              stateFiles[key] = val;
            }
          });

          return {
            files: stateFiles
          };
        });
      }
    });
    this.uploader.bind('UploadProgress', function (up, file) {
      _this3.setState(function (prevState) {
        var stateProgress = prevState.progress;
        stateProgress[file.id] = file.percent;
        return {
          progress: stateProgress
        };
      });
    });
  };

  _proto.checkUploader = function checkUploader() {
    return window.plupload !== undefined;
  };

  _proto.refresh = function refresh() {
    // Refresh to append events to buttons again.
    this.uploader.refresh();
  };

  _proto.initUploader = function initUploader() {
    this.uploader = new window.plupload.Uploader(_lodash.default.extend({
      container: "plupload_" + this.props.id,
      runtimes: 'html5',
      multipart: true,
      chunk_size: '1mb',
      browse_button: this.getComponentId(),
      url: '/upload'
    }, this.props));
  }; // Display selected files


  _proto.list = function list() {
    var _this4 = this;

    return _lodash.default.map(this.state.files, function (val) {
      var removeFile = function removeFile(e) {
        e.preventDefault();

        _this4.removeFile(val.id);
      };

      var delButton = '';

      if (_this4.state.uploadState === false && val.uploaded !== true) {
        delButton = _react.default.createElement("button", {
          type: "button",
          onClick: removeFile,
          className: "float-right"
        }, "X");
      }

      var progressBar = '';

      if (_this4.state.uploadState === true && val.uploaded !== true && _lodash.default.isUndefined(val.error)) {
        var percent = _this4.state.progress[val.id] || 0;
        progressBar = _react.default.createElement('div', {
          className: 'progress'
        }, _react.default.createElement('div', {
          className: 'progress-bar',
          role: 'progressbar',
          'aria-valuenow': percent,
          'aria-valuemin': 0,
          'aria-valuemax': 100,
          style: {
            width: percent + "%"
          }
        }, _react.default.createElement('span', {
          className: 'sr-only'
        }, percent + "complete")));
      }

      var errorDiv = '';

      if (!_lodash.default.isUndefined(val.error)) {
        errorDiv = _react.default.createElement('div', {
          className: 'alert alert-danger'
        }, "Error: " + val.error.code + ", Message: " + val.error.message);
      }

      var bgSuccess = '';

      if (!_lodash.default.isUndefined(val.uploaded)) {
        bgSuccess = 'bg-success';
      }

      return _react.default.createElement('li', {
        key: val.id
      }, _react.default.createElement('p', {
        className: bgSuccess
      }, val.name, ' ', delButton), progressBar, errorDiv);
    });
  };

  _proto.clearAllFiles = function clearAllFiles() {
    var _this5 = this;

    this.setState(function (prevState) {
      var stateFiles = _lodash.default.filter(prevState.files, function (file) {
        _this5.uploader.removeFile(file.id);
      });

      return {
        files: stateFiles
      };
    });
  };

  _proto.clearFailedFiles = function clearFailedFiles() {
    var _this6 = this;

    this.setState(function (prevState) {
      var stateFiles = _lodash.default.filter(prevState.files, function (file) {
        if (file.error) {
          _this6.uploader.removeFile(file.id);
        }

        return !file.error;
      });

      return {
        files: stateFiles
      };
    });
  };

  _proto.removeFile = function removeFile(id) {
    var _this7 = this;

    this.setState(function (prevState) {
      _this7.uploader.removeFile(id);

      var stateFiles = _lodash.default.filter(prevState.files, function (file) {
        return file.id !== id;
      });

      return {
        files: stateFiles
      };
    });
  };

  _proto.doUpload = function doUpload(e) {
    e.preventDefault();
    this.uploader.start();
  };

  _proto.render = function render() {
    var _this8 = this;

    var propsSelect = {
      id: this.getComponentId(),
      type: 'button',
      content: this.props.buttonSelect || 'Browse'
    };
    var propsUpload = {
      onClick: this.doUpload,
      type: 'button',
      content: this.props.buttonUpload || 'Upload'
    };
    if (this.state.files.length === 0) propsUpload.disabled = 'disabled';
    var list = this.list();
    return _react.default.createElement("div", {
      id: "plupload_" + this.props.id,
      className: "my-list",
      ref: function ref(_ref) {
        _this8.container = _ref;
        return null;
      }
    }, _react.default.createElement("ul", {
      className: "list-unstyled"
    }, list), _react.default.createElement(_BrowseButton.default, propsSelect), _react.default.createElement(_UploadButton.default, propsUpload));
  };

  return Plupload;
}(_react.default.Component);

var _default = Plupload;
exports.default = _default;
module.exports = exports["default"];