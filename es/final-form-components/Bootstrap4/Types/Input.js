import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
export default (function (_ref) {
  var input = _ref.input,
      field = _ref.field;
  return React.createElement(FormControl, _extends({
    type: field.type
  }, input));
});