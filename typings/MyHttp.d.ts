import { AxiosRequestConfig, AxiosResponse } from "axios";
/** ajax 请求模块 */
declare namespace MyHttp {
    /** 请求配置 */
    interface RequestConfig extends AxiosRequestConfig {
        /**
         * 请求时是否显示加载器,默认false
         */
        loading?: boolean;
    }

    interface Response<T = any> extends AxiosResponse {
        data: ServerResponseJSON<T>;
        config: RequestConfig;
    }

    /** 请求接口数据响应的文本数据结构 */
    interface ServerResponseJSON<T = any> {
        /** 错误对象 */
        error?: {
            /** 错误code */
            code: string;
            /** 错误日志输出(仅开发人员看) */
            details: string;
            /** 错误友好提示(针对用户) */
            messages: string;
        } | null;
        /** 服务器返回的业务数据,出错时为null */
        result: T;
        /** 接口是否请求成功 */
        success: boolean;
        /** 接口是否已经授权 */
        unAuthorizedRequest: boolean;
    }

    /** 请求函数实例 */
    interface RequestInstance {
        (config: RequestConfig): Promise<any>;
    }
}
export default MyHttp;
