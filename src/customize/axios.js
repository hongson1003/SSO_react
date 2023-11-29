import axios from "axios";
import axiosRetry from 'axios-retry';


const instance = axios.create({
    baseURL: `${process.env.REACT_APP_SERVICE}`,
    withCredentials: true,
});
axiosRetry(instance, {
    retries: 3,
    retryCondition: (error) => {
        return error?.response?.status === 401 || error?.response?.status === 400;
    },
    retryDelay: (retryCount, error) => {
        return retryCount * 200;
    }
});

// let retryCount = 0;
// const maxRetries = 3; // Số lần retry tối đa
// const retryDelay = 200; // Thời gian chờ giữa các lần retry (500 milliseconds)



// Alter defaults after instance has been created


instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response?.data;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // if (error?.response?.status === 400) {
    //     if (retryCount < maxRetries) {
    //         retryCount++;

    //         // Thực hiện retry sau một khoảng thời gian chờ
    //         await new Promise(resolve => setTimeout(resolve, retryDelay));
    //         // instance.defaults.headers.common['Authorization'] = `${store?.getState()?.account?.userInfo.accessToken}`;
    //         // Gọi lại Axios instance để thực hiện retry
    //         return instance(error.config);
    //     } else {
    //         console.error('Max retries reached. All retries failed');
    //         return Promise.reject('Max retries reached. All retries failed');
    //     }
    // }

    if (error?.response?.data) {
        return error?.response?.data;
    }

    return Promise.reject(error);
});

export default instance;
