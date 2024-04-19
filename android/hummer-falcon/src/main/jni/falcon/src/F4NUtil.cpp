//
// Created by didi on 2023/12/14.
//

#include <algorithm>
#include <cmath>
#include <iostream>
#include "falcon/F4NUtil.h"
#include "falcon/logger.h"
#include "jsi/jsi_value.h"


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

string F4NUtil::optString(JsiValue *value) {
    if (value != nullptr && value->getType()==TYPE_STRING){
        return ((JsiString*)value)->value_;
    }
    return "";
}

