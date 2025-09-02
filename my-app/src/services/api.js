import { useState, useEffect } from "react";
import axios from "axios";


const api = axios.create({});

api.interceptors.request.use(
  (config) => {

    config.headers.Authorization = "Bearer fake-token";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    alert(error)
    return Promise.reject(error);
  }
);


export default api;