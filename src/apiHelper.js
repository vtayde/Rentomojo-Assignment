import axios from "axios";

function getDefaultUrl(env = "development") {
  return "https://jsonplaceholder.typicode.com/";
}

axios.defaults.baseURL = getDefaultUrl(process.env.NODE_ENV);

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    const errorObject = {
      code: error.response.status,
      ...error.response.data
    };
    // Do something with response error
    return Promise.reject(errorObject);
  }
);

export default function api({ url, method, data = null, params = {} }) {
  const requestConfig =
    data === null ? { url, method, params } : { url, method, data, params };
  console.log(`API Name : ${url} with data`);
  return new Promise((resolve, reject) => {
    axios
      .request(requestConfig)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}
