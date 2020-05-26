import router from "@/service/router";

Component({
    properties: {
        /** 是否使用导航头 */
        showNavBar: {
            type: Boolean,
            value: true
        },
        /** 导航头标题 */
        title: String,
        /** 是否显示返回按钮 */
        showBack: {
            type: Boolean,
            value: true
        },
        /** 是否显示返回主页按钮 */
        showBackHome: {
            type: Boolean,
            value: false
        },
        /** 是否自行处理返回事件，默认false; 若为true,则需要自行监听组件的back事件处理返回动作 */
        customeBack: {
            type: Boolean,
            value: false
        },
        /** 当前页面是否是 tabBar 页面( tabbar 页面不显示“返回”、“前往主页“ 按钮) */
        tabbar: Boolean
    },
    externalClasses: ["page-class", "content-class"],
    data: {
        isLogin: false
    },
    options: {
        styleIsolation: "isolated",
        multipleSlots: true
    },
    lifetimes: {
        attached() {
            if (!this.properties.tabbar) {
                const pagesLength = getCurrentPages().length;
                if (pagesLength === 1) {
                    this.setData({
                        showBackHome: true,
                        showBack: false
                    });
                }
            }
        }
    },
    methods: {
        handleBack() {
            if (this.properties.customeBack) {
                this.triggerEvent("back");
                return;
            }
            router.back();
        },
        handleBackHome() {
            router.push({ name: "store-home" });
        }
    }
});
