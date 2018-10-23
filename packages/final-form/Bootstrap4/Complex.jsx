import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _has from 'lodash/has';
import React from 'react';
import {FieldArray} from 'react-final-form-arrays';
import Card from 'react-bootstrap/lib/Card';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _isFunction from 'lodash/isFunction';
import _pick from 'lodash/pick';


class Complex extends React.Component {
  constructor() {
    super();
    this.renderComplex = this.renderComplex.bind(this);
    this.push = null;
    this.length = 0;
    this.renderChildren = this.renderChildren.bind(this);
    this.state = {
      collapsed: null
    };
  }

  componentDidMount() {
    if (this.props.mandatory === true && (this.length === undefined || this.length === 0)) {
      this.push({});
    }
  }

  renderChildren(name, count, remove, move, complexIndex, staticField, disabled) {
    const buttons = () => {
      const returnButtons = [];
      const extra = _pick(this.props.moveBtn, ['className', 'title', 'variant','size']);
      if (staticField !== true) {
        if (complexIndex > 0 && count > 1) {
          returnButtons.push(
            <Button
              key={2}
              onClick={() => move(complexIndex, complexIndex - 1)}
              disabled={disabled}
              type="button"
              {...extra}
            >
              <FontAwesomeIcon icon="chevron-up" />
            </Button>
          );
        }
        if (count > 1 && complexIndex < count - 1) {
          returnButtons.push(
            <Button
              key={3}
              onClick={() => move(complexIndex, complexIndex + 1)}
              disabled={disabled}
              type="button"
              {...extra}
            >
              <FontAwesomeIcon icon="chevron-down" />
            </Button>
          );
        }

        if ((this.props.mandatory && count > 1) || (!this.props.mandatory && count > 0)) {
          const extraRm = _pick(this.props.removeBtn, ['className', 'title', 'variant','size']);

          returnButtons.push(
            <Button
              key={1}
              onClick={() => remove(complexIndex)}
              disabled={disabled}
              type="button"
              {...extraRm}
            >
              <FontAwesomeIcon icon="trash" />
            </Button>
          );
        }
      }
      return returnButtons;
    };

    const {header, footer} = _get(this.props, 'card', {});
    const headerDiv = (<div className="clearfix">
      <ButtonGroup>
        {buttons()}
      </ButtonGroup>
      {header}
    </div>);

    const component = () => {
      if (this.props.render) {
        return this.props.render(name);
      }

      return React.Children.map(this.props.children, child =>
        React.cloneElement(child, {name: `${name}.${child.props.name}`, parent: name}));
    };

    if (this.props.row) {
      return (
        <Row>
          <Col {...this.props.left}>
            {component()}
          </Col>
          <Col {...this.props.right}>
            {headerDiv}
          </Col>
        </Row>
      );
    }

    return (
      <Card className="rfg-cmplx-btn-flds mb-2">
        <Card.Header>
          <div className={'float-right'}>
            {headerDiv}
          </div>
        </Card.Header>
        <Card.Body>
          {component()}
        </Card.Body>
        {footer && (<Card.Footer>{footer}</Card.Footer>)}
      </Card>
    );
  }

  renderComplex(props) {
    const {fields, meta: {touched, error}} = props;
    const staticField = props.static;

    this.push = props.fields.push;
    this.length = props.fields.length;

    const thisSize = () => {
      if (this.props.size !== 'medium') {
        return ({size: this.props.size});
      }
    };

    const labelSize = () => {
      if (_has(this.props, 'labelSize')) {
        return this.props.labelSize;
      }
    };

    const fieldSize = () => {
      if (_has(this.props, 'fieldSize')) {
        return this.props.fieldSize;
      }
    };

    const toggle = () => {
      let state = false;
      if (this.state.collapsed === null) {
        state = !(this.props.collapsed && this.props.collapsed === true);
      } else if (this.state.collapsed === false) {
        state = true;
      }
      this.setState({'collapsed': state}, () => {
        // this.props.formChange('itemsx', state);
      });
    };
    if (this.props.label) {
      if (this.state.collapsed === true || (this.state.collapsed === null && this.props.collapsed && this.props.collapsed === true)) {
        return (
          <Row className="rfg-cmplx rfg-cmplx-collapsed form-group">
            <Col {...labelSize()}>
              <Button type="button" onClick={toggle} variant="link" {...thisSize()}>
                {'+ '}
                {this.props.label}
              </Button>
            </Col>
          </Row>
        );
      }
    }

    let disabled = false;
    if (this.props && this.props.disabled && _isFunction(this.props.disabled)) {
      disabled = this.context.checkCondition(this.props.disabled());
    }
    const renderAddButton = () => {
      if (_get(this.props, 'multiple', true) === true || fields.length === 0) {
        const variant = () => {
          if (_get(this.props.addBtn, 'variant') && _get(this.props.addBtn, 'variant') !== 'default') {
            return ({variant: _get(this.props.addBtn, 'variant')});
          }
        };
        return (
          <div className="rfg-cmplx-btn-add">
            {staticField !== true && <Button
              type="button"
              onClick={() => fields.push({})}
              disabled={disabled}
              {...thisSize()}
              {...variant()}
              className={_get(this.props.addBtn, 'className')}
            >
              {_get(this.props.addBtn, 'label', 'toevoegen')}</Button>
            }
            {touched && error && <span>{error}</span>}
          </div>
        );
      }
    };

    return (
      <Row className="rfg-cmplx rfg-cmplx-collapsed form-group">
        {this.props.label &&
        <Col {...labelSize()}>
          <Button type="button" onClick={toggle} variant="link" {...thisSize()}>
            {'- '}
            {this.props.label}
          </Button>
        </Col>}
        <Col {...fieldSize()}>
          {fields.map((field, key) => {
            return (
              <div key={key} className="rfg-cmplx-fields">
                {this.renderChildren(field, fields.length, fields.remove, fields.move, key, staticField, disabled, this.props.mandatory)}
              </div>
            );
          })}
          {renderAddButton()}
        </Col>
      </Row>
    );
  }

  render() {
    if (this.props && this.props.hidden && _isFunction(this.props.hidden)) {
      if (this.context.checkCondition(this.props.hidden) === true) {
        return null;
      }
    } else if (this.props && this.props.show && _isFunction(this.props.show)) {
      if (this.context.checkCondition(this.props.show) !== true) {
        return null;
      }
    }

    return (
      <FieldArray
        component={this.renderComplex}
        name={this.props.name}
        collapsed={this.state.collapsed}
        subscription={this.props.subscription || {values: true, valid: true, invalid: true, length: true}}
      />
    );
  }
}

Complex.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  show: PropTypes.func,
  hidden: PropTypes.func,
  disabled: PropTypes.func,
  collapsed: PropTypes.bool,
  render: PropTypes.func,
  moveBtn: PropTypes.object,
  removeBtn: PropTypes.object,
  addBtn: PropTypes.object,
  labelSize: PropTypes.object,
  fieldSize: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  row: PropTypes.bool,
  mandatory: PropTypes.bool
};
Complex.defaultProps = {
  row: false,
  mandatory: false,
  multiple: true
};

Complex.contextTypes = {
  checkCondition: PropTypes.func,
  isStatic: PropTypes.bool
};

export default Complex;

