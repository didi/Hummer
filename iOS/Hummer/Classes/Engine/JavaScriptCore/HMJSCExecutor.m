//
//  HMJSCExecutor.m
//  Hummer
//
//  Created by 唐佳诚 on 2021/1/13.
//

#import "HMJSCExecutor+Private.h"
#import "HMLogger.h"
#import "HMExceptionModel.h"
#import "HMJSCStrongValue.h"

NS_ASSUME_NONNULL_BEGIN

static NSString *const EXCEPTION_HANDLER_ERROR = @"异常处理函数发生错误";

static NSString *const JSArrayConstructorNotFound = @"JavaScript Array 构造函数不存在";

static NSString *const IsArrayNotFound = @"isArray 方法未找到";

static void hummerFinalize(JSObjectRef object);

static JSValueRef _Nullable hummerCall(JSContextRef ctx, JSObjectRef function, JSObjectRef thisObject, size_t argumentCount, const JSValueRef _Nonnull arguments[], JSValueRef *exception);

static JSValueRef _Nullable hummerCreate(JSContextRef ctx, JSObjectRef function, JSObjectRef thisObject, size_t argumentCount, const JSValueRef _Nonnull arguments[], JSValueRef *exception);

static JSValueRef _Nullable hummerCallFunction(JSContextRef ctx, JSObjectRef function, JSObjectRef thisObject, size_t argumentCount, const JSValueRef _Nonnull arguments[], JSValueRef *exception);

static JSValueRef _Nullable hummerGetProperty(JSContextRef ctx, JSObjectRef function, JSObjectRef thisObject, size_t argumentCount, const JSValueRef _Nonnull arguments[], JSValueRef *exception);

static JSValueRef _Nullable hummerSetProperty(JSContextRef ctx, JSObjectRef function, JSObjectRef thisObject, size_t argumentCount, const JSValueRef _Nonnull arguments[], JSValueRef *exception);

static JSContextGroupRef _Nullable virtualMachineRef = NULL;

@interface HMJSCExecutor ()

@property (nonatomic, assign) JSGlobalContextRef contextRef;

- (nullable NSNumber *)convertToNumberWithValueRef:(nullable JSValueRef)valueRef;

- (nullable NSString *)convertToStringWithValueRef:(nullable JSValueRef)valueRef;

- (BOOL)valueRefIsNativeObject:(nullable JSValueRef)valueRef;

- (nullable NSObject *)convertValueRefToNativeObject:(nullable JSValueRef)valueRef;

/// 业务代码打 exception，Hummer 内部代码异常情况打日志
- (BOOL)popExceptionWithErrorObject:(JSValueRef _Nullable *_Nullable)errorObject;

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
    // JSStringCreateWithUTF8CString 传入 NULL 会创建空字符串
    JSStringRef hummerCallString = JSStringCreateWithUTF8CString("hummerCall");
    JSStringRef hummerCreateString = JSStringCreateWithUTF8CString("hummerCreate");
    JSStringRef hummerGetPropertyString = JSStringCreateWithUTF8CString("hummerGetProperty");
    JSStringRef hummerSetPropertyString = JSStringCreateWithUTF8CString("hummerSetProperty");
    JSStringRef hummerCallFunctionString = JSStringCreateWithUTF8CString("hummerCallFunction");
    JSObjectRef globalThis = JSContextGetGlobalObject(_contextRef);

    // 匿名函数
    JSObjectRef inlineHummerCallFunction = JSObjectMakeFunctionWithCallback(_contextRef, NULL, &hummerCall);
    JSObjectRef hummerCreateFunction = JSObjectMakeFunctionWithCallback(_contextRef, NULL, &hummerCreate);
    JSObjectRef hummerGetPropertyFunction = JSObjectMakeFunctionWithCallback(_contextRef, NULL, &hummerGetProperty);
    JSObjectRef hummerSetPropertyFunction = JSObjectMakeFunctionWithCallback(_contextRef, NULL, &hummerSetProperty);
    JSObjectRef hummerCallFunctionFunction = JSObjectMakeFunctionWithCallback(_contextRef, NULL, &hummerCallFunction);
    JSValueRef exception = NULL;
    JSObjectSetProperty(_contextRef, globalThis, hummerCallString, inlineHummerCallFunction, kJSPropertyAttributeReadOnly | kJSPropertyAttributeDontDelete, &exception);
    // 初始化过程 exceptionHandler 一定不存在，因此可以会打到日志里
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

- (id)globalObject {
    HMAssertMainQueue();
    return [HMJSCStrongValue valueWithJSValueRef:JSContextGetGlobalObject(self.contextRef) inContext:self];
}

- (nullable HMBaseValue *)evaluateScript:(NSString *)script withSourceURL:(NSURL *)sourceUrl {
    HMAssertMainQueue();
    if (script.length == 0) {
        return nil;
    }
    JSStringRef scriptRef = JSStringCreateWithUTF8CString(script.UTF8String);
    JSStringRef sourceRef = NULL;
    if (sourceUrl.absoluteString.length > 0) {
        sourceRef = JSStringCreateWithUTF8CString(sourceUrl.absoluteString.UTF8String);
    }
    JSValueRef exception = NULL;
    // 第一行开始，this 指针为 NULL，则使用 globalThis
    // 对于 JavaScriptCore，没提供 sourceURL，则不会在 Safari 中显示文件，如果是 Hermes，则会告知 Chrome 有 '' 文件
    // 对于低版本 JavaScriptCore，同名文件会被覆盖，高版本则不会覆盖，会显示两个文件
    JSValueRef result = JSEvaluateScript(self.contextRef, scriptRef, NULL, sourceRef, 1, &exception);
    JSStringRelease(scriptRef);
    if (sourceRef) {
        JSStringRelease(sourceRef);
    }
    [self popExceptionWithErrorObject:&exception];
    // null undefined ==> nil
    if (result && !JSValueIsUndefined(self.contextRef, result) && !JSValueIsNull(self.contextRef, result)) {
        return [[HMJSCStrongValue alloc] initWithValueRef:result executor:self];
    } else {
        return nil;
    }
}

- (BOOL)valueIsNullOrUndefined:(nullable HMBaseValue *)value {
    // JavaScriptCore 判断标量，也需要保证 value.executor == self
    if (value.executor != self || ![value isKindOfClass:HMJSCStrongValue.class]) {
        return YES;
    }
    HMJSCStrongValue *strongValue = (HMJSCStrongValue *) value;
    if (!strongValue.valueRef) {
        return YES;
    }
    HMAssertMainQueue();

    return JSValueIsUndefined(self.contextRef, strongValue.valueRef) || JSValueIsNull(self.contextRef, strongValue.valueRef);
}

- (BOOL)valueIsBoolean:(HMBaseValue *)value {
    if (value.executor != self || ![value isKindOfClass:HMJSCStrongValue.class]) {
        return NO;
    }
    HMJSCStrongValue *strongValue = (HMJSCStrongValue *) value;
    HMAssertMainQueue();

    // valueRef == NULL 的情况下，实际上就是 JS null，所以 JSValueIsBoolean 能正确判断
    return JSValueIsBoolean(self.contextRef, strongValue.valueRef);
}

- (BOOL)valueIsNumber:(HMBaseValue *)value {
    if (value.executor != self || ![value isKindOfClass:HMJSCStrongValue.class]) {
        return NO;
    }
    HMJSCStrongValue *strongValue = (HMJSCStrongValue *) value;
    HMAssertMainQueue();

    return JSValueIsNumber(self.contextRef, strongValue.valueRef);
}

- (BOOL)valueIsString:(HMBaseValue *)value {
    if (value.executor != self || ![value isKindOfClass:HMJSCStrongValue.class]) {
        return NO;
    }
    HMJSCStrongValue *strongValue = (HMJSCStrongValue *) value;
    HMAssertMainQueue();

    return JSValueIsString(self.contextRef, strongValue.valueRef);
}

- (BOOL)valueIsObject:(HMBaseValue *)value {
    if (value.executor != self || ![value isKindOfClass:HMJSCStrongValue.class]) {
        return NO;
    }
    HMJSCStrongValue *strongValue = (HMJSCStrongValue *) value;
    HMAssertMainQueue();

    return JSValueIsObject(self.contextRef, strongValue.valueRef);
}

- (BOOL)valueIsArray:(HMBaseValue *)value {
    if (value.executor != self || ![value isKindOfClass:HMJSCStrongValue.class]) {
        return NO;
    }
    HMJSCStrongValue *strongValue = (HMJSCStrongValue *) value;
    HMAssertMainQueue();
    if (!strongValue.valueRef) {
        // strongValue.valueRef == NULL，后续 JSObjectCallAsFunction 要求不为空
        return NO;
    }

    JSObjectRef globalObjectRef = JSContextGetGlobalObject(self.contextRef);
    JSStringRef arrayString = JSStringCreateWithUTF8CString("Array");
    JSValueRef exception = NULL;
    JSValueRef arrayConstructorValue = JSObjectGetProperty(self.contextRef, globalObjectRef, arrayString, &exception);
    JSStringRelease(arrayString);
    if (exception) {
        // 用户不关心，所以可以不考虑抛出，直接在这里吃掉并打日志
        HMLogError(JSArrayConstructorNotFound);

        return NO;
    }
    // JSValueToObject 有慢路径，因此最好先判断是否为对象
    if (!JSValueIsObject(self.contextRef, arrayConstructorValue)) {
        HMLogError(JSArrayConstructorNotFound);

        return NO;
    }
    JSObjectRef arrayConstructorObjectRef = JSValueToObject(self.contextRef, arrayConstructorValue, &exception);
    if (exception) {
        HMLogError(JSArrayConstructorNotFound);

        return NO;
    }
    JSStringRef isArrayString = JSStringCreateWithUTF8CString("isArray");
    // JSObjectGetProperty 保证空安全
    JSValueRef isArrayValue =
            JSObjectGetProperty(self.contextRef, arrayConstructorObjectRef, isArrayString, &exception);
    JSStringRelease(isArrayString);
    if (exception) {
        HMLogError(IsArrayNotFound);

        return NO;
    }
    if (!JSValueIsObject(self.contextRef, isArrayValue)) {
        HMLogError(IsArrayNotFound);

        return NO;
    }
    JSObjectRef isArray = JSValueToObject(self.contextRef, isArrayValue, &exception);
    if (exception) {
        HMLogError(IsArrayNotFound);

        return NO;
    }
    JSValueRef arguments[] = {
            strongValue.valueRef
    };
    JSValueRef result = JSObjectCallAsFunction(self.contextRef, isArray, NULL, 1, arguments, &exception);
    if (exception) {
        HMLogError(@"isArray 抛出错误");

        return NO;
    }

    return JSValueToBoolean(self.contextRef, result);
}

- (BOOL)valueIsNativeObject:(HMBaseValue *)value {
    if (value.executor != self || ![value isKindOfClass:HMJSCStrongValue.class]) {
        return NO;
    }
    HMJSCStrongValue *strongValue = (HMJSCStrongValue *) value;
    HMAssertMainQueue();

    return [self valueRefIsNativeObject:strongValue.valueRef];
}

- (BOOL)valueRefIsNativeObject:(nullable JSValueRef)valueRef {
    return (BOOL) [self convertValueRefToNativeObject:valueRef];
}

- (nullable NSObject *)convertValueRefToNativeObject:(nullable JSValueRef)valueRef {
    HMAssertMainQueue();
    if (!JSValueIsObject(self.contextRef, valueRef)) {
        return nil;
    }
    JSValueRef exception = NULL;
    JSObjectRef objectRef = JSValueToObject(self.contextRef, valueRef, &exception);
    if (exception) {
        return nil;
    }
    JSStringRef privatePropertyName = JSStringCreateWithUTF8CString("_private");
    JSValueRef privateValueRef = JSObjectGetProperty(self.contextRef, objectRef, privatePropertyName, &exception);
    JSStringRelease(privatePropertyName);
    if (exception) {
        return nil;
    }
    if (!JSValueIsObject(self.contextRef, privateValueRef)) {
        return nil;
    }
    JSObjectRef privateObjectRef = JSValueToObject(self.contextRef, privateValueRef, &exception);
    if (exception || !privateObjectRef) {
        return nil;
    }
    // JSObjectGetPrivate 必须为非空
    id hostObject = (__bridge id) JSObjectGetPrivate(privateObjectRef);
    if (!hostObject || ![hostObject isKindOfClass:NSObject.class]) {
        return nil;
    }

    return (NSObject *) hostObject;
}

- (BOOL)popExceptionWithErrorObject:(JSValueRef _Nullable *_Nullable)errorObject {
    HMAssertMainQueue();
    if (!errorObject || !*errorObject) {
        return NO;
    }
    if (!self.contextRef) {
        HMLogError(@"Executor 初始化过程出错");
    }
    // JSValueIsObject -> toJS 会断言当前 valueRef 如果是对象，则必须属于当前 VM Heap
    // 因此 contextRef 必须存在
    if (!JSValueIsObject(self.contextRef, *errorObject)) {
        HMLogWarning(@"valueRef 参数不是 object");

        return NO;
    }
    JSValueRef exception = NULL;
    JSObjectRef objectRef = JSValueToObject(self.contextRef, *errorObject, &exception);
    if (!objectRef) {
        HMLogError(@"valueRef 转换 JSObjectRef 失败");

        return NO;
    }
    JSStringRef columnString = JSStringCreateWithUTF8CString("column");
    JSStringRef lineString = JSStringCreateWithUTF8CString("line");
    JSStringRef messageString = JSStringCreateWithUTF8CString("message");
    JSStringRef nameString = JSStringCreateWithUTF8CString("name");
    JSStringRef stackString = JSStringCreateWithUTF8CString("stack");

    JSValueRef columnValueRef = JSObjectGetProperty(self.contextRef, objectRef, columnString, &exception);
    // 不需要判断 columnValueRef
    if (exception) {
        HMLogError(EXCEPTION_HANDLER_ERROR);
    }
    exception = NULL;
    JSValueRef lineValueRef = JSObjectGetProperty(self.contextRef, objectRef, lineString, &exception);
    if (exception) {
        HMLogError(EXCEPTION_HANDLER_ERROR);
    }
    exception = NULL;
    JSValueRef messageValueRef = JSObjectGetProperty(self.contextRef, objectRef, messageString, &exception);
    if (exception) {
        HMLogError(EXCEPTION_HANDLER_ERROR);
    }
    exception = NULL;
    JSValueRef nameValueRef = JSObjectGetProperty(self.contextRef, objectRef, nameString, &exception);
    if (exception) {
        HMLogError(EXCEPTION_HANDLER_ERROR);
    }
    exception = NULL;
    JSValueRef stackValueRef = JSObjectGetProperty(self.contextRef, objectRef, stackString, &exception);
    if (exception) {
        HMLogError(EXCEPTION_HANDLER_ERROR);
    }

    HMExceptionModel *errorModel = [[HMExceptionModel alloc] init];
    errorModel.column = [self convertToNumberWithValueRef:columnValueRef];
    errorModel.line = [self convertToNumberWithValueRef:lineValueRef];
    errorModel.message = [self convertToStringWithValueRef:messageValueRef];
    errorModel.name = [self convertToStringWithValueRef:nameValueRef];
    errorModel.stack = [self convertToStringWithValueRef:stackValueRef];

    if (self.exceptionHandler) {
        self.exceptionHandler(errorModel);
    } else {
        HMLogError(@"Executor 发生异常：%@", errorModel);
    }

    JSStringRelease(columnString);
    JSStringRelease(lineString);
    JSStringRelease(messageString);
    JSStringRelease(nameString);
    JSStringRelease(stackString);

    return YES;
}

@end
