import axios from 'axios';

const buildTarget = typeof window === 'undefined' ? 'server' : 'client';

export default function apiClient(req) {
  const instance = axios.create({
    baseURL:
      (buildTarget === 'server' ? process.env.RAZZLE_PROXY_HOST : '') +
      process.env.RAZZLE_PROXY_PATH,
  });

  instance.interceptors.request.use(
    conf => {
      if (buildTarget === 'server') {
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
