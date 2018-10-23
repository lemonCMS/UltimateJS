import Wrap from './Wrappers/Wrap';
import TinyMceInput from './Types/TinyMceBinder';
import decorator from '../utils/decorator';
export default decorator({
  type: 'text',
  component: TinyMceInput
})(Wrap);