//
//  HMJSCExecutor.m
//  Hummer
//
//  Created by 唐佳诚 on 2021/1/13.
//

#import "HMJSCExecutor+Private.h"

NS_ASSUME_NONNULL_BEGIN

static void hummerFinalize(JSObjectRef object);

static JSValueRef hummerCall(JSContextRef ctx, JSObjectRef function, JSObjectRef thisObject, size_t argumentCount, const JSValueRef arguments[], JSValueRef *exception);

static JSValueRef hummerCreate(JSContextRef ctx, JSObjectRef function, JSObjectRef thisObject, size_t argumentCount, const JSValueRef arguments[], JSValueRef *exception);

static JSValueRef hummerCallFunction(JSContextRef ctx, JSObjectRef function, JSObjectRef thisObject, size_t argumentCount, const JSValueRef arguments[], JSValueRef *exception);

static JSValueRef hummerGetProperty(JSContextRef ctx, JSObjectRef function, JSObjectRef thisObject, size_t argumentCount, const JSValueRef arguments[], JSValueRef *exception);

static JSValueRef hummerSetProperty(JSContextRef ctx, JSObjectRef function, JSObjectRef thisObject, size_t argumentCount, const JSValueRef arguments[], JSValueRef *exception);

static JSContextGroupRef _Nullable virtualMachineRef = NULL;

@interface HMJSCExecutor ()

@property (nonatomic, assign) JSGlobalContextRef contextRef;

@end

NS_ASSUME_NONNULL_END

@implementation HMJSCExecutor

- (instancetype)init {
    HMAssertMainQueue();
    self = [super init];
    if (!HMExecutorMap) {
        HMExecutorMap = NSMapTable.strongToWeakObjectsMapTable;
    }
    if (!virtualMachineRef) {
        virtualMachineRef = JSContextGroupCreate();
    }
    _contextRef = JSGlobalContextCreateInGroup(virtualMachineRef, NULL);
    [HMExecutorMap setObject:self forKey:[NSValue valueWithPointer:_contextRef]];
    
    // 注入对象
    JSStringRef hummerCallString = JSStringCreateWithUTF8CString("hummerCall");
    JSStringRef hummerCreateString = JSStringCreateWithUTF8CString("hummerCreate");
    JSStringRef hummerGetPropertyString = JSStringCreateWithUTF8CString("hummerGetProperty");
    JSStringRef hummerSetPropertyString = JSStringCreateWithUTF8CString("hummerSetProperty");
    JSStringRef hummerCallFunctionString = JSStringCreateWithUTF8CString("hummerCallFunction");
    JSObjectRef globalThis = JSContextGetGlobalObject(_contextRef);
    
    // 匿名函数
    JSObjectRef hummerCallFunction = JSObjectMakeFunctionWithCallback(_contextRef, NULL, &hummerCall);
    JSObjectRef hummerCreateFunction = JSObjectMakeFunctionWithCallback(_contextRef, NULL, &hummerCreate);
    JSObjectRef hummerGetPropertyFunction = JSObjectMakeFunctionWithCallback(_contextRef, NULL, &hummerGetProperty);
    JSObjectRef hummerSetPropertyFunction = JSObjectMakeFunctionWithCallback(_contextRef, NULL, &hummerSetProperty);
    JSObjectRef hummerCallFunctionFunction = JSObjectMakeFunctionWithCallback(_contextRef, NULL, &hummerCallFunction);
    JSValueRef exception = NULL;
    JSObjectSetProperty(_contextRef, globalThis, hummerCallString, hummerCallFunction, kJSPropertyAttributeReadOnly | kJSPropertyAttributeDontDelete, &exception);
    [self popExceptionWithErrorObject:&exception];
    JSObjectSetProperty(_contextRef, globalThis, hummerCreateString, hummerCreateFunction, kJSPropertyAttributeReadOnly | kJSPropertyAttributeDontDelete, &exception);
    [self popExceptionWithErrorObject:&exception];
    JSObjectSetProperty(_contextRef, globalThis, hummerGetPropertyString, hummerGetPropertyFunction, kJSPropertyAttributeReadOnly | kJSPropertyAttributeDontDelete, &exception);
    [self popExceptionWithErrorObject:&exception];
    JSObjectSetProperty(_contextRef, globalThis, hummerSetPropertyString, hummerSetPropertyFunction, kJSPropertyAttributeReadOnly | kJSPropertyAttributeDontDelete, &exception);
    [self popExceptionWithErrorObject:&exception];
    JSObjectSetProperty(_contextRef, globalThis, hummerCallFunctionString, hummerCallFunctionFunction, kJSPropertyAttributeReadOnly | kJSPropertyAttributeDontDelete, &exception);
    [self popExceptionWithErrorObject:&exception];
    JSStringRelease(hummerCallString);
    JSStringRelease(hummerCreateString);
    JSStringRelease(hummerGetPropertyString);
    JSStringRelease(hummerSetPropertyString);
    JSStringRelease(hummerCallFunctionString);

    return self;
}


@end
