import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import InputGroup from 'react-bootstrap/lib/InputGroup';

var Search =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Search, _React$Component);

  function Search() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.pushSearch = _this.pushSearch.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.clearSearch = _this.clearSearch.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
    return React.createElement(FormGroup, {
      controlId: "q"
    }, React.createElement(ControlLabel, null, "Zoeken"), React.createElement(InputGroup, null, React.createElement(FormControl, {
      type: "text",
      value: this.state.q,
      placeholder: "Zoeken",
      onChange: this.pushSearch
    }), React.createElement(InputGroup.Button, null, React.createElement(Button, {
      disabled: this.state.q === '',
      onClick: this.clearSearch
    }, React.createElement("i", {
      className: "fa fa-remove"
    })))));
  };

  return Search;
}(React.Component);

export default Search;