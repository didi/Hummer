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
#import "NSObject+Hummer.h"
#import "HMExportClass.h"

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

- (BOOL)valueRefIsNativeObject:(nullable JSValueRef)valueRef;

- (BOOL)valueRefIsFunction:(nullable JSValueRef)valueRef;

- (BOOL)valueRefIsDictionary:(nullable JSValueRef)valueRef;

- (nullable NSObject *)convertValueRefToNativeObject:(nullable JSValueRef)valueRef;

- (nullable NSString *)convertValueRefToString:(nullable JSValueRef)valueRef;

- (nullable NSNumber *)convertValueRefToNumber:(nullable JSValueRef)valueRef;

/// 业务代码打 exception，Hummer 内部代码异常情况打日志
- (BOOL)popExceptionWithErrorObject:(JSValueRef _Nullable *_Nullable)errorObject;

- (nullable JSValueRef)convertNumberToValueRef:(nullable NSNumber *)number;

- (nullable JSValueRef)convertStringToValueRef:(nullable NSString *)stringValue;

- (nullable JSValueRef)convertNativeObjectToValueRef:(nullable NSObject *)object;

- (nullable JSValueRef)convertFunctionToValueRef:(nullable id)function;

- (nullable JSValueRef)convertArrayToValueRef:(nullable NSArray *)array;

- (nullable JSValueRef)convertDictionaryToValueRef:(nullable NSDictionary<NSString *, id> *)dictionary;

- (nullable JSValueRef)convertObjectToValueRef:(nullable id)object;

- (nullable HMFunctionType)convertValueRefToFunction:(nullable JSValueRef)valueRef;

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
    // JavaScriptCore 判断标量，也需要保证 value.context == self
    if (value.context != self || ![value isKindOfClass:HMJSCStrongValue.class]) {
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
    if (value.context != self || ![value isKindOfClass:HMJSCStrongValue.class]) {
        return NO;
    }
    HMJSCStrongValue *strongValue = (HMJSCStrongValue *) value;
    HMAssertMainQueue();

    // valueRef == NULL 的情况下，实际上就是 JS null，所以 JSValueIsBoolean 能正确判断
    return JSValueIsBoolean(self.contextRef, strongValue.valueRef);
}

- (BOOL)valueIsNumber:(HMBaseValue *)value {
    if (value.context != self || ![value isKindOfClass:HMJSCStrongValue.class]) {
        return NO;
    }
    HMJSCStrongValue *strongValue = (HMJSCStrongValue *) value;
    HMAssertMainQueue();

    return JSValueIsNumber(self.contextRef, strongValue.valueRef);
}

- (BOOL)valueIsString:(HMBaseValue *)value {
    if (value.context != self || ![value isKindOfClass:HMJSCStrongValue.class]) {
        return NO;
    }
    HMJSCStrongValue *strongValue = (HMJSCStrongValue *) value;
    HMAssertMainQueue();

    return JSValueIsString(self.contextRef, strongValue.valueRef);
}

- (BOOL)valueIsObject:(HMBaseValue *)value {
    if (value.context != self || ![value isKindOfClass:HMJSCStrongValue.class]) {
        return NO;
    }
    HMJSCStrongValue *strongValue = (HMJSCStrongValue *) value;
    HMAssertMainQueue();

    return JSValueIsObject(self.contextRef, strongValue.valueRef);
}

- (BOOL)valueIsArray:(HMBaseValue *)value {
    if (value.context != self || ![value isKindOfClass:HMJSCStrongValue.class]) {
        return NO;
    }
    HMJSCStrongValue *strongValue = (HMJSCStrongValue *) value;
    HMAssertMainQueue();
//    if (!strongValue.valueRef) {
    // strongValue.valueRef == NULL，后续 JSObjectCallAsFunction 要求不为空
//        return NO;
//    }

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
    if (value.context != self || ![value isKindOfClass:HMJSCStrongValue.class]) {
        return NO;
    }
    HMJSCStrongValue *strongValue = (HMJSCStrongValue *) value;

    return [self valueRefIsNativeObject:strongValue.valueRef];
}

- (BOOL)valueRefIsNativeObject:(nullable JSValueRef)valueRef {
    return (BOOL) [self convertValueRefToNativeObject:valueRef];
}

- (BOOL)valueIsFunction:(HMBaseValue *)value {
    if (value.context != self || ![value isKindOfClass:HMJSCStrongValue.class]) {
        return NO;
    }
    HMJSCStrongValue *strongValue = (HMJSCStrongValue *) value;

    return [self valueRefIsFunction:strongValue.valueRef];
}

- (BOOL)valueRefIsFunction:(JSValueRef)valueRef {
    HMAssertMainQueue();
    if (!JSValueIsObject(self.contextRef, valueRef)) {
        return NO;
    }
    JSValueRef exception = NULL;
    JSObjectRef objectRef = JSValueToObject(self.contextRef, valueRef, &exception);
    if (exception) {
        return NO;
    }
    if (!JSObjectIsFunction(self.contextRef, objectRef)) {
        return NO;
    }

    return YES;
}

- (BOOL)valueIsDictionary:(HMBaseValue *)value {
    if (value.context != self || ![value isKindOfClass:HMJSCStrongValue.class]) {
        return NO;
    }
    HMJSCStrongValue *strongValue = (HMJSCStrongValue *) value;

    return [self valueRefIsDictionary:strongValue.valueRef];
}

- (BOOL)valueRefIsDictionary:(JSValueRef)valueRef {
    HMAssertMainQueue();
    // 1. 是对象
    // 2. 不是数组
    // 3. 不是闭包
    // 4. 不是原生对象
    if (!JSValueIsObject(self.contextRef, valueRef)) {
        return NO;
    }
    if (JSValueIsArray(self.contextRef, valueRef)) {
        return NO;
    }
    if ([self valueRefIsFunction:valueRef]) {
        return NO;
    }
    if ([self valueRefIsNativeObject:valueRef]) {
        return NO;
    }

    return YES;
}

- (nullable NSNumber *)convertToNumberWithValue:(HMBaseValue *)value {
    if (value.context != self || ![value isKindOfClass:HMJSCStrongValue.class]) {
        return nil;
    }
    HMJSCStrongValue *strongValue = (HMJSCStrongValue *) value;

    return [self convertValueRefToNumber:strongValue.valueRef];
}

- (nullable NSObject *)convertToNativeObjectWithValue:(HMBaseValue *)value {
    if (value.context != self || ![value isKindOfClass:HMJSCStrongValue.class]) {
        return nil;
    }
    HMJSCStrongValue *strongValue = (HMJSCStrongValue *) value;

    return [self convertValueRefToNativeObject:strongValue.valueRef];
}

- (nullable NSString *)convertToStringWithValue:(HMBaseValue *)value {
    if (value.context != self || ![value isKindOfClass:HMJSCStrongValue.class]) {
        return nil;
    }
    HMJSCStrongValue *strongValue = (HMJSCStrongValue *) value;

    return [self convertValueRefToString:strongValue.valueRef];
}

- (nullable NSString *)convertValueRefToString:(JSValueRef)valueRef {
    HMAssertMainQueue();
    // JSValueToStringCopy 有慢路径，因此先判断
    if (!JSValueIsString(self.contextRef, valueRef)) {
        return nil;
    }
    JSValueRef exception = NULL;
    JSStringRef stringRef = JSValueToStringCopy(self.contextRef, valueRef, &exception);
    // 空指针会返回 "" 空字符串，因此最好先判断一下
    if (exception || !stringRef) {
        return nil;
    }
    NSString *stringValue = CFBridgingRelease(JSStringCopyCFString(kCFAllocatorDefault, stringRef));
    JSStringRelease(stringRef);

    return stringValue;
}

- (nullable NSNumber *)convertValueRefToNumber:(JSValueRef)valueRef {
    HMAssertMainQueue();
    if (JSValueIsNumber(self.contextRef, valueRef)) {
        // new Number() 是对象不是数字
        double numberValue = JSValueToNumber(self.contextRef, valueRef, NULL);

        return @(numberValue);
    } else if (JSValueIsBoolean(self.contextRef, valueRef)) {
        bool boolValue = JSValueToBoolean(self.contextRef, valueRef);

        return @(boolValue);
    }

    return nil;
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
    errorModel.column = [self convertValueRefToNumber:columnValueRef];
    errorModel.line = [self convertValueRefToNumber:lineValueRef];
    errorModel.message = [self convertValueRefToString:messageValueRef];
    errorModel.name = [self convertValueRefToString:nameValueRef];
    errorModel.stack = [self convertValueRefToString:stackValueRef];

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

+ (nullable id <HMBaseExecutorProtocol>)currentContext {
    return HMCurrentExecutor;
}

- (BOOL)compareWithValue:(HMBaseValue *)value anotherValue:(HMBaseValue *)anotherValue {
    // 仿照原生 [object isEqual:anotherObject]，如果 object 为空，最终为 NO
    if ([self valueIsNullOrUndefined:value] || [self valueIsNullOrUndefined:anotherValue]) {
        return NO;
    }
    if (value.context != self || anotherValue.context != self || ![value isKindOfClass:HMJSCStrongValue.class] || ![anotherValue isKindOfClass:HMJSCStrongValue.class]) {
        return NO;
    }
    HMJSCStrongValue *strongValue = (HMJSCStrongValue *) value;
    HMJSCStrongValue *anotherStrongValue = (HMJSCStrongValue *) anotherValue;

    // 如果两个都为 NULL，则等价于 JavaScript: null === null => true
    return JSValueIsStrictEqual(self.contextRef, strongValue.valueRef, anotherStrongValue.valueRef);
}

- (nullable HMBaseValue *)convertToValueWithNumber:(NSNumber *)number {
    return [[HMJSCStrongValue alloc] initWithValueRef:[self convertNumberToValueRef:number] executor:self];
}

- (JSValueRef)convertNumberToValueRef:(NSNumber *)number {
    HMAssertMainQueue();
    if (!number) {
        return NULL;
    }
    if (strcmp(number.objCType, @encode(BOOL)) == 0) {
        return JSValueMakeBoolean(self.contextRef, number.boolValue);
    } else {
        return JSValueMakeNumber(self.contextRef, number.doubleValue);
    }
}

- (JSValueRef)convertStringToValueRef:(NSString *)stringValue {
    HMAssertMainQueue();
    if (!stringValue) {
        return NULL;
    }
    // JSStringCreateWithCFString 如果传递 nil 会创建 "" 空字符串
    // 不需要转移所有权，因为当场复制
    JSStringRef stringRef = JSStringCreateWithCFString((__bridge CFStringRef) (stringValue));
    JSValueRef inlineValueRef = JSValueMakeString(self.contextRef, stringRef);
    JSStringRelease(stringRef);

    return inlineValueRef;
}

- (JSValueRef)convertNativeObjectToValueRef:(NSObject *)object {
    HMAssertMainQueue();
    if ([object hmValue].context == self && [[object hmValue] isKindOfClass:HMJSCStrongValue.class]) {
        // 先判断 hmValue，这样后续的闭包转换和原生组件导出可以减少调用
        // 做严格判断，同上下文才能复用 hm_value
        HMJSCStrongValue *strongValue = (HMJSCStrongValue *) [object hmValue];
        return strongValue.valueRef;
    }
    JSValueRef returnValueRef = NULL;
    NSString *className = NSStringFromClass(object.class);
    HMExportClass *exportClass = HMExportManager.sharedInstance.objcClasses[className];
    if (object && exportClass.jsClass.length > 0) {
        // 如果是导出组件，则通过 Object.create() 创建 JSValue，然后设置 _private
        JSStringRef hummerCreateObjectString = JSStringCreateWithUTF8CString("hummerCreateObject");
        JSValueRef exception = NULL;
        JSValueRef hummerCreateObjectFunction = JSObjectGetProperty(self.contextRef, JSContextGetGlobalObject(self.contextRef), hummerCreateObjectString, &exception);
        JSStringRelease(hummerCreateObjectString);
        if (!exception && JSValueIsObject(self.contextRef, hummerCreateObjectFunction)) {
            JSObjectRef hummerCreateObjectFunctionObjectRef = JSValueToObject(self.contextRef, hummerCreateObjectFunction, &exception);
            if (!exception && JSObjectIsFunction(self.contextRef, hummerCreateObjectFunctionObjectRef)) {
                JSStringRef jsClassNameString = JSStringCreateWithCFString((__bridge CFStringRef) (exportClass.jsClass));
                // 引用计数 +1
                CFRetain((__bridge CFTypeRef) object);
                JSClassDefinition hostObjectClassDef = kJSClassDefinitionEmpty;
                hostObjectClassDef.version = 0;
                hostObjectClassDef.attributes = kJSClassAttributeNoAutomaticPrototype;
                hostObjectClassDef.finalize = hummerFinalize;
                JSClassRef hostObjectClass = JSClassCreate(&hostObjectClassDef);

                // 填充不透明指针
                JSObjectRef objectRef = JSObjectMake(self.contextRef, hostObjectClass, (__bridge void *) object);
                JSClassRelease(hostObjectClass);

                // 第一个参数是 private 对象，第二个参数是导出对象 JS 类名
                JSValueRef args[] = {
                        objectRef,
                        JSValueMakeString(self.contextRef, jsClassNameString)
                };
                JSStringRelease(jsClassNameString);
                returnValueRef = JSObjectCallAsFunction(self.contextRef, hummerCreateObjectFunctionObjectRef, NULL, 2, args, &exception);
                [self popExceptionWithErrorObject:&exception];
                if (returnValueRef) {
                    HMLogDebug(HUMMER_RETAIN_TEMPLATE, className);
                    object.hmValue = [[HMJSCStrongValue alloc] initWithValueRef:returnValueRef executor:self];
                }
            }
        }
    }

    return returnValueRef;
}

- (nullable JSValueRef)convertFunctionToValueRef:(id)function {
    HMAssertMainQueue();
    if ([function hmValue].context == self && [[function hmValue] isKindOfClass:HMJSCStrongValue.class]) {
        // 先判断 hmValue，这样后续的闭包转换和原生组件导出可以减少调用
        // 做严格判断，同上下文才能复用 hm_value
        HMJSCStrongValue *strongValue = (HMJSCStrongValue *) [function hmValue];
        return strongValue.valueRef;
    }
    JSValueRef returnValueRef = NULL;
    if ([function isKindOfClass:NSClassFromString(@"NSBlock")]) {
        JSStringRef hummerCreateFunction = JSStringCreateWithUTF8CString("hummerCreateFunction");
        JSValueRef exception = NULL;
        JSValueRef createFunctionFunction = JSObjectGetProperty(self.contextRef, JSContextGetGlobalObject(self.contextRef), hummerCreateFunction, &exception);
        JSStringRelease(hummerCreateFunction);
        if (createFunctionFunction && JSValueIsObject(self.contextRef, createFunctionFunction)) {
            JSObjectRef createFunctionFunctionObjectRef = JSValueToObject(self.contextRef, createFunctionFunction, &exception);
            if (!exception && JSObjectIsFunction(self.contextRef, createFunctionFunctionObjectRef)) {
                // 引用计数 +1
                CFRetain((__bridge CFTypeRef) function);
                HMLogDebug(HUMMER_CREATE_TEMPLATE, [function class]);
                JSClassDefinition hostObjectClassDef = kJSClassDefinitionEmpty;
                hostObjectClassDef.version = 0;
                hostObjectClassDef.attributes = kJSClassAttributeNoAutomaticPrototype;
                hostObjectClassDef.finalize = hummerFinalize;
                JSClassRef hostObjectClass = JSClassCreate(&hostObjectClassDef);

                // 填充不透明指针
                JSObjectRef objectRef = JSObjectMake(self.contextRef, hostObjectClass, (__bridge void *) function);
                JSClassRelease(hostObjectClass);

                JSValueRef args[] = {
                        objectRef
                };
                returnValueRef = JSObjectCallAsFunction(self.contextRef, createFunctionFunctionObjectRef, NULL, 1, args, &exception);
                [self popExceptionWithErrorObject:&exception];
                if (returnValueRef) {
                    [function setHmValue:[[HMJSCStrongValue alloc] initWithValueRef:returnValueRef executor:self]];
                }
            }
        }
    }

    return returnValueRef;
}

- (nullable JSValueRef)convertArrayToValueRef:(NSArray *)array {
    HMAssertMainQueue();
    __block JSObjectRef arrayRef = NULL;
    // Native -> JavaScript 空数组情况
    if (array && array.count == 0) {
        JSValueRef exception = NULL;
        arrayRef = JSObjectMakeArray(self.contextRef, 0, NULL, &exception);
        if (exception) {
            return NULL;
        }
    }

    [array enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
        JSValueRef inlineValueRef = [self convertObjectToValueRef:obj];
        JSValueRef exception = NULL;
        if (!arrayRef) {
            arrayRef = JSObjectMakeArray(self.contextRef, 0, NULL, &exception);
            if (exception) {
                // continue
                return;
            }
        }
        JSStringRef pushPropertyName = JSStringCreateWithUTF8CString("push");
        JSValueRef pushFunctionValueRef = JSObjectGetProperty(self.contextRef, arrayRef, pushPropertyName, &exception);
        JSStringRelease(pushPropertyName);
        if (exception || !JSValueIsObject(self.contextRef, pushFunctionValueRef)) {
            return;
        }
        JSObjectRef objectRef = JSValueToObject(self.contextRef, pushFunctionValueRef, &exception);
        if (exception) {
            return;
        }
        if (JSObjectIsFunction(self.contextRef, objectRef)) {
            // 忽略返回值
            JSValueRef argArray[] = {
                    inlineValueRef
            };
            // 忽略异常
            JSObjectCallAsFunction(self.contextRef, objectRef, arrayRef, 1, argArray, NULL);
        }
    }];

    return arrayRef;
}

- (nullable JSValueRef)convertDictionaryToValueRef:(NSDictionary<NSString *, id> *)dictionary {
    HMAssertMainQueue();
    __block JSObjectRef objectRef = NULL;
    // 空字典情况
    if (dictionary && dictionary.count == 0) {
        objectRef = JSObjectMake(self.contextRef, NULL, NULL);

        return objectRef;
    }
    [dictionary enumerateKeysAndObjectsUsingBlock:^(NSString *key, id obj, BOOL *stop) {
        JSValueRef inlineValueRef = [self convertObjectToValueRef:obj];
        JSValueRef exception = NULL;
        if (!objectRef) {
            JSObjectRef globalThis = JSContextGetGlobalObject(self.contextRef);
            JSStringRef objectStringRef = JSStringCreateWithUTF8CString("Object");
            JSValueRef objectConstructor = JSObjectGetProperty(self.contextRef, globalThis, objectStringRef, &exception);
            JSStringRelease(objectStringRef);
            if (exception || !JSValueIsObject(self.contextRef, objectConstructor)) {
                // continue
                return;
            }
            JSObjectRef objectConstructorObjectRef = JSValueToObject(self.contextRef, objectConstructor, &exception);
            if (exception || !JSObjectIsConstructor(self.contextRef, objectConstructorObjectRef)) {
                return;
            }
            objectRef = JSObjectCallAsConstructor(self.contextRef, objectConstructorObjectRef, 0, NULL, &exception);
            // JSObjectSetProperty 需要 objectRef 为非空
            if (exception || !objectRef) {
                // continue
                return;
            }
        }
        JSStringRef propertyName = JSStringCreateWithUTF8CString(key.UTF8String);
        // 忽略异常
        JSObjectSetProperty(self.contextRef, objectRef, propertyName, inlineValueRef, kJSPropertyAttributeNone, NULL);
        JSStringRelease(propertyName);
    }];

    return objectRef;
}

- (nullable HMFunctionType)convertToFunctionWithValue:(HMBaseValue *)value {
    if (value.context != self || ![value isKindOfClass:HMJSCStrongValue.class]) {
        return nil;
    }
    HMJSCStrongValue *strongValue = (HMJSCStrongValue *) value;

    return [self convertValueRefToFunction:strongValue.valueRef];
}

- (nullable JSValueRef)convertObjectToValueRef:(id)object {
    HMAssertMainQueue();
    if ([object isKindOfClass:HMJSCWeakValue.class] || [object isKindOfClass:HMJSCStrongValue.class]) {
        if (!((id <HMJSCValue>) object).valueRef) {
            // 无效值
            return JSValueMakeUndefined(self.contextRef);
        }

        if (((HMBaseValue *) object).executor != self) {
            // JSValueRef -> 对象 -> JSValueRef
            return [self convertObjectToValueRef:[((HMJSCExecutor *) ((HMBaseValue *) object).executor) convertValueRefToObject:((id <HMJSCValue>) object).valueRef isPortableConvert:NO]];
        }

        // 业务方已经转好，直接添加就行
        return ((id <HMJSCValue>) object).valueRef;
    } else if ([object isKindOfClass:NSNumber.class]) {
        return [self convertNumberToValueRef:object];
    } else if ([object isKindOfClass:NSString.class]) {
        return [self convertStringToValueRef:object];
    } else if ([object isKindOfClass:NSArray.class]) {
        return [self convertArrayToValueRef:(NSArray *) object];
    } else if ([object isKindOfClass:NSDictionary.class]) {
        return [self convertDictionaryToValueRef:(NSDictionary<NSString *, id> *) object];
    } else if ([object hm_value].executor == self && [[object hm_value] isValid]) {
        // 先判断 hm_value，这样后续的闭包转换和原生组件导出可以减少调用
        // 做严格判断，同上下文才能复用 hm_value
        return ((HMJSCWeakValue *) [object hm_value]).valueRef;
    } else if ([object isKindOfClass:NSClassFromString(@"NSBlock")]) {
        return [self convertClosureToValueRef:object];
    } else {
        return [self convertNativeObjectToValueRef:object];
    }
}

- (nullable HMFunctionType)convertValueRefToFunction:(JSValueRef)valueRef {
    HMAssertMainQueue();
    if (!JSValueIsObject(self.contextRef, valueRef)) {
        return nil;
    }
    JSValueRef exception = NULL;
    JSObjectRef objectRef = JSValueToObject(self.contextRef, valueRef, &exception);
    if (exception) {
        return nil;
    }
    if (!JSObjectIsFunction(self.contextRef, objectRef)) {
        return nil;
    }

    JSStringRef privateStringRef = JSStringCreateWithUTF8CString("_privateFunction");
    JSValueRef privateValueRef = JSObjectGetProperty(self.contextRef, objectRef, privateStringRef, &exception);
    JSStringRelease(privateStringRef);
    if (exception) {
        return nil;
    }

    // 是原先原生转成的 JS 闭包
    if (JSValueIsObject(self.contextRef, privateValueRef)) {
        JSObjectRef privateObjectRef = JSValueToObject(self.contextRef, valueRef, &exception);
        if (!exception && privateObjectRef && JSObjectGetPrivate(privateObjectRef) && [(__bridge id) JSObjectGetPrivate(privateObjectRef) isKindOfClass:NSClassFromString(@"NSBlock")]) {
            // 本次 JS 闭包是原生返回，复用原先的闭包
            return (__bridge HMFunctionType _Nullable) JSObjectGetPrivate(privateObjectRef);
        }
    }

    HMJSCStrongValue *valueWrapper = [[HMJSCStrongValue alloc] initWithValueRef:valueRef executor:self];
    // 出于主线程不阻塞原则，返回值只能使用回调返回
    HMFunctionType functionType = ^(NSArray *_Nullable argumentArray) {
        HMAssertMainQueue();
        if (valueWrapper.context) {
            // 当前还未被销毁
            // 重新判断一次 valueRef
            HMJSCExecutor *executor = (HMJSCExecutor *) valueWrapper.context;
            if (!JSValueIsObject(executor.contextRef, valueWrapper.valueRef)) {
                return (HMJSCStrongValue *) nil;
            }
            JSValueRef inlineException = NULL;
            JSObjectRef inlineObjectRef = JSValueToObject(executor.contextRef, valueWrapper.valueRef, &inlineException);
            if (inlineException) {
                return (HMJSCStrongValue *) nil;
            }
            if (!JSObjectIsFunction(executor.contextRef, inlineObjectRef)) {
                return (HMJSCStrongValue *) nil;
            }

            // 转参数
            __block JSValueRef *valueRefArray = NULL;
            __block size_t count = 0;
            [argumentArray enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
                JSValueRef inlineValueRef = [executor convertObjectToValueRef:obj];
//                if (inlineValueRef) {
                // 增长或者创建
                count += 1;
                // TODO(ChasonTang): 处理 realloc 错误
                valueRefArray = realloc(valueRefArray, count * sizeof(JSValueRef));
                valueRefArray[count - 1] = inlineValueRef;
//                }
            }];
            JSValueRef returnValueRef = JSObjectCallAsFunction(executor.contextRef, inlineObjectRef, NULL, count, valueRefArray, &inlineException);
            free(valueRefArray);
            // 业务代码需要抛出异常
            [executor popExceptionWithErrorObject:&inlineException];
            if (returnValueRef) {
                return [[HMJSCStrongValue alloc] initWithValueRef:returnValueRef executor:executor];
            }
        }

        return (HMJSCStrongValue *) nil;
    };
    [functionType setHmValue:valueWrapper];

    return functionType;
}

@end
