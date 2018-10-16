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

  _proto.checkUploader = function checkUploader() {
    return window.plupload !== undefined;
  };

  _proto.runUploader = function runUploader() {
    var self = this;
    this.initUploader();
    this.uploader.init();
    EVENTS.forEach(function (event) {
      var handler = self.props['on' + event];

      if (typeof handler === 'function') {
        self.uploader.bind(event, handler);
      }
    }); // Put the selected files into the current state

    this.uploader.bind('FilesAdded', function (up, files) {
      if (_.get(self.props, 'multi_selection') === false) {
        self.clearAllFiles();
      } else {
        self.clearFailedFiles();
      }

      var f = self.state.files;

      _.map(files, function (file) {
        f.push(file);
      });

      self.setState({
        files: f
      }, function () {
        if (self.props.autoUpload === true) {
          self.uploader.start();
        }
      });
    });
    this.uploader.bind('FilesRemoved', function (up, rmFiles) {
      var stateFiles = self.state.files;

      var files = _.filter(stateFiles, function (file) {
        // console.log(rmFiles, file);
        return -1 !== _.find(rmFiles, {
          id: file.id
        });
      });

      self.setState({
        files: files
      });
    });
    this.uploader.bind('StateChanged', function (up) {
      if (up.state === window.plupload.STARTED && self.state.uploadState === false) {
        self.setState({
          uploadState: true
        });
      }

      if (up.state !== window.plupload.STARTED && self.state.uploadState === true) {
        self.setState({
          uploadState: false
        });
      }
    });
    this.uploader.bind('FileUploaded', function (up, file) {
      var stateFiles = self.state.files;

      _.map(stateFiles, function (val, key) {
        if (val.id === file.id) {
          val.uploaded = true;
          stateFiles[key] = val;
        }
      });

      self.setState({
        files: stateFiles
      }, function () {
        self.removeFile(file.id);
      });
    });
    this.uploader.bind('Error', function (up, err) {
      if (_.isUndefined(err.file) !== true) {
        var stateFiles = self.state.files;

        _.map(stateFiles, function (val, key) {
          if (val.id === err.file.id) {
            val.error = err;
            stateFiles[key] = val;
          }
        });

        self.setState({
          files: stateFiles
        });
      }
    });
    this.uploader.bind('UploadProgress', function (up, file) {
      var stateProgress = self.state.progress;
      stateProgress[file.id] = file.percent;
      self.setState({
        progress: stateProgress
      });
    });
  };

  _proto.componentDidMount = function componentDidMount() {
    var self = this;

    if (this.checkUploader()) {
      this.runUploader();
    } else {
      setTimeout(function () {
        if (self.checkUploader()) {
          self.runUploader();
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
    return this.props.id || 'react_plupload_' + this.id;
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
    var self = this;
    return _.map(this.state.files, function (val) {
      var removeFile = function removeFile(e) {
        e.preventDefault();
        self.removeFile(val.id);
      };

      var delButton = '';

      if (self.state.uploadState === false && val.uploaded !== true) {
        delButton = React.createElement('button', {
          onClick: removeFile,
          className: 'pull-right'
        }, 'X');
      }

      var progressBar = '';

      if (self.state.uploadState === true && val.uploaded !== true && _.isUndefined(val.error)) {
        var percent = self.state.progress[val.id] || 0;
        progressBar = React.createElement('div', {
          className: 'progress'
        }, React.createElement('div', {
          className: 'progress-bar',
          role: 'progressbar',
          'aria-valuenow': percent,
          'aria-valuemin': 0,
          'aria-valuemax': 100,
          style: {
            width: percent + '%'
          }
        }, React.createElement('span', {
          className: 'sr-only'
        }, percent + 'complete')));
      }

      var errorDiv = '';

      if (!_.isUndefined(val.error)) {
        errorDiv = React.createElement('div', {
          className: 'alert alert-danger'
        }, 'Error: ' + val.error.code + ', Message: ' + val.error.message);
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
    var _this2 = this;

    var state = _.filter(this.state.files, function (file) {
      _this2.uploader.removeFile(file.id);
    });

    this.setState({
      files: state
    });
  };

  _proto.clearFailedFiles = function clearFailedFiles() {
    var _this3 = this;

    var state = _.filter(this.state.files, function (file) {
      if (file.error) {
        _this3.uploader.removeFile(file.id);
      }

      return !file.error;
    });

    this.setState({
      files: state
    });
  };

  _proto.removeFile = function removeFile(id) {
    this.uploader.removeFile(id);

    var state = _.filter(this.state.files, function (file) {
      return file.id !== id;
    });

    this.setState({
      files: state
    });
  };

  _proto.doUpload = function doUpload(e) {
    e.preventDefault();
    this.uploader.start();
  };

  _proto.render = function render() {
    var _this4 = this;

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
      className: 'my-list',
      ref: function ref(_ref) {
        return _this4.container = _ref;
      }
    }, React.createElement("ul", {
      className: 'list-unstyled'
    }, list), React.createElement(BrowseButton, propsSelect), React.createElement(UploadButton, propsUpload));
  };

  return Plupload;
}(React.Component);

export default Plupload;