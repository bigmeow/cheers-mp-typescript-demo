# miniprogram-ts-quickstart

## 前置准备

-   开发者工具迭代快，为减少踩坑，请使用[最新的稳定版微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/stable.html)
-   由于脚手架使用了开发者工具自带的命令行，注意首先需要在开发者工具的设置 -> 安全设置中开启服务端口;
-   将 `project.config.json` 的`appid`修改成自己项目的 `appid`,并确保开发者工具已经是登录状态

## 使用

```bash
npm i
# 或者
yarn install
```

运行

```bash
npm run uat
```

## 命令说明

本 quick-demo 假设使用者拥有 2 个开发环境：测试环境和生产环境；测试环境自己开发用，生产用于发布使用，故提供了下面四个 scripts 命令：

```json
{
    //开发时使用，会启动监听模式
    "uat": "cheers-mp-service serve --mode uat --open", // 读取.env.uat文件的环境变量
    "prd": "cheers-mp-service serve --open", // 读取.env 文件的环境变量

    // 发布时使用，会压缩代码并自动上传代码作为体验版
    "build:uat": "cheers-mp-service build --mode uat --upload",
    "build:prd": "cheers-mp-service build --upload"
}
```

## 相关文档

脚手架文档： https://cheers-mp.com

脚手架路由插件： https://github.com/bigmeow/cheers-mp/tree/master/packages/cheers-mp-plugin-router

vant 小程序组件地址： https://youzan.github.io/vant-weapp/#/intro

路由文档： https://github.com/bigmeow/cheers-mp-router#readme

富文本框插件 https://jin-yufeng.github.io/Parser/#/

绘制海报 https://github.com/Kujiale-Mobile/Painter

## 其它

-   git config core.ignorecase false `git` 大小写不敏感问题
