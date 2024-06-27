//
// Created by didi on 2023/11/29.
//

#include "jsi/jsi.h"
#include "napi/js_native_api.h"
#include "napi/js_native_api_types.h"

JsiError::JsiError() {

}

const char *JsiError::toCString() {
    string result = toString();
    return result.c_str();
}

string JsiError::toString() {
    string result = string();
    result.append(name);
    result.append(": ").append(message);
    result.append("\n ").append(stack);
    return result;
}

JsiError::~JsiError() {


}
