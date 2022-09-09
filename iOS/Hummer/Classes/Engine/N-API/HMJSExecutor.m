#import "HMJSExecutor+Private.h"
#import "HMNAPIDebuggerHelper.h"
#import <Hummer/HMUtility.h>
#import <Hummer/NSInvocation+Hummer.h>
#import <Hummer/HMExportClass.h>
#import <Hummer/HMJSWeakValue.h>
#import <Hummer/NSObject+Hummer.h>
#import <Hummer/HMExceptionModel.h>
#import <Hummer/HMJSStrongValue.h>
#import <Hummer/HMJSGlobal.h>
#import <objc/runtime.h>
#import <Hummer/HMDebugService.h>
#import <Hummer/HMDebug.h>
#import "HMConfigEntryManager.h"
#import "NSObject+HMDescription.h"

static NSString *const HANDLE_SCOPE_ERROR = @"napi_open_handle_scope() error";

static NSString *const GET_GLOBAL_ERROR = @"napi_get_global() error";

static NSString *const NAMED_PROPERTY_ERROR = @"napi_get_named_property() error";

static NSString *const CALL_FUNCTION_ERROR = @"napi_call_function() error";

static NSString *const GET_VALUE_BOOL_ERROR = @"napi_get_value_bool() error";

static NSString *const CREATE_STRING_ERROR = @"napi_create_string_utf8() error";

static NSString *const CREATE_EXTERNAL_ERROR = @"napi_create_external() error";


NS_ASSUME_NONNULL_BEGIN

static void hummerFinalize(void *_Nullable finalizeData, void *_Nullable finalizeHint);

static NAPIValue _Nullable hummerCall(NAPIEnv _Nullable env, NAPICallbackInfo _Nullable callbackInfo);

static NAPIValue _Nullable hummerCreate(NAPIEnv _Nullable env, NAPICallbackInfo _Nullable callbackInfo);

static NAPIValue _Nullable hummerCallFunction(NAPIEnv _Nullable env, NAPICallbackInfo _Nullable callbackInfo);

static NAPIValue _Nullable hummerGetProperty(NAPIEnv _Nullable env, NAPICallbackInfo _Nullable callbackInfo);

static NAPIValue _Nullable hummerSetProperty(NAPIEnv _Nullable env, NAPICallbackInfo _Nullable callbackInfo);

static NAPIValue _Nullable nativeLoggingHook(NAPIEnv _Nullable env, NAPICallbackInfo _Nullable callbackInfo);

#if __has_include(<Hummer/HMInspectorPackagerConnection.h>)

static NAPIValue _Nullable setImmediate(NAPIEnv _Nullable env, NAPICallbackInfo _Nullable callbackInfo);

#endif

@interface HMJSExecutor ()

@property (nonatomic, assign) NAPIEnv env;
@property (nonatomic, strong) HMNAPIDebuggerHelper *heremsHelper;

@property (nonatomic, strong) NSMapTable<id, HMExceptionHandler> *exceptionHandlerMap;
@property (nonatomic, strong) NSMapTable<id, HMConsoleHandler> *consoleHandlerMap;

- (void)hummerExtractExportWithFunctionPropertyName:(nullable NSString *)functionPropertyName objectRef:(nullable NAPIValue)objectRef target:(id _Nullable *)target selector:(SEL _Nullable *)selector methodSignature:(NSMethodSignature *_Nullable *)methodSignature isSetter:(BOOL)isSetter jsClassName:(nullable NSString *)jsClassName;

- (nullable NAPIValue)hummerCallNativeWithArgumentCount:(size_t)argumentCount arguments:(NAPIValue *_Nullable)arguments target:(nullable id)target selector:(nullable SEL)selector methodSignature:(nullable NSMethodSignature *)methodSignature;

- (nullable NAPIValue)hummerGetSetPropertyWithArgumentCount:(size_t)argumentCount arguments:(NAPIValue *_Nullable)arguments isSetter:(BOOL)isSetter;

- (BOOL)isArrayWithValueRef:(nullable NAPIValue)valueRef;

- (BOOL)isNativeObjectWithValueRef:(nullable NAPIValue)valueRef;

- (BOOL)isFunctionWithValueRef:(nullable NAPIValue)valueRef;

- (NAPIValueType)typeOfWithValueRef:(NAPIValue)valueRef;

- (BOOL)isDictionaryWithValueRef:(nullable NAPIValue)valueRef;

- (nullable NSObject *)toNativeObjectWithValueRef:(nullable NAPIValue)valueRef;

- (nullable NSString *)toStringWithValueRef:(nullable NAPIValue)valueRef isForce:(BOOL)isForce;

- (nullable NSNumber *)toNumberWithValueRef:(nullable NAPIValue)valueRef isForce:(BOOL)isForce;

- (nullable NAPIValue)toValueRefWithNumber:(nullable NSNumber *)number;

- (nullable NAPIValue)toValueRefWithString:(nullable NSString *)stringValue;

- (nullable NAPIValue)toValueRefWithNativeObject:(nullable NSObject *)object;

- (nullable NAPIValue)toValueRefWithFunction:(nullable id)function;

- (nullable NAPIValue)toValueRefWithArray:(nullable NSArray *)array;

- (nullable NAPIValue)toValueRefWithDictionary:(nullable NSDictionary *)dictionary;

- (nullable NAPIValue)toValueRefWithObject:(nullable id)object;

- (nullable HMFunctionType)toFunctionWithValueRef:(nullable NAPIValue)valueRef;

- (nullable NAPIValue)callWithFunctionObject:(nullable NAPIValue)functionObjectRef thisObject:(nullable NAPIValue)thisObjectRef argumentArray:(nullable NSArray *)argumentArray;

- (nullable NSArray *)toArrayWithValueRef:(nullable NAPIValue)valueRef isPortableConvert:(BOOL)isPortableConvert;

- (nullable NSDictionary *)toDictionaryWithValueRef:(nullable NAPIValue)valueRef isPortableConvert:(BOOL)isPortableConvert;

- (nullable id)toObjectWithValueRef:(nullable NAPIValue)valueRef isPortableConvert:(BOOL)isPortableConvert;

- (void)triggerExceptionHandler:(HMExceptionModel *)model;

- (void)triggerConsoleHandler:(NSString *)logString level:(HMLogLevel)logLevel;
@end

NS_ASSUME_NONNULL_END

void hummerFinalize(void *finalizeData, void *finalizeHint) {
  
    void(^finalizeWork)(void) = ^(){
        HMAssertMainQueue();
        if (!finalizeData) {
            assert(false);

            return;
        }
        // 不透明指针可能为原生对象，也可能为闭包
        // 清空 hmWeakValue
        HMLogDebug(HUMMER_DESTROY_TEMPLATE, [((__bridge id) finalizeData) class]);
        [((__bridge id) finalizeData) hm_setWeakValue:nil];
        CFRelease(finalizeData);
    };
#if __has_include(<Hummer/HMInspectorPackagerConnection.h>)

// hermes 调试下，由于 debugger 持有runtime，导致可能存在子线程释放的问题。
    hm_safe_main_thread(finalizeWork);
#else
    finalizeWork();
#endif
   
}

NAPIValue hummerCall(NAPIEnv env, NAPICallbackInfo callbackInfo) {
    HMAssertMainQueue();
    size_t argc;
    CHECK_COMMON(napi_get_cb_info(env, callbackInfo, &argc, nil, nil, nil))
    // 类方法参数必须大于等于三个
    if (argc < 2) {
        HMLogError(HUMMER_CALL_PARAMETER_ERROR);

        return nil;
    }
    NAPIValue argv[argc];
    CHECK_COMMON(napi_get_cb_info(env, callbackInfo, &argc, argv, nil, nil))
    // 判断第一个参数是否为 Object 来确定调用的是类方法还是实例方法
    NAPIValueType valueType;
    CHECK_COMMON(napi_typeof(env, argv[0], &valueType))
    NAPIValue objectRef = nil;
    if (valueType == NAPIExternal) {
        objectRef = argv[0];
    }
    // 成员方法参数必须大于等于三个
    if (objectRef && argc < 3) {
        HMLogError(HUMMER_CALL_PARAMETER_ERROR);

        return nil;
    }
    HMJSExecutor *executor = (HMJSExecutor *) [HMExecutorMap objectForKey:[NSValue valueWithPointer:env]];
    NSString *className = [executor toStringWithValueRef:argv[objectRef ? 1 : 0] isForce:NO];
    NSString *functionName = [executor toStringWithValueRef:argv[objectRef ? 2 : 1] isForce:NO];
    // this 指针
    // 是否为函数类型
    // NSValue - valueWithPointer: nullable
    id target = nil;
    SEL selector = nil;
    NSMethodSignature *methodSignature = nil;

    // 最后一个参数无效
    [executor hummerExtractExportWithFunctionPropertyName:functionName objectRef:objectRef target:&target selector:&selector methodSignature:&methodSignature isSetter:YES jsClassName:className];
    
#ifdef HMDEBUG
    NSString *objRefStr = objectRef ? [NSString stringWithFormat:@"%p", target] : nil;
    NSMutableArray *argDesList = @[].mutableCopy;
    int argStartIndex = objectRef ? 1:0;
    for (NSUInteger i = 2; i < MIN(methodSignature.numberOfArguments + argStartIndex, argc) - argStartIndex; ++i) {
        HMJSStrongValue *jsValue = [[HMJSStrongValue alloc] initWithValueRef:argv[i + argStartIndex] executor:executor];
        [argDesList addObject:jsValue ? : @"NullOrUndefined"];
    }
    HMJSContext *context = [[HMJSGlobal globalObject] currentContext:executor];
    [HMJSCallerInterceptor callNativeWithClassName:className functionName:functionName objectRef:objRefStr args:argDesList context:context];
#endif

    return [executor hummerCallNativeWithArgumentCount:argc arguments:argv target:target selector:selector methodSignature:methodSignature];
}

NAPIValue hummerCreate(NAPIEnv env, NAPICallbackInfo callbackInfo) {
    HMAssertMainQueue();
    size_t argc;
    CHECK_COMMON(napi_get_cb_info(env, callbackInfo, &argc, nil, nil, nil))
    if (argc < 2) {
        HMLogError(HUMMER_CREATE_ERROR);

        return nil;
    }
    NAPIValue argv[argc];
    CHECK_COMMON(napi_get_cb_info(env, callbackInfo, &argc, argv, nil, nil))
    HMJSExecutor *executor = (HMJSExecutor *) [HMExecutorMap objectForKey:[NSValue valueWithPointer:env]];
    NSString *className = [executor toStringWithValueRef:argv[0] isForce:NO];
    // 隐含 executor 不为空
    if (className.length == 0) {
        HMLogError(HUMMER_CREATE_ERROR);

        return nil;
    }

    HMExportClass *exportClass = HMExportManager.sharedInstance.jsClasses[className];
    NSString *objcClassName = exportClass.className;
    if (objcClassName.length == 0) {
        HMLogError(HUMMER_CREATE_CLASS_NOT_FOUND, className);

        return nil;
    }
    Class clazz = NSClassFromString(objcClassName);
    if (!clazz) {
        HMLogError(HUMMER_CREATE_CLASS_NOT_FOUND, className);

        return nil;
    }
    
#ifdef HMDEBUG
    HMJSContext *context = [[HMJSGlobal globalObject] currentContext:executor];
    [HMJSCallerInterceptor callNativeWithClassName:className functionName:@"constructor" objectRef:nil args:nil context:context];
#endif

    // 创建对象
    NSObject *opaquePointer = nil;
    NSMutableArray<HMBaseValue *> *argumentArray = nil;
    for (int i = 2; i < argc; ++i) {
        HMBaseValue *value = [[HMJSStrongValue alloc] initWithValueRef:argv[i] executor:executor];
        if (!argumentArray) {
            argumentArray = [NSMutableArray arrayWithCapacity:argc - 2];
        }
        if (value) {
            [argumentArray addObject:value];
        }
    }

    HMCurrentExecutor = executor;
    // 支持 HMJSObject，如果不支持则回退 init
    // 不判断 argumentCount > 2，因为 UIView 必须调用 HMJSObject 初始化方法
    if ([clazz conformsToProtocol:@protocol(HMJSObject)]) {
        opaquePointer = (id) [(id) [clazz alloc] initWithHMValues:argumentArray];
    } else {
        HMOtherArguments = argumentArray.copy;
        opaquePointer = [[clazz alloc] init];
    }
    HMCurrentExecutor = nil;
    HMOtherArguments = nil;
    if (!opaquePointer) {
        HMLogError(HUMMER_CAN_NOT_CREATE_NATIVE_OBJECT, className);

        return nil;
    }
    // 关联 hm_value
    [opaquePointer hm_setWeakValue:[[HMJSWeakValue alloc] initWithValueRef:argv[1] executor:executor]];
    // 引用计数 +1
    HMLogDebug(HUMMER_CREATE_TEMPLATE, className);
    NAPIValue externalValue;
    if ([executor popExceptionWithStatus:napi_create_external(env, (__bridge void *) opaquePointer, hummerFinalize, nil, &externalValue)]) {
        return nil;
    }
    CFRetain((__bridge CFTypeRef) opaquePointer);

    return externalValue;
}

NAPIValue hummerCallFunction(NAPIEnv env, NAPICallbackInfo callbackInfo) {
    HMAssertMainQueue();
    size_t argc;
    CHECK_COMMON(napi_get_cb_info(env, callbackInfo, &argc, nil, nil, nil))
    if (argc == 0) {
        HMLogError(HUMMER_CALL_CLOSURE_MUST_HAVE_PARAMETER);

        return nil;
    }
    NAPIValue argv[argc];
    CHECK_COMMON(napi_get_cb_info(env, callbackInfo, &argc, argv, nil, nil))
    NAPIValueType valueType;
    CHECK_COMMON(napi_typeof(env, argv[0], &valueType))
    if (valueType != NAPIExternal) {
        HMLogError(HUMMER_FIRST_PARAMETER_NOT_NATIVE_CLOSURE);

        return nil;
    }
    NAPIValue objectRef = argv[0];
    void *opaquePointer;
    if (napi_get_value_external(env, objectRef, &opaquePointer) != NAPIErrorOK) {
        HMLogError(HUMMER_FIRST_PARAMETER_NOT_NATIVE_CLOSURE);

        return nil;
    }
    if (![((__bridge id) opaquePointer) isKindOfClass:NSClassFromString(@"NSBlock")]) {
        HMLogError(HUMMER_FIRST_PARAMETER_NOT_NATIVE_CLOSURE);

        return nil;
    }
    // 转参数
    HMJSExecutor *executor = (HMJSExecutor *) [HMExecutorMap objectForKey:[NSValue valueWithPointer:env]];
    NSMutableArray<HMBaseValue *> *mutableArgumentArray = nil;
    for (int i = 1; i < argc; ++i) {
        HMBaseValue *jsValue = [[HMJSStrongValue alloc] initWithValueRef:argv[i] executor:executor];
        if (!mutableArgumentArray) {
            mutableArgumentArray = [NSMutableArray arrayWithCapacity:argc - 1];
        }
        if (jsValue) {
            [mutableArgumentArray addObject:jsValue];
        }
    }
    HMCurrentExecutor = executor;
    HMFunctionType closure = (__bridge HMFunctionType) opaquePointer;
    // TODO(ChasonTang): 探测执行，特殊处理第一个参数为 NSArray 的情况（兼容，可能需要开启开关）
    NSMethodSignature *methodSignature = HMExtractMethodSignatureFromBlock(closure);
    if (!methodSignature || methodSignature.numberOfArguments == 0 || methodSignature.numberOfArguments > 2) {
        return nil;
    }
    NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:methodSignature];
    invocation.target = closure;
    NSArray<HMBaseValue *> *argumentArray = mutableArgumentArray.copy;
    if (methodSignature.numberOfArguments == 2) {
        [invocation hm_setArgument:argumentArray atIndex:1 encodingType:HMEncodingGetType([methodSignature getArgumentTypeAtIndex:1])];
    }
    [invocation invoke];
    id returnObject = [invocation hm_getReturnValueObject];
    HMCurrentExecutor = nil;
    if (!returnObject) {
        return nil;
    }

    return [executor toValueRefWithObject:returnObject];
}

NAPIValue hummerGetProperty(NAPIEnv env, NAPICallbackInfo callbackInfo) {
    HMAssertMainQueue();
    HMJSExecutor *executor = (HMJSExecutor *) [HMExecutorMap objectForKey:[NSValue valueWithPointer:env]];
    size_t argc = 3;
    NAPIValue argv[argc];
    CHECK_COMMON(napi_get_cb_info(env, callbackInfo, &argc, argv, nil, nil))

    return [executor hummerGetSetPropertyWithArgumentCount:argc arguments:argv isSetter:NO];
}

NAPIValue hummerSetProperty(NAPIEnv env, NAPICallbackInfo callbackInfo) {
    HMAssertMainQueue();
    HMJSExecutor *executor = (HMJSExecutor *) [HMExecutorMap objectForKey:[NSValue valueWithPointer:env]];
    size_t argc = 4;
    NAPIValue argv[argc];
    CHECK_COMMON(napi_get_cb_info(env, callbackInfo, &argc, argv, nil, nil))

    return [executor hummerGetSetPropertyWithArgumentCount:argc arguments:argv isSetter:YES];
}

NAPIValue nativeLoggingHook(NAPIEnv env, NAPICallbackInfo callbackInfo) {
    HMAssertMainQueue();
    size_t argc = 2;
    NAPIValue argv[2];
    CHECK_COMMON(napi_get_cb_info(env, callbackInfo, &argc, argv, nil, nil))
    if (argc != 2) {
        assert(false);

        return nil;
    }
    const char *utf8String;
    if (NAPIGetValueStringUTF8(env, argv[0], &utf8String) != NAPIErrorOK) {
        assert(false);

        return nil;
    }
    assert(utf8String);
    // nullable
    NSString *logString = [NSString stringWithUTF8String:utf8String];
    CHECK_COMMON(NAPIFreeUTF8String(env, utf8String))
    double logLevel;
    if (napi_get_value_double(env, argv[1], &logLevel) != NAPIErrorOK) {
        assert(false);

        return nil;
    }
    if ([[HMExecutorMap objectForKey:[NSValue valueWithPointer:env]] isKindOfClass:HMJSExecutor.class]) {
        HMJSExecutor *executor = (HMJSExecutor *) [HMExecutorMap objectForKey:[NSValue valueWithPointer:env]];
        [executor triggerConsoleHandler:logString level:logLevel];
    }

    return nil;
}

#if __has_include(<Hummer/HMInspectorPackagerConnection.h>)

NAPIValue setImmediate(NAPIEnv env, NAPICallbackInfo callbackInfo) {
    HMAssertMainQueue();
    size_t argc = 1;
    NAPIValue argv[1];
    CHECK_COMMON(napi_get_cb_info(env, callbackInfo, &argc, argv, nil, nil))
    if (argc != 1) {
        assert(false);

        return nil;
    }
    NAPIValueType valueType;
    CHECK_COMMON(napi_typeof(env, argv[0], &valueType))
    if (valueType != NAPIFunction) {
        assert(false);
        
        return nil;
    }
    __weak HMJSExecutor *weakExecutor = (HMJSExecutor *) [HMExecutorMap objectForKey:[NSValue valueWithPointer:env]];
    NAPIRef ref;
    if ([weakExecutor popExceptionWithStatus:napi_create_reference(env, argv[0], 1, &ref)]) {
        assert(false);
        
        return nil;
    }
    dispatch_async(dispatch_get_main_queue(), ^{
        if (!weakExecutor) {
            return;
        }
        NAPIHandleScope handleScope;
        if (napi_open_handle_scope(weakExecutor.env, &handleScope) != NAPIErrorOK) {
            assert(false);
            
            return;
        }
        NAPIValue functionValue;
        if (napi_get_reference_value(weakExecutor.env, ref, &functionValue) != NAPIErrorOK) {
            assert(false);
            goto exit;
        }
        if ([weakExecutor popExceptionWithStatus:napi_delete_reference(weakExecutor.env, ref)]) {
            assert(false);
            goto exit;
        }
        NAPIValueType inlineValueType;
        CHECK_COMMON(napi_typeof(env, functionValue, &inlineValueType))
        if (inlineValueType != NAPIFunction) {
            assert(false);
            goto exit;
        }
        [weakExecutor popExceptionWithStatus:napi_call_function(weakExecutor.env, nil, functionValue, 0, nil, nil)];
        
    exit:
        CHECK_COMMON(napi_close_handle_scope(weakExecutor.env, handleScope))
    });
    
    return nil;
}

#endif

@implementation HMJSExecutor

- (void)hummerExtractExportWithFunctionPropertyName:(nullable NSString *)functionPropertyName objectRef:(nullable NAPIValue)objectRef target:(id _Nullable *)target selector:(SEL _Nullable *)selector methodSignature:(NSMethodSignature *_Nullable *)methodSignature isSetter:(BOOL)isSetter jsClassName:(nullable NSString *)jsClassName {
    if (!target || !selector || !methodSignature || !functionPropertyName.length || !jsClassName.length) {
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
        HMAssertMainQueue();
        // instance
        void *opaquePointer;
        if (napi_get_value_external(self.env, objectRef, &opaquePointer) != NAPIErrorOK) {
            return;
        }
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

- (nullable NAPIValue)hummerCallNativeWithArgumentCount:(size_t)argumentCount arguments:(NAPIValue *_Nullable)arguments target:(nullable id)target selector:(nullable SEL)selector methodSignature:(nullable NSMethodSignature *)methodSignature {
    if (!target) {
        HMLogError(HUMMER_CALL_NATIVE_TARGET_ERROR);

        return nil;
    }
    if (!selector) {
        HMLogError(HUMMER_CALL_NATIVE_SELECTOR_ERROR);

        return nil;
    }
    if (!methodSignature) {
        HMLogError(HUMMER_CALL_NATIVE_METHOD_SIGNATURE_ERROR);

        return nil;
    }
    BOOL isClass = object_isClass(target);
    NSMutableArray<HMBaseValue *> *otherArguments = nil;
    HMCurrentExecutor = self;
    // 隐含着 numerOfArguments + 0/1 <= argumentCount
    for (NSUInteger i = methodSignature.numberOfArguments + (isClass ? 0 : 1); i < argumentCount; ++i) {
        // 多余的转数组
        HMBaseValue *hummerValue = [[HMJSStrongValue alloc] initWithValueRef:arguments[i] executor:HMCurrentExecutor];
        if (!otherArguments) {
            otherArguments = [NSMutableArray arrayWithCapacity:argumentCount - methodSignature.numberOfArguments];
        }
        if (hummerValue) {
            [otherArguments addObject:hummerValue];
        }
    }
    // 存储额外参数
    HMOtherArguments = otherArguments.copy;
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
            param = [(HMJSExecutor *) HMCurrentExecutor toFunctionWithValueRef:arguments[i + (isClass ? 0 : 1)]];
        } else if (type == HMEncodingTypeObject) {
            // HMJSCValue
            param = [[HMJSStrongValue alloc] initWithValueRef:arguments[i + (isClass ? 0 : 1)] executor:HMCurrentExecutor];
        } else if (HMEncodingTypeIsCNumber(type)) {
            // js 只存在 double 和 bool 类型，但原生需要区分具体类型。
            param = [(HMJSExecutor *) HMCurrentExecutor toNumberWithValueRef:arguments[i + (isClass ? 0 : 1)] isForce:NO];
        }
        [invocation hm_setArgument:param atIndex:i encodingType:type];
    }
    [invocation invoke];
    HMOtherArguments = nil;

    // 返回值
    NAPIValue returnValueRef = nil;
    const char *objCReturnType = methodSignature.methodReturnType;
    HMEncodingType returnType = HMEncodingGetType(objCReturnType);
    if (returnType != HMEncodingTypeVoid && returnType != HMEncodingTypeUnknown) {
        id returnObject = [invocation hm_getReturnValueObject];
        if (returnObject) {
            returnValueRef = [(HMJSExecutor *) HMCurrentExecutor toValueRefWithObject:returnObject];
        }
    }
    HMCurrentExecutor = nil;

    return returnValueRef;
}

- (nullable NAPIValue)hummerGetSetPropertyWithArgumentCount:(size_t)argumentCount arguments:(NAPIValue *_Nullable)arguments isSetter:(BOOL)isSetter {
    if (isSetter) {
        if (argumentCount < 3) {
            HMLogError(HUMMER_GET_SET_ERROR);

            return nil;
        }
    } else {
        if (argumentCount < 2) {
            HMLogError(HUMMER_GET_SET_ERROR);

            return nil;
        }
    }
    NAPIValue objectRef = nil;
    if ([self typeOfWithValueRef:arguments[0]] == NAPIExternal) {
        objectRef = arguments[0];
    }
    if (objectRef) {
        if (isSetter) {
            if (argumentCount < 4) {
                HMLogError(HUMMER_GET_SET_ERROR);

                return nil;
            }
        } else {
            if (argumentCount < 3) {
                HMLogError(HUMMER_GET_SET_ERROR);

                return nil;
            }
        }
    }

    NSString *className = [self toStringWithValueRef:arguments[objectRef ? 1 : 0] isForce:NO];
    if (className.length == 0) {
        return nil;
    }
    NSString *propertyName = [self toStringWithValueRef:arguments[objectRef ? 2 : 1] isForce:NO];
    if (propertyName.length == 0) {
        return nil;
    }

    id target = nil;
    SEL selector = nil;
    NSMethodSignature *methodSignature = nil;

    [self hummerExtractExportWithFunctionPropertyName:propertyName objectRef:objectRef target:&target selector:&selector methodSignature:&methodSignature isSetter:isSetter jsClassName:className];

//    if (isSetter) {
//        NSArray *interceptors = [HMInterceptor interceptor:HMInterceptorTypeJSCaller];
//        if (interceptors.count > 0) {
//            for (id<HMJSCallerIterceptor> jscaller in interceptors) {
//                [jscaller callWithJSClassName:className functionName:[@"set" stringByAppendingString:propertyName.capitalizedString]];
//            }
//        }
//    }
    
#ifdef HMDEBUG
    HMJSContext *context = [[HMJSGlobal globalObject] currentContext:self];
    NSString *objRefStr = objectRef ? [NSString stringWithFormat:@"%p", target] : nil;
    NSMutableArray *argDesList = @[].mutableCopy;
    int argStartIndex = objectRef ? 1:0;
    for (NSUInteger i = 2; i < MIN(methodSignature.numberOfArguments + argStartIndex, argumentCount) - argStartIndex; ++i) {
        HMJSStrongValue *jsValue = [[HMJSStrongValue alloc] initWithValueRef:arguments[i + argStartIndex] executor:self];
        [argDesList addObject:jsValue ? : @"NullOrUndefined"];
    }
    [HMJSCallerInterceptor callNativeWithClassName:className functionName:isSetter ? [@"set" stringByAppendingString:propertyName.capitalizedString] : propertyName objectRef:objRefStr args:argDesList context:context];
#endif
    

    return [self hummerCallNativeWithArgumentCount:argumentCount arguments:arguments target:target selector:selector methodSignature:methodSignature];
}

- (BOOL)isArrayWithValueRef:(nullable NAPIValue)valueRef {
    HMAssertMainQueue();
    if (!valueRef) {
        return NO;
    }
    NAPIHandleScope handleScope;
    if (napi_open_handle_scope(self.env, &handleScope) != NAPIErrorOK) {
        NSAssert(NO, HANDLE_SCOPE_ERROR);

        return NO;
    }
    BOOL isArray = NO;
    NAPIValue globalValue;
    if (napi_get_global(self.env, &globalValue) != NAPIErrorOK) {
        NSAssert(NO, GET_GLOBAL_ERROR);
        goto exit;
    }
    NAPIValue arrayConstructorValue;
    if ([self popExceptionWithStatus:napi_get_named_property(self.env, globalValue, "Array", &arrayConstructorValue)]) {
        NSAssert(NO, NAMED_PROPERTY_ERROR);
        goto exit;
    }
    NAPIValue isArrayValue;
    if ([self popExceptionWithStatus:napi_get_named_property(self.env, arrayConstructorValue, "isArray", &isArrayValue)]) {
        NSAssert(NO, NAMED_PROPERTY_ERROR);
        goto exit;
    }
    NAPIValue resultValue;
    if ([self popExceptionWithStatus:napi_call_function(self.env, arrayConstructorValue, isArrayValue, 1, &valueRef, &resultValue)]) {
        NSAssert(NO, CALL_FUNCTION_ERROR);
        goto exit;
    }
    if (napi_get_value_bool(self.env, resultValue, &isArray) != NAPIErrorOK) {
        NSAssert(NO, GET_VALUE_BOOL_ERROR);
        goto exit;
    }

    exit:
    CHECK_COMMON(napi_close_handle_scope(self.env, handleScope))

    return isArray;
}

- (NAPIValueType)typeOfWithValueRef:(NAPIValue)valueRef {
    HMAssertMainQueue();
    NAPIValueType valueType;
    CHECK_COMMON(napi_typeof(self.env, valueRef, &valueType))

    return valueType;
}

- (NSString *)typeStringOfWithValueRef:(NAPIValue)valueRef {

    NAPIValueType valueType = [self typeOfWithValueRef:valueRef];
    switch (valueType) {
        case NAPIUndefined:
            return @"undefined";
        case NAPINull:
            return @"null";
        case NAPIBoolean:
            return @"boolean";
        case NAPINumber:
            return @"number";
        case NAPIString:
            return @"string";
        case NAPIObject:
            return @"object";
        case NAPIFunction:
            return @"function";
        case NAPIExternal:
            return @"external";
        default:
            break;
    }
    return @"unknow";
}

- (BOOL)isDictionaryWithValueRef:(nullable NAPIValue)valueRef {
    if (!valueRef) {
        return NO;
    }
    // 1. 是对象
    // 2. 不是数组
    if ([self typeOfWithValueRef:valueRef] != NAPIObject || [self isArrayWithValueRef:valueRef]) {
        return NO;
    }

    return YES;
}

- (BOOL)isNativeObjectWithValueRef:(nullable NAPIValue)valueRef {
    return (BOOL) [self toNativeObjectWithValueRef:valueRef];
}

- (BOOL)isFunctionWithValueRef:(nullable NAPIValue)valueRef {
    if (!valueRef) {
        return NO;
    }

    return [self typeOfWithValueRef:valueRef] == NAPIFunction;
}

- (nullable NSObject *)toNativeObjectWithValueRef:(nullable NAPIValue)valueRef {
    if (!valueRef) {
        return nil;
    }
    HMAssertMainQueue();
    NAPIValueType valueType = [self typeOfWithValueRef:valueRef];
    if (valueType != NAPIObject && valueType != NAPIExternal && valueType != NAPIFunction) {
        return nil;
    }
    NAPIHandleScope handleScope;
    if (napi_open_handle_scope(self.env, &handleScope) != NAPIErrorOK) {
        NSAssert(NO, HANDLE_SCOPE_ERROR);

        return nil;
    }
    NSObject *returnValue = nil;
    NAPIValue privateValue;
    if ([self popExceptionWithStatus:napi_get_named_property(self.env, valueRef, "_private", &privateValue)]) {
        NSAssert(NO, NAMED_PROPERTY_ERROR);
        goto exit;
    }
    void *privatePointer = nil;
    // 忽略错误
    napi_get_value_external(self.env, privateValue, &privatePointer);
    if (!privatePointer) {
        goto exit;
    }

    returnValue = (__bridge NSObject *) privatePointer;

    exit:
    CHECK_COMMON(napi_close_handle_scope(self.env, handleScope))

    return returnValue;
}

- (nullable NSString *)toStringWithValueRef:(nullable NAPIValue)valueRef isForce:(BOOL)isForce {
    if (!valueRef) {
        return nil;
    }
    HMAssertMainQueue();
    NSString *returnValue = nil;
    NAPIHandleScope handleScope = nil;
    if (isForce && [self typeOfWithValueRef:valueRef] != NAPIString) {
        if (napi_open_handle_scope(self.env, &handleScope) != NAPIErrorOK) {
            NSAssert(NO, HANDLE_SCOPE_ERROR);

            return nil;
        }
        if ([self popExceptionWithStatus:napi_coerce_to_string(self.env, valueRef, &valueRef)]) {
            NSAssert(NO, @"napi_coerce_to_string() error");
            goto exit;
        }
    }
    const char *utf8String;
    if (NAPIGetValueStringUTF8(self.env, valueRef, &utf8String) != NAPIErrorOK) {
        goto exit;
    }
    returnValue = [NSString stringWithUTF8String:utf8String];
    CHECK_COMMON(NAPIFreeUTF8String(self.env, utf8String))

    exit:
    if (handleScope) {
        CHECK_COMMON(napi_close_handle_scope(self.env, handleScope))
    }

    return returnValue;
}

- (nullable NSNumber *)toNumberWithValueRef:(nullable NAPIValue)valueRef isForce:(BOOL)isForce {
    if (!valueRef) {
        return nil;
    }
    HMAssertMainQueue();
    NSNumber *returnValue = nil;
    NAPIHandleScope handleScope = nil;
    NAPIValueType vType = [self typeOfWithValueRef:valueRef];
    if (isForce && vType != NAPINumber) {
        if (napi_open_handle_scope(self.env, &handleScope) != NAPIErrorOK) {
            NSAssert(NO, HANDLE_SCOPE_ERROR);

            return nil;
        }
        if ([self popExceptionWithStatus:napi_coerce_to_number(self.env, valueRef, &valueRef)]) {
            NSAssert(NO, @"napi_coerce_to_number() error");
            goto exit;
        }
        double doubleValue;
        if (napi_get_value_double(self.env, valueRef, &doubleValue) != NAPIErrorOK) {
            goto exit;
        }
        return @(doubleValue);
    }
    
    if (vType == NAPIBoolean) {
        bool boolValue;
        if (napi_get_value_bool(self.env, valueRef, &boolValue) != NAPIErrorOK) {
            goto exit;
        }
        returnValue = @(boolValue);
    }else{
        double doubleValue;
        if (napi_get_value_double(self.env, valueRef, &doubleValue) != NAPIErrorOK) {
            goto exit;
        }
        returnValue = @(doubleValue);
    }

    exit:
    if (handleScope) {
        CHECK_COMMON(napi_close_handle_scope(self.env, handleScope))
    }

    return returnValue;
}

- (nullable NAPIValue)toValueRefWithNumber:(nullable NSNumber *)number {
    if (!number) {
        return nil;
    }
    HMAssertMainQueue();
    NAPIValue resultValue;
    if (strcmp(number.objCType, @encode(BOOL)) == 0) {
        if (napi_get_boolean(self.env, number.boolValue, &resultValue) != NAPIErrorOK) {
            NSAssert(NO, @"napi_get_boolean() error");

            return nil;
        }
    } else {
        if (napi_create_double(self.env, number.doubleValue, &resultValue) != NAPIErrorOK) {
            NSAssert(NO, @"napi_create_double() error");

            return nil;
        }
    }

    return resultValue;
}

- (nullable NAPIValue)toValueRefWithString:(nullable NSString *)stringValue {
    if (!stringValue) {
        return nil;
    }
    HMAssertMainQueue();
    NAPIValue resultValue = nil;
    if ([self popExceptionWithStatus:napi_create_string_utf8(self.env, stringValue.UTF8String, &resultValue)]) {
        NSAssert(NO, CREATE_STRING_ERROR);
    }

    return resultValue;
}

- (nullable NAPIValue)toValueRefWithNativeObject:(nullable NSObject *)object {
    // nonnull
    NSString *className = NSStringFromClass(object.class);
    HMExportClass *exportClass = HMExportManager.sharedInstance.objcClasses[className];
    if (!object || !exportClass.jsClass.UTF8String) {
        return nil;
    }
    HMAssertMainQueue();
    HMBaseValue *strongValue = object.hmValue;
    if (strongValue.context == self) {
        NSAssert([strongValue isKindOfClass:HMJSStrongValue.class], @"hmValue type error.");
        
        // 先判断 hmValue，这样后续的闭包转换和原生组件导出可以减少调用
        // 做严格判断，同上下文才能复用 hmValue
        return ((HMJSStrongValue *) strongValue).valueRef;
    }
    NAPIEscapableHandleScope escapableHandleScope;
    if (napi_open_escapable_handle_scope(self.env, &escapableHandleScope) != NAPIErrorOK) {
        NSAssert(NO, HANDLE_SCOPE_ERROR);

        return nil;
    }
    // 如果是导出组件，则通过 Object.create() 创建 JSValue，然后设置 _private
    NAPIValue returnValueRef = nil;
    NAPIValue globalValue;
    if (napi_get_global(self.env, &globalValue) != NAPIErrorOK) {
        NSAssert(NO, GET_GLOBAL_ERROR);
        goto exit;
    }
    NAPIValue hummerCreateObjectFunction;
    if ([self popExceptionWithStatus:napi_get_named_property(self.env, globalValue, "hummerCreateObject", &hummerCreateObjectFunction)]) {
        NSAssert(NO, NAMED_PROPERTY_ERROR);
        goto exit;
    }
    NAPIValue jsClassNameString;
    if ([self popExceptionWithStatus:napi_create_string_utf8(self.env, exportClass.jsClass.UTF8String, &jsClassNameString)]) {
        NSAssert(NO, CREATE_STRING_ERROR);
        goto exit;
    }
    NAPIValue externalValue;
    if ([self popExceptionWithStatus:napi_create_external(self.env, (__bridge void *) object, hummerFinalize, nil, &externalValue)]) {
        NSAssert(NO, CREATE_EXTERNAL_ERROR);
        goto exit;
    }
    CFRetain((__bridge CFTypeRef)object);
    // 第一个参数是 private 对象，第二个参数是导出对象 JS 类名
    NAPIValue args[] = {
            externalValue,
            jsClassNameString
    };
    if ([self popExceptionWithStatus:napi_call_function(self.env, nil, hummerCreateObjectFunction, 2, args, &returnValueRef)]) {
        NSAssert(NO, CALL_FUNCTION_ERROR);
        goto exit;
    }
    if (napi_escape_handle(self.env, escapableHandleScope, returnValueRef, &returnValueRef) != NAPIErrorOK) {
        returnValueRef = nil;
        goto exit;
    }
    [object hm_setWeakValue:[[HMJSWeakValue alloc] initWithValueRef:returnValueRef executor:self]];

    exit:
    CHECK_COMMON(napi_close_escapable_handle_scope(self.env, escapableHandleScope))

    return returnValueRef;
}

- (nullable NAPIValue)toValueRefWithFunction:(nullable id)function {
    if (![function isKindOfClass:NSClassFromString(@"NSBlock")]) {
        return nil;
    }
    HMAssertMainQueue();
    HMBaseValue *strongValue = self.hmValue;
    if (strongValue.context == self) {
        NSAssert([strongValue isKindOfClass:HMJSStrongValue.class], @"hmValue type error.");
        // 先判断 hmValue，这样后续的闭包转换和原生组件导出可以减少调用
        // 做严格判断，同上下文才能复用 hmValue

        return ((HMJSStrongValue *) strongValue).valueRef;
    }
    NAPIEscapableHandleScope escapableHandleScope;
    if (napi_open_escapable_handle_scope(self.env, &escapableHandleScope) != NAPIErrorOK) {
        NSAssert(NO, HANDLE_SCOPE_ERROR);

        return nil;
    }
    NAPIValue returnValueRef = nil;
    NAPIValue globalValue;
    if (napi_get_global(self.env, &globalValue) != NAPIErrorOK) {
        NSAssert(NO, GET_GLOBAL_ERROR);
        goto exit;
    }
    NAPIValue createFunctionFunction;
    if ([self popExceptionWithStatus:napi_get_named_property(self.env, globalValue, "hummerCreateFunction", &createFunctionFunction)]) {
        NSAssert(NO, NAMED_PROPERTY_ERROR);
        goto exit;
    }
    NAPIValue externalValue;
    if ([self popExceptionWithStatus:napi_create_external(self.env, (__bridge void *) function, hummerFinalize, nil, &externalValue)]) {
        NSAssert(NO, CREATE_EXTERNAL_ERROR);
        goto exit;
    }
    CFRetain((__bridge CFTypeRef)function);
    if ([self popExceptionWithStatus:napi_call_function(self.env, nil, createFunctionFunction, 1, &externalValue, &returnValueRef)]) {
        NSAssert(NO, CALL_FUNCTION_ERROR);
        goto exit;
    }
    if (napi_escape_handle(self.env, escapableHandleScope, returnValueRef, &returnValueRef) != NAPIErrorOK) {
        returnValueRef = nil;
        goto exit;
    }
    [function hm_setWeakValue:[[HMJSWeakValue alloc] initWithValueRef:returnValueRef executor:self]];

    exit:
    CHECK_COMMON(napi_close_escapable_handle_scope(self.env, escapableHandleScope))

    return returnValueRef;
}

- (nullable NAPIValue)toValueRefWithArray:(nullable NSArray *)array {
    HMAssertMainQueue();
    __block NAPIValue arrayValue = nil;
    // Native -> JavaScript 空数组情况
    if (array && !array.count) {
        NAPIEscapableHandleScope escapableHandleScope;
        if (napi_open_escapable_handle_scope(self.env, &escapableHandleScope) != NAPIErrorOK) {
            NSAssert(NO, HANDLE_SCOPE_ERROR);

            return nil;
        }
        NAPIValue globalValue;
        if (napi_get_global(self.env, &globalValue) != NAPIErrorOK) {
            NSAssert(NO, GET_GLOBAL_ERROR);
            goto exit;
        }
        NAPIValue arrayConstructorValue;
        if ([self popExceptionWithStatus:napi_get_named_property(self.env, globalValue, "Array", &arrayConstructorValue)]) {
            NSAssert(NO, NAMED_PROPERTY_ERROR);
            goto exit;
        }
        if ([self popExceptionWithStatus:napi_new_instance(self.env, arrayConstructorValue, 0, nil, &arrayValue)]) {
            NSAssert(NO, NAMED_PROPERTY_ERROR);
            goto exit;
        }
        if (napi_escape_handle(self.env, escapableHandleScope, arrayValue, &arrayValue) != NAPIErrorOK) {
            arrayValue = nil;
            goto exit;
        }

        exit:
        CHECK_COMMON(napi_close_escapable_handle_scope(self.env, escapableHandleScope))

        return arrayValue;
    }

    [array enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
        NAPIEscapableHandleScope escapableHandleScope;
        if (napi_open_escapable_handle_scope(self.env, &escapableHandleScope) != NAPIErrorOK) {
            // continue
            return;
        }
        NAPIValue inlineValueRef = [self toValueRefWithObject:obj];
        if (!inlineValueRef) {
            goto arrayExit;
        }
        if (!arrayValue) {
            NAPIValue globalValue;
            if (napi_get_global(self.env, &globalValue) != NAPIErrorOK) {
                NSAssert(NO, GET_GLOBAL_ERROR);
                goto arrayExit;
            }
            NAPIValue arrayConstructorValue;
            if ([self popExceptionWithStatus:napi_get_named_property(self.env, globalValue, "Array", &arrayConstructorValue)]) {
                NSAssert(NO, NAMED_PROPERTY_ERROR);
                goto arrayExit;
            }
            if ([self popExceptionWithStatus:napi_new_instance(self.env, arrayConstructorValue, 0, nil, &arrayValue)]) {
                NSAssert(NO, NAMED_PROPERTY_ERROR);
                goto arrayExit;
            }
            if (napi_escape_handle(self.env, escapableHandleScope, arrayValue, &arrayValue) != NAPIErrorOK) {
                arrayValue = nil;
                goto arrayExit;
            }
        }
        NAPIValue pushFunction;
        if ([self popExceptionWithStatus:napi_get_named_property(self.env, arrayValue, "push", &pushFunction)]) {
            goto arrayExit;
        }
        // 忽略返回值，处理异常后直接结束
        [self popExceptionWithStatus:napi_call_function(self.env, arrayValue, pushFunction, 1, &inlineValueRef, nil)];

        arrayExit:
        CHECK_COMMON(napi_close_escapable_handle_scope(self.env, escapableHandleScope))
    }];

    return arrayValue;
}

- (nullable NAPIValue)toValueRefWithDictionary:(nullable NSDictionary<id, id> *)dictionary {
    HMAssertMainQueue();
    __block NAPIValue objectRef = nil;
    // 空字典情况
    if (dictionary && dictionary.count == 0) {
        NAPIEscapableHandleScope escapableHandleScope;
        if (napi_open_escapable_handle_scope(self.env, &escapableHandleScope) != NAPIErrorOK) {
            NSAssert(NO, HANDLE_SCOPE_ERROR);

            return nil;
        }
        NAPIValue globalValue;
        if (napi_get_global(self.env, &globalValue) != NAPIErrorOK) {
            NSAssert(NO, GET_GLOBAL_ERROR);
            goto exit;
        }
        NAPIValue arrayConstructorValue;
        if ([self popExceptionWithStatus:napi_get_named_property(self.env, globalValue, "Object", &arrayConstructorValue)]) {
            NSAssert(NO, NAMED_PROPERTY_ERROR);
            goto exit;
        }
        if ([self popExceptionWithStatus:napi_new_instance(self.env, arrayConstructorValue, 0, nil, &objectRef)]) {
            NSAssert(NO, NAMED_PROPERTY_ERROR);
            goto exit;
        }
        if (napi_escape_handle(self.env, escapableHandleScope, objectRef, &objectRef) != NAPIErrorOK) {
            objectRef = nil;
            goto exit;
        }

        exit:
        CHECK_COMMON(napi_close_escapable_handle_scope(self.env, escapableHandleScope))

        return objectRef;
    }

    [dictionary enumerateKeysAndObjectsUsingBlock:^(id key, id obj, BOOL *stop) {
        if (![key isKindOfClass:NSString.class]) {
            // continue
            return;
        }
        NAPIEscapableHandleScope escapableHandleScope;
        if (napi_open_escapable_handle_scope(self.env, &escapableHandleScope) != NAPIErrorOK) {
            // continue
            return;
        }
        NAPIValue inlineValueRef = [self toValueRefWithObject:obj];
        if (!inlineValueRef) {
            goto dictionaryExit;
        }
        if (!objectRef) {
            NAPIValue globalValue;
            if (napi_get_global(self.env, &globalValue) != NAPIErrorOK) {
                NSAssert(NO, GET_GLOBAL_ERROR);
                goto dictionaryExit;
            }
            NAPIValue arrayConstructorValue;
            if ([self popExceptionWithStatus:napi_get_named_property(self.env, globalValue, "Object", &arrayConstructorValue)]) {
                NSAssert(NO, NAMED_PROPERTY_ERROR);
                goto dictionaryExit;
            }
            if ([self popExceptionWithStatus:napi_new_instance(self.env, arrayConstructorValue, 0, nil, &objectRef)]) {
                NSAssert(NO, NAMED_PROPERTY_ERROR);
                goto dictionaryExit;
            }
            if (napi_escape_handle(self.env, escapableHandleScope, objectRef, &objectRef) != NAPIErrorOK) {
                objectRef = nil;
                goto dictionaryExit;
            }
        }
        // 直接做错误处理
        [self popExceptionWithStatus:napi_set_named_property(self.env, objectRef, ((NSString *) key).UTF8String, inlineValueRef)];

        dictionaryExit:
        CHECK_COMMON(napi_close_escapable_handle_scope(self.env, escapableHandleScope))
    }];

    return objectRef;
}

- (nullable NAPIValue)toValueRefWithObject:(nullable id)object {
    HMAssertMainQueue();
    if ([object isKindOfClass:HMJSWeakValue.class]) {
        HMJSWeakValue *weakValue = object;
        if (weakValue.executor != self) {
            // 如果已经被 GC，则会返回 nil
            NAPIEscapableHandleScope escapableHandleScope;
            if (napi_open_escapable_handle_scope(self.env, &escapableHandleScope) != NAPIErrorOK) {
                NSAssert(NO, HANDLE_SCOPE_ERROR);

                return nil;
            }
            NAPIValue returnValueRef = [self toValueRefWithObject:[self toObjectWithValueRef:weakValue.valueRef isPortableConvert:NO]];
            if (napi_escape_handle(self.env, escapableHandleScope, returnValueRef, &returnValueRef) != NAPIErrorOK) {
                returnValueRef = nil;
            }
            CHECK_COMMON(napi_close_escapable_handle_scope(self.env, escapableHandleScope))

            return returnValueRef;
        }

        return weakValue.valueRef;
    } else if ([object isKindOfClass:HMJSStrongValue.class]) {
        HMJSStrongValue *strongValue = object;
        if (strongValue.context != self) {
            return [self toValueRefWithObject:strongValue.toObject];
        }

        return strongValue.valueRef;
    } else if (object == NSNull.null) {
        NAPIValue nullValue;
        CHECK_COMMON(napi_get_null(self.env, &nullValue))

        return nullValue;
    } else if ([object isKindOfClass:NSNumber.class]) {
        return [self toValueRefWithNumber:object];
    } else if ([object isKindOfClass:NSString.class]) {
        return [self toValueRefWithString:object];
    } else if ([object isKindOfClass:NSArray.class]) {
        return [self toValueRefWithArray:object];
    } else if ([object isKindOfClass:NSDictionary.class]) {
        return [self toValueRefWithDictionary:object];
    } else {
        HMBaseValue *strongValue = [object hmValue];
        if (strongValue.context == self) {
            NSAssert([strongValue isKindOfClass:HMJSStrongValue.class], @"hmValue type error.");
            // 先判断 hmValue，这样后续的闭包转换和原生组件导出可以减少调用
            // 做严格判断，同上下文才能复用 hmValue
            
            return ((HMJSStrongValue *) strongValue).valueRef;
        } else if ([object isKindOfClass:NSClassFromString(@"NSBlock")]) {
            return [self toValueRefWithFunction:object];
        } else {
            return [self toValueRefWithNativeObject:object];
        }
    }
}

- (nullable HMFunctionType)toFunctionWithValueRef:(nullable NAPIValue)valueRef {
    HMAssertMainQueue();
    NAPIValueType valueType;
    napi_typeof(self.env, valueRef, &valueType);
    if (valueType != NAPIFunction) {
        return nil;
    }
    NAPIHandleScope handleScope;
    if (napi_open_handle_scope(self.env, &handleScope) != NAPIErrorOK) {
        return nil;
    }
    NAPIValue externalValue;
    HMFunctionType function;
    void *externalPointer;
    HMJSStrongValue *valueWrapper;
    if ([self popExceptionWithStatus:napi_get_named_property(self.env, valueRef, "_privateFunction", &externalValue)]) {
        CHECK_COMMON(napi_close_handle_scope(self.env, handleScope))

        return nil;
    }
    // 是原先原生转成的 JS 闭包
    if (napi_get_value_external(self.env, externalValue, &externalPointer) == NAPIErrorOK && [(__bridge id) externalPointer isKindOfClass:NSClassFromString(@"NSBlock")]) {
        // 本次 JS 闭包是原生返回，复用原先的闭包
        CHECK_COMMON(napi_close_handle_scope(self.env, handleScope))

        return (__bridge HMFunctionType _Nullable) externalPointer;
    }

    valueWrapper = [[HMJSStrongValue alloc] initWithValueRef:valueRef executor:self];
    function = ^(NSArray *_Nullable argumentArray) {
        HMAssertMainQueue();
        if (valueWrapper.context && [valueWrapper.context isKindOfClass:HMJSExecutor.class]) {
            // 当前还未被销毁
            // 重新判断一次 valueRef
            HMJSExecutor *executor = (HMJSExecutor *) valueWrapper.context;
            NAPIHandleScope inlineHandleScope;
            if (napi_open_handle_scope(executor.env, &inlineHandleScope) != NAPIErrorOK) {
                return (HMJSStrongValue *) nil;
            }
            NAPIValue returnValueRef = [executor callWithFunctionObject:valueWrapper.valueRef thisObject:nil argumentArray:argumentArray];
            if (returnValueRef) {
                return [[HMJSStrongValue alloc] initWithValueRef:returnValueRef executor:executor];
            }
            CHECK_COMMON(napi_close_handle_scope(executor.env, inlineHandleScope))
        }

        return (HMJSStrongValue *) nil;
    };


    CHECK_COMMON(napi_close_handle_scope(self.env, handleScope))

    return function;
}

- (nullable NAPIValue)callWithFunctionObject:(nullable NAPIValue)functionObjectRef thisObject:(nullable NAPIValue)thisObjectRef argumentArray:(nullable NSArray *)argumentArray {
    if (!functionObjectRef) {
        return nil;
    }
    HMAssertMainQueue();
    NAPIValue returnValueRef = nil;
    if (argumentArray.count <= 8) {
        // stack
        NAPIValue valueRefArray[argumentArray.count];
        int count = 0;
        for (int i = 0; i < argumentArray.count; ++i) {
            NAPIValue inlineValueRef = [self toValueRefWithObject:argumentArray[(NSUInteger) i]];
            if (inlineValueRef) {
                valueRefArray[count++] = inlineValueRef;
            }
        }

        [self popExceptionWithStatus:napi_call_function(self.env, thisObjectRef, functionObjectRef, (size_t) count, valueRefArray, &returnValueRef)];
    } else {
        NSUInteger count = argumentArray.count;
        NAPIValue *valueRefArray = nil;
        if (count) {
            // malloc(0) return NULL or unique pointer that will be passed to free() safely
            valueRefArray = malloc(count * sizeof(NAPIValue));
            if (!valueRefArray) {
                count = 0;
            }
        }
        __block NSUInteger realCount = 0;
        if (count > 0) {
            [argumentArray enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
                NAPIValue inlineValueRef = [self toValueRefWithObject:obj];
                if (inlineValueRef) {
                    valueRefArray[realCount++] = inlineValueRef;
                }
            }];
        }
        [self popExceptionWithStatus:napi_call_function(self.env, thisObjectRef, functionObjectRef, realCount, valueRefArray, &returnValueRef)];
        free(valueRefArray);
    }

#ifdef HMDEBUG
    HMBaseValue *thisValue = [[HMJSStrongValue alloc] initWithValueRef:thisObjectRef executor:self];
    HMJSContext *context = [[HMJSGlobal globalObject] currentContext:self];
    NAPIValue namePropertyName = [self toValueRefWithString:@"name"];
    NAPIValue functionNameValue = NULL;
    napi_get_property(self.env, functionObjectRef, namePropertyName, &functionNameValue);
    NSString *functionName = [self toStringWithValueRef:functionNameValue isForce:YES];
    [HMJSCallerInterceptor callJSWithTarget:thisValue functionName:functionName args:argumentArray context:context];
#endif
    
    return returnValueRef;
}

- (nullable NSArray *)toArrayWithValueRef:(nullable NAPIValue)valueRef isPortableConvert:(BOOL)isPortableConvert {
    HMAssertMainQueue();
    if (![self isArrayWithValueRef:valueRef]) {
        return nil;
    }
    NAPIHandleScope handleScope;
    if (napi_open_handle_scope(self.env, &handleScope) != NAPIErrorOK) {
        NSAssert(NO, HANDLE_SCOPE_ERROR);

        return nil;
    }
    NSArray *returnArray = nil;
    NSMutableArray *resultArray;
    NAPIValue lengthValue;
    if ([self popExceptionWithStatus:napi_get_named_property(self.env, valueRef, "length", &lengthValue)]) {
        NSAssert(NO, NAMED_PROPERTY_ERROR);
        goto exit;
    }
    NSUInteger length = [self toNumberWithValueRef:lengthValue isForce:NO].unsignedIntegerValue;
    resultArray = [NSMutableArray arrayWithCapacity:length];
    for (NSUInteger i = 0; i < length; ++i) {
        NAPIHandleScope inlineHandleScope;
        if (napi_open_handle_scope(self.env, &inlineHandleScope) != NAPIErrorOK) {
            continue;
        }
        id resultObject;
        NAPIValue indexValue = [self toValueRefWithNumber:@(i)];
        if (!indexValue) {
            goto loopExit;
        }
        NAPIValue propertyValue;
        if ([self popExceptionWithStatus:napi_get_property(self.env, valueRef, indexValue, &propertyValue)]) {
            goto loopExit;
        }
        resultObject = [self toObjectWithValueRef:propertyValue isPortableConvert:isPortableConvert];
        if (resultObject) {
            [resultArray addObject:resultObject];
        } else {
            // 兼容 JavaScriptCore toObject 实现，如果是数组，undefined 也转换为 NSNull.null，但是字典没有这个逻辑
            [resultArray addObject:NSNull.null];
        }

        loopExit:
        CHECK_COMMON(napi_close_handle_scope(self.env, inlineHandleScope))
    }
    returnArray = resultArray.copy;

    exit:
    CHECK_COMMON(napi_close_handle_scope(self.env, handleScope))

    return returnArray;
}

- (nullable NSDictionary *)toDictionaryWithValueRef:(nullable NAPIValue)valueRef isPortableConvert:(BOOL)isPortableConvert {
    HMAssertMainQueue();
    // 1. 是对象
    // 2. 不是数组
    // 3. 不是闭包
    // 4. 不是原生对象
    NAPIValueType valueType = [self typeOfWithValueRef:valueRef];
    if (valueType != NAPIObject || [self isArrayWithValueRef:valueRef] || [self isNativeObjectWithValueRef:valueRef]) {
        return nil;
    }
    NAPIHandleScope handleScope;
    if (napi_open_handle_scope(self.env, &handleScope) != NAPIErrorOK) {
        NSAssert(NO, HANDLE_SCOPE_ERROR);

        return nil;
    }
    NSDictionary *returnDictionary = nil;
    NSMutableDictionary *resultDictionary = nil;
    NSNumber *lengthNumber;
    NAPIValue globalValue, objectConstructorValue, keysValue;
    if (napi_get_global(self.env, &globalValue) != NAPIErrorOK) {
        NSAssert(NO, GET_GLOBAL_ERROR);
        goto exit;
    }
    if ([self popExceptionWithStatus:napi_get_named_property(self.env, globalValue, "Object", &objectConstructorValue)]) {
        NSAssert(NO, NAMED_PROPERTY_ERROR);
        goto exit;
    }
    if ([self popExceptionWithStatus:napi_get_named_property(self.env, objectConstructorValue, "keys", &keysValue)]) {
        NSAssert(NO, NAMED_PROPERTY_ERROR);
        goto exit;
    }
    NAPIValue objectKeysArrayValue;
    if ([self popExceptionWithStatus:napi_call_function(self.env, objectConstructorValue, keysValue, 1, &valueRef, &objectKeysArrayValue)]) {
        NSAssert(NO, CALL_FUNCTION_ERROR);
        goto exit;
    }
    BOOL isArray = NO;
    CHECK_COMMON(napi_is_array(self.env, objectKeysArrayValue, &isArray))
    if (!isArray) {
        goto exit;
    }
    NAPIValue lengthValue;
    if ([self popExceptionWithStatus:napi_get_named_property(self.env, objectKeysArrayValue, "length", &lengthValue)]) {
        goto exit;
    }
    lengthNumber = [self toNumberWithValueRef:lengthValue isForce:NO];
    if (!lengthNumber) {
        goto exit;
    }
    resultDictionary = [NSMutableDictionary dictionaryWithCapacity:lengthNumber.unsignedIntegerValue];
    for (uint64_t i = 0; i < lengthNumber.unsignedLongLongValue; ++i) {
        NAPIHandleScope inlineHandleScope;
        if (napi_open_handle_scope(self.env, &inlineHandleScope)) {
            NSAssert(NO, HANDLE_SCOPE_ERROR);
            continue;
        }
        NSString *objcString = nil;
        NAPIValue indexValue = [self toValueRefWithNumber:@(i)];
        if (!indexValue) {
            goto loopExit;
        }
        NAPIValue stringValue;
        if ([self popExceptionWithStatus:napi_get_property(self.env, objectKeysArrayValue, indexValue, &stringValue)]) {
            goto loopExit;
        }
        const char *utf8String;
        if (NAPIGetValueStringUTF8(self.env, stringValue, &utf8String) != NAPIErrorOK) {
            goto loopExit;
        }
        objcString = [NSString stringWithUTF8String:utf8String];
        CHECK_COMMON(NAPIFreeUTF8String(self.env, utf8String))
        if (!objcString) {
            goto loopExit;
        }
        NAPIValue returnValueRef;
        if ([self popExceptionWithStatus:napi_get_property(self.env, valueRef, stringValue, &returnValueRef)]) {
            goto loopExit;
        }
        resultDictionary[objcString] = [self toObjectWithValueRef:returnValueRef isPortableConvert:isPortableConvert];

        loopExit:
        CHECK_COMMON(napi_close_handle_scope(self.env, inlineHandleScope))
    }
    returnDictionary = resultDictionary.copy;

    exit:
    CHECK_COMMON(napi_close_handle_scope(self.env, handleScope))

    return returnDictionary;
}

- (nullable id)toObjectWithValueRef:(nullable NAPIValue)valueRef isPortableConvert:(BOOL)isPortableConvert {
    if (!valueRef) {
        return nil;
    }
    HMAssertMainQueue();
    NAPIValueType valueType = [self typeOfWithValueRef:valueRef];
    if (valueType == NAPIUndefined) {
        return nil;
    }
    // 兼容需要
    if (valueType == NAPINull) {
        return NSNull.null;
    }
    id returnValue = [self toStringWithValueRef:valueRef isForce:NO];
    if (returnValue) {
        return returnValue;
    }
    returnValue = [self toNumberWithValueRef:valueRef isForce:NO];
    if (returnValue) {
        return returnValue;
    }
    if (!isPortableConvert) {
        // 原生对象
        returnValue = [self toNativeObjectWithValueRef:valueRef];
        if (returnValue) {
            return returnValue;
        }
        // 闭包需要比字典优先判断
        returnValue = [self toFunctionWithValueRef:valueRef];
        if (returnValue) {
            return returnValue;
        }
    }
    returnValue = [self toArrayWithValueRef:valueRef isPortableConvert:isPortableConvert];
    if (returnValue) {
        return returnValue;
    }

    return [self toDictionaryWithValueRef:valueRef isPortableConvert:isPortableConvert];
}

- (void)dealloc {
    NAPIEnv env = self.env;
    HMSafeMainThread(^{
        CHECK_COMMON(NAPIFreeEnv(env))
        BOOL isUniqueExecutor = YES;
        NSValue *key = nil;
        NSEnumerator<NSValue *> *enumerator = HMExecutorMap.keyEnumerator;
        while ((key = enumerator.nextObject)) {
            if (key.pointerValue != env) {
                isUniqueExecutor = NO;
                break;
            }
        }
        if (isUniqueExecutor) {
            HMExecutorMap = nil;
            [[HMDebugService sharedService] stopDebugConnection];
        }
    });
}

- (instancetype)init {
    BOOL initExecutorMap = NO;
    if (!HMExecutorMap) {
        initExecutorMap = YES;
        HMExecutorMap = NSMapTable.strongToWeakObjectsMapTable;
    }

    HMAssertMainQueue();
    self = [super init];
    _heremsHelper = [HMNAPIDebuggerHelper new];
    if (NAPICreateEnv(&self->_env) != NAPIErrorOK) {
        NSAssert(NO, @"NAPICreateEnv() error");
        goto executorMapError;
    }
    [HMExecutorMap setObject:self forKey:[NSValue valueWithPointer:_env]];
    _exceptionHandlerMap = [NSMapTable mapTableWithKeyOptions:NSPointerFunctionsWeakMemory valueOptions:NSPointerFunctionsStrongMemory];
    _consoleHandlerMap = [NSMapTable mapTableWithKeyOptions:NSPointerFunctionsWeakMemory valueOptions:NSPointerFunctionsStrongMemory];

    // 注入对象
    NAPIHandleScope handleScope;
    if (napi_open_handle_scope(_env, &handleScope) != NAPIErrorOK) {
        NSAssert(NO, HANDLE_SCOPE_ERROR);
        goto envError;
    }
    NAPIValue nativeLoggingHookValue, hummerCallValue, hummerCreateValue, hummerGetValue, hummerSetValue, hummerCallFunctionValue;
    if ([self popExceptionWithStatus:napi_create_function(_env, nil, nativeLoggingHook, nil, &nativeLoggingHookValue)]) {
        goto handleScopeError;
    }
    if ([self popExceptionWithStatus:napi_create_function(_env, nil, hummerCall, nil, &hummerCallValue)]) {
        goto handleScopeError;
    }
    if ([self popExceptionWithStatus:napi_create_function(_env, nil, hummerCreate, nil, &hummerCreateValue)]) {
        goto handleScopeError;
    }
    if ([self popExceptionWithStatus:napi_create_function(_env, nil, hummerSetProperty, nil, &hummerSetValue)]) {
        goto handleScopeError;
    }
    if ([self popExceptionWithStatus:napi_create_function(_env, nil, hummerGetProperty, nil, &hummerGetValue)]) {
        goto handleScopeError;
    }
    if ([self popExceptionWithStatus:napi_create_function(_env, nil, hummerCallFunction, nil, &hummerCallFunctionValue)]) {
        goto handleScopeError;
    }

    NAPIValue globalValue;
    if (napi_get_global(_env, &globalValue) != NAPIErrorOK) {
        goto handleScopeError;
    }

    if ([self popExceptionWithStatus:napi_set_named_property(_env, globalValue, "nativeLoggingHook", nativeLoggingHookValue)]) {
        goto handleScopeError;
    }
    if ([self popExceptionWithStatus:napi_set_named_property(_env, globalValue, "hummerCall", hummerCallValue)]) {
        goto handleScopeError;
    }
    if ([self popExceptionWithStatus:napi_set_named_property(_env, globalValue, "hummerCreate", hummerCreateValue)]) {
        goto handleScopeError;
    }
    if ([self popExceptionWithStatus:napi_set_named_property(_env, globalValue, "hummerCallFunction", hummerCallFunctionValue)]) {
        goto handleScopeError;
    }
    if ([self popExceptionWithStatus:napi_set_named_property(_env, globalValue, "hummerGetProperty", hummerGetValue)]) {
        goto handleScopeError;
    }
    if ([self popExceptionWithStatus:napi_set_named_property(_env, globalValue, "hummerSetProperty", hummerSetValue)]) {
        goto handleScopeError;
    }

#if __has_include(<Hummer/HMInspectorPackagerConnection.h>)
    // setImmediate
    NAPIValue setImmediateValue;
    if ([self popExceptionWithStatus:napi_create_function(_env, nil, setImmediate, nil, &setImmediateValue)]) {
        goto handleScopeError;
    }
    if ([self popExceptionWithStatus:napi_set_named_property(_env, globalValue, "setImmediate", setImmediateValue)]) {
        goto handleScopeError;
    }
#endif

    return self;

    handleScopeError:
    CHECK_COMMON(napi_close_handle_scope(_env, handleScope))
    envError:
    CHECK_COMMON(NAPIFreeEnv(_env))
    executorMapError:
    if (initExecutorMap) {
        HMExecutorMap = nil;
    }

    return nil;
}

- (void)enableDebuggerWithTitle:(nullable NSString *)title {
    [self.heremsHelper napiCall_enableDebuggerAndMessageThread:self.env title:title];
}

- (BOOL)popExceptionWithStatus:(NAPIExceptionStatus)status {
    HMAssertMainQueue();
    if (status == NAPIExceptionOK) {
        return NO;
    }
    NAPIHandleScope handleScope;
    if (napi_open_handle_scope(self.env, &handleScope) != NAPIErrorOK) {
        NSAssert(NO, HANDLE_SCOPE_ERROR);

        return YES;
    }
    NAPIValue exceptionValue;
    if (napi_get_and_clear_last_exception(self.env, &exceptionValue) != NAPIErrorOK) {
        NSAssert(NO, @"napi_get_and_clear_last_exception() error");
        goto exit;
    }
    NAPIValueType valueType;
    CHECK_COMMON(napi_typeof(self.env, exceptionValue, &valueType))
    if (valueType != NAPIObject) {
        // 抛出标量
        goto exit;
    }
    NAPIValue columnValue, lineValue, messageValue, nameValue, stackValue;
    if (napi_get_named_property(self.env, exceptionValue, "column", &columnValue) != NAPIExceptionOK) {
        NSAssert(NO, NAMED_PROPERTY_ERROR);
        goto exit;
    }
    if (napi_get_named_property(self.env, exceptionValue, "line", &lineValue) != NAPIExceptionOK) {
        NSAssert(NO, NAMED_PROPERTY_ERROR);
        goto exit;
    }
    if (napi_get_named_property(self.env, exceptionValue, "message", &messageValue) != NAPIExceptionOK) {
        NSAssert(NO, NAMED_PROPERTY_ERROR);
        goto exit;
    }
    if (napi_get_named_property(self.env, exceptionValue, "name", &nameValue) != NAPIExceptionOK) {
        NSAssert(NO, NAMED_PROPERTY_ERROR);
        goto exit;
    }
    if (napi_get_named_property(self.env, exceptionValue, "stack", &stackValue) != NAPIExceptionOK) {
        NSAssert(NO, NAMED_PROPERTY_ERROR);
        goto exit;
    }
    {
        HMExceptionModel *exceptionModel = [[HMExceptionModel alloc] init];
        double doubleValue;
        if (napi_get_value_double(self.env, columnValue, &doubleValue) == NAPIErrorOK) {
            exceptionModel.column = @(doubleValue);
        }
        if (napi_get_value_double(self.env, lineValue, &doubleValue) == NAPIErrorOK) {
            exceptionModel.line = @(doubleValue);
        }
        const char *utf8String;
        if (NAPIGetValueStringUTF8(self.env, messageValue, &utf8String) == NAPIErrorOK) {
            exceptionModel.message = [NSString stringWithUTF8String:utf8String];
            CHECK_COMMON(NAPIFreeUTF8String(self.env, utf8String))
        }
        if (NAPIGetValueStringUTF8(self.env, nameValue, &utf8String) == NAPIErrorOK) {
            exceptionModel.name = [NSString stringWithUTF8String:utf8String];
            CHECK_COMMON(NAPIFreeUTF8String(self.env, utf8String))
        }
        if (NAPIGetValueStringUTF8(self.env, stackValue, &utf8String) == NAPIErrorOK) {
            exceptionModel.stack = [NSString stringWithUTF8String:utf8String];
            CHECK_COMMON(NAPIFreeUTF8String(self.env, utf8String))
        }

        [self triggerExceptionHandler:exceptionModel];
    }

    exit:
    CHECK_COMMON(napi_close_handle_scope(self.env, handleScope))

    return YES;
}

- (HMBaseValue *)globalObject {
    HMAssertMainQueue();
    NAPIHandleScope handleScope;
    HMJSStrongValue *strongValue = nil;
    if (napi_open_handle_scope(self.env, &handleScope) != NAPIErrorOK) {
        NSAssert(NO, HANDLE_SCOPE_ERROR);

        return nil;
    }
    NAPIValue global;
    if (napi_get_global(self.env, &global) != NAPIErrorOK) {
        NSAssert(NO, GET_GLOBAL_ERROR);
        goto exit;
    }
    // Strong reference
    strongValue = [[HMJSStrongValue alloc] initWithValueRef:global executor:self];

    exit:
    CHECK_COMMON(napi_close_handle_scope(self.env, handleScope))

    return strongValue;
}

- (nullable HMBaseValue *)evaluateScript:(nullable NSString *)script withSourceURL:(nullable NSURL *)sourceURL {
    HMAssertMainQueue();
    NAPIHandleScope handleScope = nil;
    if (napi_open_handle_scope(self.env, &handleScope) != NAPIErrorOK) {
        NSAssert(NO, HANDLE_SCOPE_ERROR);

        return nil;
    }
    HMJSStrongValue *resultValue = nil;
    NAPIValue result;
    if ([self popExceptionWithStatus:NAPIRunScript(self.env, script.UTF8String, sourceURL.absoluteString.UTF8String, &result)]) {
        goto exit;
    }
    resultValue = [[HMJSStrongValue alloc] initWithValueRef:result executor:self];

    exit:
    CHECK_COMMON(napi_close_handle_scope(self.env, handleScope))

    return resultValue;
}

- (nullable HMBaseValue *)objectForKeyedSubscript:(id)key {
    HMAssertMainQueue();
    if (![key isKindOfClass:NSString.class]) {
        return nil;
    }

    return self.globalObject[key];
}

- (void)setObject:(id)object forKeyedSubscript:(id)key {
    HMAssertMainQueue();
    if (![key isKindOfClass:NSString.class]) {
        return;
    }

    self.globalObject[key] = object;
}

- (BOOL)valueIsNull:(HMBaseValue *)value {
    if (value.context != self || ![value isKindOfClass:HMJSStrongValue.class]) {
        return NO;
    }
    HMJSStrongValue *strongValue = (HMJSStrongValue *) value;

    return [self typeOfWithValueRef:strongValue.valueRef] == NAPINull;
}

- (BOOL)valueIsUndefined:(HMBaseValue *)value {
    if (value.context != self || ![value isKindOfClass:HMJSStrongValue.class]) {
        return NO;
    }
    HMJSStrongValue *strongValue = (HMJSStrongValue *) value;

    return [self typeOfWithValueRef:strongValue.valueRef] == NAPIUndefined;
}

- (BOOL)valueIsBoolean:(HMBaseValue *)value {
    if (value.context != self || ![value isKindOfClass:HMJSStrongValue.class]) {
        return NO;
    }
    HMJSStrongValue *strongValue = (HMJSStrongValue *) value;

    return [self typeOfWithValueRef:strongValue.valueRef] == NAPIBoolean;
}

- (BOOL)valueIsNumber:(HMBaseValue *)value {
    if (value.context != self || ![value isKindOfClass:HMJSStrongValue.class]) {
        return NO;
    }
    HMJSStrongValue *strongValue = (HMJSStrongValue *) value;

    return [self typeOfWithValueRef:strongValue.valueRef] == NAPINumber;
}

- (BOOL)valueIsString:(HMBaseValue *)value {
    if (value.context != self || ![value isKindOfClass:HMJSStrongValue.class]) {
        return NO;
    }
    HMJSStrongValue *strongValue = (HMJSStrongValue *) value;

    return [self typeOfWithValueRef:strongValue.valueRef] == NAPIString;
}

- (BOOL)valueIsObject:(HMBaseValue *)value {
    if (value.context != self || ![value isKindOfClass:HMJSStrongValue.class]) {
        return NO;
    }
    HMJSStrongValue *strongValue = (HMJSStrongValue *) value;
    NAPIValueType valueType = [self typeOfWithValueRef:strongValue.valueRef];

    return valueType == NAPIObject || valueType == NAPIFunction || valueType == NAPIExternal;
}

- (BOOL)valueIsArray:(HMBaseValue *)value {
    if (value.context != self || ![value isKindOfClass:HMJSStrongValue.class]) {
        return NO;
    }
    HMJSStrongValue *strongValue = (HMJSStrongValue *) value;

    return [self isArrayWithValueRef:strongValue.valueRef];
}

- (BOOL)valueIsDictionary:(HMBaseValue *)value {
    if (value.context != self || ![value isKindOfClass:HMJSStrongValue.class]) {
        return NO;
    }
    HMJSStrongValue *strongValue = (HMJSStrongValue *) value;

    return [self isDictionaryWithValueRef:strongValue.valueRef];
}

- (BOOL)valueIsNativeObject:(HMBaseValue *)value {
    if (value.context != self || ![value isKindOfClass:HMJSStrongValue.class]) {
        return NO;
    }
    HMJSStrongValue *strongValue = (HMJSStrongValue *) value;

    return [self isNativeObjectWithValueRef:strongValue.valueRef];
}

- (BOOL)valueIsFunction:(HMBaseValue *)value {
    if (value.context != self || ![value isKindOfClass:HMJSStrongValue.class]) {
        return NO;
    }
    HMJSStrongValue *strongValue = (HMJSStrongValue *) value;

    return [self isFunctionWithValueRef:strongValue.valueRef];
}

- (nullable HMBaseValue *)convertToValueWithObject:(id)object {
    HMAssertMainQueue();
    NAPIHandleScope handleScope;
    if (napi_open_handle_scope(self.env, &handleScope) != NAPIErrorOK) {
        NSAssert(NO, HANDLE_SCOPE_ERROR);

        return nil;
    }
    HMJSStrongValue *strongValue = [[HMJSStrongValue alloc] initWithValueRef:[self toValueRefWithObject:object] executor:self];
    CHECK_COMMON(napi_close_handle_scope(self.env, handleScope))

    return strongValue;
}

- (nullable HMBaseValue *)convertToValueWithNumber:(NSNumber *)number {
    HMAssertMainQueue();
    NAPIHandleScope handleScope;
    if (napi_open_handle_scope(self.env, &handleScope) != NAPIErrorOK) {
        NSAssert(NO, HANDLE_SCOPE_ERROR);

        return nil;
    }
    HMJSStrongValue *strongValue = [[HMJSStrongValue alloc] initWithValueRef:[self toValueRefWithNumber:number] executor:self];
    CHECK_COMMON(napi_close_handle_scope(self.env, handleScope))

    return strongValue;
}

- (nullable id)convertToObjectWithValue:(HMBaseValue *)value isPortableConvert:(BOOL)isPortableConvert {
    if (value.context != self || ![value isKindOfClass:HMJSStrongValue.class]) {
        return nil;
    }
    HMJSStrongValue *strongValue = (HMJSStrongValue *) value;

    return [self toObjectWithValueRef:strongValue.valueRef isPortableConvert:isPortableConvert];
}

- (nullable NSNumber *)convertToNumberWithValue:(HMBaseValue *)value isForce:(BOOL)isForce {
    if (value.context != self || ![value isKindOfClass:HMJSStrongValue.class]) {
        return nil;
    }
    HMJSStrongValue *strongValue = (HMJSStrongValue *) value;

    return [self toNumberWithValueRef:strongValue.valueRef isForce:isForce];
}

- (nullable NSString *)convertToStringWithValue:(HMBaseValue *)value isForce:(BOOL)isForce {
    if (value.context != self || ![value isKindOfClass:HMJSStrongValue.class]) {
        return nil;
    }
    HMJSStrongValue *strongValue = (HMJSStrongValue *) value;

    return [self toStringWithValueRef:strongValue.valueRef isForce:isForce];
}

- (nullable NSArray *)convertToArrayWithValue:(HMBaseValue *)value isPortableConvert:(BOOL)isPortableConvert {
    if (value.context != self || ![value isKindOfClass:HMJSStrongValue.class]) {
        return nil;
    }
    HMJSStrongValue *strongValue = (HMJSStrongValue *) value;

    return [self toArrayWithValueRef:strongValue.valueRef isPortableConvert:isPortableConvert];
}

- (nullable NSDictionary<NSString *, id> *)convertToDictionaryWithValue:(HMBaseValue *)value isPortableConvert:(BOOL)isPortableConvert {
    if (value.context != self || ![value isKindOfClass:HMJSStrongValue.class]) {
        return nil;
    }
    HMJSStrongValue *strongValue = (HMJSStrongValue *) value;

    return [self toDictionaryWithValueRef:strongValue.valueRef isPortableConvert:isPortableConvert];
}

- (nullable NSObject *)convertToNativeObjectWithValue:(HMBaseValue *)value {
    if (value.context != self || ![value isKindOfClass:HMJSStrongValue.class]) {
        return nil;
    }
    HMJSStrongValue *strongValue = (HMJSStrongValue *) value;

    return [self toNativeObjectWithValueRef:strongValue.valueRef];
}

- (nullable HMFunctionType)convertToFunctionWithValue:(HMBaseValue *)value {
    if (value.context != self || ![value isKindOfClass:HMJSStrongValue.class]) {
        return nil;
    }
    HMJSStrongValue *strongValue = (HMJSStrongValue *) value;

    return [self toFunctionWithValueRef:strongValue.valueRef];
}

- (BOOL)compareWithValue:(HMBaseValue *)value anotherValue:(HMBaseValue *)anotherValue {
    if (value.context != self || anotherValue.context != self || ![value isKindOfClass:HMJSStrongValue.class] || ![anotherValue isKindOfClass:HMJSStrongValue.class]) {
        return NO;
    }
    HMJSStrongValue *strongValue = (HMJSStrongValue *) value;
    HMJSStrongValue *anotherStrongValue = (HMJSStrongValue *) anotherValue;

    NAPIHandleScope handleScope;
    if (napi_open_handle_scope(self.env, &handleScope) != NAPIErrorOK) {
        NSAssert(NO, HANDLE_SCOPE_ERROR);

        return NO;
    }
    BOOL returnValue = NO;
    NAPIValue globalValue;
    if (napi_get_global(self.env, &globalValue) != NAPIErrorOK) {
        goto exit;
    }
    NAPIValue objectConstructorValue;
    if ([self popExceptionWithStatus:napi_get_named_property(self.env, globalValue, "Object", &objectConstructorValue)]) {
        goto exit;
    }
    NAPIValue isValue;
    if ([self popExceptionWithStatus:napi_get_named_property(self.env, objectConstructorValue, "is", &isValue)]) {
        goto exit;
    }
    NAPIValue isEqualValue;
    NAPIValue args[] = {
            strongValue.valueRef,
            anotherStrongValue.valueRef
    };
    if ([self popExceptionWithStatus:napi_call_function(self.env, objectConstructorValue, isValue, 2, args, &isEqualValue)]) {
        goto exit;
    }
    napi_get_value_bool(self.env, isEqualValue, &returnValue);

    exit:
    CHECK_COMMON(napi_close_handle_scope(self.env, handleScope))

    return returnValue;
}

- (nullable HMBaseValue *)callWithValue:(HMBaseValue *)value arguments:(NSArray *)arguments {
    if (value.context != self || ![value isKindOfClass:HMJSStrongValue.class]) {
        return nil;
    }
    HMJSStrongValue *strongValue = (HMJSStrongValue *) value;

    HMAssertMainQueue();
    NAPIHandleScope handleScope;
    if (napi_open_handle_scope(self.env, &handleScope) != NAPIErrorOK) {
        return nil;
    }
    HMJSStrongValue *returnValue = [[HMJSStrongValue alloc] initWithValueRef:[self callWithFunctionObject:strongValue.valueRef thisObject:nil argumentArray:arguments] executor:self];
    CHECK_COMMON(napi_close_handle_scope(self.env, handleScope))

    return returnValue;
}

- (nullable HMBaseValue *)invokeMethodWithValue:(HMBaseValue *)value method:(NSString *)method withArguments:(NSArray *)arguments {
    if (value.context != self || ![value isKindOfClass:HMJSStrongValue.class] || !method.UTF8String) {
        return nil;
    }
    HMJSStrongValue *strongValue = (HMJSStrongValue *) value;
    HMAssertMainQueue();
    NAPIHandleScope handleScope;
    if (napi_open_handle_scope(self.env, &handleScope) != NAPIErrorOK) {
        return nil;
    }
    HMJSStrongValue *returnValue = nil;
    NAPIValue methodValue;
    if ([self popExceptionWithStatus:napi_get_named_property(self.env, strongValue.valueRef, method.UTF8String, &methodValue)]) {
        goto exit;
    }
    returnValue = [[HMJSStrongValue alloc] initWithValueRef:[self callWithFunctionObject:methodValue thisObject:strongValue.valueRef argumentArray:arguments] executor:self];

    exit:
    CHECK_COMMON(napi_close_handle_scope(self.env, handleScope))

    return returnValue;
}

- (nullable HMBaseValue *)getWithValue:(HMBaseValue *)value propertyName:(NSString *)propertyName {
    if (value.context != self || ![value isKindOfClass:HMJSStrongValue.class] || !propertyName.UTF8String) {
        return nil;
    }
    HMJSStrongValue *strongValue = (HMJSStrongValue *) value;
    HMAssertMainQueue();
    NAPIHandleScope handleScope;
    if (napi_open_handle_scope(self.env, &handleScope) != NAPIErrorOK) {
        return nil;
    }
    HMJSStrongValue *returnValue = nil;
    NAPIValue propertyValue;
    if ([self popExceptionWithStatus:napi_get_named_property(self.env, strongValue.valueRef, propertyName.UTF8String, &propertyValue)]) {
        goto exit;
    }
    returnValue = [[HMJSStrongValue alloc] initWithValueRef:propertyValue executor:self];

    exit:
    CHECK_COMMON(napi_close_handle_scope(self.env, handleScope))

    return returnValue;
}

- (void)setWithValue:(HMBaseValue *)value propertyName:(NSString *)propertyName propertyObject:(id)propertyObject {
    if (value.context != self || ![value isKindOfClass:HMJSStrongValue.class] || !propertyName.UTF8String) {
        return;
    }
    HMJSStrongValue *strongValue = (HMJSStrongValue *) value;
    HMAssertMainQueue();
    NAPIHandleScope handleScope;
    if (napi_open_handle_scope(self.env, &handleScope) != NAPIErrorOK) {
        return;
    }
    NAPIValue propertyValue = [self toValueRefWithObject:propertyObject];
    if (!propertyValue) {
        CHECK_COMMON(napi_get_undefined(self.env, &propertyValue))
    }
    [self popExceptionWithStatus:napi_set_named_property(self.env, strongValue.valueRef, propertyName.UTF8String, propertyValue)];

    CHECK_COMMON(napi_close_handle_scope(self.env, handleScope))
}


- (void)addExceptionHandler:(HMExceptionHandler)handler key:(id)key {
    [self.exceptionHandlerMap setObject:handler forKey:key];
}

- (void)addConsoleHandler:(HMConsoleHandler)handler key:(id)key {
    [self.consoleHandlerMap setObject:handler forKey:key];
}

- (void)triggerExceptionHandler:(HMExceptionModel *)model {
    
    NSEnumerator *enumer = [self.exceptionHandlerMap objectEnumerator];
    HMExceptionHandler handler = [enumer nextObject];
    while (handler) {
        handler(model);
        handler = [enumer nextObject];
    }
}

- (void)triggerConsoleHandler:(NSString *)logString level:(HMLogLevel)logLevel {

    NSEnumerator *enumer = [self.consoleHandlerMap objectEnumerator];
    HMConsoleHandler handler = [enumer nextObject];
    while (handler) {
        handler(logString, logLevel);
        handler = [enumer nextObject];
    }
}
@end
