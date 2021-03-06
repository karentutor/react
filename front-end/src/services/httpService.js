import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";


axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

// function setJwt(jwt) {
//   axios.defaults.headers.common["x-auth-token"] = jwt;
// }

axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token');

  if ( token != null ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, function(err) {
  return Promise.reject(err);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
