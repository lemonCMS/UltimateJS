import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";

/* global tinymce */
// TinyMCE semi-controlled component.
//
// Limitations/Notes
// * `tinymce` be defined in the global scope.
// * `ignoreUpdatesWhenFocused` - sometimes TinyMCE has issues with cursor placement. This component tries very
//     hard to avoid such issues, but if the come up, this prop might help. Set it to true and the component
//     will only update the TinyMCE editor from new props when it does not have focus.
// * `onChange` - this is the main event you will want to handle. Note: unlike normal React onChange events,
//     it does not use a SyntheticEvent based event. It simply passes up the changed content.
// * events - the component listens for several events and maps them to something more React-like (ex. blur
//     => onBlur). Any event that changes the content should trigger both the original event plus onChange.
//     The event handler will receive the original tinymce event as a param.
//     [init, activate, deactivate, focus, blur, hide, remove reset, show, submit]
// * level of control - tinymce does not trigger an event on every character change. We could try binding to
//     a keyboard event. However, we have found that, in practice, getting changes in TinyMCE time is good enoug.
//     If you are trying to write a control that need per-character eventing, ex. a component that allows
//     multiple editors to work on the input at the same time, tinymce may not be right for you.
import React from 'react';
import uuid from 'uuid';
var DIRECT_PASSTHROUGH_EVENTS = ['Activate', 'Deactivate', 'Focus', 'Hide', 'Init', 'Remove', 'Reset', 'Show', 'Submit', 'Click'];
var PSEUDO_HIDDEN = {
  position: 'absolute',
  left: -200,
  top: -200,
  height: 0
};

var TinyMCEInput =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TinyMCEInput, _React$Component);

  function TinyMCEInput() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.setupPassthroughEvents = _this.setupPassthroughEvents.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setupEditor = _this.setupEditor.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.createMCEContextForComponent = _this.createMCEContextForComponent.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.initTinyMCE = _this.initTinyMCE.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.clearDropOverride = _this.clearDropOverride.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.flagDropOverride = _this.flagDropOverride.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.isDropOverrideFlagged = _this.isDropOverrideFlagged.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.syncChange = _this.syncChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.triggerEventHandler = _this.triggerEventHandler.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.checkForChanges = _this.checkForChanges.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onTinyMCEChange = _this.onTinyMCEChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onTinyMCEBlur = _this.onTinyMCEBlur.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onTinyMCEUndo = _this.onTinyMCEUndo.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onTinyMCERedo = _this.onTinyMCERedo.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onTinyMCEDrop = _this.onTinyMCEDrop.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onTextareaChange = _this.onTextareaChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getContainerID = _this.getContainerID.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      id: uuid()
    };
    _this.component = null;
    _this.componentId = null;
    return _this;
  }

  var _proto = TinyMCEInput.prototype;

  _proto.getComponentID = function getComponentID() {
    return this.componentId || (this.componentId = this.component.getAttribute('id'));
  };

  _proto.getContainerID = function getContainerID() {
    return this.props.id || this.state.id;
  };

  _proto.componentDidMount = function componentDidMount() {
    this.setState({
      value: this.props.value || ''
    });
    this.initStartTime = Date.now();

    if (typeof tinymce !== 'undefined') {
      this.initTinyMCE();
    } else {
      this.initTimeout = setTimeout(this.initTinyMCE, 100);
    }

    this.updateInterval = setInterval(this.checkForChanges, this.props.pollInterval);
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this.props.focus) {
      var editor = tinymce.get(this.getComponentID());

      if (editor) {
        editor.focus();
      }
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (typeof tinymce === 'undefined') {
      tinymce.remove(this.getComponentID());
      clearTimeout(this.initTimeout);
      clearInterval(this.updateInterval);
      this.initTimeout = undefined;
      this.initStartTime = undefined;
    }
  };

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      if (typeof tinymce !== 'undefined') {
        var editor = tinymce.get(this.getComponentID());

        if (editor) {
          if (!this.props.ignoreUpdatesWhenFocused || tinymce.focusedEditor !== editor || this.isDropOverrideFlagged()) {
            var bookmark = editor.selection.getBookmark(2, true);
            editor.setContent(nextProps.value);
            editor.selection.moveToBookmark(bookmark);
          }
        }

        this.setState({
          value: nextProps.value
        });
      }
    }
  };

  _proto.setupPassthroughEvents = function setupPassthroughEvents(editor) {
    var _this2 = this;

    DIRECT_PASSTHROUGH_EVENTS.map(function (event) {
      editor.on(event.toLowerCase(), function (tinyMCEEvent) {
        var handler = _this2.props['on' + event];

        if (typeof handler === 'function') {
          handler(tinyMCEEvent);
        }
      });
      return null;
    });
    var handlers = this.props.otherEventHandlers;
    Object.keys(handlers).map(function (key, index) {
      editor.on(index, key);
      return null;
    });
  };

  _proto.setupEditor = function setupEditor(editor) {
    editor.on('change', this.onTinyMCEChange);
    editor.on('blur', this.onTinyMCEBlur);
    editor.on('drop', this.onTinyMCEDrop);
    editor.on('undo', this.onTinyMCEUndo);
    editor.on('redo', this.onTinyMCERedo);
    this.setupPassthroughEvents(editor);

    if (this.props.onSetupEditor) {
      this.props.onSetupEditor(editor);
    }

    if (this.props.focus) {
      editor.focus();
    }

    this.initTimeout = undefined;
  };

  _proto.createMCEContextForComponent = function createMCEContextForComponent() {
    var tinymceConfig = Object.assign({}, this.props.tinymceConfig, {
      target: this.component,
      setup: this.setupEditor
    });
    tinymce.init(tinymceConfig);
  };

  _proto.initTinyMCE = function initTinyMCE() {
    var currentTime = Date.now();

    if (typeof tinymce === 'undefined') {
      if (currentTime - this.initStartTime > this.props.maxInitWaitTime) {
        this.initTimeout = undefined;
      } else {
        this.initTimeout = setTimeout(this.initTinyMCE, 100);
      }
    } else {
      this.createMCEContextForComponent();
      this.initTimeout = undefined;
    }
  };

  _proto.clearDropOverride = function clearDropOverride() {
    this._tempDropOverride = undefined;
    var editor = tinymce.get(this.getComponentID());

    if (editor) {
      this.syncChange(editor.getContent());
    }
  };

  _proto.flagDropOverride = function flagDropOverride() {
    this._tempDropOverride = true;

    if (this._tempDropOverrideTimeout) {
      clearTimeout(this.clearDropOverride);
    }

    this._tempDropOverrideTimeout = setTimeout(this.clearDropOverride, 250);
  };

  _proto.isDropOverrideFlagged = function isDropOverrideFlagged() {
    return this._tempDropOverride;
  };

  _proto.syncChange = function syncChange(newValue) {
    if (newValue !== this.state.value) {
      if (this.props.onChange) {
        this.props.onChange(newValue);
      }

      this.setState({
        value: newValue
      });
    }
  };

  _proto.triggerEventHandler = function triggerEventHandler(handler, event) {
    if (handler) {
      handler(event);
    }
  };

  _proto.checkForChanges = function checkForChanges() {
    if (typeof tinymce !== 'undefined') {
      var editor = tinymce.get(this.getComponentID());

      if (tinymce.focusedEditor === editor) {
        var content = editor.getContent();

        if (content !== this.state.value) {
          this.syncChange(content);
        }
      }
    }
  };

  _proto.onTinyMCEChange = function onTinyMCEChange(tinyMCEEvent) {
    this.syncChange(tinyMCEEvent.target.getContent());
  };

  _proto.onTinyMCEBlur = function onTinyMCEBlur(tinyMCEEvent) {
    this.triggerEventHandler(this.props.onBlur, tinyMCEEvent);

    if (this.props.ignoreUpdatesWhenFocused) {
      // if we have been ignoring updates while focused (to preserve cursor position)
      // sync them now that we no longer have focus.
      tinyMCEEvent.target.setContent(this.state.value);
    }
  };

  _proto.onTinyMCEUndo = function onTinyMCEUndo(tinyMCEEvent) {
    this.triggerEventHandler(this.props.onUndo, tinyMCEEvent);
    this.syncChange(tinyMCEEvent.target.getContent());
  };

  _proto.onTinyMCERedo = function onTinyMCERedo(tinyMCEEvent) {
    this.triggerEventHandler(this.props.onRedo, tinyMCEEvent);
    this.syncChange(tinyMCEEvent.target.getContent());
  };

  _proto.onTinyMCEDrop = function onTinyMCEDrop() {
    // We want to process updates just after a drop, even if processUpdatesWhenFocused
    // is false. The processUpdatesWhenFocused flag exists to keep the cursor from
    // jumping around, and we do not cares so much if the cursor jumps after dropping
    // an image because that is a mouse event. However, ignoring updates right after a
    // drop means that anything that relies on knowing the content has changed is
    // won't actually know.
    this.flagDropOverride();
  };

  _proto.onTextareaChange = function onTextareaChange(e) {
    // should only be called when tinymce failed to load and we are getting changes directly in the textarea (fallback mode?)
    this.syncChange(e.target.value);
  };

  _proto.render = function render() {
    var _this3 = this;

    // the textarea is controlled by tinymce... and react, neither of which agree on the value
    // solution: keep a separate input element, controlled by just react, that will actually be submitted
    var Component = this.props.component;
    return React.createElement("div", {
      className: this.props.className,
      style: this.props.style
    }, React.createElement("input", {
      key: 0,
      type: "hidden",
      name: this.props.name,
      defaultValue: this.state.value,
      readOnly: true
    }), React.createElement(Component, _extends({
      key: 1 // id={this.getContainerID()}
      ,
      defaultValue: this.state.value,
      onChange: this.onTextareaChange,
      rows: this.props.rows,
      style: this.props.tinymceConfig.inline ? {} : PSEUDO_HIDDEN
    }, this.props.textareaProps, {
      ref: function ref(_ref) {
        return _this3.component = _ref;
      }
    })));
  };

  return TinyMCEInput;
}(React.Component);

TinyMCEInput.defaultProps = {
  tinymceConfig: {},
  maxInitWaitTime: 20000,
  pollInterval: 1000,
  textareaProps: {},
  otherEventHandlers: {},
  onChange: function onChange() {},
  component: 'textarea'
};
export default TinyMCEInput;