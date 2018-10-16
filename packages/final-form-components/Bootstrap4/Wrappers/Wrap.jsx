import PropTypes from 'prop-types';
import React from 'react';
import _has from 'lodash/has';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _pick from 'lodash/pick';
import _filter from 'lodash/filter';
import _isFunction from 'lodash/isFunction';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormLabel from 'react-bootstrap/lib/FormLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
// import FormText from 'react-bootstrap/lib/FormText';
// import FormCheck from 'react-bootstrap/lib/FormCheck';
// import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
// import FormGroup from 'react-bootstrap/lib/FormGroup';
// import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/FormText';
import MenuItem from 'react-bootstrap/lib/DropdownItem';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import {Field} from 'react-final-form';

class Wrap extends React.Component {

  constructor() {
    super();
    this.input = {};
    this.custom = {};
    this.dropdownButton = this.dropdownButton.bind(this);
    this.dropDown = this.dropDown.bind(this);
    this.renderField = this.renderField.bind(this);
    this.options = this.options.bind(this);
  }

  options(props) {
    if (props.type === 'select') {
      return this.props.children;
    }
  }

  dropDown(props) {
    const menuItem = [];
    let dropDownTitle = _get(props.field, 'title', null);
    _map(props.field.children, (item, key) => {
      const select = () => {
        this.input.onBlur();
        this.input.onChange(item.props.value);
      };
      if (item.props.selected && !props.input.value) {
        dropDownTitle = item.props.children;
        menuItem.push(<MenuItem key={key} onSelect={select}>{item.props.children}</MenuItem>);
      } else {
        if (String(this.input.value) === String(item.props.value)) {
          dropDownTitle = item.props.children;
        }
        menuItem.push(<MenuItem key={key} onSelect={select}>{item.props.children}</MenuItem>);
      }
      if (item.props.selected) {
        menuItem.push(<MenuItem key={key + '_div'} divider />);
      }

    });
    return {dropDownTitle, menuItem};
  }


  dropdownButton(props, isStatic) {
    const {dropDownTitle, menuItem} = this.dropDown(props);
    const size = _get(props.field, 'size', this.props.size);
    const thisSize = () => {
      if (size !== 'medium') {
        return ({size: size});
      }
    };

    let disabled = false;
    if (props.field && props.field.disabled && _isFunction(props.field.disabled)) {
      disabled = this.context.checkCondition(props.field.disabled());
    }

    if (isStatic === true || disabled === true) {
      return (<FormControl plaintext readOnly defaultValue={dropDownTitle || _get(props.field, 'placeholder')} />);
    }

    return (
      <DropdownButton key={this.input.name}
        onClick={(event) => {
          event.preventDefault();
        }}
        {...thisSize()}
        title={dropDownTitle || _get(props.field, 'placeholder')}
        id={'input-dropdown-addon' + this.input.name}>
        {menuItem}
      </DropdownButton>
    );
  }

  renderField(props) {
    const {input, help, meta: {touched, error, submitError, submitFailed, valid}, ...custom} = props;
    this.input = input;
    const size = _get(props.field, 'size', this.props.size);
    if (props.field && props.field.hidden && _isFunction(props.field.hidden)) {
      if (this.context.checkCondition(props.field.hidden, _get(props, 'parent')) === true) {
        return null;
      }
    } else if (props.field && props.field.show && _isFunction(props.field.show)) {
      if (this.context.checkCondition(props.field.show, _get(props, 'parent')) !== true) {
        return null;
      }
    }

    const thisSize = () => {
      if (size !== 'medium') {
        return ({size: size});
      }
    };

    const labelSize = () => {
      if (_has(props.field, 'labelSize')) {
        return props.field.labelSize;
      }
    };

    const fieldSize = () => {
      if (_has(props.field, 'fieldSize')) {
        return props.field.fieldSize;
      }
    };

    const validationState = () => {
      if ((touched && error) || (submitFailed && submitError)) {
        return true;
      }

      if (touched && valid) {
        return false;
      }
    };


    const add = _pick(custom, ['type', 'placeholder', 'rows', 'cols', 'bsClass']);
    if (add.type === 'select') {
      add.as = 'select';
    }
    if (custom.field.disabled && _isFunction(custom.field.disabled)) {
      add.disabled = this.context.checkCondition(custom.field.disabled, _get(props, 'parent'));
    }

    if (props.field.placeholder) {
      add.placeholder = props.field.placeholder;
    }
    if (props.field.cols) {
      add.cols = props.field.cols;
    }
    if (props.field.rows) {
      add.rows = props.field.rows;
    }
    if (props.field.bsClass) {
      add.bsClass = props.field.bsClass;
    }

    add.isInvalid =  touched && validationState();
    add.isValid =  touched && !validationState();

    const component = () => {
      // Render custom component
      if (this.props.component) {
        const Comp = this.props.component;
        return (<Comp {...props} />);
      }

      if (this.context.isStatic === true || _get(props.field, 'static', false) === true) {
        const value = () => {
          if (props.field.type === 'select') {
            return _map(_filter(props.field.options, {value: this.input.value}), (item, key) => {
              return (<span key={key}>{item.desc}</span>);
            });
          }
          return this.input.value;
        };

        switch (props.type) {
          case 'dropdown':
            return this.dropdownButton(props, true);
          default: {
            return (<FormControl plaintext readOnly defaultValue={value()} />);
          }
        }
      }

      switch (props.field.type) {
        case 'dropdown':
          return this.dropdownButton(props, false);
        case 'textarea':
          return (<FormControl
            as="textarea"
            {...input}
            {...add}
          />);
        case 'select':
          return (<FormControl
            as="select"
            {...input}
            {...add}
          >{this.options(props)}</FormControl>);
        default:
          return (<FormControl
            {...input}
            {...add}
          />);
      }
    };

    const buttonBefore = () => {
      if (_has(props.field, 'buttonBefore')) {
        return (<InputGroup.Prepand>{props.field.buttonBefore()}</InputGroup.Prepand>);
      }
    };

    const buttonAfter = () => {
      if (_has(props.field, 'buttonAfter')) {
        return (<InputGroup.Append>{props.field.buttonAfter()}</InputGroup.Append>);
      }
    };

    const addonBefore = () => {
      if (_has(props.field, 'addonBefore')) {
        return (<InputGroup.Prepend>{_get(props.field, 'addonBefore')}</InputGroup.Prepend>);
      }
    };

    const addonAfter = () => {
      if (_has(props.field, 'addonAfter')) {
        return (<InputGroup.Append>{_get(props.field, 'addonAfter')}</InputGroup.Append>);
      }
    };

    const getField = () => {
      if (_has(props.field, 'addonBefore')
        || _has(props.field, 'addonAfter')
        || _has(props.field, 'buttonBefore')
        || _has(props.field, 'buttonAfter')
      ) {

        return (
          <InputGroup isInvalid={validationState()}>
            {buttonBefore()}
            {addonBefore()}
            {component()}
            {addonAfter()}
            {buttonAfter()}
          </InputGroup>
        );
      }

      return component();
    };

    if (props.type === 'dropdown' && !_has(props.field, 'label')) {
      return getField();
    }

    const getLabel = () => {
      if (props.field.label) {
        return (
          <FormLabel column {...labelSize()}>
            {props.field.label}
          </FormLabel>
        );
      }
    };
    const rendered = (<FormGroup
      as={Row}
      {...thisSize()}
    >
      {getLabel()}
      <Col {...fieldSize()}>
        {getField()}
        {props.field.help && (!touched || (!submitError && !error)) && <HelpBlock>{props.field.help}</HelpBlock>}
        {((touched && error) || (submitFailed && submitError)) && <FormControl.Feedback type={'invalid'}>{(submitError || error)}</FormControl.Feedback>}
      </Col>
    </FormGroup>);

    if(this.context.debug) {
      return (
        <div style={{position: 'relative'}}>
          {rendered}
        </div>
      );
    }

    return rendered;
  }

  render() {
    const {name, ...rest} = this.props;
    return (
      <Field
        component={this.renderField}
        type={this.props.type}
        name={name}
        field={rest}
      />
    );
  }
}

Wrap.propTypes = {
  'field': PropTypes.object,
  'size': PropTypes.string,
  'addField': PropTypes.func,
  'static': PropTypes.bool,
  'name': PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  component: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.bool])
};
Wrap.contextTypes = {
  debug: PropTypes.bool.isRequired,
  checkCondition: PropTypes.func.isRequired,
  isStatic: PropTypes.bool.isRequired
};
Wrap.defaultProps = {};

export default Wrap;
