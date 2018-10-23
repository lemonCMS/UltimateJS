"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _partial2 = _interopRequireDefault(require("lodash/partial"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var Paginator =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Paginator, _React$Component);

  function Paginator() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.prevPageClicked = _this.prevPageClicked.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.nextPageClicked = _this.nextPageClicked.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.pageClicked = _this.pageClicked.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderPrevious = _this.renderPrevious.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderNext = _this.renderNext.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderDots = _this.renderDots.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderNumber = _this.renderNumber.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderRange = _this.renderRange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderStart = _this.renderStart.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderFinish = _this.renderFinish.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderAdjacentRange = _this.renderAdjacentRange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderSlider = _this.renderSlider.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderFinish = _this.renderFinish.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderFinish = _this.renderFinish.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderFinish = _this.renderFinish.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Paginator.prototype;

  _proto.prevPageClicked = function prevPageClicked(evt) {
    evt.preventDefault();

    if (this.props.currPage > 1) {
      this.props.onChange(Number(this.props.currPage) - 1);
    }
  };

  _proto.nextPageClicked = function nextPageClicked(evt) {
    evt.preventDefault();

    if (this.props.currPage < this.props.lastPage) {
      this.props.onChange(Number(this.props.currPage) + 1);
    }
  };

  _proto.pageClicked = function pageClicked(pageNum, evt) {
    evt.preventDefault();

    if (this.props.currPage !== pageNum) {
      this.props.onChange(Number(pageNum));
    }
  };

  _proto.renderPrevious = function renderPrevious() {
    var classStr = (0, _classnames.default)({
      disabled: this.props.currPage <= 1
    });
    return _react.default.createElement("li", {
      key: "prev",
      className: classStr
    }, _react.default.createElement("a", {
      href: "#",
      rel: "prev",
      onClick: this.prevPageClicked
    }, "\xAB"));
  };

  _proto.renderNext = function renderNext() {
    var classStr = (0, _classnames.default)({
      disabled: this.props.currPage >= this.props.lastPage
    });
    return _react.default.createElement("li", {
      key: "next",
      className: classStr
    }, _react.default.createElement("a", {
      href: "#",
      rel: "next",
      onClick: this.nextPageClicked
    }, "\xBB"));
  };

  _proto.renderDots = function renderDots(key) {
    return _react.default.createElement("li", {
      key: key,
      className: "disabled"
    }, _react.default.createElement("span", null, "..."));
  };

  _proto.renderNumber = function renderNumber(num) {
    var classStr = (0, _classnames.default)({
      active: this.props.currPage === num
    });
    return _react.default.createElement("li", {
      key: num,
      className: classStr
    }, _react.default.createElement("a", {
      href: "#",
      onClick: (0, _partial2.default)(this.pageClicked, num)
    }, num));
  };

  _proto.renderRange = function renderRange(firstNum, lastNum) {
    var pages = [];

    for (var i = firstNum; i <= lastNum; i++) {
      pages.push(this.renderNumber(i));
    }

    return pages;
  };

  _proto.renderStart = function renderStart() {
    var pages = this.renderRange(1, 2);
    pages.push(this.renderDots('dots-start'));
    return pages;
  };

  _proto.renderFinish = function renderFinish() {
    var pages = this.renderRange(this.props.lastPage - 1, this.props.lastPage);
    pages.unshift(this.renderDots('dots-finish'));
    return pages;
  };

  _proto.renderAdjacentRange = function renderAdjacentRange() {
    return this.renderRange(this.props.currPage - 2, this.props.currPage + 2);
  };

  _proto.renderSlider = function renderSlider() {
    var sliderNum = 6;
    var buttons = [];

    if (this.props.currPage <= sliderNum) {
      buttons = buttons.concat(this.renderRange(1, sliderNum + 2));
      buttons = buttons.concat(this.renderFinish());
    } else if (this.props.currPage >= this.props.lastPage - sliderNum) {
      buttons = buttons.concat(this.renderStart());
      buttons = buttons.concat(this.renderRange(this.props.lastPage - sliderNum, this.props.lastPage));
    } else {
      buttons = buttons.concat(this.renderStart());
      buttons = buttons.concat(this.renderAdjacentRange());
      buttons = buttons.concat(this.renderFinish());
    }

    return buttons;
  };

  _proto.render = function render() {
    var buttons = [];
    buttons.push(this.renderPrevious());

    if (this.props.lastPage <= 13) {
      buttons = buttons.concat(this.renderRange(1, this.props.lastPage));
    } else {
      buttons = buttons.concat(this.renderSlider());
    }

    buttons.push(this.renderNext());
    return _react.default.createElement("div", {
      className: "text-center"
    }, _react.default.createElement("ul", {
      className: "pagination"
    }, buttons));
  };

  return Paginator;
}(_react.default.Component);

var _default = Paginator;
exports.default = _default;
module.exports = exports["default"];