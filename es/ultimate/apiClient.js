import axios from 'axios';
var buildTarget = typeof window === 'undefined' ? 'server' : 'client';
export default function apiClient(req) {
  var instance = axios.create({
    baseURL: (buildTarget === 'server' ? process.env.RAZZLE_PROXY_HOST : '') + process.env.RAZZLE_PROXY_PATH
  });
  instance.interceptors.request.use(function (conf) {
    if (buildTarget === 'server') {
      if (req.cookies && req.cookies.get('token')) {
        conf.headers.authorization = "Bearer " + req.cookies.get('token');
      }

      if (req.header('authorization')) {
        conf.headers.authorization = req.header('authorization');
      }
    }

    return conf;
  }, function (error) {
    return Promise.reject(error);
  });
  instance.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    return Promise.reject(error.response ? error.response.data : error);
  });
  return instance;
}