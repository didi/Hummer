//
//  HMJSCExecutor.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/6/29.
//

#import "HMJSCExecutor+Private.h"
#import "HMJSCValue.h"
#import "HMUtility.h"
#import "HMEncoding.h"
#import "HMExportClass.h"
#import "HMJSCStrongValue.h"
#import "HMExceptionModel.h"
#import "HMJSObject.h"
#import "NSObject+Hummer.h"
#import "HMJSCWeakValue.h"
#import <objc/runtime.h>
#import "NSInvocation+Hummer.h"
#import "HMJSCStrongValue+Private.h"
#import "HMBaseExecutor.h"

static NSString *const EXCEPTION_HANDLER_ERROR = @"异常处理过程发生错误";

static NSString *const ARRAY_LENGTH_NOT_NUMBER = @"array.length 不是数字";

static void hummerFinalize(JSObjectRef object);

static JSValueRef hummerCall(JSContextRef ctx, JSObjectRef function, JSObjectRef thisObject, size_t argumentCount, const JSValueRef arguments[], JSValueRef *exception);

static JSValueRef hummerCreate(JSContextRef ctx, JSObjectRef function, JSObjectRef thisObject, size_t argumentCount, const JSValueRef arguments[], JSValueRef *exception);

static JSValueRef hummerCallClosure(JSContextRef ctx, JSObjectRef function, JSObjectRef thisObject, size_t argumentCount, const JSValueRef arguments[], JSValueRef *exception);

static JSValueRef hummerGetProperty(JSContextRef ctx, JSObjectRef function, JSObjectRef thisObject, size_t argumentCount, const JSValueRef arguments[], JSValueRef *exception);

static JSValueRef hummerSetProperty(JSContextRef ctx, JSObjectRef function, JSObjectRef thisObject, size_t argumentCount, const JSValueRef arguments[], JSValueRef *exception);

NS_ASSUME_NONNULL_BEGIN

/**
 * 创建访问在单一线程（包括主线程），销毁是在自身线程
 */
//static NSThread *_Nullable jsThread = nil;

static JSContextGroupRef _Nullable virtualMachineRef = NULL;

@interface HMJSCExecutor ()

/**
 * 只能在 JS 线程访问
 */
@property (nonatomic, assign) JSGlobalContextRef contextRef;

/**
 * JSContextRef
 */
@property (nonatomic, nullable, copy) NSHashTable<HMJSCStrongValue *> *strongValueReleasePool;

/*
+ (void)keepWhile;

+ (void)runOnJSThreadWithBlock:(dispatch_block_t)block;

+ (void)runBlock:(dispatch_block_t)block;
 */

#pragma mark - 注入方法帮助方法

- (void)hummerExtractExportWithFunctionPropertyName:(nullable NSString *)functionPropertyName objectRef:(nullable JSObjectRef)objectRef target:(id _Nullable *)target selector:(SEL _Nullable *)selector methodSignature:(NSMethodSignature *_Nullable *)methodSignature isSetter:(BOOL)isSetter jsClassName:(nullable NSString *)jsClassName;

// const JSValueRef[] 是 JavaScriptCore 函数签名要求
- (JSValueRef)hummerCallNativeWithArgumentCount:(size_t)argumentCount arguments:(const JSValueRef _Nonnull[])arguments target:(nullable id)target selector:(nullable SEL)selector methodSignature:(nullable NSMethodSignature *)methodSignature;

- (JSValueRef)hummerGetSetPropertyWithArgumentCount:(size_t)argumentCount arguments:(const JSValueRef _Nonnull[])arguments isSetter:(BOOL)isSetter;

- (void)popExceptionWithErrorObject:(JSValueRef _Nullable *)valueRef;

#pragma mark - Native -> JS

/**
 * 后续所有转换函数必须在 JS 线程执行
 * @param object 原生对象
 * @return JSValueRef
 */
- (JSValueRef)convertObjectToValueRef:(nullable id)object;

- (JSValueRef)convertNativeObjectToValueRef:(nullable NSObject *)object;

- (JSValueRef)convertArrayToValueRef:(nullable NSArray *)array;

- (JSValueRef)convertClosureToValueRef:(nullable id)closure;

- (JSValueRef)convertDictionaryToValueRef:(nullable NSDictionary<NSString *, id> *)dictionary;

- (JSValueRef)convertNumberToValueRef:(nullable NSNumber *)number;

- (JSValueRef)convertStringToValueRef:(nullable NSString *)stringValue;

#pragma mark - JS 类型判断

- (BOOL)valueRefIsNativeObject:(JSValueRef)valueRef;

- (BOOL)valueRefIsClosure:(JSValueRef)valueRef;

- (BOOL)valueRefIsDictionary:(JSValueRef)valueRef;

#pragma mark - JS -> Native

- (nullable id)convertValueRefToObject:(JSValueRef)valueRef isPortableConvert:(BOOL)isPortableConvert;

/**
 * 转换 valueRef 到字符串，如果传入 exception 即 JSValueRef *，则忽略 needPopException
 * @param valueRef JSValueRef
 * @return Objective-C 字符串
 */
- (nullable NSString *)convertValueRefToString:(JSValueRef)valueRef;

- (nullable NSNumber *)convertValueRefToNumber:(JSValueRef)valueRef;

/**
 * 包含闭包在内
 * @param valueRef 值引用
 * @return OC 对象
 */
- (nullable NSArray *)convertValueRefToArray:(JSValueRef)valueRef isPortableConvert:(BOOL)isPortableConvert;

- (nullable HMClosureType)convertValueRefToClosure:(JSValueRef)valueRef;

/**
 * 包含闭包
 * @param valueRef 值引用
 * @return OC 对象
 */
- (nullable NSDictionary<NSString *, id> *)convertValueRefToDictionary:(JSValueRef)valueRef isPortableConvert:(BOOL)isPortableConvert;

- (nullable NSObject *)convertValueRefToNativeObject:(JSValueRef)valueRef;

@end

NS_ASSUME_NONNULL_END

/**
 * JS 线程访问
 * @param object JS 对象
 */
static void hummerFinalize(JSObjectRef object) {
    HMAssertMainThread();
    void *opaquePointer = JSObjectGetPrivate(object);
    assert(opaquePointer != NULL);
    if (opaquePointer) {
        // 不透明指针可能为原生对象，也可能为闭包
        // 清空 hm_value
        [((__bridge id) opaquePointer) setHm_value:nil];
        HMLogDebug(HUMMER_DESTROY_TEMPLATE, [((__bridge id) opaquePointer) class]);
//        hm_safe_main_thread(^{
        CFRelease(opaquePointer);
//        });
    } else {
        HMLogError(HUMMER_OPAQUE_POINTER_IS_NULL);
    }
}

static JSValueRef _Nullable hummerCallClosure(JSContextRef _Nullable ctx, JSObjectRef _Nullable function, JSObjectRef _Nullable thisObject, size_t argumentCount, const JSValueRef _Nonnull arguments[], JSValueRef *_Nullable exception) {
    HMAssertMainThread();
    if (argumentCount == 0) {
        HMLogError(HUMMER_CALL_CLOSURE_MUST_HAVE_PARAMETER);

        return JSValueMakeUndefined(ctx);
    }
    if (!JSValueIsObject(ctx, arguments[0])) {
        HMLogError(HUMMER_FIRST_PARAMETER_NOT_NATIVE_CLOSURE);

        return JSValueMakeUndefined(ctx);
    }
    JSObjectRef objectRef = JSValueToObject(ctx, arguments[0], exception);
    if (!objectRef) {
        HMLogError(HUMMER_FIRST_PARAMETER_NOT_NATIVE_CLOSURE);

        return JSValueMakeUndefined(ctx);
    }
    if (![(__bridge id) JSObjectGetPrivate(objectRef) isKindOfClass:NSClassFromString(@"NSBlock")]) {
        HMLogError(HUMMER_FIRST_PARAMETER_NOT_NATIVE_CLOSURE);

        return JSValueMakeUndefined(ctx);
    }
    // 转参数
    HMJSCExecutor *executor = (HMJSCExecutor *) [hm_executorMap objectForKey:[NSValue valueWithPointer:JSContextGetGlobalContext(ctx)]];
    if (!executor) {
        HMLogError(HUMMER_EXECUTOR_NOT_FOUND);

        return JSValueMakeUndefined(ctx);
    }
    NSMutableArray<HMBaseValue *> *mutableArgumentArray = nil;
    for (int i = 1; i < argumentCount; ++i) {
        HMBaseValue *jsValue = [[HMJSCStrongValue alloc] initWithValueRef:arguments[i] executor:executor];
        if (!mutableArgumentArray) {
            mutableArgumentArray = [NSMutableArray arrayWithCapacity:argumentCount - 1];
        }
        [mutableArgumentArray addObject:jsValue];
    }
    HMClosureType closure = (__bridge HMClosureType) JSObjectGetPrivate(objectRef);
    NSMethodSignature *methodSignature = hm_extractMethodSignatureFromBlock(closure);
    id returnObject = nil;
    if (*methodSignature.methodReturnType == '@') {
        returnObject = closure(mutableArgumentArray.copy);
    } else {
        // TODO: 补充支持其他类型
        closure(mutableArgumentArray.copy);
    }
    if (!returnObject) {
        return JSValueMakeUndefined(ctx);
    }

    return [executor convertObjectToValueRef:returnObject];
}

/**
 * JS 线程访问
 * @param ctx 上下文
 * @param function 函数对象
 * @param thisObject this 指针
 * @param argumentCount 参数个数
 * @param arguments 参数数组
 * @param exception 异常指针
 * @return JSValueRef
 */
static JSValueRef hummerCall(JSContextRef _Nullable ctx, JSObjectRef _Nullable function, JSObjectRef _Nullable thisObject, size_t argumentCount, const JSValueRef arguments[], JSValueRef *_Nullable exception) {
    HMAssertMainThread();
    // exception 要判空 -> 文档写 if any
    // 可以使用 callback 代替同步
    // 这里的 thisObject 实际上就是 globalThis
    // 类方法参数必须大于等于三个
    if (argumentCount < 2) {
        HMLogError(HUMMER_CALL_PARAMETER_ERROR);

        return JSValueMakeUndefined(ctx);
    }
    // 判断第一个参数是否为 Object 来确定调用的是类方法还是实例方法
    JSObjectRef objectRef = NULL;
    if (JSValueIsObject(ctx, arguments[0])) {
        objectRef = JSValueToObject(ctx, arguments[0], exception);
        // 发生 exception 可以降级到类方法来调用
        // JSValueRef *exception 必定存在
        if (*exception) {
            HMLogWarning(HUMMER_DOWNGRADE_TO_CLASS_CALL);
        }
    }
    // 成员方法参数必须大于等于三个
    if (objectRef && argumentCount < 3) {
        HMLogError(HUMMER_CALL_PARAMETER_ERROR);

        return JSValueMakeUndefined(ctx);
    }
    HMJSCExecutor *executor = (HMJSCExecutor *) [hm_executorMap objectForKey:[NSValue valueWithPointer:JSContextGetGlobalContext(ctx)]];
    NSString *className = [executor convertValueRefToString:arguments[objectRef ? 1 : 0]];
    NSString *functionName = [executor convertValueRefToString:arguments[objectRef ? 2 : 1]];
    // this 指针
    // 是否为函数类型
    // NSValue - valueWithPointer: nullable
    id target = nil;
    SEL selector = nil;
    NSMethodSignature *methodSignature = nil;

    // 最后一个参数无效
    [executor hummerExtractExportWithFunctionPropertyName:functionName objectRef:objectRef target:&target selector:&selector methodSignature:&methodSignature isSetter:YES jsClassName:className];

    return [executor hummerCallNativeWithArgumentCount:argumentCount arguments:arguments target:target selector:selector methodSignature:methodSignature];
}

static JSValueRef hummerGetProperty(JSContextRef _Nullable ctx, JSObjectRef _Nullable function, JSObjectRef _Nullable thisObject, size_t argumentCount, const JSValueRef _Nullable arguments[], JSValueRef *_Nullable exception) {
    HMAssertMainThread();
    HMJSCExecutor *executor = (HMJSCExecutor *) [hm_executorMap objectForKey:[NSValue valueWithPointer:JSContextGetGlobalContext(ctx)]];
    if (!executor) {
        HMLogError(HUMMER_EXECUTOR_NOT_FOUND);

        return JSValueMakeUndefined(ctx);
    }

    return [executor hummerGetSetPropertyWithArgumentCount:argumentCount arguments:arguments isSetter:NO];
}

static JSValueRef hummerSetProperty(JSContextRef _Nullable ctx, JSObjectRef _Nullable function, JSObjectRef _Nullable thisObject, size_t argumentCount, const JSValueRef _Nullable arguments[], JSValueRef *_Nullable exception) {
    HMAssertMainThread();
    HMJSCExecutor *executor = (HMJSCExecutor *) [hm_executorMap objectForKey:[NSValue valueWithPointer:JSContextGetGlobalContext(ctx)]];
    if (!executor) {
        HMLogError(HUMMER_EXECUTOR_NOT_FOUND);

        return JSValueMakeUndefined(ctx);
    }

    return [executor hummerGetSetPropertyWithArgumentCount:argumentCount arguments:arguments isSetter:YES];
}

static JSValueRef hummerCreate(JSContextRef _Nullable ctx, JSObjectRef _Nullable function, JSObjectRef _Nullable thisObject, size_t argumentCount, const JSValueRef _Nullable arguments[], JSValueRef *_Nullable exception) {
    HMAssertMainThread();
    if (argumentCount < 2) {
        HMLogError(HUMMER_CREATE_ERROR);

        return JSValueMakeUndefined(ctx);
    }
    HMJSCExecutor *executor = (HMJSCExecutor *) [hm_executorMap objectForKey:[NSValue valueWithPointer:JSContextGetGlobalContext(ctx)]];
    NSString *className = [executor convertValueRefToString:arguments[0]];
    // 隐含 executor 不为空
    if (className.length == 0) {
        HMLogError(HUMMER_CREATE_ERROR);

        return JSValueMakeUndefined(ctx);
    }

    HMExportClass *exportClass = HMExportManager.sharedInstance.jsClasses[className];
    NSString *objcClassName = exportClass.className;
    if (objcClassName.length == 0) {
        HMLogError(HUMMER_CREATE_CLASS_NOT_FOUND, className);

        return JSValueMakeUndefined(ctx);
    }
    Class clazz = NSClassFromString(objcClassName);
    if (!clazz) {
        HMLogError(HUMMER_CREATE_CLASS_NOT_FOUND, className);

        return JSValueMakeUndefined(ctx);
    }
    // 创建对象
    NSObject *opaquePointer = NULL;
//    dispatch_semaphore_t semaphore = nil;
//    semaphore = !NSThread.isMainThread ? dispatch_semaphore_create(0) : nil;
    // 主线程不会被死锁
    // 可以使用 callback 代替同步
//    hm_safe_main_thread(^{
    NSMutableArray<HMBaseValue *> *argumentArray = nil;
    for (int i = 2; i < argumentCount; ++i) {
        HMBaseValue *value = [[HMJSCStrongValue alloc] initWithValueRef:arguments[i] executor:executor];
        if (!argumentArray) {
            argumentArray = [NSMutableArray arrayWithCapacity:argumentCount - 2];
        }
        [argumentArray addObject:value];
    }

    hm_currentExecutor = executor;
    // 支持 HMJSObject，如果不支持则回退 init
    // 不判断 argumentCount > 2，因为 UIView 必须调用 HMJSObject 初始化方法
    if ([clazz conformsToProtocol:@protocol(HMJSObject)]) {
        opaquePointer = (id) [(id) [clazz alloc] initWithHMValues:argumentArray];
    } else {
        hm_otherArguments = argumentArray.copy;
        opaquePointer = [[clazz alloc] init];
    }
    hm_currentExecutor = nil;
    hm_otherArguments = nil;
//        dispatch_semaphore_signal(semaphore);
//    });
//    if (semaphore) {
//        dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER);
//    }
    if (!opaquePointer) {
        HMLogError(HUMMER_CAN_NOT_CREATE_NATIVE_OBJECT, className);

        return JSValueMakeUndefined(ctx);
    }
    // 关联 hm_value
    opaquePointer.hm_value = [[HMJSCWeakValue alloc] initWithValueRef:arguments[1] executor:executor];
    // 引用计数 +1
    CFRetain((__bridge CFTypeRef) opaquePointer);
    HMLogDebug(HUMMER_CREATE_TEMPLATE, className);
    JSClassDefinition hostObjectClassDef = kJSClassDefinitionEmpty;
    hostObjectClassDef.version = 0;
    hostObjectClassDef.attributes = kJSClassAttributeNoAutomaticPrototype;
    hostObjectClassDef.finalize = hummerFinalize;
    JSClassRef hostObjectClass = JSClassCreate(&hostObjectClassDef);

    // 填充不透明指针
    JSObjectRef objectRef = JSObjectMake(ctx, hostObjectClass, (__bridge void *) opaquePointer);
    JSClassRelease(hostObjectClass);

    return objectRef;
}

@implementation HMJSCExecutor

- (nullable NSString *)convertValueToString:(HMBaseValue *)value {
    if (value.executor != self || !((id <HMJSCValue>) value).valueRef) {
        return nil;
    }

    return [self convertValueRefToString:((id <HMJSCValue>) value).valueRef];
}

- (nullable NSNumber *)convertValueToNumber:(HMBaseValue *)value {
    if (value.executor != self || !((id <HMJSCValue>) value).valueRef) {
        return nil;
    }

    return [self convertValueRefToNumber:((id <HMJSCValue>) value).valueRef];
}

- (nullable NSArray *)convertValueToArray:(HMBaseValue *)value {
    if (value.executor != self || !((id <HMJSCValue>) value).valueRef) {
        return nil;
    }

    return [self convertValueRefToArray:((id <HMJSCValue>) value).valueRef isPortableConvert:NO];
}

- (nullable HMClosureType)convertValueToClosure:(HMBaseValue *)value {
    if (value.executor != self || !((id <HMJSCValue>) value).valueRef) {
        return nil;
    }

    return [self convertValueRefToClosure:((id <HMJSCValue>) value).valueRef];
}

- (nullable id)convertValueToObject:(HMBaseValue *)value {
    if (value.executor != self || !((id <HMJSCValue>) value).valueRef) {
        return nil;
    }

    return [self convertValueRefToObject:((id <HMJSCValue>) value).valueRef isPortableConvert:NO];
}

- (nullable id <NSCoding>)convertValueToPortableObject:(HMBaseValue *)value {
    if (value.executor != self || !((id <HMJSCValue>) value).valueRef) {
        return nil;
    }

    return [self convertValueRefToObject:((id <HMJSCValue>) value).valueRef isPortableConvert:YES];
}

- (nullable NSDictionary<NSString *, id> *)convertValueToDictionary:(HMBaseValue *)value {
    if (value.executor != self || !((id <HMJSCValue>) value).valueRef) {
        return nil;
    }

    return [self convertValueRefToDictionary:((id <HMJSCValue>) value).valueRef isPortableConvert:NO];
}

- (nullable NSObject *)convertValueToNativeObject:(HMBaseValue *)value {
    if (value.executor != self || !((id <HMJSCValue>) value).valueRef) {
        return nil;
    }

    return [self convertValueRefToNativeObject:((id <HMJSCValue>) value).valueRef];
}

/*
+ (void)keepWhile {
    // 常驻线程
    @autoreleasepool {
        pthread_setname_np([NSThread currentThread].name.UTF8String);
        CFRunLoopSourceContext noSpinCtx = {0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL};
        CFRunLoopSourceRef noSpinSource = CFRunLoopSourceCreate(NULL, 0, &noSpinCtx);
        CFRunLoopAddSource(CFRunLoopGetCurrent(), noSpinSource, kCFRunLoopDefaultMode);
        CFRelease(noSpinSource);
        // kCFRunLoopRunHandledSource 是当前 loop 处理了 source
        while (kCFRunLoopRunStopped != CFRunLoopRunInMode(kCFRunLoopDefaultMode, NSDate.distantFuture.timeIntervalSinceReferenceDate, NO)) {
            NSAssert(NO, @"not reached assertion");
        }
    }
}
 */

- (void)registerWithName:(NSString *)name closure:(HMClosureType)closure {
    HMAssertMainThread();
    JSObjectRef objectRef = JSContextGetGlobalObject(self.contextRef);
    HMJSCStrongValue *globalValue = [[HMJSCStrongValue alloc] initWithValueRef:objectRef executor:self];
    [self setPropertyWithObject:globalValue value:closure property:name];
}

- (void)hummerExtractExportWithFunctionPropertyName:(nullable NSString *)functionPropertyName objectRef:(nullable JSObjectRef)objectRef target:(id _Nullable *)target selector:(SEL _Nullable *)selector methodSignature:(NSMethodSignature *_Nullable *)methodSignature isSetter:(BOOL)isSetter jsClassName:(nullable NSString *)jsClassName {
    HMAssertMainThread();
    if (!target || !selector || !methodSignature || functionPropertyName.length == 0 || jsClassName.length == 0) {
        return;
    }
    HMExportClass *exportClass = HMExportManager.sharedInstance.jsClasses[jsClassName];
    HMExportBaseClass *exportBaseClass = nil;
    if (!objectRef) {
        // class
        if (exportClass.className.length == 0) {
            HMLogError(HUMMER_CREATE_CLASS_NOT_FOUND, jsClassName);

            return;
        }
        (*target) = NSClassFromString(exportClass.className);
        exportBaseClass = [exportClass methodOrPropertyWithName:functionPropertyName isClass:YES];
    } else {
        // instance
        // 获取不透明指针
        void *opaquePointer = JSObjectGetPrivate(objectRef);
        if (!opaquePointer || ![((__bridge id) opaquePointer) isKindOfClass:NSObject.class]) {
            return;
        }
        NSObject *nativeObject = (__bridge NSObject *) opaquePointer;
        (*target) = nativeObject;
        exportBaseClass = [exportClass methodOrPropertyWithName:functionPropertyName isClass:NO];
    }
    if ([exportBaseClass isKindOfClass:HMExportMethod.class]) {
        // 方法
        HMExportMethod *exportMethod = (HMExportMethod *) exportBaseClass;
        (*selector) = exportMethod.selector;
        (*methodSignature) = !objectRef ? [*target methodSignatureForSelector:exportMethod.selector] : [[(*target) class] instanceMethodSignatureForSelector:exportMethod.selector];
    } else {
        // 属性
        // isSetter 只有属性才生效
        HMExportProperty *exportProperty = (HMExportProperty *) exportBaseClass;
        (*selector) = isSetter ? exportProperty.propertySetterSelector : exportProperty.propertyGetterSelector;
        (*methodSignature) = !objectRef ? [*target methodSignatureForSelector:(*selector)] : [[(*target) class] instanceMethodSignatureForSelector:(*selector)];
    }
}

- (instancetype)init {
    HMAssertMainThread();
    self = [super init];
//    if (!jsThread) {
    // 创建线程
    // 静态变量访问是否需要加锁？
//        if (@available(iOS 10.0, *)) {
//            jsThread = [[NSThread alloc] initWithBlock:^{
//                [HMJSCExecutor keepWhile];
//            }];
//        } else {
//            jsThread = [[NSThread alloc] initWithTarget:HMJSCExecutor.class selector:@selector(keepWhile) object:nil];
//        }
//        jsThread.name = @"com.didi.hummer.JavaScript";
//        [jsThread start];
//    }
    // 串行队列
//    [HMJSCExecutor runOnJSThreadWithBlock:^{
    // 静态变量加锁保护？
    if (!hm_executorMap) {
        hm_executorMap = NSMapTable.strongToWeakObjectsMapTable;
    }
    _strongValueReleasePool = NSHashTable.weakObjectsHashTable;
    if (!virtualMachineRef) {
        virtualMachineRef = JSContextGroupCreate();
    }
    _contextRef = JSGlobalContextCreateInGroup(virtualMachineRef, NULL);
    [hm_executorMap setObject:self forKey:[NSValue valueWithPointer:_contextRef]];

    // 注入对象
    JSStringRef hummerCallString = JSStringCreateWithUTF8CString("hummerCall");
    JSStringRef hummerCreateString = JSStringCreateWithUTF8CString("hummerCreate");
    JSStringRef hummerGetPropertyString = JSStringCreateWithUTF8CString("hummerGetProperty");
    JSStringRef hummerSetPropertyString = JSStringCreateWithUTF8CString("hummerSetProperty");
    JSStringRef hummerCallClosureString = JSStringCreateWithUTF8CString("hummerCallClosure");
    JSObjectRef globalThis = JSContextGetGlobalObject(_contextRef);
    // 匿名函数
    JSObjectRef hummerCallFunction = JSObjectMakeFunctionWithCallback(_contextRef, NULL, &hummerCall);
    JSObjectRef hummerCreateFunction = JSObjectMakeFunctionWithCallback(_contextRef, NULL, &hummerCreate);
    JSObjectRef hummerGetPropertyFunction = JSObjectMakeFunctionWithCallback(_contextRef, NULL, &hummerGetProperty);
    JSObjectRef hummerSetPropertyFunction = JSObjectMakeFunctionWithCallback(_contextRef, NULL, &hummerSetProperty);
    JSObjectRef hummerCallClosureFunction = JSObjectMakeFunctionWithCallback(_contextRef, NULL, &hummerCallClosure);
    JSValueRef exception = NULL;
    JSObjectSetProperty(_contextRef, globalThis, hummerCallString, hummerCallFunction, kJSPropertyAttributeReadOnly | kJSPropertyAttributeDontDelete, &exception);
    [self popExceptionWithErrorObject:&exception];
    JSObjectSetProperty(_contextRef, globalThis, hummerCreateString, hummerCreateFunction, kJSPropertyAttributeReadOnly | kJSPropertyAttributeDontDelete, &exception);
    [self popExceptionWithErrorObject:&exception];
    JSObjectSetProperty(_contextRef, globalThis, hummerGetPropertyString, hummerGetPropertyFunction, kJSPropertyAttributeReadOnly | kJSPropertyAttributeDontDelete, &exception);
    [self popExceptionWithErrorObject:&exception];
    JSObjectSetProperty(_contextRef, globalThis, hummerSetPropertyString, hummerSetPropertyFunction, kJSPropertyAttributeReadOnly | kJSPropertyAttributeDontDelete, &exception);
    [self popExceptionWithErrorObject:&exception];
    JSObjectSetProperty(_contextRef, globalThis, hummerCallClosureString, hummerCallClosureFunction, kJSPropertyAttributeReadOnly | kJSPropertyAttributeDontDelete, &exception);
    [self popExceptionWithErrorObject:&exception];
    JSStringRelease(hummerCallString);
    JSStringRelease(hummerCreateString);
    JSStringRelease(hummerGetPropertyString);
    JSStringRelease(hummerSetPropertyString);
    JSStringRelease(hummerCallClosureString);
//    }];

    return self;
}

/*
+ (void)runOnJSThreadWithBlock:(dispatch_block_t)block {
    NSParameterAssert(jsThread);
    if (!jsThread) {
        // 不执行 block
        HMLogError(@"JS 线程不存在");

        return;
    }
    if (NSThread.currentThread == jsThread) {
        block();
    } else {
        [HMJSCExecutor performSelector:@selector(runBlock:) onThread:jsThread withObject:block waitUntilDone:NO];
    }
}

+ (void)runBlock:(dispatch_block_t)block {
    block();
}
 */

- (void)dealloc {
    HMAssertMainThread();
    // 防止闭包捕获 self
    // 这样可以保证只捕获指针
//    [HMJSCExecutor runOnJSThreadWithBlock:^{
    // 静态变量加锁保护？

    NSEnumerator<HMJSCStrongValue *> *strongValueEnumerator = self.strongValueReleasePool.objectEnumerator;
    HMJSCStrongValue *strongValue = nil;
    while ((strongValue = strongValueEnumerator.nextObject)) {
        [strongValue forceUnProtectWithGlobalContextRef:self.contextRef];
    }

    JSGlobalContextRelease(self.contextRef);
    NSEnumerator<HMBaseExecutor *> *enumerator = hm_executorMap.objectEnumerator;
    HMBaseExecutor *value = nil;
    BOOL isNoExecutor = YES;
    while ((value = enumerator.nextObject)) {
        if ([value isKindOfClass:self.class] && value != self) {
            isNoExecutor = NO;
            break;
        }
    }

    if (isNoExecutor) {
        virtualMachineRef ? JSContextGroupRelease(virtualMachineRef) : nil;
        virtualMachineRef = nil;
    }

//            [jsThread cancel];
//            jsThread = nil;
//            CFRunLoopStop(CFRunLoopGetCurrent());
//    }];
}

- (nullable HMBaseStrongValue *)evaluateWithScript:(nullable NSString *)script sourceUrl:(nullable NSString *)sourceUrl {
    HMAssertMainThread();
    if (script.length == 0) {
        return nil;
    }
//    [HMJSCExecutor runOnJSThreadWithBlock:^{
    JSStringRef scriptRef = JSStringCreateWithUTF8CString(script.UTF8String);
    JSStringRef sourceRef = NULL;
    if (sourceUrl.length > 0) {
        sourceRef = JSStringCreateWithUTF8CString(sourceUrl.UTF8String);
    }
    // 抛出异常
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
//        hm_safe_main_thread(^{
//    completionBlock ? completionBlock(valueWrapper) : nil;
//        });
//    }];
}

- (BOOL)valueIsNullOrUndefined:(HMBaseValue *)value {
    if (value.executor != self || !((id <HMJSCValue>) value).valueRef) {
        return YES;
    }

    return JSValueIsUndefined(self.contextRef, ((id <HMJSCValue>) value).valueRef) || JSValueIsNull(self.contextRef, ((id <HMJSCValue>) value).valueRef);
}

- (BOOL)valueIsBoolean:(nullable HMBaseValue *)value {
    if (value.executor != self || !((id <HMJSCValue>) value).valueRef) {
        return NO;
    }

    return JSValueIsBoolean(self.contextRef, ((id <HMJSCValue>) value).valueRef);
}

- (BOOL)valueIsNumber:(nullable HMBaseValue *)value {
    if (value.executor != self || !((id <HMJSCValue>) value).valueRef) {
        return NO;
    }

    return JSValueIsNumber(self.contextRef, ((id <HMJSCValue>) value).valueRef);
}

- (BOOL)valueIsString:(nullable HMBaseValue *)value {
    if (value.executor != self || !((id <HMJSCValue>) value).valueRef) {
        return NO;
    }

    return JSValueIsString(self.contextRef, ((id <HMJSCValue>) value).valueRef);
}

- (BOOL)valueIsArray:(nullable HMBaseValue *)value {
    if (value.executor != self || !((id <HMJSCValue>) value).valueRef) {
        return NO;
    }

    return JSValueIsArray(self.contextRef, ((id <HMJSCValue>) value).valueRef);
}

- (BOOL)valueIsNativeObject:(nullable HMBaseValue *)value {
    if (value.executor != self || !((id <HMJSCValue>) value).valueRef) {
        return NO;
    }

    return [self valueRefIsNativeObject:((id <HMJSCValue>) value).valueRef];
}

- (BOOL)valueIsClosure:(nullable HMBaseValue *)value {
    if (value.executor != self || !((id <HMJSCValue>) value).valueRef) {
        return NO;
    }

    return [self valueRefIsClosure:((id <HMJSCValue>) value).valueRef];
}

- (BOOL)valueIsDictionary:(nullable HMBaseValue *)value {
    if (value.executor != self || !((id <HMJSCValue>) value).valueRef) {
        return NO;
    }

    return [self valueRefIsDictionary:((id <HMJSCValue>) value).valueRef];
}

- (JSValueRef)convertStringToValueRef:(NSString *)stringValue {
    HMAssertMainThread();
    if (!stringValue) {
        return JSValueMakeUndefined(self.contextRef);
    }
    JSStringRef stringRef = JSStringCreateWithUTF8CString(stringValue.UTF8String);
    JSValueRef inlineValueRef = JSValueMakeString(self.contextRef, stringRef);
    JSStringRelease(stringRef);

    return inlineValueRef;
}

- (JSValueRef)hummerCallNativeWithArgumentCount:(size_t)argumentCount arguments:(const JSValueRef _Nonnull[])arguments target:(nullable id)target selector:(nullable SEL)selector methodSignature:(nullable NSMethodSignature *)methodSignature {
    HMAssertMainThread();
    if (!target) {
        HMLogError(HUMMER_CALL_NATIVE_TARGET_ERROR);

        return JSValueMakeUndefined(self.contextRef);
    }
    if (!selector) {
        HMLogError(HUMMER_CALL_NATIVE_SELECTOR_ERROR);

        return JSValueMakeUndefined(self.contextRef);
    }
    if (!methodSignature) {
        HMLogError(HUMMER_CALL_NATIVE_METHOD_SIGNATURE_ERROR);

        return JSValueMakeUndefined(self.contextRef);
    }
    BOOL isClass = object_isClass(target);
    NSMutableArray<HMBaseValue *> *otherArguments = nil;
    hm_currentExecutor = self;
    // 隐含着 numerOfArguments + 0/1 <= argumentCount
    for (NSUInteger i = methodSignature.numberOfArguments + (isClass ? 0 : 1); i < argumentCount; ++i) {
        // 多余的转数组
        HMBaseValue *hummerValue = [[HMJSCStrongValue alloc] initWithValueRef:arguments[i] executor:hm_currentExecutor];
        if (!otherArguments) {
            otherArguments = [NSMutableArray arrayWithCapacity:argumentCount - methodSignature.numberOfArguments];
        }
        [otherArguments addObject:hummerValue];
    }
    // 存储额外参数
    hm_otherArguments = otherArguments.copy;
    NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:methodSignature];
    invocation.target = target;
    invocation.selector = selector;
    // 后续做循环，都是临时变量，如果不做 retain，会导致野指针
    [invocation retainArguments];

    // 参数
    // 本质为 MIN(methodSignature.numberOfArguments, argumentCount - (isClass : 0 : 1))，主要为了防止无符号数字溢出
    for (NSUInteger i = 2; i < MIN(methodSignature.numberOfArguments + (isClass ? 0 : 1), argumentCount) - (isClass ? 0 : 1); ++i) {
        const char *objCType = [methodSignature getArgumentTypeAtIndex:i];
        HMEncodingType type = HMEncodingGetType(objCType);
        id param = nil;
        if (type == HMEncodingTypeBlock) {
            // Block
            param = [(HMJSCExecutor *) hm_currentExecutor convertValueRefToClosure:arguments[i + (isClass ? 0 : 1)]];
        } else if (type == HMEncodingTypeObject) {
            // HMJSCValue
            param = [[HMJSCStrongValue alloc] initWithValueRef:arguments[i + (isClass ? 0 : 1)] executor:hm_currentExecutor];
        } else if (HMEncodingTypeIsCNumber(type)) {
            // js 只存在 double 和 bool 类型，但原生需要区分具体类型。
            param = [(HMJSCExecutor *) hm_currentExecutor convertValueRefToNumber:arguments[i + (isClass ? 0 : 1)]];
        } else {
            HMLogError(HUMMER_UN_SUPPORT_TYPE_TEMPLATE, objCType);
        }
        [invocation hm_setArgument:param atIndex:i encodingType:type];
    }
    [invocation invoke];
    hm_otherArguments = nil;
    // 返回值
    JSValueRef returnValueRef = NULL;
    const char *objCReturnType = methodSignature.methodReturnType;
    HMEncodingType returnType = HMEncodingGetType(objCReturnType);
    if (returnType != HMEncodingTypeVoid && returnType != HMEncodingTypeUnknown) {
        id returnObject = [invocation hm_getReturnValueObject];
        if (returnObject) {
            returnValueRef = [(HMJSCExecutor *) hm_currentExecutor convertObjectToValueRef:returnObject];
        }
    }
    hm_currentExecutor = nil;

    if (!returnValueRef) {
        returnValueRef = JSValueMakeUndefined(self.contextRef);
    }

    return returnValueRef;
}

- (JSValueRef)hummerGetSetPropertyWithArgumentCount:(size_t)argumentCount arguments:(const JSValueRef _Nonnull[])arguments isSetter:(BOOL)isSetter {
    HMAssertMainThread();
    if (isSetter) {
        if (argumentCount < 3) {
            HMLogError(HUMMER_GET_SET_ERROR);

            return JSValueMakeUndefined(self.contextRef);
        }
    } else {
        if (argumentCount < 2) {
            HMLogError(HUMMER_GET_SET_ERROR);

            return JSValueMakeUndefined(self.contextRef);
        }
    }
    JSObjectRef objectRef = NULL;
    if (JSValueIsObject(self.contextRef, arguments[0])) {
        JSValueRef exception = NULL;
        objectRef = JSValueToObject(self.contextRef, arguments[0], &exception);
        [self popExceptionWithErrorObject:&exception];
        if (!objectRef) {
            HMLogWarning(HUMMER_DOWNGRADE_TO_CLASS_CALL);
        }
    }
    if (objectRef) {
        if (isSetter) {
            if (argumentCount < 4) {
                HMLogError(HUMMER_GET_SET_ERROR);

                return JSValueMakeUndefined(self.contextRef);
            }
        } else {
            if (argumentCount < 3) {
                HMLogError(HUMMER_GET_SET_ERROR);

                return JSValueMakeUndefined(self.contextRef);
            }
        }
    }

    NSString *className = [self convertValueRefToString:arguments[objectRef ? 1 : 0]];
    if (className.length == 0) {
        return JSValueMakeUndefined(self.contextRef);
    }
    NSString *propertyName = [self convertValueRefToString:arguments[objectRef ? 2 : 1]];
    if (propertyName.length == 0) {
        return JSValueMakeUndefined(self.contextRef);
    }

    id target = nil;
    SEL selector = nil;
    NSMethodSignature *methodSignature = nil;

    [self hummerExtractExportWithFunctionPropertyName:propertyName objectRef:objectRef target:&target selector:&selector methodSignature:&methodSignature isSetter:isSetter jsClassName:className];

    return [self hummerCallNativeWithArgumentCount:argumentCount arguments:arguments target:target selector:selector methodSignature:methodSignature];
}

- (JSValueRef)convertObjectToValueRef:(id)object {
    HMAssertMainThread();
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

- (JSValueRef)convertNativeObjectToValueRef:(nullable NSObject *)object {
    HMAssertMainThread();
    if ([object hm_value].executor == self && [[object hm_value] isValid]) {
        // 先判断 hm_value，这样后续的闭包转换和原生组件导出可以减少调用
        // 做严格判断，同上下文才能复用 hm_value
        return ((HMJSCWeakValue *) [object hm_value]).valueRef;
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
        [self popExceptionWithErrorObject:&exception];
        if (hummerCreateObjectFunction && JSValueIsObject(self.contextRef, hummerCreateObjectFunction)) {
            JSObjectRef hummerCreateObjectFunctionObjectRef = JSValueToObject(self.contextRef, hummerCreateObjectFunction, &exception);
            [self popExceptionWithErrorObject:&exception];
            if (hummerCreateObjectFunctionObjectRef && JSObjectIsFunction(self.contextRef, hummerCreateObjectFunctionObjectRef)) {
                JSStringRef jsClassNameString = JSStringCreateWithUTF8CString(exportClass.jsClass.UTF8String);
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
                    object.hm_value = [[HMJSCWeakValue alloc] initWithValueRef:(void *) returnValueRef executor:self];
                }
            }
        }
    }

    if (!returnValueRef) {
        returnValueRef = JSValueMakeUndefined(self.contextRef);
    }

    return returnValueRef;
}

- (JSValueRef)convertClosureToValueRef:(id)closure {
    HMAssertMainThread();
    if ([[closure hm_value] isValid] && [closure hm_value].executor == self) {
        // 本次闭包是 JS 传递给原生的，因此直接返回
        return ((HMJSCWeakValue *) [closure hm_value]).valueRef;
    }
    JSValueRef returnValueRef = NULL;
    if ([closure isKindOfClass:NSClassFromString(@"NSBlock")]) {
        JSStringRef hummerCreateClosure = JSStringCreateWithUTF8CString("hummerCreateClosure");
        JSValueRef exception = NULL;
        JSValueRef createClosureFunction = JSObjectGetProperty(self.contextRef, JSContextGetGlobalObject(self.contextRef), hummerCreateClosure, &exception);
        JSStringRelease(hummerCreateClosure);
        [self popExceptionWithErrorObject:&exception];
        if (createClosureFunction && JSValueIsObject(self.contextRef, createClosureFunction)) {
            JSObjectRef createClosureFunctionObjectRef = JSValueToObject(self.contextRef, createClosureFunction, &exception);
            [self popExceptionWithErrorObject:&exception];
            if (createClosureFunctionObjectRef && JSObjectIsFunction(self.contextRef, createClosureFunctionObjectRef)) {
                // 引用计数 +1
                CFRetain((__bridge CFTypeRef) closure);
                HMLogDebug(HUMMER_CREATE_TEMPLATE, [closure class]);
                JSClassDefinition hostObjectClassDef = kJSClassDefinitionEmpty;
                hostObjectClassDef.version = 0;
                hostObjectClassDef.attributes = kJSClassAttributeNoAutomaticPrototype;
                hostObjectClassDef.finalize = hummerFinalize;
                JSClassRef hostObjectClass = JSClassCreate(&hostObjectClassDef);

                // 填充不透明指针
                JSObjectRef objectRef = JSObjectMake(self.contextRef, hostObjectClass, (__bridge void *) closure);
                JSClassRelease(hostObjectClass);

                JSValueRef args[] = {
                        objectRef
                };
                returnValueRef = JSObjectCallAsFunction(self.contextRef, createClosureFunctionObjectRef, NULL, 1, args, &exception);
                [self popExceptionWithErrorObject:&exception];

                if (returnValueRef) {
                    [closure setHm_value:[[HMJSCWeakValue alloc] initWithValueRef:returnValueRef executor:self]];
                }
            }
        }
    }
    if (!returnValueRef) {
        returnValueRef = JSValueMakeUndefined(self.contextRef);
    }

    return returnValueRef;
}

- (JSValueRef)convertArrayToValueRef:(NSArray *)array {
    HMAssertMainThread();
    __block JSObjectRef arrayRef = NULL;
    // 空数组情况
    if (array && array.count == 0) {
        JSValueRef exception = NULL;
        arrayRef = JSObjectMakeArray(self.contextRef, 0, NULL, &exception);
        [self popExceptionWithErrorObject:&exception];
        if (!arrayRef) {
            return JSValueMakeUndefined(self.contextRef);
        }
    }
    [array enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
        JSValueRef inlineValueRef = [self convertObjectToValueRef:obj];
        if (inlineValueRef) {
            JSValueRef exception = NULL;
            if (!arrayRef) {
                arrayRef = JSObjectMakeArray(self.contextRef, 0, NULL, &exception);
                [self popExceptionWithErrorObject:&exception];
                if (!arrayRef) {
                    // continue
                    return;
                }
            }
            JSStringRef pushPropertyName = JSStringCreateWithUTF8CString("push");
            JSValueRef pushFunctionValueRef = JSObjectGetProperty(self.contextRef, arrayRef, pushPropertyName, &exception);
            JSStringRelease(pushPropertyName);
            [self popExceptionWithErrorObject:&exception];
            if (!pushFunctionValueRef || !JSValueIsObject(self.contextRef, pushFunctionValueRef)) {
                return;
            }
            JSObjectRef objectRef = JSValueToObject(self.contextRef, pushFunctionValueRef, &exception);
            [self popExceptionWithErrorObject:&exception];
            if (!objectRef) {
                return;
            }
            if (JSObjectIsFunction(self.contextRef, objectRef)) {
                // 忽略返回值
                JSValueRef argArray[] = {
                        inlineValueRef
                };
                JSObjectCallAsFunction(self.contextRef, objectRef, arrayRef, 1, argArray, &exception);
                [self popExceptionWithErrorObject:&exception];
            }
        }
    }];

    return arrayRef;
}

- (JSValueRef)convertNumberToValueRef:(NSNumber *)number {
    HMAssertMainThread();
    if (!number) {
        return JSValueMakeUndefined(self.contextRef);
    }
    if (strcmp(number.objCType, @encode(BOOL)) == 0) {
        return JSValueMakeBoolean(self.contextRef, number.boolValue);
    } else {
        return JSValueMakeNumber(self.contextRef, number.doubleValue);
    }
}

- (JSValueRef)convertDictionaryToValueRef:(NSDictionary<NSString *, id> *)dictionary {
    HMAssertMainThread();
    __block JSObjectRef objectRef = NULL;
    if (dictionary && dictionary.count == 0) {
        objectRef = JSObjectMake(self.contextRef, NULL, NULL);

        return objectRef;
    }
    [dictionary enumerateKeysAndObjectsUsingBlock:^(NSString *key, id obj, BOOL *stop) {
        JSValueRef inlineValueRef = [self convertObjectToValueRef:obj];
        if (inlineValueRef) {
            JSValueRef exception = NULL;
            if (!objectRef) {
                JSObjectRef globalThis = JSContextGetGlobalObject(self.contextRef);
                JSStringRef objectStringRef = JSStringCreateWithUTF8CString("Object");
                JSValueRef objectConstructor = JSObjectGetProperty(self.contextRef, globalThis, objectStringRef, &exception);
                JSStringRelease(objectStringRef);
                [self popExceptionWithErrorObject:&exception];
                if (!objectConstructor || !JSValueIsObject(self.contextRef, objectConstructor)) {
                    // continue
                    return;
                }
                JSObjectRef objectConstructorObjectRef = JSValueToObject(self.contextRef, objectConstructor, &exception);
                [self popExceptionWithErrorObject:&exception];
                if (!objectConstructorObjectRef || !JSObjectIsConstructor(self.contextRef, objectConstructorObjectRef)) {
                    return;
                }
                objectRef = JSObjectCallAsConstructor(self.contextRef, objectConstructorObjectRef, 0, NULL, &exception);
                [self popExceptionWithErrorObject:&exception];
                if (!objectRef) {
                    // continue
                    return;
                }
            }
            JSStringRef propertyName = JSStringCreateWithUTF8CString(key.UTF8String);
            JSObjectSetProperty(self.contextRef, objectRef, propertyName, inlineValueRef, kJSPropertyAttributeNone, &exception);
            JSStringRelease(propertyName);
            [self popExceptionWithErrorObject:&exception];
        }
    }];

    return objectRef;
}

- (id)convertValueRefToObject:(JSValueRef)valueRef isPortableConvert:(BOOL)isPortableConvert {
    if (JSValueIsNull(self.contextRef, valueRef) || JSValueIsUndefined(self.contextRef, valueRef)) {
        return nil;
    }

    id returnValue = [self convertValueRefToString:valueRef];
    if (returnValue) {
        return returnValue;
    }
    returnValue = [self convertValueRefToNumber:valueRef];
    if (returnValue) {
        return returnValue;
    }

    if (isPortableConvert) {
        // 原生对象
        returnValue = [self convertValueRefToNativeObject:valueRef];
        if (returnValue) {
            return returnValue;
        }

        // 闭包需要比字典优先判断
        returnValue = [self convertValueRefToClosure:valueRef];
        if (returnValue) {
            return returnValue;
        }
    }

    returnValue = [self convertValueRefToArray:valueRef isPortableConvert:isPortableConvert];
    if (returnValue) {
        return returnValue;
    }

    returnValue = [self convertValueRefToDictionary:valueRef isPortableConvert:isPortableConvert];
    if (returnValue) {
        return returnValue;
    }

    return nil;
}

- (nullable NSString *)convertValueRefToString:(JSValueRef)valueRef {
    HMAssertMainThread();
    if (!JSValueIsString(self.contextRef, valueRef)) {
        return nil;
    }
    // 同 React Native，忽略异常
    JSStringRef stringRef = JSValueToStringCopy(self.contextRef, valueRef, NULL);
    if (!stringRef) {
        return nil;
    }
    NSString *stringValue = CFBridgingRelease(JSStringCopyCFString(kCFAllocatorDefault, stringRef));
    JSStringRelease(stringRef);

    return stringValue;
}

- (nullable NSNumber *)convertValueRefToNumber:(JSValueRef)valueRef {
    HMAssertMainThread();
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

- (nullable NSArray *)convertValueRefToArray:(JSValueRef)valueRef isPortableConvert:(BOOL)isPortableConvert {
    HMAssertMainThread();
    if (!JSValueIsArray(self.contextRef, valueRef)) {
        return nil;
    }
    // new Array() 和 [] 都是对象
    JSValueRef exception = NULL;
    JSObjectRef objectRef = JSValueToObject(self.contextRef, valueRef, &exception);
    [self popExceptionWithErrorObject:&exception];
    if (!objectRef) {
        return nil;
    }
    JSStringRef lengthPropertyName = JSStringCreateWithUTF8CString("length");
    JSValueRef lengthValueRef = JSObjectGetProperty(self.contextRef, objectRef, lengthPropertyName, &exception);
    JSStringRelease(lengthPropertyName);
    [self popExceptionWithErrorObject:&exception];
    if (!lengthValueRef || !JSValueIsNumber(self.contextRef, lengthValueRef)) {
        HMLogError(ARRAY_LENGTH_NOT_NUMBER);

        return nil;
    }
    unsigned int length = (unsigned int) JSValueToNumber(self.contextRef, lengthValueRef, NULL);
    NSMutableArray *resultArray = nil;
    for (unsigned int i = 0; i < length; ++i) {
        JSValueRef inlineException = NULL;
        JSValueRef indexValue = JSObjectGetPropertyAtIndex(self.contextRef, objectRef, i, &inlineException);
        [self popExceptionWithErrorObject:&inlineException];
        if (!indexValue) {
            continue;
        }
        id resultObject = [self convertValueRefToObject:indexValue isPortableConvert:isPortableConvert];
        if (resultObject) {
            if (!resultArray) {
                resultArray = [NSMutableArray arrayWithCapacity:length];
            }
            [resultArray addObject:resultObject];
        }
    }

    return resultArray.copy;
}

- (nullable HMClosureType)convertValueRefToClosure:(JSValueRef)valueRef {
    HMAssertMainThread();
    if (!JSValueIsObject(self.contextRef, valueRef)) {
        return nil;
    }
    JSValueRef inlineException = NULL;
    JSObjectRef objectRef = JSValueToObject(self.contextRef, valueRef, &inlineException);
    [self popExceptionWithErrorObject:&inlineException];
    if (!objectRef) {
        return nil;
    }
    if (!JSObjectIsFunction(self.contextRef, objectRef)) {
        return nil;
    }

    JSStringRef privateStringRef = JSStringCreateWithUTF8CString("_privateClosure");
    JSValueRef privateValueRef = JSObjectGetProperty(self.contextRef, objectRef, privateStringRef, &inlineException);
    JSStringRelease(privateStringRef);
    [self popExceptionWithErrorObject:&inlineException];

    if (privateValueRef) {
        // 是原先原生转成的 JS 闭包
        if (JSValueIsObject(self.contextRef, privateValueRef)) {
            JSObjectRef privateObjectRef = JSValueToObject(self.contextRef, valueRef, &inlineException);
            [self popExceptionWithErrorObject:&inlineException];
            if (privateObjectRef && JSObjectGetPrivate(privateObjectRef) && [(__bridge id) JSObjectGetPrivate(privateObjectRef) isKindOfClass:NSClassFromString(@"NSBlock")]) {
                // 本次 JS 闭包是原生返回，复用原先的闭包
                return (__bridge HMClosureType _Nullable) JSObjectGetPrivate(privateObjectRef);
            }
        }
    }

    HMJSCStrongValue *valueWrapper = [[HMJSCStrongValue alloc] initWithValueRef:valueRef executor:self];
    // 出于主线程不阻塞原则，返回值只能使用回调返回
    HMClosureType closureType = ^(NSArray *_Nullable argumentArray) {
        HMAssertMainThread();
        // 主线程不能卡死，所以不能使用信号量同步阻塞
        if (valueWrapper.executor) {
            // 当前还未被销毁
            // 重新判断一次 valueRef
            HMJSCExecutor *executor = (HMJSCExecutor *) valueWrapper.executor;
            if (!JSValueIsObject(executor.contextRef, valueWrapper.valueRef)) {
                return (HMJSCStrongValue *) nil;
            }
            JSValueRef exception = NULL;
            JSObjectRef inlineObjectRef = JSValueToObject(executor.contextRef, valueWrapper.valueRef, &exception);
            [executor popExceptionWithErrorObject:&exception];
            if (!inlineObjectRef) {
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
                if (inlineValueRef) {
                    // 增长或者创建
                    count += 1;
                    // 处理 realloc 错误
                    valueRefArray = realloc(valueRefArray, count * sizeof(JSValueRef));
                    valueRefArray[count - 1] = inlineValueRef;
                }
            }];
            JSValueRef returnValueRef = JSObjectCallAsFunction(executor.contextRef, inlineObjectRef, NULL, count, valueRefArray, &exception);
            free(valueRefArray);
            [executor popExceptionWithErrorObject:&exception];
            if (returnValueRef) {
                return [[HMJSCStrongValue alloc] initWithValueRef:returnValueRef executor:executor];
            }
        }

        return (HMJSCStrongValue *) nil;
    };

    [closureType setHm_value:[[HMJSCWeakValue alloc] initWithValueRef:valueRef executor:self]];

    return closureType;
}

- (nullable NSDictionary<NSString *, id> *)convertValueRefToDictionary:(JSValueRef)valueRef isPortableConvert:(BOOL)isPortableConvert {
    HMAssertMainThread();
    if (!JSValueIsObject(self.contextRef, valueRef)) {
        return nil;
    }
    // 1. 是对象
    // 2. 不是数组
    // 3. 不是闭包
    // 4. 不是原生对象
    if (JSValueIsArray(self.contextRef, valueRef)) {
        return nil;
    }
    if ([self valueRefIsClosure:valueRef]) {
        return nil;
    }
    if ([self valueRefIsNativeObject:valueRef]) {
        return nil;
    }
    JSValueRef exception = NULL;
    JSObjectRef objectRef = JSValueToObject(self.contextRef, valueRef, &exception);
    [self popExceptionWithErrorObject:&exception];
    if (!objectRef) {
        return nil;
    }
    // 字典转换
    JSPropertyNameArrayRef propertyNameArrayRef = JSObjectCopyPropertyNames(self.contextRef, objectRef);
    size_t count = JSPropertyNameArrayGetCount(propertyNameArrayRef);
    NSMutableDictionary<NSString *, id> *resultDictionary = nil;
    for (size_t i = 0; i < count; ++i) {
        JSStringRef propertyName = JSPropertyNameArrayGetNameAtIndex(propertyNameArrayRef, i);
        NSString *propertyNameString = CFBridgingRelease(JSStringCopyCFString(kCFAllocatorDefault, propertyName));
        if (propertyNameString.length == 0) {
            // key 不能为 nil
            continue;
        }
        JSValueRef inlineException = NULL;
        JSValueRef propertyValueRef = JSObjectGetProperty(self.contextRef, objectRef, propertyName, &inlineException);
        [self popExceptionWithErrorObject:&inlineException];
        if (propertyValueRef && !inlineException) {
            id objectValue = [self convertValueRefToObject:propertyValueRef isPortableConvert:isPortableConvert];
            if (objectValue) {
                if (!resultDictionary) {
                    resultDictionary = [NSMutableDictionary dictionaryWithCapacity:count];
                }
                resultDictionary[propertyNameString] = objectValue;
            }
        }
    }
    JSPropertyNameArrayRelease(propertyNameArrayRef);

    return resultDictionary.copy;
}

- (BOOL)valueRefIsNativeObject:(JSValueRef)valueRef {
    return (BOOL) [self convertValueRefToNativeObject:valueRef];
}

- (BOOL)valueRefIsClosure:(JSValueRef)valueRef {
    HMAssertMainThread();
    if (!JSValueIsObject(self.contextRef, valueRef)) {
        return NO;
    }
    JSValueRef inlineException = NULL;
    JSObjectRef objectRef = JSValueToObject(self.contextRef, valueRef, &inlineException);
    [self popExceptionWithErrorObject:&inlineException];
    if (!objectRef) {
        return NO;
    }
    if (!JSObjectIsFunction(self.contextRef, objectRef)) {
        return NO;
    }

    return YES;
}

- (BOOL)valueRefIsDictionary:(JSValueRef)valueRef {
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
    if ([self valueRefIsClosure:valueRef]) {
        return NO;
    }
    if ([self valueRefIsNativeObject:valueRef]) {
        return NO;
    }

    return YES;
}

- (nullable NSObject *)convertValueRefToNativeObject:(JSValueRef)valueRef {
    HMAssertMainThread();
    if (!JSValueIsObject(self.contextRef, valueRef)) {
        return nil;
    }

    JSValueRef exception = NULL;
    JSObjectRef objectRef = JSValueToObject(self.contextRef, valueRef, &exception);
    [self popExceptionWithErrorObject:&exception];
    if (!objectRef) {
        return nil;
    }
    JSStringRef privatePropertyName = JSStringCreateWithUTF8CString("_private");
    JSValueRef privateValueRef = JSObjectGetProperty(self.contextRef, objectRef, privatePropertyName, &exception);
    JSStringRelease(privatePropertyName);
    [self popExceptionWithErrorObject:&exception];

    if (!privateValueRef || !JSValueIsObject(self.contextRef, privateValueRef)) {
        return nil;
    }
    JSObjectRef privateObjectRef = JSValueToObject(self.contextRef, privateValueRef, &exception);
    [self popExceptionWithErrorObject:&exception];
    if (!privateObjectRef) {
        return nil;
    }
    id hostObject = (__bridge id) JSObjectGetPrivate(privateObjectRef);
    if (!hostObject || ![hostObject isKindOfClass:NSObject.class]) {
        return nil;
    }

    return (NSObject *) hostObject;
}

- (void)popExceptionWithErrorObject:(JSValueRef _Nullable *)valueRef {
    HMAssertMainThread();
    if (!*valueRef) {
        return;
    }
//    [HMJSCExecutor runOnJSThreadWithBlock:^{
    if (!JSValueIsObject(self.contextRef, *valueRef)) {
        return;
    }
    JSValueRef exception = NULL;
    JSObjectRef objectRef = JSValueToObject(self.contextRef, *valueRef, &exception);
    if (!objectRef) {
        HMLogError(EXCEPTION_HANDLER_ERROR);

        return;
    }
    JSStringRef columnString = JSStringCreateWithUTF8CString("column");
    JSStringRef lineString = JSStringCreateWithUTF8CString("line");
    JSStringRef messageString = JSStringCreateWithUTF8CString("message");
    JSStringRef nameString = JSStringCreateWithUTF8CString("name");
    JSStringRef stackString = JSStringCreateWithUTF8CString("stack");

    JSValueRef columnValueRef = JSObjectGetProperty(self.contextRef, objectRef, columnString, &exception);
    if (exception || !columnValueRef) {
        HMLogError(EXCEPTION_HANDLER_ERROR);
    }
    exception = NULL;
    JSValueRef lineValueRef = JSObjectGetProperty(self.contextRef, objectRef, lineString, &exception);
    if (exception || !lineValueRef) {
        HMLogError(EXCEPTION_HANDLER_ERROR);
    }
    exception = NULL;
    JSValueRef messageValueRef = JSObjectGetProperty(self.contextRef, objectRef, messageString, &exception);
    if (exception || !messageValueRef) {
        HMLogError(EXCEPTION_HANDLER_ERROR);
    }
    exception = NULL;
    JSValueRef nameValueRef = JSObjectGetProperty(self.contextRef, objectRef, nameString, &exception);
    if (exception || !nameValueRef) {
        HMLogError(EXCEPTION_HANDLER_ERROR);
    }
    exception = NULL;
    JSValueRef stackValueRef = JSObjectGetProperty(self.contextRef, objectRef, stackString, &exception);
    if (exception || !stackValueRef) {
        HMLogError(EXCEPTION_HANDLER_ERROR);
    }

    HMExceptionModel *errorModel = [[HMExceptionModel alloc] init];
    errorModel.column = [self convertValueRefToNumber:columnValueRef];
    errorModel.line = [self convertValueRefToNumber:lineValueRef];
    errorModel.message = [self convertValueRefToString:messageValueRef];
    errorModel.name = [self convertValueRefToString:nameValueRef];
    errorModel.stack = [self convertValueRefToString:stackValueRef];

    if (self.exceptionHandler) {
//            hm_safe_main_thread(^{
        self.exceptionHandler(errorModel);
//            });
    }

    JSStringRelease(columnString);
    JSStringRelease(lineString);
    JSStringRelease(messageString);
    JSStringRelease(nameString);
    JSStringRelease(stackString);
    *valueRef = NULL;
//    }];
}

- (BOOL)compareValue:(nullable HMBaseValue *)value1 value:(nullable HMBaseValue *)value2 {
    // 不用调用 super，因为 valueIsNullOrUndefined 会检测的
    if ([self valueIsNullOrUndefined:value1] || [self valueIsNullOrUndefined:value2]) {
        return NO;
    }
    
    return JSValueIsStrictEqual(self.contextRef, ((id <HMJSCValue>) value1).valueRef, ((id <HMJSCValue>) value2).valueRef);
}

- (BOOL)setPropertyWithObject:(HMBaseValue *)object value:(id)value property:(NSString *)propertyString {
    HMAssertMainThread();
    if (object.executor != self) {
        return NO;
    }
    if ([object isNullOrUndefined] || !value || propertyString.length <= 0) {
        return NO;
    }
    JSValueRef exception = NULL;
    JSObjectRef objectRef = JSValueToObject(self.contextRef, ((id <HMJSCValue>) object).valueRef, &exception);
    [self popExceptionWithErrorObject:&exception];
    if (!objectRef) {
        return NO;
    }
    JSStringRef columnString = JSStringCreateWithUTF8CString(propertyString.UTF8String);
    JSValueRef func = [self convertObjectToValueRef:value];
    JSValueRef propertyException = NULL;
    JSObjectSetProperty(self.contextRef, objectRef, columnString, func, kJSPropertyAttributeNone, &propertyException);
    JSStringRelease(columnString);
    if (propertyException) {
        [self popExceptionWithErrorObject:&propertyException];

        return NO;
    }

    return YES;
}

- (nullable HMBaseStrongValue *)executeCallWithTarget:(HMBaseValue *)value functionName:(NSString *)functionName arguments:(nullable NSArray *)arguments {
    HMAssertMainThread();
    if (value.executor != self) {
        return nil;
    }
    if (JSValueIsObject(self.contextRef, ((id <HMJSCValue>) value).valueRef) && functionName.length > 0) {
        JSValueRef exception = NULL;
        JSObjectRef objectRef = JSValueToObject(self.contextRef, ((id <HMJSCValue>) value).valueRef, &exception);
        [self popExceptionWithErrorObject:&exception];
        if (!objectRef) {
            return nil;
        }
        JSStringRef functionNameStringRef = JSStringCreateWithCFString((__bridge CFStringRef) functionName);
        JSValueRef propertyValue = JSObjectGetProperty(self.contextRef, objectRef, functionNameStringRef, &exception);
        JSStringRelease(functionNameStringRef);
        [self popExceptionWithErrorObject:&exception];

        if (!propertyValue) {
            return nil;
        }

        JSObjectRef functionObject = NULL;
        if (JSValueIsObject(self.contextRef, propertyValue)) {
            functionObject = JSValueToObject(self.contextRef, propertyValue, &exception);
            [self popExceptionWithErrorObject:&exception];
        }

        if (!functionObject || !JSObjectIsFunction(self.contextRef, functionObject)) {
            return nil;
        }

        __block JSValueRef *valueRefArray = NULL;
        __block size_t count = 0;
        [arguments enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
            JSValueRef inlineValueRef = [self convertObjectToValueRef:obj];
            if (inlineValueRef) {
                // 增长或者创建
                count += 1;
                valueRefArray = realloc(valueRefArray, count * sizeof(JSValueRef));
                valueRefArray[count - 1] = inlineValueRef;
            }
        }];

        JSValueRef returnValue = JSObjectCallAsFunction(self.contextRef, functionObject, objectRef, count, valueRefArray, &exception);

        free(valueRefArray);

        [self popExceptionWithErrorObject:&exception];

        if (!returnValue) {
            return nil;
        }

        return [[HMJSCStrongValue alloc] initWithValueRef:returnValue executor:self];
    }

    HMLogError(@"executeCallWithTarget:functionName:arguments: value 不是对象");

    return nil;
}

@end
