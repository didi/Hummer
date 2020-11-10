//
//  NSInvocation+Hummer.m
//  AfantySDK
//
//  Created by didi on 2020/9/9.
//

#import "NSInvocation+Hummer.h"

@implementation NSInvocation (Hummer)

- (void)hm_setArgument:(id)argumentLocation atIndex:(NSInteger)idx encodingType:(HMEncodingType)type {
    if (!argumentLocation) {
        return;
    }
    if (type == HMEncodingTypeUnknown || type == HMEncodingTypeVoid) {
        return;
    }
    if (type == HMEncodingTypeBlock || type == HMEncodingTypeObject) {
        // Block || object
        [self setArgument:&argumentLocation atIndex:idx];
    } else if (HMEncodingTypeIsCNumber(type)) {
        NSNumber *number = (NSNumber *) (argumentLocation);
        if (type == HMEncodingTypeChar) {
            char charValue = number.charValue;
            [self setArgument:&charValue atIndex:idx];
        } else if (type == HMEncodingTypeUnsignedChar) {
            unsigned char unsignedCharValue = number.unsignedCharValue;
            [self setArgument:&unsignedCharValue atIndex:idx];
        } else if (type == HMEncodingTypeInt) {
            int intValue = number.intValue;
            [self setArgument:&intValue atIndex:idx];
        } else if (type == HMEncodingTypeShort) {
            short shortValue = number.shortValue;
            [self setArgument:&shortValue atIndex:idx];
        } else if (type == HMEncodingTypeLongLong) {
            long long longLongValue = number.longLongValue;
            [self setArgument:&longLongValue atIndex:idx];
        } else if (type == HMEncodingTypeUnsignedInt) {
            unsigned int unsignedIntValue = number.unsignedIntValue;
            [self setArgument:&unsignedIntValue atIndex:idx];
        } else if (type == HMEncodingTypeUnsignedShort) {
            unsigned short unsignedShortValue = number.unsignedShortValue;
            [self setArgument:&unsignedShortValue atIndex:idx];
        } else if (type == HMEncodingTypeUnsignedLongLong) {
            unsigned long long unsignedLongLongValue = number.unsignedLongLongValue;
            [self setArgument:&unsignedLongLongValue atIndex:idx];
        } else if (type == HMEncodingTypeFloat) {
            float floatValue = number.floatValue;
            [self setArgument:&floatValue atIndex:idx];
        } else if (type == HMEncodingTypeDouble) {
            double doubleValue = number.doubleValue;
            [self setArgument:&doubleValue atIndex:idx];
        } else if (type == HMEncodingTypeBool) {
            BOOL boolValue = number.boolValue;
            [self setArgument:&boolValue atIndex:idx];
        } else if (type == HMEncodingTypeLong) {
            long longValue = number.longValue;
            [self setArgument:&longValue atIndex:idx];
        } else if (type == HMEncodingTypeUnsignedLong) {
            unsigned long unsignedLongValue = number.unsignedLongValue;
            [self setArgument:&unsignedLongValue atIndex:idx];
        }
    }
}

- (id)hm_getReturnValueObject {
    const char *objCReturnType = self.methodSignature.methodReturnType;
    HMEncodingType returnType = HMEncodingGetType(objCReturnType);
    if (returnType == HMEncodingTypeBlock || returnType == HMEncodingTypeObject) {
        // From(史广远): 这个地方不能去掉
        // NSInvocation - retainArguments 方法说明如下
        // If the receiver hasn’t already done so, retains the target and all object arguments of the receiver and copies all of its C-string arguments and blocks. If a returnvalue has been set, this is also retained or copied.
        // 文档实际上是在说，手动调用 - setReturnValue: 方法会做内存持有，实际上如果是方法本身返回，则不会做任何内存管理，只是简单的指针赋值
        // 如果是 new/copy/mutableCopy/alloc 开头的特殊函数，函数返回的对象是持有引用计数的，因此直接使用 __strong，如果是普通函数，则函数内部最后会执行 autorelease 导致引用计数为 0，所以一定要设置 __autoreleasing
        __autoreleasing id returnObject = nil;
        [self getReturnValue:&returnObject];

        return returnObject;
    } else if (HMEncodingTypeIsCNumber(returnType)) {
        if (returnType == HMEncodingTypeInt) {
            int res = 0;
            [self getReturnValue:&res];

            return @(res);
        } else if (returnType == HMEncodingTypeShort) {
            short res = 0;
            [self getReturnValue:&res];

            return @(res);
        } else if (returnType == HMEncodingTypeLongLong) {
            long long res = 0;
            [self getReturnValue:&res];

            return @(res);
        } else if (returnType == HMEncodingTypeUnsignedInt) {
            unsigned int res = 0;
            [self getReturnValue:&res];

            return @(res);
        } else if (returnType == HMEncodingTypeUnsignedShort) {
            unsigned short res = 0;
            [self getReturnValue:&res];

            return @(res);
        } else if (returnType == HMEncodingTypeUnsignedLongLong) {
            unsigned long long res = 0;
            [self getReturnValue:&res];

            return @(res);
        } else if (returnType == HMEncodingTypeFloat) {
            float res;
            [self getReturnValue:&res];

            return @(res);
        } else if (returnType == HMEncodingTypeDouble) {
            double res;
            [self getReturnValue:&res];

            return @(res);
        } else if (returnType == HMEncodingTypeBool) {
            BOOL res;
            [self getReturnValue:&res];

            return @(res);
        } else if (returnType == HMEncodingTypeChar) {
            char charValue;
            [self getReturnValue:&charValue];

            return @(charValue);
        } else if (returnType == HMEncodingTypeUnsignedChar) {
            unsigned char unsignedCharValue;
            [self getReturnValue:&unsignedCharValue];

            return @(unsignedCharValue);
        } else if (returnType == HMEncodingTypeLong) {
            long longValue;
            [self getReturnValue:&longValue];

            return @(longValue);
        } else if (returnType == HMEncodingTypeUnsignedLong) {
            unsigned long unsignedLongValue;
            [self getReturnValue:&unsignedLongValue];

            return @(unsignedLongValue);
        }
    }
    return nil;
}

@end
