import React from 'react';
import Wrap from './Wrappers/Wrap';
import Resource from './Types/Resource';
import decorator from '../utils/decorator';
export default decorator({
  type: 'text',
  component: Resource
})(Wrap);