import Router, { RouteConfig } from "cheers-mp-router";

const routeConfigList: RouteConfig[] = [
    { name: "home", path: "pages/tabbar/home/index", isTab: true },
    { name: "shopping-cart", path: "pages/tabbar/shopping-cart/index", isTab: true },
    { name: "store-test", path: "packageB/store-test/index" },
    { name: "img-test", path: "pages/img-test/index" }
];

const subPackageRouteConfigList: RouteConfig[] = [{ name: "test", path: "packageA/pages/test/index" }];

const router = new Router({ routes: routeConfigList.concat(subPackageRouteConfigList) });
// router.beforeEach((to, from, next) => {
//     // console.log("当前路由", from);
//     // console.log("即将前往的路由", to);
//     // console.log("beforeEach1");
//     // setTimeout(() => {
//     //   if (to.name === "product-details") {
//     //     console.log("拦截前往商品详情的请求，转到搜索页面");
//     //     next({
//     //       name: "test"
//     //     });
//     //   } else {
//     //     console.log("放行");
//     //     next();
//     //   }
//     // }, 1500);
//     next();
// });

// router.afterEach((current, from) => {
//     console.log("跳转成功，当前路由:", current);
//     console.log("之前路由:", from);
// });
export default router;
