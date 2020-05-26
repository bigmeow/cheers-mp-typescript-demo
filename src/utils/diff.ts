// https://github.com/Tencent/westore/blob/62f542f062dfcbc052686270c43c200f7eec40ab/packages/westore/utils/create.js
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
const FUNCTIONTYPE = "[object Function]";
type Tobject = Record<string, any>;

export default function diff(current: Tobject, pre: Tobject) {
    const result = {};
    syncKeys(current, pre);
    _diff(current, pre, "", result);
    return result;
}

function syncKeys(current: any, pre: any) {
    if (current === pre) return;
    const rootCurrentType = type(current);
    const rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        //if(Object.keys(current).length >= Object.keys(pre).length){
        for (const key in pre) {
            const currentValue = current[key];
            if (currentValue === undefined) {
                current[key] = null;
            } else {
                syncKeys(currentValue, pre[key]);
            }
        }
        //}
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach((item: any, index: string | number) => {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current: any, pre: any, path: string, result: {}) {
    if (current === pre) return;
    const rootCurrentType = type(current);
    const rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || (Object.keys(current).length < Object.keys(pre).length && path !== "")) {
            setResult(result, path, current);
        } else {
            for (const key in current) {
                const currentValue = current[key];
                const preValue = pre[key as any];
                const currentType = type(currentValue);
                const preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key as any]) {
                        setResult(result, concatPathAndKey(path, key), currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, concatPathAndKey(path, key), currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, concatPathAndKey(path, key), currentValue);
                        } else {
                            currentValue.forEach((item: any, index: string) => {
                                _diff(item, preValue[index], concatPathAndKey(path, key) + "[" + index + "]", result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, concatPathAndKey(path, key), currentValue);
                    } else {
                        for (const subKey in currentValue) {
                            const realPath = concatPathAndKey(path, key) + (subKey.includes(".") ? `["${subKey}"]` : `.${subKey}`);
                            _diff(currentValue[subKey], preValue[subKey], realPath, result);
                        }
                    }
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach((item: any, index: string) => {
                    _diff(item, pre[index as any], path + "[" + index + "]", result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function concatPathAndKey(path: string, key: string) {
    return key.includes(".") ? path + `["${key}"]` : (path == "" ? "" : path + ".") + key;
}

function setResult(result: { [x: string]: any }, k: string, v: any[]) {
    const t = type(v);
    if (t != FUNCTIONTYPE) {
        //if (t != OBJECTTYPE && t != ARRAYTYPE) {
        result[k] = v;
        // } else {
        //     result[k] = JSON.parse(JSON.stringify(v))
        // }
    }
}

function type(obj: string | any[]) {
    return Object.prototype.toString.call(obj);
}
