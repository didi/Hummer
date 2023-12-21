//
// Created by didi on 2023/12/1.
//


#include "hvdom/vdom_invoke_function.h"

InvokeFunction::InvokeFunction() {

}

InvokeFunction::~InvokeFunction() {

}

string InvokeFunction::toString() {
    string sb = string("InvokeFunction{")
            .append("clsName=").append(clsName_)
            .append(",methodName=").append(methodName_)
            .append(",params=").append(params_->toString())
            .append("}");
    return sb;
}