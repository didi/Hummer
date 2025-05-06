/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class DeepTypeUtils {
    static getType_(value) {
       return Object.prototype.toString.apply(value);
   }
    static isA_(typeName, value) {
        return this.getType_(value) === '[object ' + typeName + ']';
    }
    static isAsymmetricEqualityTester_(obj) {
        return obj ? this.isA_('Function', obj.asymmetricMatch) : false;
    }

    /**
     * 是否是function
     * @param value
     */
    static isFunction_(value) {
        return this.isA_('Function', value);
    }

    /**
     * 是否是undefined
     * @param obj
     */
    static isUndefined(obj) {
        return obj === void 0;
    }

    /**
     * 是否是Node
     * @param obj
     */
    static isDomNode(obj) {
        return obj !== null &&
              typeof obj === 'object' &&
              typeof obj.nodeType === 'number' &&
              typeof obj.nodeName === 'string';
    }

    /**
     * 是否是promise对象
     * @param obj
     */
    static isPromise (obj) {
        return !!obj && obj.constructor === Promise;
  };
    /**
     *  是否是map对象
     * @param obj
     */
    static isMap(obj) {
        return (
            obj !== null &&
            typeof obj !== 'undefined' &&
            obj.constructor === Map
        );
    }

    /**
     * 是否是set对象
     * @param obj 对象
     */
    static isSet(obj) {
        return (
            obj !== null &&
            typeof obj !== 'undefined' &&
            obj.constructor === Set
        );
    }

    /**
     * 对象是否有key属性
     * @param obj 对象
     * @param key 对象属性名称
     */
    static has(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
    }

    /**
     * 获取对象的自有属性
     * @param obj 对象
     * @param isArray 是否是数组,[object Array]
     */
    static keys(obj, isArray) {
     const extraKeys = [];
        // 获取对象所有属性
     const  allKeys = this.getAllKeys(obj);
        if (!isArray) {
            return allKeys;
        }
        if (allKeys.length === 0) {
            return allKeys;
        }
        for (const k of allKeys) {
            if (typeof k === 'symbol' || !/^[0-9]+$/.test(k)) {
                extraKeys.push(k);
            }
        }
        return extraKeys;
    }

    /**
     * 获取obj对象的所有属性
     * @param obj obj对象
     */
    static getAllKeys(obj) {
        const keys = [];
        for (let key in obj) {
            if(this.has(obj, key)) {
                keys.push(key);
            }
        }
        const symbols = Object.getOwnPropertySymbols(obj);
        for (const sym of symbols) {
            if (obj.propertyIsEnumerable(sym)) {
                keys.push(sym);
            }
        }
        return keys;
    }

}
export default DeepTypeUtils;