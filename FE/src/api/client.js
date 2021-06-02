import axios from 'axios';
import loading from '../component/Loading.js';

const client = axios.create();

// 요청 인터셉터
client.interceptors.request.use(function (config) {
    // 요청 전에 로딩 오버레이 띄우기
    loading.setState(true);

    return config;
  }, function (error) {
    // 에라 나면 로딩 끄기
    return Promise.reject(error);
  });

// 응답 인터셉터
client.interceptors.response.use(function (response) {
    // 응답 받으면 로딩 끄기
    loading.setState(false);
    
    return response;
  }, function (error) {
    // 응답 에러 시에도 로딩 끄기
    return Promise.reject(error);
  });

export default client;