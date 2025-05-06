import url from '@ohos:url';
import { isBoolean, isNumber, isString } from '@bundle:com.example.hummer/hummer/ets/Utils/is';
const fakeUrlString = 'http://hummer.com';
export function getQueryString(param) {
    let fakeUrl = url.URL.parseURL(fakeUrlString);
    for (const key in param) {
        const value = param[key];
        if (isString(value) || isBoolean(value) || isNumber(value)) {
            fakeUrl.params.append(key, value.toString());
        }
    }
    return fakeUrl.search;
}
export function parseUrl(urlString, base) {
    let result = url.URL.parseURL(urlString, base);
    return result.toString();
}
//# sourceMappingURL=Url.js.map