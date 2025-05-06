import url from "@ohos:url";
import { isBoolean, isNumber, isString } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Utils/is";
const fakeUrlString = 'http://hummer.com';
export function getQueryString(param: object): string | undefined {
    let fakeUrl = url.URL.parseURL(fakeUrlString);
    for (const key in param) {
        const value = param[key];
        if (isString(value) || isBoolean(value) || isNumber(value)) {
            fakeUrl.params.append(key, value.toString());
        }
    }
    return fakeUrl.search;
}
