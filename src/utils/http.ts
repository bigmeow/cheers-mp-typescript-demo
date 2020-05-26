import axios, { AxiosError } from "axios";
import mpAdapter from "axios-miniprogram-adapter";
import MyHttp from "typings/MyHttp";
import { Loading } from "./Loadding";
axios.defaults.adapter = mpAdapter;

const request = axios.create({
    baseURL: process.env.CHEERS_MP_API,
    loading: false
} as MyHttp.RequestConfig);

Loading.delay = 300;
const loadingManger = new Loading();
loadingManger.showHandler = () => {
    wx.showLoading({
        title: "请稍等"
    });
};

loadingManger.hideHandler = () => {
    wx.hideLoading();
};

request.interceptors.request.use((config: MyHttp.RequestConfig) => {
    /*  config.headers = {
        token: "在这里给请求塞入token值"
    }; */
    if (config.loading) {
        loadingManger.show();
    }
    return config;
});

request.interceptors.response.use(
    (response: MyHttp.Response): any => {
        if (response.config.loading) {
            loadingManger.hide();
        }
        const res = response.data;
        //  自行处理响应数据
        return res;
    },
    (error: AxiosError) => {
        let message;
        switch (error.response && error.response.status) {
            // 非法的token、或者Token 过期、后端强制token失效
            case 401:
                wx.clearStorageSync();
                // TODO 跳转到登陆页面
                break;
            case 404:
                message = "服务端接口不存在";
                break;
            case 500:
                message = "服务器出错";
                break;
            default:
                message = error.message;
                if (message.includes("timeout")) {
                    message = "请求超时，请稍后重试!";
                } else {
                    message = "其他自定义错误信息";
                }
                break;
        }
        if (message) {
            wx.showToast({
                icon: "none",
                title: message,
                duration: 2500
            });
        }
        return Promise.reject(error);
    }
);

export default request as MyHttp.RequestInstance;
