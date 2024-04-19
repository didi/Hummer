//
// Created by didi on 2024/3/5.
//


#include "falcon/F4NStyle.h"

F4NStyle::F4NStyle() {
    _value_ = new JsiObject();
}

F4NStyle::F4NStyle(JsiObject *value) {
    _value_ = value;
}

JsiObject *F4NStyle::getStyleValue() {
    return _value_;
}

void F4NStyle::mergeNewStyle(F4NStyle *hmStyle) {
    JsiObject *object = hmStyle->_value_;

    list<string> keys = object->allKeys();
    for (auto it: keys) {
        _value_->setValue(it, object->getValue(it));
    }
}

F4NStyle::~F4NStyle() {
    delete _value_;
}
