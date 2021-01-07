//
//  JSValue+Hummer.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMExportManager.h"
#import "HMUtility.h"
#import "HMExportClass.h"
#import "HMClassManager.h"
#import "HMJSObject.h"
#import "HMJSClass.h"
#import <objc/message.h>

static bool _JSValueIsArray(JSContextRef ctx, JSValueRef value)
{
    if (JSValueIsObject(ctx, value))
    {
        JSStringRef name = JSStringCreateWithUTF8CString("Array");

        JSObjectRef array = (JSObjectRef)JSObjectGetProperty(ctx, JSContextGetGlobalObject(ctx), name, NULL);

        JSStringRelease(name);

        name = JSStringCreateWithUTF8CString("isArray");
        JSObjectRef isArray = (JSObjectRef)JSObjectGetProperty(ctx, array, name, NULL);

        JSStringRelease(name);

        JSValueRef retval = JSObjectCallAsFunction(ctx, isArray, NULL, 1, &value, NULL);

        if (JSValueIsBoolean(ctx, retval))
            return JSValueToBoolean(ctx, retval);
    }
    return false;
}

static int _JSArrayGetCount(JSContextRef ctx, JSObjectRef arr)
{
    JSStringRef pname = JSStringCreateWithUTF8CString("length");
    JSValueRef val = JSObjectGetProperty(ctx, arr, pname, NULL);
    JSStringRelease(pname);
    return JSValueToNumber(ctx, val, NULL);
}

static JSValueRef _JSArrayGetValueAtIndex(JSContextRef ctx, JSObjectRef arr, int index)
{
    return JSObjectGetPropertyAtIndex(ctx, arr, index, NULL);
}

@implementation JSValue(Hummer)

- (id)hm_toObjCObject {
    JSContextRef contextRef = self.context.JSGlobalContextRef;
    if ([self isObject]) {
        JSObjectRef objectRef = JSValueToObject(contextRef, self.JSValueRef, NULL);
        JSStringRef propertyRef = JSStringCreateWithUTF8CString("private");
        JSValueRef privateRef = JSObjectGetProperty(contextRef, objectRef, propertyRef, NULL);
        JSValue *value = [JSValue valueWithJSValueRef:privateRef inContext:self.context];
        BOOL isUndefined = [value isUndefined];
        if (!isUndefined) {
            JSObjectRef valueToObjc = JSValueToObject(contextRef, privateRef, NULL);
            if (valueToObjc) {
                return (__bridge id)JSObjectGetPrivate(valueToObjc);
            }
        }
    }
    return [self toObject];
}

- (int)hm_isArray {
    JSContextRef contextRef = self.context.JSGlobalContextRef;
    return _JSValueIsArray(contextRef, self.JSValueRef);
}

- (NSArray *)hm_toObjcArray {
    JSContextRef contextRef = self.context.JSGlobalContextRef;
    bool isArray = _JSValueIsArray(contextRef, self.JSValueRef);
    if (!isArray) {
        return nil;
    }
    NSMutableArray * array = [NSMutableArray array];
    JSObjectRef objectRef = JSValueToObject(contextRef, self.JSValueRef, NULL);
    int length = _JSArrayGetCount(contextRef, objectRef);
    for (int i = 0; i<length; i++) {
        JSValueRef valueRef = _JSArrayGetValueAtIndex(contextRef, objectRef, i);
        JSValue *value = [JSValue valueWithJSValueRef:valueRef inContext:self.context];
        id objcValue = [value hm_toObjCObject];
        if (objcValue) {
            [array addObject:objcValue];
        }
    }
    return array.copy;
}

+ (instancetype)hm_valueWithClass:(Class)objcClass
                        inContext:(JSContext *)context {
    if (!objcClass || !context) return nil;
    
    NSString *classStr = NSStringFromClass(objcClass);
    HMExportClass *exportClass = [[HMExportManager sharedInstance] exportClassForObjC:classStr];
    if (!exportClass || !exportClass.jsClass) {
        HMAssert(NO, @"class:[%@] has not been exported!", NSStringFromClass(objcClass));
        return nil;
    }
    return [context evaluateScript:[NSString stringWithFormat:@"new %@()", exportClass.jsClass]];
}

@end
