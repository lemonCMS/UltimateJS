import _partial from 'lodash/partial';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Paginator extends React.Component {

  constructor() {
    super();
    this.prevPageClicked = this.prevPageClicked.bind(this);
    this.nextPageClicked = this.nextPageClicked.bind(this);
    this.pageClicked = this.pageClicked.bind(this);
    this.renderPrevious = this.renderPrevious.bind(this);
    this.renderNext = this.renderNext.bind(this);
    this.renderDots = this.renderDots.bind(this);
    this.renderNumber = this.renderNumber.bind(this);
    this.renderRange = this.renderRange.bind(this);
    this.renderStart = this.renderStart.bind(this);
    this.renderFinish = this.renderFinish.bind(this);
    this.renderAdjacentRange = this.renderAdjacentRange.bind(this);
    this.renderSlider = this.renderSlider.bind(this);
    this.renderFinish = this.renderFinish.bind(this);
    this.renderFinish = this.renderFinish.bind(this);
    this.renderFinish = this.renderFinish.bind(this);
  }

  prevPageClicked(evt) {
    evt.preventDefault();

    if (this.props.currPage > 1) {
      this.props.onChange(Number(this.props.currPage) - 1);
    }
  }

  nextPageClicked(evt) {
    evt.preventDefault();

    if (this.props.currPage < this.props.lastPage) {
      this.props.onChange(Number(this.props.currPage) + 1);
    }
  }

  pageClicked(pageNum, evt) {
    evt.preventDefault();

    if (this.props.currPage !== pageNum) {
      this.props.onChange(Number(pageNum));
    }
  }

  renderPrevious() {
    const classStr = classNames({disabled: this.props.currPage <= 1});
    return (
      <li key="prev" className={classStr}>
        <a href="#" rel="prev" onClick={this.prevPageClicked}>«</a>
      </li>
    );
  }

  renderNext() {
    const classStr = classNames({disabled: this.props.currPage >= this.props.lastPage});
    return (
      <li key="next" className={classStr}>
        <a href="#" rel="next" onClick={this.nextPageClicked}>»</a>
      </li>
    );
  }

  renderDots(key) {
    return <li key={key} className="disabled"><span>...</span></li>;
  }

  renderNumber(num) {
    const classStr = classNames({active: this.props.currPage === num});
    return (
      <li key={num} className={classStr}>
        <a href="#" onClick={_partial(this.pageClicked, num)}>{num}</a>
      </li>
    );
  }

  renderRange(firstNum, lastNum) {
    const pages = [];
    for (let i = firstNum; i <= lastNum; i++) {
      pages.push(this.renderNumber(i));
    }
    return pages;
  }

  renderStart() {
    const pages = this.renderRange(1, 2);
    pages.push(this.renderDots('dots-start'));

    return pages;
  }

  renderFinish() {
    const pages = this.renderRange(this.props.lastPage - 1, this.props.lastPage);
    pages.unshift(this.renderDots('dots-finish'));

    return pages;
  }

  renderAdjacentRange() {
    return this.renderRange(this.props.currPage - 2, this.props.currPage + 2);
  }

  renderSlider() {
    let sliderNum = 6;
    let buttons = [];

    if (this.props.currPage <= sliderNum) {
      buttons = buttons.concat(this.renderRange(1, sliderNum + 2));
      buttons = buttons.concat(this.renderFinish());
    }

    else if (this.props.currPage >= this.props.lastPage - sliderNum) {
      buttons = buttons.concat(this.renderStart());
      buttons = buttons.concat(this.renderRange(this.props.lastPage - sliderNum, this.props.lastPage));
    }

    else {
      buttons = buttons.concat(this.renderStart());
      buttons = buttons.concat(this.renderAdjacentRange());
      buttons = buttons.concat(this.renderFinish());
    }

    return buttons;
  }

  render() {
    let buttons = [];

    buttons.push(this.renderPrevious());

    if (this.props.lastPage <= 13) {
      buttons = buttons.concat(this.renderRange(1, this.props.lastPage));
    }
    else {
      buttons = buttons.concat(this.renderSlider());
    }

    buttons.push(this.renderNext());

    return (
      <div className="text-center">
        <ul className="pagination">{buttons}</ul>
      </div>
    );
  }
}

Paginator.propTypes = {
  currPage: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Paginator;
