import router from "@/service/router";
import { Location } from "cheers-mp-router";

/** 规范化处理传参 */
function normalize(_to: Record<string, any> | string) {
    // 字符
    if (typeof _to === "string") {
        if (/^{.+}$/.test(_to)) {
            // 疑似字符串对象
            try {
                _to = JSON.parse(_to as string);
            } catch (error) {
                throw new Error("router-link 组件 to 传参有误");
            }
        } else {
            // 路由名
            _to = { name: _to };
        }
    }
    return _to as Location;
}
Component({
    properties: {
        to: {
            type: Object,
            optionalTypes: [String]
        },
        replace: {
            type: Boolean,
            value: false
        },
        /** 是否是后端传递过来的动态h5 url字符串 */
        h5: {
            type: Boolean,
            value: false
        }
    },
    externalClasses: ["custom-class"],
    methods: {
        handleJump() {
            if (!this.properties.to) {
                throw new Error("router-link 组件必须传入 to 参数");
            }

            const locationConfig = normalize(this.properties.to);

            if (this.properties.replace) {
                locationConfig.replace = true;
            }
            router.push(locationConfig);
        }
    }
});
