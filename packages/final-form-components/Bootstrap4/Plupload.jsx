import Wrap from './Wrappers/Wrap';
import Plupload from './Types/PluploadBinder';
import decorator from '../utils/decorator';

export default decorator({type: 'text', component: Plupload})(Wrap);
