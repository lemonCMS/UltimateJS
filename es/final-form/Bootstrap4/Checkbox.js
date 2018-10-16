import Wrap from './Wrappers/Wrap';
import Checkbox from './Types/Checkbox';
import decorator from '../utils/decorator';
export default decorator({
  type: 'text',
  component: Checkbox
})(Wrap);