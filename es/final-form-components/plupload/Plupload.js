import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _ from 'lodash';
import React from 'react';
import BrowseButton from './BrowseButton';
import UploadButton from './UploadButton';
var EVENTS = ['PostInit', 'Browse', 'Refresh', 'StateChanged', 'QueueChanged', 'OptionChanged', 'BeforeUpload', 'UploadProgress', 'FileFiltered', 'FilesAdded', 'FilesRemoved', 'FileUploaded', 'ChunkUploaded', 'UploadComplete', 'Destroy', 'Error'];

var Plupload =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Plupload, _React$Component);

  function Plupload() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.id = new Date().valueOf();
    _this.state = {
      files: [],
      uploadState: false,
      progress: {}
    };
    _this.runUploader = _this.runUploader.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getComponentId = _this.getComponentId.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.refresh = _this.refresh.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.initUploader = _this.initUploader.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.list = _this.list.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.clearAllFiles = _this.clearAllFiles.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.clearFailedFiles = _this.clearFailedFiles.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.removeFile = _this.removeFile.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.doUpload = _this.doUpload.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
      if (_.get(_this3.props, 'multi_selection') === false) {
        _this3.clearAllFiles();
      } else {
        _this3.clearFailedFiles();
      }

      _this3.setState(function (prevState) {
        var stateFiles = prevState.files;

        _.map(files, function (file) {
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

        _.map(stateFiles, function (val, key) {
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
      if (_.isUndefined(err.file) !== true) {
        _this3.setState(function (prevState) {
          var stateFiles = prevState.files;

          _.map(stateFiles, function (val, key) {
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
    this.uploader = new window.plupload.Uploader(_.extend({
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

    return _.map(this.state.files, function (val) {
      var removeFile = function removeFile(e) {
        e.preventDefault();

        _this4.removeFile(val.id);
      };

      var delButton = '';

      if (_this4.state.uploadState === false && val.uploaded !== true) {
        delButton = React.createElement("button", {
          type: "button",
          onClick: removeFile,
          className: "float-right"
        }, "X");
      }

      var progressBar = '';

      if (_this4.state.uploadState === true && val.uploaded !== true && _.isUndefined(val.error)) {
        var percent = _this4.state.progress[val.id] || 0;
        progressBar = React.createElement('div', {
          className: 'progress'
        }, React.createElement('div', {
          className: 'progress-bar',
          role: 'progressbar',
          'aria-valuenow': percent,
          'aria-valuemin': 0,
          'aria-valuemax': 100,
          style: {
            width: percent + "%"
          }
        }, React.createElement('span', {
          className: 'sr-only'
        }, percent + "complete")));
      }

      var errorDiv = '';

      if (!_.isUndefined(val.error)) {
        errorDiv = React.createElement('div', {
          className: 'alert alert-danger'
        }, "Error: " + val.error.code + ", Message: " + val.error.message);
      }

      var bgSuccess = '';

      if (!_.isUndefined(val.uploaded)) {
        bgSuccess = 'bg-success';
      }

      return React.createElement('li', {
        key: val.id
      }, React.createElement('p', {
        className: bgSuccess
      }, val.name, ' ', delButton), progressBar, errorDiv);
    });
  };

  _proto.clearAllFiles = function clearAllFiles() {
    var _this5 = this;

    this.setState(function (prevState) {
      var stateFiles = _.filter(prevState.files, function (file) {
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
      var stateFiles = _.filter(prevState.files, function (file) {
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

      var stateFiles = _.filter(prevState.files, function (file) {
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
    return React.createElement("div", {
      id: "plupload_" + this.props.id,
      className: "my-list",
      ref: function ref(_ref) {
        _this8.container = _ref;
        return null;
      }
    }, React.createElement("ul", {
      className: "list-unstyled"
    }, list), React.createElement(BrowseButton, propsSelect), React.createElement(UploadButton, propsUpload));
  };

  return Plupload;
}(React.Component);

export default Plupload;