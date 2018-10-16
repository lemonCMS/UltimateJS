import React from 'react';
import Wrap from './Wrappers/Wrap';
import DateTimeRender from './Types/DateTime';
import decorator from '../utils/decorator';

export default decorator({type: 'text', component: DateTimeRender})(Wrap);
