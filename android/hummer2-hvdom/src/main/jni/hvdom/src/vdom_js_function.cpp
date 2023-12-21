//
// Created by didi on 2023/12/1.
//

#include "hvdom/vdom_js_function.h"

JSFunction::JSFunction() {

}

JSFunction::JSFunction(NAPIValue *funcValue, NAPIEnv *env) {

}

NAPIValue JSFunction::call(HMValue *hmValue) {

//    napi_call_function()

}

NAPIValue JSFunction::call(HMValue *...) {

}

void JSFunction::protect() {

}

void JSFunction::unProtect() {

}

string JSFunction::toString() {
    string sb = string("JSFunction{").append(to_string((unsigned long) funcValue_)).append("}");
    return sb;
}

JSFunction::~JSFunction() {

}
