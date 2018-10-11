let _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

exports.__esModule = true;
exports.default = apiClient;

let _axios = _interopRequireDefault(require('axios'));

function apiClient(req) {
  let instance = _axios.default.create({
    baseURL:
      (process.env.BUILD_TARGET === 'server'
        ? process.env.RAZZLE_PROXY_HOST
        : '') + process.env.RAZZLE_PROXY_PATH,
  });

  instance.interceptors.request.use(
    conf => {
      if (process.env.BUILD_TARGET === 'server') {
        if (req.cookies && req.cookies.get('token')) {
          conf.headers.authorization = `Bearer ${req.cookies.get('token')}`;
        }

        if (req.header('authorization')) {
          conf.headers.authorization = req.header('authorization');
        }
      }

      return conf;
    },
    error => Promise.reject(error),
  );
  instance.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error.response ? error.response.data : error),
  );
  return instance;
}

module.exports = exports.default;
