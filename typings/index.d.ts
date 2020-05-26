/// <reference path="../node_modules/miniprogram-api-typings/index.d.ts" />

interface AppOption {
    globalData: {
        /** 鉴权token */
        token: string;
    };
}

interface ProcessEnv {
    [key: string]: string;
}

declare const process: {
    env: ProcessEnv;
};

declare function requirePlugin<T>(name: string): T;

declare module "miniprogram-computed";
