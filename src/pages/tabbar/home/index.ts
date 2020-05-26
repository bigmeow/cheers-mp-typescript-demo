import { getAllType } from "@/service/api/test";
import router from "@/service/router";
Page({
    data: {
        result: ""
    },
    async handleFeatchData() {
        const data = await getAllType();
        this.setData({
            result: JSON.stringify(data)
        });
    },
    handleRouterSwitch() {
        router.push({
            name: "test"
        });
    }
});
