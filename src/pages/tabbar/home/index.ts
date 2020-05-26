import { getAllType } from "@/service/api/test";
Page({
    data: {
        result: ""
    },
    async handleFeatchData() {
        const data = await getAllType();
        this.setData({
            result: JSON.stringify(data)
        });
    }
});
