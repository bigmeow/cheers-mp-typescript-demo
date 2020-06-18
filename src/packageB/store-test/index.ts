import create from "@/packageB/omix/create";
import store from "@/packageB/store/index";

create.Page(store, {
    // 声明依赖
    use: ["storeTest"],

    data: {
        inner: "页面内部私有数据"
    },
    handleAdd() {
        store.storeTest.add();
    },
    handleReduce() {
        store.storeTest.reduce();
    },
    handleUpdate() {
        this.setData({
            inner: "页面内部私有数据被修改了" + new Date().getTime()
        });
    }
});
