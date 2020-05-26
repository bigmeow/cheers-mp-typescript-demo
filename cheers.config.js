module.exports = {
    compiler: {
        type: "hard",
        options: {
            devToolsDir: require("os").platform() === "darwin" ? "/Applications/wechatwebdevtools.app" : "C:\\Program Files (x86)\\Tencent\\微信web开发者工具",
            version: "v2"
        }
    },
    pluginOptions: {
        router: "src/service/router.ts"
    }
};
