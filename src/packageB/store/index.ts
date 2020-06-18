import { data as dataStoreTest, add, reduce } from "./modules/store-test";

const store = {
    debug: true,
    data: {
        storeTest: dataStoreTest
    },
    storeTest: {
        add,
        reduce
    }
};

export default store;
