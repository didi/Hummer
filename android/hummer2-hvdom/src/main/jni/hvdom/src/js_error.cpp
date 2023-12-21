//
// Created by didi on 2023/11/29.
//

#include "hvdom/js_error.h"

JSError::JSError() {

}

const char *JSError::toCString() {
    string result = toString();
    return result.c_str();
}

string JSError::toString() {
    string result = string();
    result.append(name);
    result.append(": ").append(message);
    result.append("\n ").append(stack);
    return result;
}

JSError::~JSError() {


}
