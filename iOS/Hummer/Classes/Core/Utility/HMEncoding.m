//
//  HMEncoding.m
//  AfantySDK
//
//  Created by didi on 2020/9/9.
//

#import "HMEncoding.h"

BOOL HMEncodingTypeIsCNumber(HMEncodingType type) {
    switch (type) {
        case HMEncodingTypeBool:
        case HMEncodingTypeChar:
        case HMEncodingTypeUnsignedChar:
        case HMEncodingTypeShort:
        case HMEncodingTypeUnsignedShort:
        case HMEncodingTypeInt:
        case HMEncodingTypeUnsignedInt:
        case HMEncodingTypeLong:
        case HMEncodingTypeUnsignedLong:
        case HMEncodingTypeLongLong:
        case HMEncodingTypeUnsignedLongLong:
        case HMEncodingTypeFloat:
        case HMEncodingTypeDouble:
            return YES;

        default:
            return NO;
    }
}

HMEncodingType HMEncodingGetType(const char *typeEncoding) {
    if (!typeEncoding) {
        return HMEncodingTypeUnknown;
    }
    size_t len = strlen(typeEncoding);
    if (len == 0) {
        return HMEncodingTypeUnknown;
    }
    switch (*typeEncoding) {
        case 'v':
            return HMEncodingTypeVoid;
        case 'B':
            return HMEncodingTypeBool;
        case 'c':
            return HMEncodingTypeChar;
        case 'C':
            return HMEncodingTypeUnsignedChar;
        case 's':
            return HMEncodingTypeShort;
        case 'S':
            return HMEncodingTypeUnsignedShort;
        case 'i':
            return HMEncodingTypeInt;
        case 'I':
            return HMEncodingTypeUnsignedInt;
        case 'l':
            return HMEncodingTypeLong;
        case 'L':
            return HMEncodingTypeUnsignedLong;
        case 'q':
            return HMEncodingTypeLongLong;
        case 'Q':
            return HMEncodingTypeUnsignedLongLong;
        case 'f':
            return HMEncodingTypeFloat;
        case 'd':
            return HMEncodingTypeDouble;
        case '@': {
            if (len == 2 && *(typeEncoding + 1) == '?')
                return HMEncodingTypeBlock;
            else
                return HMEncodingTypeObject;
        }

        default:
            return HMEncodingTypeUnknown;
    }
}