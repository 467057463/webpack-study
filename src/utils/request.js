import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://api.mmisme.cn',
  timeout: 40000,
  // headers: { 
  //   'Content-type': 'application/json;charset=UTF-8'
  // },
  // responseType: 'json',
  // withCredentials: false,
  // onDownloadProgress(progressEvent){
  //   const { total, loaded } = progressEvent;
  //   store.app.setPercent(loaded / total)
  // }
})

axiosInstance.interceptors.response.use(response => {
  return response.data.data;
}, error => {
  Promise.reject(error)
})

export default axiosInstance