"use client";

import axios from "axios";

import { APP_CONSTANT } from "../constants/AppConstant";

axios.defaults.baseURL = APP_CONSTANT.baseUrl;
axios.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);
export { axios };
