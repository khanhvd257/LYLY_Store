import axios from 'axios'
// import https from "https"
import qs from 'qs'
// Tạo một phiên bản Axios đã cấu hình với các tùy chọn chung

const BASE_URL = 'http://127.0.0.1:8000/api'
const service = axios.create({
  timeout: 10000,
  baseURL: BASE_URL,
  // httpsAgent: new https.Agent({
  //   rejectUnauthorized: false,
  // }),
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: params =>
    qs.stringify(params, {
      arrayFormat: 'repeat',
    }),
})
service.interceptors.request.use(
  config => {
    const { loading } = config
    const isPutPost = config.method === 'put' || config.method === 'post'
    const isJson = config.headers['Content-Type'] === 'application/json'
    const isFile = config.headers['Content-Type'] === 'multipart/form-data'
    if (config.method == "get" && config.params) {
      // Remove empty value query
      Object.keys(config.params).forEach(key => {
        if (["", null, undefined].includes(config.params[key])) {
          delete config.params[key]
        }
      })
      config.params = {
        ...config.params,
      }
    }
    // if (isPutPost && config.url == '/oauth2/token') {
    //   let oldPass = config.data.get('password')
    //   config.data.set('password', hashPass(oldPass))
    // }
    if (isPutPost && isJson) {
      config.data = JSON.stringify(config.data)
    }
    if (isPutPost && !isFile && !isJson) {
      config.data = qs.stringify(config.data, {
        arrayFormat: 'repeat',
      })
    }
    let accessToken = localStorage.getItem('access_token')
    if (accessToken && config.needToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken
    }

    return config
  },
  error => {
    Promise.reject(error)
  },
)
const closeLoading = target => {
  if (!target.config || !target.config.loading) return true;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      target.config.loading.hide();
      resolve();
    }, 200);
  });
};

service.interceptors.response.use(
  async response => {
    await closeLoading(response);

    return response.data;
  },
  async error => {
    // if (process.server) return Promise.reject(error);
    await closeLoading(error);
    const errorResponse = error.response || {};
    const errorData = errorResponse.data || {};

    if (errorResponse.status === 401) {
      console.log(errorData.message);
    }
     if (errorResponse.status === 404) {
      // Message.error({content: errorData.message || 'Bad request', duration: 5})
       console.log(errorResponse.data);
    } else if (errorResponse.status == 402) {
       console.log(errorResponse.data);
    } else if (errorResponse.status == 500){
       console.log(errorResponse.data);
    }
    return Promise.reject(error);
  }
);
const handleGetToken = () => {
  // this.service.
}
export const Method = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
}
export default function request(options) {
  return service(options)
}
