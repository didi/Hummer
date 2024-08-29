import { url } from '@kit.ArkTS';
import HMBase from '../Components/Base';
import { isBoolean, isNumber, isString } from './is';

const fakeUrlString = 'http://hummer.com';
export function getQueryString(param:object) : string | undefined {

  try {
    let fakeUrl = url.URL.parseURL(fakeUrlString);
    for(const key in param){
      const value = param[key];
      if(isString(value) || isBoolean(value) || isNumber(value)){
        fakeUrl.params.append(key, value.toString());
      }
    }
    return fakeUrl.search;
  } catch (e) {
    return undefined;
  }
}
