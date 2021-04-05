import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: process.env.API_BASE_URL,
  // timeout: 40000,
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

export default axiosInstance