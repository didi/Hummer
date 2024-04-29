//
// Created by didi on 2023/12/14.
//

#include <algorithm>
#include <cmath>
#include <iostream>
#include "falcon/F4NUtil.h"
#include "falcon/F4NElement.h"
#include "falcon/logger.h"
#include "jsi/jsi_value.h"


thread_local bool mainThread = false;

int countDecimalPlaces(double num) {
    double p = num - floor(num);
    double p2 = p;
    // 设置一个阈值，例如 1e-15，表示小数位数小于 15 时不再继续计算
    constexpr double threshold = 1e-15;

    int count = 0;
    while (p > threshold) {
        p2 *= 10.0;
        p = p2 - floor(p2);
        ++count;
    }
    return count;
}

const char *F4NUtil::toString(double value) {
    int decimalPlaces = countDecimalPlaces(value);
    info("countDecimalPlaces =%d", decimalPlaces);
    constexpr int bufferSize = 24;
    char buffer[bufferSize];

    int result = snprintf(buffer, bufferSize, "%.*f", decimalPlaces, value);
    info("result =%d", result);
    return string(buffer).c_str();
}

string F4NUtil::buildArrayString(size_t argc, JsiValue **argv) {
    if (argc == 0) {
        return "[]";
    }
    string sb = string("[");
    for (int i = 0; i < argc; i++) {
        if (i > 0) {
            sb.append(",");
        }
        sb.append(argv[i]->toString());
    }
    sb.append("]");
    return sb;
}

string F4NUtil::buildString(size_t argc, JsiValue **argv) {
    if (argc == 0) {
        return "";
    }
    string sb = string("");
    for (int i = 0; i < argc; i++) {
        if (i > 0) {
            sb.append(",");
        }
        JsiValue *value = argv[i];
        if (value == nullptr) {
            sb.append("undefined");
        } else if (value->getType() == TYPE_STRING) {
            JsiString *v = (JsiString *) value;
            sb.append(v->value_);
        } else if (value->getType() == TYPE_OBJECT) {
            sb.append("[object Object]");
        } else if (value->getType() == TYPE_ARRAY) {
            sb.append(value->toString());
        } else {
            sb.append(value->toString());
        }
    }
    sb.append("");
    return sb;
}

string F4NUtil::optString(JsiValue *value) {
    if (value != nullptr && value->getType() == TYPE_STRING) {
        return ((JsiString *) value)->value_;
    }
    return "";
}

F4NElement *F4NUtil::convert2Element(JsiValue *jsiValue) {
    if (jsiValue != nullptr && jsiValue->getType() == TYPE_OBJECT) {
        JsiValue *finalize = ((JsiObject *) jsiValue)->getValue("__finalize__");
        if (finalize != nullptr && finalize->getType() == TYPE_EXT) {
            JsiValueExt *valueExt = (JsiValueExt *) finalize;
            F4NElement *element = static_cast<F4NElement *>(valueExt->data);
            return element;
        }
    }
    return nullptr;
}

bool F4NUtil::isElement(JsiValue *jsiValue) {
    if (jsiValue != nullptr && jsiValue->getType() == TYPE_OBJECT) {
        JsiValue *finalize = ((JsiObject *) jsiValue)->getValue("__finalize__");
        if (finalize->getType() == TYPE_EXT) {
            return true;
        }
    }
    return false;
}


bool F4NUtil::isMainThread() {
    return mainThread;
}

void F4NUtil::makeMainThread() {
    mainThread = true;
}

