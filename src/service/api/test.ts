import request from "@/utils/http";
import MyHttp from "typings/MyHttp";

/**
 * 获取分类
 */
export function getAllType(config?: MyHttp.RequestConfig) {
    return request({
        method: "GET",
        url: `api/saleCategory/all`,
        ...config
    });
}
