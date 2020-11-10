//
//  HMHermesExecutor.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/7/31.
//

// 注意！！！不要删掉 HMHermesCommon.h
#include <hermes/HermesCommon.h>

#import "HMHermesExecutor+Private.h"
#import "HMExceptionModel.h"
#import "HMHermesStrongValue.h"
#import "HMLogger.h"
#import "HMExportManager.h"
#import "HMExportClass.h"
#import "HMEncoding.h"
#import "NSInvocation+Hummer.h"
#import <objc/runtime.h>

extern "C" {
NSMethodSignature *_Nullable hm_extractMethodSignatureFromBlock(id block);
}

#import "HMHermesWeakValue.h"
#import "HMBaseExecutor.h"
#include <hermes/VM/Runtime.h>
#include <hermes/VM/HostModel.h>
#include <hermes/VM/JSArray.h>
#include <hermes/BCGen/HBC/BytecodeProviderFromSrc.h>
#include <hermes/VM/SlotAcceptor.h>
#import <Hummer/HMJSObject.h>
#import "NSObject+Hummer.h"
#include <llvm/Support/ConvertUTF.h>

#include "MessageQueueThread.h"
#include <hermes/hermes.h>
#include <jsi/decorator.h>

#ifdef HERMES_ENABLE_DEBUGGER

#include <hermes/inspector/RuntimeAdapter.h>
#include <hermes/inspector/chrome/Registration.h>

#endif

#import "RCTMessageThread.h"
#import "RCTInspectorPackagerConnection.h"

namespace facebook {
    namespace react {

#ifdef HERMES_ENABLE_DEBUGGER

        class HermesExecutorRuntimeAdapter
                : public facebook::hermes::inspector::RuntimeAdapter {
        public:
            HermesExecutorRuntimeAdapter(
                    std::shared_ptr<facebook::jsi::Runtime> runtime,
                    facebook::hermes::HermesRuntime &hermesRuntime,
                    std::shared_ptr<MessageQueueThread> thread)
                    : runtime_(runtime),
                      hermesRuntime_(hermesRuntime),
                      thread_(std::move(thread)) {
            }

            virtual ~HermesExecutorRuntimeAdapter() = default;

            jsi::Runtime &getRuntime() override {
                return *runtime_;
            }

            facebook::hermes::debugger::Debugger &getDebugger() override {
                return hermesRuntime_.getDebugger();
            }

            void tickleJs() override {
                // The queue will ensure that runtime_ is still valid when this
                // gets invoked.
                thread_->runOnQueue([&runtime = runtime_]() {
                    auto func =
                            runtime->global().getPropertyAsFunction(*runtime, "__tickleJs");
                    func.call(*runtime);
                });
            }

        private:
            std::shared_ptr<facebook::jsi::Runtime> runtime_;
            facebook::hermes::HermesRuntime &hermesRuntime_;

            std::shared_ptr<MessageQueueThread> thread_;
        };

#endif


        struct ReentrancyCheck {
            // This is effectively a very subtle and complex assert, so only
            // include it in builds which would include asserts.
#ifndef NDEBUG

            ReentrancyCheck() : tid(std::thread::id()), depth(0) {
            }

            void before() {
                std::thread::id this_id = std::this_thread::get_id();
                std::thread::id expected = std::thread::id();

                // A note on memory ordering: the main purpose of these checks is
                // to observe a before/before race, without an intervening after.
                // This will be detected by the compare_exchange_strong atomicity
                // properties, regardless of memory order.
                //
                // For everything else, it is easiest to think of 'depth' as a
                // proxy for any access made inside the VM.  If access to depth
                // are reordered incorrectly, the same could be true of any other
                // operation made by the VM.  In fact, using acquire/release
                // memory ordering could create barriers which mask a programmer
                // error.  So, we use relaxed memory order, to avoid masking
                // actual ordering errors.  Although, in practice, ordering errors
                // of this sort would be surprising, because the decorator would
                // need to call after() without before().

                if (tid.compare_exchange_strong(
                        expected, this_id, std::memory_order_relaxed)) {
                    // Returns true if tid and expected were the same.  If they
                    // were, then the stored tid referred to no thread, and we
                    // atomically saved this thread's tid.  Now increment depth.
                    assert(depth == 0 && "No thread id, but depth != 0");
                    ++depth;
                } else if (expected == this_id) {
                    // If the stored tid referred to a thread, expected was set to
                    // that value.  If that value is this thread's tid, that's ok,
                    // just increment depth again.
                    assert(depth != 0 && "Thread id was set, but depth == 0");
                    ++depth;
                } else {
                    // The stored tid was some other thread.  This indicates a bad
                    // programmer error, where VM methods were called on two
                    // different threads unsafely.  Fail fast (and hard) so the
                    // crash can be analyzed.
                    __builtin_trap();
                }
            }

            void after() {
                assert(
                        tid.load(std::memory_order_relaxed) == std::this_thread::get_id() &&
                                "No thread id in after()");
                if (--depth == 0) {
                    // If we decremented depth to zero, store no-thread into tid.
                    std::thread::id expected = std::this_thread::get_id();
                    bool didWrite = tid.compare_exchange_strong(
                            expected, std::thread::id(), std::memory_order_relaxed);
                    assert(didWrite && "Decremented to zero, but no tid write");
                }
            }

            std::atomic<std::thread::id> tid;
            // This is not atomic, as it is only written or read from the owning
            // thread.
            unsigned int depth;
#endif
        };


// This adds ReentrancyCheck and debugger enable/teardown to the given
// Runtime.
        class DecoratedRuntime : public jsi::WithRuntimeDecorator<ReentrancyCheck> {
        public:
            // The first argument may be another decorater which itself
            // decorates the real HermesRuntime, depending on the build config.
            // The second argument is the real HermesRuntime as well to
            // manage the debugger registration.
            DecoratedRuntime(
                    std::unique_ptr<Runtime> runtime,
                    facebook::hermes::HermesRuntime &hermesRuntime)
                    : jsi::WithRuntimeDecorator<ReentrancyCheck>(*runtime, reentrancyCheck_),
                      runtime_(std::move(runtime)),
                      hermesRuntime_(hermesRuntime) {
            }

            ~DecoratedRuntime() {
#ifdef HERMES_ENABLE_DEBUGGER
                facebook::hermes::inspector::chrome::disableDebugging(hermesRuntime_);
#endif
            }

            void enableDebugger(std::shared_ptr<MessageQueueThread> jsQueue, const char *title) {
#ifdef HERMES_ENABLE_DEBUGGER
                auto adapter = std::make_unique<HermesExecutorRuntimeAdapter>(
                        runtime_, hermesRuntime_, jsQueue);
                facebook::hermes::inspector::chrome::enableDebugging(
                        std::move(adapter), title);
#endif
            }

        private:
            // runtime_ is a potentially decorated Runtime.
            // hermesRuntime is a reference to a HermesRuntime managed by runtime_.
            //
            // HermesExecutorRuntimeAdapter requirements are kept, because the
            // dtor will disable debugging on the HermesRuntime before the
            // member managing it is destroyed.

            std::shared_ptr<Runtime> runtime_;
            ReentrancyCheck reentrancyCheck_;
            facebook::hermes::HermesRuntime &hermesRuntime_;
        };

    }
}

hermes::vm::CallResult<hermes::vm::HermesValue> hummerCall(void *context, hermes::vm::Runtime *runtime, hermes::vm::NativeArgs args);

hermes::vm::CallResult<hermes::vm::HermesValue> hummerCreate(void *context, hermes::vm::Runtime *runtime, hermes::vm::NativeArgs args);

hermes::vm::CallResult<hermes::vm::HermesValue> hummerCallClosure(void *context, hermes::vm::Runtime *runtime, hermes::vm::NativeArgs args);

hermes::vm::CallResult<hermes::vm::HermesValue> hummerGetProperty(void *context, hermes::vm::Runtime *runtime, hermes::vm::NativeArgs args);

hermes::vm::CallResult<hermes::vm::HermesValue> hummerSetProperty(void *context, hermes::vm::Runtime *runtime, hermes::vm::NativeArgs args);

namespace didi {

    static void convertUtf8ToUtf16(const uint8_t *utf8, size_t length, std::u16string &out) {
        // length is the number of input bytes
        out.resize(length);
        const llvm::UTF8 *sourceStart = utf8;
        const llvm::UTF8 *sourceEnd = sourceStart + length;
        llvm::UTF16 *targetStart = (llvm::UTF16 *) &out[0];
        llvm::UTF16 *targetEnd = targetStart + out.size();
        llvm::ConversionResult cRes;
        cRes = ConvertUTF8toUTF16(
                &sourceStart,
                sourceEnd,
                &targetStart,
                targetEnd,
                llvm::lenientConversion);
        (void) cRes;
        assert(
                cRes != llvm::ConversionResult::targetExhausted &&
                        "not enough space allocated for UTF16 conversion");
        out.resize((char16_t *) targetStart - &out[0]);
    }

    class HermesObject : public hermes::vm::HostObjectProxy {

        void *pointer_ = nullptr;

        HermesObject(void *pointer) : pointer_(pointer) {
            if (pointer) {
                HMLogDebug(HUMMER_CREATE_TEMPLATE, ((__bridge NSObject *) pointer).class);
                CFRetain(pointer);
            } else {
                HMLogError(HUMMER_OPAQUE_POINTER_IS_NULL);
            }
        }

    public:
        void *getPointer() const {
            return pointer_;
        }

        virtual ~HermesObject() override {
            if (pointer_) {
                [((__bridge id) pointer_) setHm_value:nil];
                HMLogDebug(HUMMER_DESTROY_TEMPLATE, [((__bridge id) pointer_) class]);
                CFRelease(pointer_);
            } else {
                HMLogError(HUMMER_OPAQUE_POINTER_IS_NULL);
            }
        }

        virtual hermes::vm::CallResult<hermes::vm::HermesValue> get(hermes::vm::SymbolID symbolId) override {
            return hermes::vm::CallResult<hermes::vm::HermesValue>(hermes::vm::Runtime::getUndefinedValue().get());
        }

        virtual hermes::vm::CallResult<bool> set(hermes::vm::SymbolID symbolId, hermes::vm::HermesValue value) override {
            return hermes::vm::CallResult<bool>(false);
        }

        virtual hermes::vm::CallResult<hermes::vm::Handle<hermes::vm::JSArray>> getHostPropertyNames() override {
            return hermes::vm::CallResult<hermes::vm::Handle<hermes::vm::JSArray>>(hermes::vm::Runtime::makeNullHandle<hermes::vm::JSArray>());
        }

        /**
         * 拷贝构造函数
         */
        HermesObject(const HermesObject &) = delete;

        /**
         * 移动构造函数 C++ 11 后提供
         */
        HermesObject(HermesObject &&) = delete;

        /**
         * 拷贝赋值函数
         *
         * @return HermesObject
         */
        HermesObject &operator=(const HermesObject &) = delete;

        /**
         * 移动赋值函数 C++ 11 后提供
         *
         * @return HermesObject
         */
        HermesObject &operator=(HermesObject &&) = delete;

        static std::shared_ptr<HermesObject> create(void *pointer) {
            // 私有构造函数不能用 std::make_shared
            return std::shared_ptr<HermesObject>(new HermesObject(pointer));
        }
    };
}

NS_ASSUME_NONNULL_BEGIN

static NSMutableDictionary<NSString *, RCTInspectorPackagerConnection *> *_Nullable socketConnections = nil;

/**
 * 所有 valueRef 方法都必须在调用前保证 Handle 持有
 */
@interface HMHermesExecutor ()

@property (nonatomic, assign) hermes::vm::Runtime *runtime;

@property (nonatomic, assign) std::shared_ptr<facebook::react::DecoratedRuntime> decoratedRuntime;

@property (nonatomic, assign) std::shared_ptr<facebook::react::RCTMessageThread> jsThread;

@property (nonatomic, nullable, copy) NSHashTable<HMHermesStrongValue *> *strongValueSet;

@property (nonatomic, nullable, copy) NSHashTable<HMHermesWeakValue *> *weakValueSet;

#pragma mark - 注入方法帮助方法

- (void)hummerExtractExportWithFunctionPropertyName:(nullable NSString *)functionPropertyName objectRef:(const hermes::vm::HermesValue &)objectRef target:(id _Nullable *)target selector:(SEL _Nullable *)selector methodSignature:(NSMethodSignature *_Nullable *)methodSignature isSetter:(BOOL)isSetter jsClassName:(nullable NSString *)jsClassName;

- (hermes::vm::HermesValue)hummerCallNativeWithNativeArgumentArray:(const hermes::vm::NativeArgs &)args target:(nullable id)target selector:(nullable SEL)selector methodSignature:(nullable NSMethodSignature *)methodSignature;

- (hermes::vm::HermesValue)hummerGetSetPropertyWithNativeArgumentArray:(const hermes::vm::NativeArgs &)args isSetter:(BOOL)isSetter;

// CallResult 有断言，不能获取 Optional 可选值，所以需要 BOOL 返回值判断
- (BOOL)checkStatus:(hermes::vm::ExecutionStatus)status;

#pragma mark - JS -> Native

/**
 * 包括闭包转换
 * @param valueRef js引用
 * @return oc 对象
 */
- (nullable NSDictionary<NSString *, id> *)convertValueRefToDictionary:(const hermes::vm::HermesValue &)valueRef isPortableConvert:(BOOL)isPortableConvert;

- (nullable NSArray *)convertValueRefToArray:(const hermes::vm::HermesValue &)valueRef isPortableConvert:(BOOL)isPortableConvert;

- (nullable HMClosureType)convertValueRefToClosure:(const hermes::vm::HermesValue &)valueRef;

- (nullable NSString *)convertValueRefToString:(const hermes::vm::HermesValue &)value copyBytes:(BOOL)copyBytes;

- (nullable NSNumber *)convertValueRefToNumber:(const hermes::vm::HermesValue &)valueRef;

- (nullable NSObject *)convertValueRefToNativeObject:(const hermes::vm::HermesValue &)valueRef;

- (nullable id)convertValueRefToObject:(const hermes::vm::HermesValue &)hermesValue isPortableConvert:(BOOL)isPortableConvert;

#pragma mark - Native -> JS

/**
 * 包括闭包转换
 * @param object 对象
 * @return JS 值
 */
- (hermes::vm::HermesValue)convertObjectToValueRef:(nullable id)object;

- (hermes::vm::HermesValue)convertNativeObjectToValueRef:(nullable NSObject *)object;

- (hermes::vm::HermesValue)convertArrayToValueRef:(nullable NSArray *)array;

- (hermes::vm::HermesValue)convertClosureToValueRef:(nullable id)closure;

- (hermes::vm::HermesValue)convertDictionaryToValueRef:(nullable NSDictionary<NSString *, id> *)dictionary;

- (hermes::vm::HermesValue)convertNumberToValueRef:(nullable NSNumber *)number;

- (hermes::vm::HermesValue)convertStringToValueRef:(nullable NSString *)stringValue;

#pragma mark - JS 类型判断

- (BOOL)valueRefIsNativeObject:(const hermes::vm::HermesValue &)valueRef;

- (BOOL)valueRefIsClosure:(const hermes::vm::HermesValue &)valueRef;

- (BOOL)valueRefIsDictionary:(const hermes::vm::HermesValue &)valueRef;

@end

NS_ASSUME_NONNULL_END

hermes::vm::CallResult<hermes::vm::HermesValue> hummerCall(void *context, hermes::vm::Runtime *runtime, hermes::vm::NativeArgs args) {
    // args 内部存储 PinnedHermesValue 代表会自动更新指针
    // 栈帧外自带 gcScope
    // 不计算 this 指针，因为 this 指针必定存在
//    if (!runtime->getTopGCScope()) {
//        NSAssert(runtime->getTopGCScope(), @"没有 top GCScope");
//
//        return hermes::vm::Runtime::getUndefinedValue().get();
//    }
    if (args.getArgCount() < 2) {
        HMLogError(HUMMER_CALL_PARAMETER_ERROR);

        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    BOOL isClass = args.getArg(0).isString();
    if (!isClass && args.getArgCount() < 3) {
        HMLogError(HUMMER_CALL_PARAMETER_ERROR);

        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    HMHermesExecutor *hermesExecutor = static_cast<HMHermesExecutor *>([hm_executorMap objectForKey:[NSValue valueWithPointer:runtime]]);
    // 不需要 copyBytes，因为只是内部使用
    NSString *className = [hermesExecutor convertValueRefToString:args.getArg(isClass ? 0 : 1) copyBytes:NO];
    NSString *functionName = [hermesExecutor convertValueRefToString:args.getArg(isClass ? 1 : 2) copyBytes:NO];

    id target = nil;
    SEL selector = nil;
    NSMethodSignature *methodSignature = nil;

    [hermesExecutor hummerExtractExportWithFunctionPropertyName:functionName objectRef:args.getArg(0) target:&target selector:&selector methodSignature:&methodSignature isSetter:NO jsClassName:className];

    return [hermesExecutor hummerCallNativeWithNativeArgumentArray:args target:target selector:selector methodSignature:methodSignature];
}

hermes::vm::CallResult<hermes::vm::HermesValue> hummerCreate(void *context, hermes::vm::Runtime *runtime, hermes::vm::NativeArgs args) {
    if (args.getArgCount() < 2) {
        HMLogError(HUMMER_CREATE_ERROR);

        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    HMHermesExecutor *hermesExecutor = static_cast<HMHermesExecutor *>([hm_executorMap objectForKey:[NSValue valueWithPointer:runtime]]);
    NSString *className = [hermesExecutor convertValueRefToString:args.getArg(0) copyBytes:NO];
    if (className.length == 0) {
        HMLogError(HUMMER_CREATE_ERROR);

        return hermes::vm::Runtime::getUndefinedValue().get();
    }

    HMExportClass *exportClass = HMExportManager.sharedInstance.jsClasses[className];
    NSString *objcClassName = exportClass.className;
    if (objcClassName.length == 0) {
        HMLogError(HUMMER_CREATE_CLASS_NOT_FOUND, className);

        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    Class clazz = NSClassFromString(objcClassName);
    if (!clazz) {
        HMLogError(HUMMER_CREATE_CLASS_NOT_FOUND, className);

        return hermes::vm::Runtime::getUndefinedValue().get();
    }

    NSObject *opaquePointer = NULL;
    NSMutableArray<HMBaseValue *> *argumentArray = nil;
    /**
     * arg1 className
     * arg2 jsobjet
     */
    for (int i = 2; i < args.getArgCount(); ++i) {
        HMBaseValue *value = [[HMHermesStrongValue alloc] initWithHermesValue:args.getArg(static_cast<unsigned int>(i)) executor:hermesExecutor];
        if (!argumentArray) {
            argumentArray = [NSMutableArray arrayWithCapacity:args.getArgCount() - 2];
        }
        [argumentArray addObject:value];
    }
    hm_currentExecutor = hermesExecutor;
    if ([clazz conformsToProtocol:@protocol(HMJSObject)]) {
        opaquePointer = (id) [(id) [clazz alloc] initWithHMValues:argumentArray.copy];
    } else {
        // 增加 hm_otherArguments 赋值
        hm_otherArguments = argumentArray.copy;
        opaquePointer = [[clazz alloc] init];
    }
    hm_currentExecutor = nil;
    hm_otherArguments = nil;
    if (!opaquePointer) {
        HMLogError(HUMMER_CAN_NOT_CREATE_NATIVE_OBJECT, className);

        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    opaquePointer.hm_value = [[HMHermesWeakValue alloc] initWithHermesValue:args.getArg(1) executor:hermesExecutor];

    return hermes::vm::HostObject::createWithoutPrototype(runtime, didi::HermesObject::create((__bridge void *) opaquePointer));
}

hermes::vm::CallResult<hermes::vm::HermesValue> hummerCallClosure(void *context, hermes::vm::Runtime *runtime, hermes::vm::NativeArgs args) {
    if (args.getArgCount() == 0) {
        HMLogError(HUMMER_CALL_CLOSURE_MUST_HAVE_PARAMETER);

        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    if (!args.getArg(0).isObject()) {
        HMLogError(HUMMER_FIRST_PARAMETER_NOT_NATIVE_CLOSURE);

        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    auto hostObjectPointer = hermes::vm::dyn_vmcast_or_null<hermes::vm::HostObject>(args.getArg(0));
    if (!hostObjectPointer) {
        HMLogError(HUMMER_FIRST_PARAMETER_NOT_NATIVE_CLOSURE);

        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    auto hermesObject = std::static_pointer_cast<didi::HermesObject>(hostObjectPointer->getProxy());

    if ([((__bridge id) hermesObject->getPointer()) isKindOfClass:NSClassFromString(@"NSBlock")]) {
        HMLogError(HUMMER_FIRST_PARAMETER_NOT_NATIVE_CLOSURE);

        return hermes::vm::Runtime::getUndefinedValue().get();
    }

    HMHermesExecutor *hermesExecutor = static_cast<HMHermesExecutor *>([hm_executorMap objectForKey:[NSValue valueWithPointer:runtime]]);
    if (!hermesExecutor) {
        HMLogError(HUMMER_EXECUTOR_NOT_FOUND);

        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    NSMutableArray<HMBaseValue *> *mutableArgumentArray = nil;
    for (int i = 1; i < args.getArgCount(); ++i) {
        HMBaseValue *jsValue = [[HMHermesStrongValue alloc] initWithHermesValue:args.getArg(static_cast<unsigned int>(i)) executor:hermesExecutor];
        if (!mutableArgumentArray) {
            mutableArgumentArray = [NSMutableArray arrayWithCapacity:args.getArgCount() - 1];
        }
        [mutableArgumentArray addObject:jsValue];
    }
    HMClosureType closure = (__bridge HMClosureType) hermesObject->getPointer();
    NSMethodSignature *methodSignature = hm_extractMethodSignatureFromBlock(closure);
    id returnObject = nil;
    if (*methodSignature.methodReturnType == '@') {
        returnObject = closure(mutableArgumentArray.copy);
    } else {
        // TODO: 补充支持其他类型
        closure(mutableArgumentArray.copy);
    }
    if (!returnObject) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }

    auto returnValue = [hermesExecutor convertObjectToValueRef:returnObject];
    // 兜底处理 nullable
    if (returnValue.getRaw() == 0) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }

    return returnValue;
}

hermes::vm::CallResult<hermes::vm::HermesValue> hummerGetProperty(void *context, hermes::vm::Runtime *runtime, hermes::vm::NativeArgs args) {
    HMHermesExecutor *executor = static_cast<HMHermesExecutor *>([hm_executorMap objectForKey:[NSValue valueWithPointer:runtime]]);
    if (!executor) {
        HMLogError(HUMMER_EXECUTOR_NOT_FOUND);

        return hermes::vm::Runtime::getUndefinedValue().get();
    }

    return [executor hummerGetSetPropertyWithNativeArgumentArray:args isSetter:NO];
}

hermes::vm::CallResult<hermes::vm::HermesValue> hummerSetProperty(void *context, hermes::vm::Runtime *runtime, hermes::vm::NativeArgs args) {
    HMHermesExecutor *executor = static_cast<HMHermesExecutor *>([hm_executorMap objectForKey:[NSValue valueWithPointer:runtime]]);
    if (!executor) {
        HMLogError(HUMMER_EXECUTOR_NOT_FOUND);

        return hermes::vm::Runtime::getUndefinedValue().get();
    }

    return [executor hummerGetSetPropertyWithNativeArgumentArray:args isSetter:YES];
}

@implementation HMHermesExecutor

- (instancetype)init {
    self = [super init];

    // 5 MB 初始堆大小，最大 512 MB
    std::unique_ptr<facebook::hermes::HermesRuntime> hermesRuntime = facebook::hermes::makeHermesRuntime(hermes::vm::RuntimeConfig().rebuild().withGCConfig(hermes::vm::GCConfig().rebuild().withInitHeapSize(5 * (
            2 << 20)).build()).build());
    facebook::hermes::HermesRuntime &hermesRuntimeRef = *hermesRuntime;

    _decoratedRuntime = std::make_shared<facebook::react::DecoratedRuntime>(std::move(hermesRuntime), hermesRuntimeRef);
    NSString *escapedDeviceName = [[[UIDevice currentDevice] name]
            stringByAddingPercentEncodingWithAllowedCharacters:NSCharacterSet.URLQueryAllowedCharacterSet];
    NSString *escapedAppName = [[[NSBundle mainBundle] bundleIdentifier]
            stringByAddingPercentEncodingWithAllowedCharacters:NSCharacterSet.URLQueryAllowedCharacterSet];
    NSURL *inspectorURL = [NSURL URLWithString:[NSString stringWithFormat:@"ws://localhost:8081/inspector/device?name=%@&app=%@",
                                                                          escapedDeviceName,
                                                                          escapedAppName]];

    if (socketConnections == nil) {
        socketConnections = [NSMutableDictionary new];
    }
    NSString *key = [inspectorURL absoluteString];
    RCTInspectorPackagerConnection *connection = socketConnections[key];
    if (!connection || !connection.isConnected) {
        connection = [[RCTInspectorPackagerConnection alloc] initWithURL:inspectorURL];
        socketConnections[key] = connection;
        [connection connect];
    }
    _runtime = facebook::hermes::HermesRuntime::getHermesRuntimeFromJSI(&hermesRuntimeRef);

    if (!hm_executorMap) {
        hm_executorMap = NSMapTable.strongToWeakObjectsMapTable;
    }
    [hm_executorMap setObject:self forKey:[NSValue valueWithPointer:_runtime]];

    // Objective-C 对象通过 C++ lambda 值引用会正确处理 ARC，但是出于谨慎，这里使用了 weak 指针
    __weak typeof(self) weakSelf = self;
    _runtime->addCustomRootsFunction([weakSelf](hermes::vm::GC *, hermes::vm::SlotAcceptor &acceptor) -> void {
        NSEnumerator<HMHermesStrongValue *> *enumerator = weakSelf.strongValueSet.objectEnumerator;
        HMHermesStrongValue *value = nil;
        while ((value = enumerator.nextObject)) {
            acceptor.accept(const_cast<hermes::vm::PinnedHermesValue &>(value->_pinnedHermesValue));
        }
    });
    _runtime->addCustomWeakRootsFunction([weakSelf](hermes::vm::GC *, hermes::vm::WeakRefAcceptor &acceptor) -> void {
        NSEnumerator<HMHermesWeakValue *> *enumerator = weakSelf.weakValueSet.objectEnumerator;
        HMHermesWeakValue *value = nil;
        while ((value = enumerator.nextObject)) {
            acceptor.accept(const_cast<hermes::vm::WeakRef<hermes::vm::HermesValue> &>(*(value->_hermesValueWeakRef.get())));
        }
    });

    {
        hermes::vm::GCScope gcScope(_runtime);

        auto hummerCallStringRes = hermes::vm::StringPrimitive::createEfficient(_runtime, hermes::vm::createASCIIRef("hummerCall"));
        if ([self checkStatus:hummerCallStringRes.getStatus()]) {
            auto symbolRes = hermes::vm::stringToSymbolID(_runtime, hermes::vm::createPseudoHandle(hummerCallStringRes.getValue().getString()));
            if ([self checkStatus:symbolRes.getStatus()]) {
                auto putRes = hermes::vm::JSObject::putNamed_RJS(_runtime->getGlobal(), _runtime, symbolRes.getValue().get(), hermes::vm::NativeFunction::createWithoutPrototype(_runtime, nullptr, &hummerCall, symbolRes.getValue().get(), 2));
                // 结果也需要检查
                [self checkStatus:putRes.getStatus()];
            }
        }
    }
    {
        hermes::vm::GCScope gcScope(_runtime);

        auto hummerCreateStringRes = hermes::vm::StringPrimitive::createEfficient(_runtime, hermes::vm::createASCIIRef("hummerCreate"));
        if ([self checkStatus:hummerCreateStringRes.getStatus()]) {
            auto symbolRes = hermes::vm::stringToSymbolID(_runtime, hermes::vm::createPseudoHandle(hummerCreateStringRes.getValue().getString()));
            if ([self checkStatus:symbolRes.getStatus()]) {
                auto putRes = hermes::vm::JSObject::putNamed_RJS(_runtime->getGlobal(), _runtime, symbolRes.getValue().get(), hermes::vm::NativeFunction::createWithoutPrototype(_runtime, nullptr, &hummerCreate, symbolRes.getValue().get(), 2));
                [self checkStatus:putRes.getStatus()];
            }
        }
    }

    {
        hermes::vm::GCScope gcScope(_runtime);

        auto hummerCallClosureStringRes = hermes::vm::StringPrimitive::createEfficient(_runtime, hermes::vm::createASCIIRef("hummerCallClosure"));
        if ([self checkStatus:hummerCallClosureStringRes.getStatus()]) {
            auto symbolRes = hermes::vm::stringToSymbolID(_runtime, hermes::vm::createPseudoHandle(hummerCallClosureStringRes.getValue().getString()));
            if ([self checkStatus:symbolRes.getStatus()]) {
                auto putRes = hermes::vm::JSObject::putNamed_RJS(_runtime->getGlobal(), _runtime, symbolRes.getValue().get(), hermes::vm::NativeFunction::createWithoutPrototype(_runtime, nullptr, &hummerCallClosure, symbolRes.getValue().get(), 1));
                [self checkStatus:putRes.getStatus()];
            }
        }
    }

    {
        hermes::vm::GCScope gcScope(_runtime);

        auto hummerGetPropertyStringRes = hermes::vm::StringPrimitive::createEfficient(_runtime, hermes::vm::createASCIIRef("hummerGetProperty"));
        if ([self checkStatus:hummerGetPropertyStringRes.getStatus()]) {
            auto symbolRes = hermes::vm::stringToSymbolID(_runtime, hermes::vm::createPseudoHandle(hummerGetPropertyStringRes.getValue().getString()));
            if ([self checkStatus:symbolRes.getStatus()]) {
                auto putRes = hermes::vm::JSObject::putNamed_RJS(_runtime->getGlobal(), _runtime, symbolRes.getValue().get(), hermes::vm::NativeFunction::createWithoutPrototype(_runtime, nullptr, &hummerGetProperty, symbolRes.getValue().get(), 2));
                [self checkStatus:putRes.getStatus()];
            }
        }
    }

    {
        hermes::vm::GCScope gcScope(_runtime);

        auto hummerSetPropertyStringRes = hermes::vm::StringPrimitive::createEfficient(_runtime, hermes::vm::createASCIIRef("hummerSetProperty"));
        if ([self checkStatus:hummerSetPropertyStringRes.getStatus()]) {
            auto symbolRes = hermes::vm::stringToSymbolID(_runtime, hermes::vm::createPseudoHandle(hummerSetPropertyStringRes.getValue().getString()));
            if ([self checkStatus:symbolRes.getStatus()]) {
                auto putRes = hermes::vm::JSObject::putNamed_RJS(_runtime->getGlobal(), _runtime, symbolRes.getValue().get(), hermes::vm::NativeFunction::createWithoutPrototype(_runtime, nullptr, &hummerSetProperty, symbolRes.getValue().get(), 3));
                [self checkStatus:putRes.getStatus()];
            }
        }
    }

    return self;
}

- (void)hummerExtractExportWithFunctionPropertyName:(nullable NSString *)functionPropertyName objectRef:(const hermes::vm::HermesValue &)objectRef target:(id _Nullable *)target selector:(SEL _Nullable *)selector methodSignature:(NSMethodSignature *_Nullable *)methodSignature isSetter:(BOOL)isSetter jsClassName:(nullable NSString *)jsClassName {
    if (!target || !selector || !methodSignature || functionPropertyName.length == 0 || jsClassName.length == 0) {
        return;
    }
    HMExportBaseClass *exportBaseClass = nil;
    HMExportClass *exportClass = HMExportManager.sharedInstance.jsClasses[jsClassName];
    auto hostObject = hermes::vm::dyn_vmcast_or_null<hermes::vm::HostObject>(objectRef);
    if (!hostObject) {
        // Class
        if (exportClass.className.length == 0) {
            return;
        }
        *target = NSClassFromString(exportClass.className);
        exportBaseClass = [exportClass methodOrPropertyWithName:functionPropertyName isClass:YES];
    } else {
        // HostObject -> HermesObject -> Pointer
        void *pointer = std::static_pointer_cast<didi::HermesObject>(hostObject->getProxy())->getPointer();
        if (!pointer || ![((__bridge NSObject *) pointer) isKindOfClass:NSObject.class]) {
            return;
        }
        NSObject *nativeObject = (__bridge NSObject *) (pointer);
        *target = nativeObject;
        exportBaseClass = [exportClass methodOrPropertyWithName:functionPropertyName isClass:NO];
    }

    if ([exportBaseClass isKindOfClass:HMExportMethod.class]) {
        // 方法
        HMExportMethod *exportMethod = (HMExportMethod *) exportBaseClass;
        *selector = exportMethod.selector;
        *methodSignature = !hostObject ? [*target methodSignatureForSelector:exportMethod.selector] : [[*target class] instanceMethodSignatureForSelector:exportMethod.selector];
    } else {
        // 属性
        // isSetter 只有属性才生效
        HMExportProperty *exportProperty = (HMExportProperty *) exportBaseClass;
        *selector = isSetter ? exportProperty.propertySetterSelector : exportProperty.propertyGetterSelector;
        *methodSignature = !hostObject ? [*target methodSignatureForSelector:*selector] : [[*target class] instanceMethodSignatureForSelector:*selector];
    }
}

- (hermes::vm::HermesValue)hummerCallNativeWithNativeArgumentArray:(const hermes::vm::NativeArgs &)args target:(nullable id)target selector:(nullable SEL)selector methodSignature:(nullable NSMethodSignature *)methodSignature {
    if (!target) {
        HMLogError(HUMMER_CALL_NATIVE_TARGET_ERROR);

        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    if (!selector) {
        HMLogError(HUMMER_CALL_NATIVE_SELECTOR_ERROR);

        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    if (!methodSignature) {
        HMLogError(HUMMER_CALL_NATIVE_METHOD_SIGNATURE_ERROR);

        return hermes::vm::Runtime::getUndefinedValue().get();
    }

    BOOL isClass = object_isClass(target);

    // 额外参数
    NSMutableArray<HMBaseValue *> *otherArguments = nil;
    hm_currentExecutor = self;
    // 也许可以增加判断防止类型转换溢出
    for (NSUInteger i = methodSignature.numberOfArguments + (isClass ? 0 : 1); i < args.getArgCount(); ++i) {
        // 多余的转数组
        HMBaseValue *hummerValue = [[HMHermesStrongValue alloc] initWithHermesValue:args.getArg(static_cast<unsigned int>(i)) executor:hm_currentExecutor];
        if (!otherArguments) {
            otherArguments = [NSMutableArray arrayWithCapacity:args.getArgCount() - methodSignature.numberOfArguments];
        }
        [otherArguments addObject:hummerValue];
    }
    hm_otherArguments = otherArguments.copy;

    NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:methodSignature];
    invocation.target = target;
    invocation.selector = selector;
    // 后续做循环，都是临时变量，如果不做 retain，会导致野指针
    [invocation retainArguments];

    // 参数
    for (NSUInteger i = 2; i < MIN(methodSignature.numberOfArguments, args.getArgCount() - (isClass ? 0 : 1)); ++i) {
        const char *objCType = [methodSignature getArgumentTypeAtIndex:i];
        HMEncodingType type = HMEncodingGetType(objCType);
        id param = nil;
        if (type == HMEncodingTypeBlock) {
            // Block
            auto innerHermesValue = args.getArg(static_cast<unsigned int>(i + (isClass ? 0 : 1)));
            param = [(HMHermesExecutor *) hm_currentExecutor convertValueRefToClosure:innerHermesValue];
        } else if (type == HMEncodingTypeObject) {
            // HMJSCValue
            param = [[HMHermesStrongValue alloc] initWithHermesValue:args.getArg(static_cast<unsigned int>(i + (isClass ? 0 : 1))) executor:hm_currentExecutor];
        } else if (HMEncodingTypeIsCNumber(type)) {
            auto innerHermesValue = args.getArg(static_cast<unsigned int>(i + (isClass ? 0 : 1)));
            param = [(HMHermesExecutor *) hm_currentExecutor convertValueRefToNumber:innerHermesValue];
        } else {
            HMLogError(HUMMER_UN_SUPPORT_TYPE_TEMPLATE, objCType);
        }
        [invocation hm_setArgument:param atIndex:i encodingType:type];
    }
    [invocation invoke];
    hm_otherArguments = nil;

    // 返回值
    uint64_t returnValueRef = 0;
    const char *objCReturnType = methodSignature.methodReturnType;
    HMEncodingType returnType = HMEncodingGetType(objCReturnType);
    if (returnType != HMEncodingTypeVoid && returnType != HMEncodingTypeUnknown) {
        id returnObject = [invocation hm_getReturnValueObject];
        if (returnObject) {
            returnValueRef = [(HMHermesExecutor *) hm_currentExecutor convertObjectToValueRef:returnObject].getRaw();
        }
    }
    hm_currentExecutor = nil;
    if (returnValueRef) {
        return hermes::vm::HermesValue::fromRaw(returnValueRef);
    }

    return hermes::vm::Runtime::getUndefinedValue().get();
}

- (hermes::vm::HermesValue)hummerGetSetPropertyWithNativeArgumentArray:(const hermes::vm::NativeArgs &)args isSetter:(BOOL)isSetter {
    if (isSetter) {
        if (args.getArgCount() < 3) {
            HMLogError(HUMMER_GET_SET_ERROR);

            return hermes::vm::Runtime::getUndefinedValue().get();
        }
    } else {
        if (args.getArgCount() < 2) {
            HMLogError(HUMMER_GET_SET_ERROR);

            return hermes::vm::Runtime::getUndefinedValue().get();
        }
    }
    BOOL isClass = args.getArg(0).isString();
    if (!isClass) {
        if (isSetter) {
            if (args.getArgCount() < 4) {
                HMLogError(HUMMER_GET_SET_ERROR);

                return hermes::vm::Runtime::getUndefinedValue().get();
            }
        } else {
            if (args.getArgCount() < 3) {
                HMLogError(HUMMER_GET_SET_ERROR);

                return hermes::vm::Runtime::getUndefinedValue().get();
            }
        }
    }
    NSString *className = [self convertValueRefToString:args.getArg(isClass ? 0 : 1) copyBytes:NO];
    NSString *propertyName = [self convertValueRefToString:args.getArg(isClass ? 1 : 2) copyBytes:NO];

    id target = nil;
    SEL selector = nil;
    NSMethodSignature *methodSignature = nil;

    [self hummerExtractExportWithFunctionPropertyName:propertyName objectRef:args.getArg(0) target:&target selector:&selector methodSignature:&methodSignature isSetter:isSetter jsClassName:className];

    return [self hummerCallNativeWithNativeArgumentArray:args target:target selector:selector methodSignature:methodSignature];
}

- (BOOL)checkStatus:(hermes::vm::ExecutionStatus)status {
    if (status == hermes::vm::ExecutionStatus::RETURNED) {
        return YES;
    }
    auto exception = self.runtime->getThrownValue();
    if (exception.isObject()) {
        // 是对象，存在异常
        hermes::vm::GCScope gcScope(self.runtime);
        auto exceptionHandle = self.runtime->makeHandle(exception);
        // 为了保证后续代码也能判断异常，这里预先清除 exception
        self.runtime->clearThrownValue();
        auto exceptionObjectHandle = hermes::vm::Handle<hermes::vm::JSObject>::dyn_vmcast(exceptionHandle);
        // 转化失败
        if (!exceptionObjectHandle) {
            return NO;
        }
        // stack
        auto propRes = hermes::vm::JSObject::getNamed_RJS(exceptionObjectHandle, self.runtime, hermes::vm::Predefined::getSymbolID(hermes::vm::Predefined::stack));
        HMExceptionModel *exceptionModel = [[HMExceptionModel alloc] init];
        if (propRes == hermes::vm::ExecutionStatus::RETURNED && propRes.getValue().isString()) {
            // 必须复制
            exceptionModel.stack = [self convertValueRefToString:propRes.getValue() copyBytes:YES];
        } else {
            self.runtime->clearThrownValue();
        }
        // Hermes 没有实现 column line
        // 具体见 https://github.com/facebook/hermes/issues/171 和 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error
        // message
        propRes = hermes::vm::JSObject::getNamed_RJS(exceptionObjectHandle, self.runtime, hermes::vm::Predefined::getSymbolID(hermes::vm::Predefined::message));
        if (propRes == hermes::vm::ExecutionStatus::RETURNED) {
            exceptionModel.message = [self convertValueRefToString:propRes.getValue() copyBytes:YES];
        } else {
            self.runtime->clearThrownValue();
        };
        // name
        propRes = hermes::vm::JSObject::getNamed_RJS(exceptionObjectHandle, self.runtime, hermes::vm::Predefined::getSymbolID(hermes::vm::Predefined::name));
        if (propRes == hermes::vm::ExecutionStatus::RETURNED) {
            exceptionModel.name = [self convertValueRefToString:propRes.getValue() copyBytes:YES];
        } else {
            self.runtime->clearThrownValue();
        }

        if (self.exceptionHandler) {
            self.exceptionHandler(exceptionModel);
        }
    } else {
        self.runtime->clearThrownValue();
    }

    return NO;
}

- (void)enableDebuggerWithTitle:(nullable NSString *)title {
    if (!self.jsThread) {
        self.jsThread = std::make_shared<facebook::react::RCTMessageThread>(NSRunLoop.mainRunLoop, ^(NSError *error) {
            if (error) {
                HMLogError(@"%@", error);
            }
        });
        self.decoratedRuntime->enableDebugger(self.jsThread, title.length > 0 ? title.UTF8String : "Hummer Hermes");
    }
}

- (nullable HMBaseStrongValue *)evaluateWithScript:(nullable NSString *)script sourceUrl:(nullable NSString *)sourceUrl {
    hermes::hbc::CompileFlags compileFlags;
    compileFlags.debug = true;
    compileFlags.lazy = true;
    compileFlags.strict = true;
    auto scriptRes = self.runtime->run(script.UTF8String, sourceUrl.UTF8String, compileFlags);
    if (![self checkStatus:scriptRes.getStatus()]) {
        return nil;
    }
    if (scriptRes.getValue().isUndefined() || scriptRes.getValue().isNull()) {
        return nil;
    }
    HMHermesStrongValue *hermesValue = [[HMHermesStrongValue alloc] initWithHermesValue:scriptRes.getValue() executor:self];

    return hermesValue;
}

- (BOOL)valueIsNullOrUndefined:(HMBaseValue *)value {
    if (value.executor != self || !((id <HMHermesValue>) value).hermesValue.getRaw()) {
        return YES;
    }

    return ((id <HMHermesValue>) value).hermesValue.isNull() || ((id <HMHermesValue>) value).hermesValue.isUndefined();
}

- (BOOL)valueIsBoolean:(nullable HMBaseValue *)value {
    if (value.executor != self || !((id <HMHermesValue>) value).hermesValue.getRaw()) {
        return NO;
    }

    return ((id <HMHermesValue>) value).hermesValue.isBool();
}

- (BOOL)valueIsNumber:(nullable HMBaseValue *)value {
    if (value.executor != self || !((id <HMHermesValue>) value).hermesValue.getRaw()) {
        return NO;
    }

    return ((id <HMHermesValue>) value).hermesValue.isNumber();
}

- (BOOL)valueIsString:(nullable HMBaseValue *)value {
    if (value.executor != self || !((id <HMHermesValue>) value).hermesValue.getRaw()) {
        return NO;
    }

    return ((id <HMHermesValue>) value).hermesValue.isString();
}

- (BOOL)valueIsArray:(nullable HMBaseValue *)value {
    if (value.executor != self || !((id <HMHermesValue>) value).hermesValue.getRaw()) {
        return NO;
    }

    return (BOOL) hermes::vm::dyn_vmcast_or_null<hermes::vm::JSArray>(((id <HMHermesValue>) value).hermesValue);
}

- (BOOL)valueRefIsNativeObject:(const hermes::vm::HermesValue &)valueRef {
    return (BOOL) [self convertValueRefToNativeObject:valueRef];
}

- (BOOL)valueIsNativeObject:(nullable HMBaseValue *)value {
    if (value.executor != self) {
        return NO;
    }

    return [self valueRefIsNativeObject:((id <HMHermesValue>) value).hermesValue];
}

- (nullable NSArray *)convertValueToArray:(nullable HMBaseValue *)value {
    if (value.executor != self) {
        return nil;
    }

    return [self convertValueRefToArray:((id <HMHermesValue>) value).hermesValue isPortableConvert:NO];
}

- (nullable NSDictionary<NSString *, id> *)convertValueToDictionary:(nullable HMBaseValue *)value {
    if (value.executor != self) {
        return nil;
    }

    return [self convertValueRefToDictionary:((id <HMHermesValue>) value).hermesValue isPortableConvert:NO];
}

- (nullable HMClosureType)convertValueToClosure:(nullable HMBaseValue *)value {
    if (value.executor != self) {
        return nil;
    }

    return [self convertValueRefToClosure:((id <HMHermesValue>) value).hermesValue];
}

- (nullable NSString *)convertValueRefToString:(const hermes::vm::HermesValue &)valueRef copyBytes:(BOOL)copyBytes {
    // 隐含 !valueRef.getRaw()
    if (!valueRef.isString()) {
        return nil;
    }
    // 如果是 copyUTF16String 会发生复制，不需要考虑 ASCII 的情况
    if (valueRef.getString()->isASCII()) {
        auto stringRef = valueRef.getString()->getStringRef<char>();

        if (copyBytes) {
            return [[NSString alloc] initWithBytes:(void *) stringRef.data() length:stringRef.size() * sizeof(char) encoding:NSASCIIStringEncoding];
        } else {
            return [[NSString alloc] initWithBytesNoCopy:(void *) stringRef.data() length:stringRef.size() * sizeof(char) encoding:NSASCIIStringEncoding freeWhenDone:NO];
        }

    } else {
        auto stringRef = valueRef.getString()->getStringRef<char16_t>();

        // 必须小端字节序
        if (copyBytes) {
            return [[NSString alloc] initWithBytes:(void *) stringRef.data() length:stringRef.size() * sizeof(char16_t) encoding:NSUTF16LittleEndianStringEncoding];
        } else {
            return [[NSString alloc] initWithBytesNoCopy:(void *) stringRef.data() length:stringRef.size() * sizeof(char16_t) encoding:NSUTF16LittleEndianStringEncoding freeWhenDone:NO];
        }
    }
}

- (nullable NSNumber *)convertValueRefToNumber:(const hermes::vm::HermesValue &)hermesValue {
    if (hermesValue.isNumber()) {
        return @(hermesValue.getNumber());
    } else if (hermesValue.isBool()) {
        return @(hermesValue.getBool());
    }

    return nil;
}

- (nullable NSObject *)convertValueToNativeObject:(HMBaseValue *)value {
    if (value.executor != self) {
        return nil;
    }

    return [self convertValueRefToNativeObject:((id <HMHermesValue>) value).hermesValue];
}

- (nullable NSNumber *)convertValueToNumber:(HMBaseValue *)value {
    if (value.executor != self) {
        return nil;
    }

    return [self convertValueRefToNumber:((id <HMHermesValue>) value).hermesValue];
}

- (nullable NSString *)convertValueToString:(HMBaseValue *)value {
    if (value.executor != self) {
        return nil;
    }

    // 返回给业务方的字符串必须是复制后的
    return [self convertValueRefToString:((id <HMHermesValue>) value).hermesValue copyBytes:YES];
}

- (nullable id)convertValueToObject:(HMBaseValue *)value {
    if (value.executor != self) {
        return nil;
    }

    return [self convertValueRefToObject:((id <HMHermesValue>) value).hermesValue isPortableConvert:NO];
}

- (nullable NSArray *)convertValueRefToArray:(const hermes::vm::HermesValue &)valueRef isPortableConvert:(BOOL)isPortableConvert {
    auto arrayObject = hermes::vm::dyn_vmcast_or_null<hermes::vm::JSArray>(valueRef);
    if (!arrayObject) {
        return nil;
    }
    NSMutableArray *resultArray = nil;
    for (uint32_t index = arrayObject->getBeginIndex(), end = arrayObject->getEndIndex(); index < end; ++index) {
        id object = [self convertValueRefToObject:arrayObject->at(self.runtime, index) isPortableConvert:isPortableConvert];
        if (object) {
            if (!resultArray) {
                resultArray = [NSMutableArray arrayWithCapacity:hermes::vm::JSArray::getLength(arrayObject)];
            }
            [resultArray addObject:object];
        }
    }

    return resultArray.copy;
}

- (nullable NSObject *)convertValueRefToNativeObject:(const hermes::vm::HermesValue &)valueRef {
    if (!valueRef.getRaw()) {
        return nil;
    }
    auto jsObject = hermes::vm::dyn_vmcast_or_null<hermes::vm::JSObject>(valueRef);
    if (!jsObject) {
        return nil;
    }
    auto keyStringPrimitive = hermes::vm::dyn_vmcast_or_null<hermes::vm::StringPrimitive>([self convertStringToValueRef:@"_private"]);
    if (!keyStringPrimitive) {
        return nil;
    }
    hermes::vm::GCScope gcScope(self.runtime);
    auto symbolRes = hermes::vm::stringToSymbolID(self.runtime, hermes::vm::createPseudoHandle(keyStringPrimitive));
    if (![self checkStatus:symbolRes.getStatus()]) {
        return nil;
    }
    auto objRes = hermes::vm::JSObject::getNamed_RJS(self.runtime->makeHandle(jsObject), self.runtime, symbolRes.getValue().get());
    if (![self checkStatus:objRes.getStatus()]) {
        return nil;
    }
    auto hostObject = hermes::vm::dyn_vmcast_or_null<hermes::vm::HostObject>(objRes.getValue());
    if (!hostObject) {
        return nil;
    }

    void *pointer = std::static_pointer_cast<didi::HermesObject>(hostObject->getProxy())->getPointer();
    if (!pointer || ![((__bridge NSObject *) pointer) isKindOfClass:NSObject.class]) {
        return nil;
    }

    return (__bridge NSObject *) (pointer);
}

- (nullable NSObject <NSCoding> *)convertValueToPortableObject:(HMBaseValue *)value {
    if (value.executor != self) {
        return nil;
    }

    return [self convertValueRefToObject:((id <HMHermesValue>) value).hermesValue isPortableConvert:YES];
}

- (nullable NSDictionary<NSString *, id> *)convertValueRefToDictionary:(const hermes::vm::HermesValue &)valueRef isPortableConvert:(BOOL)isPortableConvert {
    if (!valueRef.isObject()) {
        return nil;
    }

    auto arrayObject = hermes::vm::dyn_vmcast_or_null<hermes::vm::JSArray>(valueRef);
    if (arrayObject) {
        return nil;
    }
    if ([self valueRefIsClosure:valueRef]) {
        return nil;
    }
    if ([self valueRefIsNativeObject:valueRef]) {
        return nil;
    }

    hermes::vm::GCScope gcScope(self.runtime);
    auto jsObjectHandle = hermes::vm::Handle<hermes::vm::JSObject>::dyn_vmcast(self.runtime->makeHandle(valueRef));
    if (!jsObjectHandle) {
        return nil;
    }
    NSMutableDictionary<NSString *, id> *resultDictionary = nil;
    auto propertyNameArrayHandle = hermes::vm::JSObject::getOwnPropertyNames(jsObjectHandle, self.runtime, true);
    if (![self checkStatus:propertyNameArrayHandle.getStatus()]) {
        return nil;
    }
    auto propertyNameArray = propertyNameArrayHandle.getValue().get();
    if (!propertyNameArray) {
        return nil;
    }
    for (uint32_t index = 0, end = propertyNameArray->getEndIndex(); index < end; ++index) {
        auto element = propertyNameArray->at(self.runtime, index);
        if (element.isString()) {
            auto symbolRes = hermes::vm::stringToSymbolID(self.runtime, hermes::vm::createPseudoHandle(element.getString()));
            if (![self checkStatus:symbolRes.getStatus()]) {
                continue;
            }
            auto valueRes = hermes::vm::JSObject::getNamed_RJS(jsObjectHandle, self.runtime, symbolRes.getValue().get());
            if (![self checkStatus:valueRes.getStatus()]) {
                continue;
            }
            NSString *nameProp = [self convertValueRefToString:element copyBytes:YES];
            id value = [self convertValueRefToObject:valueRes.getValue() isPortableConvert:isPortableConvert];
            if (nameProp.length > 0 && value) {
                if (!resultDictionary) {
                    resultDictionary = [NSMutableDictionary dictionaryWithCapacity:hermes::vm::JSArray::getLength(propertyNameArray)];
                }

                resultDictionary[nameProp] = value;
            }
        }
    }

    return resultDictionary.copy;
}

- (nullable HMClosureType)convertValueRefToClosure:(const hermes::vm::HermesValue &)valueRef {
    auto functionObject = hermes::vm::dyn_vmcast_or_null<hermes::vm::Callable>(valueRef);
    if (!functionObject) {
        return nil;
    }
    // 如果当前 JS 闭包为之前原生返回转换而成，则直接复用之前返回的原生闭包
    hermes::vm::GCScope gcScope(self.runtime);
    auto functionNameRes = hermes::vm::StringPrimitive::createEfficient(self.runtime, hermes::vm::createASCIIRef("_privateClosure"));
    if (![self checkStatus:functionNameRes.getStatus()]) {
        return nil;
    }
    auto privateSymbolRes = hermes::vm::stringToSymbolID(self.runtime, hermes::vm::createPseudoHandle(functionNameRes.getValue().getString()));
    if (![self checkStatus:privateSymbolRes.getStatus()]) {
        return nil;
    }
    auto privateValueCallRes = hermes::vm::JSObject::getNamed_RJS(self.runtime->makeHandle(functionObject), self.runtime, privateSymbolRes.getValue().get());
    if (![self checkStatus:privateValueCallRes.getStatus()]) {
        return nil;
    }
    auto privateValueHostObject = hermes::vm::dyn_vmcast_or_null<hermes::vm::HostObject>(privateValueCallRes.getValue());
    if (privateValueHostObject && std::static_pointer_cast<didi::HermesObject>(privateValueHostObject->getProxy())->getPointer() && [((__bridge HMClosureType) std::static_pointer_cast<didi::HermesObject>(privateValueHostObject->getProxy())->getPointer()) isKindOfClass:NSClassFromString(@"NSBlock")]) {
        return (__bridge HMClosureType) std::static_pointer_cast<didi::HermesObject>(privateValueHostObject->getProxy())->getPointer();
    }
    // 创建原生闭包
    // js 闭包传递给 oc
    HMHermesStrongValue *valueWrapper = [[HMHermesStrongValue alloc] initWithHermesValue:valueRef executor:self];
    // 出于主线程不阻塞原则，返回值只能使用回调返回
    HMClosureType closureType = ^(NSArray<HMBaseValue *> *argumentArray) {
        // 主线程不能卡死，所以不能使用信号量同步阻塞
        if (valueWrapper.executor) {
            // 转参数
            HMHermesExecutor *executor = static_cast<HMHermesExecutor *>(valueWrapper.executor);

            auto functionHandle = hermes::vm::Handle<hermes::vm::Callable>::dyn_vmcast(executor.runtime->makeHandle(valueWrapper.hermesValue));
            if (!functionHandle) {
                return (HMHermesStrongValue *) nil;
            }

            hermes::vm::GCScope inlineGCScope(executor.runtime);

            auto argumentsRes = hermes::vm::Arguments::create(executor.runtime, static_cast<unsigned int>(argumentArray.count), hermes::vm::HandleRootOwner::makeNullHandle<hermes::vm::Callable>(), true);
            if (![executor checkStatus:argumentsRes.getStatus()]) {
                return (HMHermesStrongValue *) nil;
            }
            hermes::vm::Handle<hermes::vm::Arguments> argumentsHandle = argumentsRes.getValue();
            [argumentArray enumerateObjectsUsingBlock:^(HMBaseValue *obj, NSUInteger idx, BOOL *stop) {
                hermes::vm::HermesValue inlineValueRef = [executor convertObjectToValueRef:obj];
                if (inlineValueRef.getRaw()) {
                    hermes::vm::ArrayImpl::setElementAt(argumentsHandle, executor.runtime, static_cast<unsigned int>(idx), executor.runtime->makeHandle(inlineValueRef));
                }
            }];

            auto callRes = hermes::vm::Callable::executeCall(functionHandle, executor.runtime, hermes::vm::Runtime::getUndefinedValue(), hermes::vm::Runtime::getUndefinedValue(), argumentsHandle);
            if (![executor checkStatus:callRes.getStatus()]) {
                return (HMHermesStrongValue *) nil;
            }

            return [[HMHermesStrongValue alloc] initWithHermesValue:callRes.getValue() executor:executor];
        }

        return (HMHermesStrongValue *) nil;
    };
    [closureType setHm_value:[[HMHermesWeakValue alloc] initWithHermesValue:valueRef executor:self]];

    return closureType;
}

- (nullable id)convertValueRefToObject:(const hermes::vm::HermesValue &)hermesValue isPortableConvert:(BOOL)isPortableConvert {
    if (!hermesValue.getRaw() || hermesValue.isUndefined() || hermesValue.isNull()) {
        return nil;
    }
    // string
    id returnValue = [self convertValueRefToString:hermesValue copyBytes:YES];
    if (returnValue) {
        return returnValue;
    }

    // number
    returnValue = [self convertValueRefToNumber:hermesValue];
    if (returnValue) {
        return returnValue;
    }

    if (!isPortableConvert) {
        returnValue = [self convertValueRefToNativeObject:hermesValue];
        if (returnValue) {
            return returnValue;
        }

        // closure
        returnValue = [self convertValueRefToClosure:hermesValue];
        if (returnValue) {
            return returnValue;
        }
    }

    // array
    returnValue = [self convertValueRefToArray:hermesValue isPortableConvert:isPortableConvert];
    if (returnValue) {
        return returnValue;
    }

    // dictionary
    returnValue = [self convertValueRefToDictionary:hermesValue isPortableConvert:isPortableConvert];
    if (returnValue) {
        return returnValue;
    }

    return nil;
}

- (hermes::vm::HermesValue)convertObjectToValueRef:(id)object {
    if ([object isKindOfClass:HMHermesWeakValue.class] || [object isKindOfClass:HMHermesStrongValue.class]) {
        // 业务方已经转好，直接添加就行
        if (!((id <HMHermesValue>) object).hermesValue.getRaw()) {
            return hermes::vm::Runtime::getUndefinedValue().get();
        }

        if (((HMBaseValue *) object).executor != self) {
            return [self convertObjectToValueRef:[((HMHermesExecutor *) ((HMBaseValue *) object).executor) convertValueRefToObject:((id <HMHermesValue>) object).hermesValue isPortableConvert:NO]];
        }

        return ((id <HMHermesValue>) object).hermesValue;
    } else if ([object isKindOfClass:NSNumber.class]) {
        return [self convertNumberToValueRef:(NSNumber *) object];
    } else if ([object isKindOfClass:NSString.class]) {
        return [self convertStringToValueRef:(NSString *) object];
    } else if ([object isKindOfClass:NSArray.class]) {
        return [self convertArrayToValueRef:(NSArray *) object];
    } else if ([object isKindOfClass:NSDictionary.class]) {
        return [self convertDictionaryToValueRef:(NSDictionary<NSString *, id> *) object];
    } else if ([object hm_value].executor == self && [[object hm_value] isValid]) {
        // 先判断 hm_value，这样后续的闭包转换和原生组件导出可以减少调用
        return ((id <HMHermesValue>) [object hm_value]).hermesValue;
    } else if ([object isKindOfClass:NSClassFromString(@"NSBlock")]) {
        return [self convertClosureToValueRef:object];
    } else {
        return [self convertNativeObjectToValueRef:object];
    }
}

- (hermes::vm::HermesValue)convertNativeObjectToValueRef:(NSObject *)object {
    if (!object) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    if ([object hm_value].executor == self && [[object hm_value] isValid]) {
        // 先判断 hm_value，这样后续的闭包转换和原生组件导出可以减少调用
        return ((id <HMHermesValue>) [object hm_value]).hermesValue;
    }
    NSString *className = NSStringFromClass(object.class);
    HMExportClass *exportClass = HMExportManager.sharedInstance.objcClasses[className];
    if (exportClass.jsClass.length == 0) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    // 获取 hummerCreateObject
    hermes::vm::GCScope gcScope(self.runtime);

    auto hummerCreateStringRes = hermes::vm::StringPrimitive::createEfficient(self.runtime, hermes::vm::createASCIIRef("hummerCreateObject"));
    if (![self checkStatus:hummerCreateStringRes.getStatus()]) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    auto symbolRes = hermes::vm::stringToSymbolID(self.runtime, hermes::vm::createPseudoHandle(hummerCreateStringRes.getValue().getString()));
    if (![self checkStatus:symbolRes.getStatus()]) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    auto hummerCreateObjectRes = hermes::vm::JSObject::getNamed_RJS(self.runtime->getGlobal(), self.runtime, symbolRes.getValue().get());
    if (![self checkStatus:hummerCreateObjectRes.getStatus()]) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    auto hummerCreateObjectFunction = hermes::vm::Handle<hermes::vm::Callable>::dyn_vmcast(self.runtime->makeHandle(hummerCreateObjectRes.getValue()));
    if (!hummerCreateObjectFunction) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    // 创建 js 类名字符串
    auto jsClassNameString = [self convertStringToValueRef:exportClass.jsClass];
    if (!jsClassNameString.getRaw()) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    // 创建 HermesObject
    auto hostObject = hermes::vm::HostObject::createWithoutPrototype(self.runtime, didi::HermesObject::create((__bridge void *) object));
    if (![self checkStatus:hostObject.getStatus()]) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    // 调用函数
    auto callRes = hermes::vm::Callable::executeCall2(hummerCreateObjectFunction, self.runtime, hermes::vm::Runtime::getUndefinedValue(), hostObject.getValue(), jsClassNameString);
    if (![self checkStatus:callRes.getStatus()]) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    HMLogDebug(HUMMER_RETAIN_TEMPLATE, className);
    object.hm_value = [[HMHermesWeakValue alloc] initWithHermesValue:callRes.getValue() executor:self];

    return callRes.getValue();
}

- (hermes::vm::HermesValue)convertArrayToValueRef:(NSArray *)array {
    if (!array) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    hermes::vm::GCScope gcScope(self.runtime);
    hermes::vm::GCScope &gcScopeRef = gcScope;
    auto jsArrayRes = hermes::vm::JSArray::create(self.runtime, static_cast<unsigned int>(array.count), static_cast<unsigned int>(array.count));

    if (![self checkStatus:jsArrayRes.getStatus()]) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    auto jsArrayHandle = self.runtime->makeHandle(std::move(jsArrayRes.getValue()));
    auto marker = gcScopeRef.createMarker();
    [array enumerateObjectsUsingBlock:^(id _Nonnull obj, NSUInteger idx, BOOL *_Nonnull stop) {
        auto hermesValue = [self convertObjectToValueRef:obj];
        if (!hermesValue.getRaw()) {
            return;
        }
        hermes::vm::JSArray::setElementAt(jsArrayHandle, self.runtime, static_cast<unsigned int>(idx), self.runtime->makeHandle(hermesValue));
        gcScopeRef.flushToMarker(marker);
    }];

    return jsArrayHandle.getHermesValue();
}

- (hermes::vm::HermesValue)convertClosureToValueRef:(id)closure {
    if (!closure) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    if ([closure hm_value].executor == self && [closure hm_value]) {
        return ((id <HMHermesValue>) [closure hm_value]).hermesValue;
    }
    hermes::vm::GCScope gcScope(self.runtime);

    // 获取 hummerCreateClosure
    auto hummerCreateClosureStringRes = hermes::vm::StringPrimitive::createEfficient(self.runtime, hermes::vm::createASCIIRef("hummerCreateClosure"));
    if (![self checkStatus:hummerCreateClosureStringRes.getStatus()]) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    auto symbolRes = hermes::vm::stringToSymbolID(self.runtime, hermes::vm::createPseudoHandle(hummerCreateClosureStringRes.getValue().getString()));
    if (![self checkStatus:symbolRes.getStatus()]) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    auto hummerCreateClosureObjectRes = hermes::vm::JSObject::getNamed_RJS(self.runtime->getGlobal(), self.runtime, symbolRes.getValue().get());
    if (![self checkStatus:hummerCreateClosureObjectRes.getStatus()]) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    auto hummerCreateClosureFunction = hermes::vm::Handle<hermes::vm::Callable>::dyn_vmcast(self.runtime->makeHandle(hummerCreateClosureObjectRes.getValue()));
    if (!hummerCreateClosureFunction) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }

    // 创建 HermesObject
    auto hostObject = hermes::vm::HostObject::createWithoutPrototype(self.runtime, didi::HermesObject::create((__bridge void *) closure));
    if (![self checkStatus:hostObject.getStatus()]) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    // 调用函数
    auto callRes = hermes::vm::Callable::executeCall1(hummerCreateClosureFunction, self.runtime, hermes::vm::Runtime::getUndefinedValue(), hostObject.getValue());
    if (![self checkStatus:callRes.getStatus()]) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    [closure setHm_value:[[HMHermesWeakValue alloc] initWithHermesValue:callRes.getValue() executor:self]];

    return callRes.getValue();
}

- (hermes::vm::HermesValue)convertDictionaryToValueRef:(NSDictionary<NSString *, id> *)dictionary {
    if (!dictionary) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    hermes::vm::GCScope gcScope(self.runtime);
    hermes::vm::GCScope &gcScopeRef = gcScope;
    auto jsObject = hermes::vm::JSObject::create(self.runtime, static_cast<unsigned int>(dictionary.count));
    auto jsObjectHandle = self.runtime->makeHandle(std::move(jsObject));
    auto marker = gcScopeRef.createMarker();
    [dictionary enumerateKeysAndObjectsUsingBlock:^(NSString *_Nonnull key, id _Nonnull obj, BOOL *_Nonnull stop) {
        auto hermesValue = [self convertObjectToValueRef:obj];
        if (!hermesValue.getRaw()) {
            return;
        }
        auto hermesValueHandle = self.runtime->makeHandle(hermesValue);
        auto keyHermesValue = [self convertStringToValueRef:key];
        if (!keyHermesValue.getRaw()) {
            return;
        }
        auto keyStringPrimitive = hermes::vm::dyn_vmcast_or_null<hermes::vm::StringPrimitive>(keyHermesValue);
        if (!keyStringPrimitive) {
            return;
        }
        auto symbolRes = hermes::vm::stringToSymbolID(self.runtime, hermes::vm::createPseudoHandle(keyStringPrimitive));
        if (![self checkStatus:symbolRes.getStatus()]) {
            return;
        }
        auto callResult = hermes::vm::JSObject::putNamed_RJS(jsObjectHandle, self.runtime, symbolRes.getValue().get(), hermesValueHandle);
        [self checkStatus:callResult.getStatus()];
        gcScopeRef.flushToMarker(marker);
    }];

    return jsObjectHandle.getHermesValue();
}

- (hermes::vm::HermesValue)convertNumberToValueRef:(NSNumber *)number {
    if (!number) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    if (strcmp(number.objCType, @encode(BOOL)) == 0) {
        return hermes::vm::HermesValue::encodeBoolValue(number.boolValue);
    } else {
        return hermes::vm::HermesValue::encodeNumberValue(number.doubleValue);
    }
}

- (hermes::vm::HermesValue)convertStringToValueRef:(NSString *)stringValue {
    NSUInteger lengthWithoutNull = [stringValue lengthOfBytesUsingEncoding:NSUTF8StringEncoding];
    if (stringValue.length == 0 || lengthWithoutNull == 0) {
        // 0
        return hermes::vm::Runtime::getUndefinedValue().get();
    }
    const char *utf8String = stringValue.UTF8String;
    hermes::vm::CallResult<hermes::vm::HermesValue> strRes = hermes::vm::ExecutionStatus::EXCEPTION;
    hermes::vm::GCScope gcScope(self.runtime);
    if (hermes::isAllASCII(utf8String, utf8String + lengthWithoutNull)) {
        strRes = hermes::vm::StringPrimitive::createEfficient(self.runtime, hermes::vm::createASCIIRef(utf8String));
    } else {
        std::u16string out;
        didi::convertUtf8ToUtf16(reinterpret_cast<const uint8_t *>(utf8String), lengthWithoutNull, out);
        strRes = hermes::vm::StringPrimitive::createEfficient(self.runtime, std::move(out));
    }

    if (![self checkStatus:strRes.getStatus()]) {
        return hermes::vm::Runtime::getUndefinedValue().get();
    }

    return strRes.getValue();
}

- (BOOL)compareValue:(HMBaseValue *)value1 value:(HMBaseValue *)value2 {
    if (![self valueIsNullOrUndefined:value1] && ![self valueIsNullOrUndefined:value1]) {
        id <HMHermesValue> hermesVa1 = (id <HMHermesValue>) value1;
        id <HMHermesValue> hermesVa2 = (id <HMHermesValue>) value2;

        return hermesVa1.hermesValue.getRaw() == hermesVa2.hermesValue.getRaw();
    }

    return NO;
}

- (BOOL)setPropertyWithObject:(HMBaseValue *)object value:(id)value property:(NSString *)propertyString {
    if ([object isNullOrUndefined] || !value || propertyString.length <= 0) {
        return NO;
    }

    hermes::vm::GCScope gcScope(_runtime);
    auto hermesValue = ((id <HMHermesValue>) object).hermesValue;
    auto jsObject = hermes::vm::dyn_vmcast_or_null<hermes::vm::JSObject>(hermesValue);
    if (!jsObject) {
        return NO;
    }
    auto propertyName = hermes::vm::dyn_vmcast_or_null<hermes::vm::StringPrimitive>([self convertStringToValueRef:propertyString]);
    if (!propertyName) {
        return NO;
    }
    // 自带句柄
    // funcName symbol
    auto symbolRes = hermes::vm::stringToSymbolID(self.runtime, hermes::vm::createPseudoHandle(propertyName));
    if (![self checkStatus:symbolRes.getStatus()]) {
        return NO;
    }

    auto jsObjectHandle = self.runtime->makeHandle(jsObject);
    auto valueHermesValue = [self convertObjectToValueRef:value];
    auto hermesValueHandle = self.runtime->makeHandle(valueHermesValue);
    auto putRes = hermes::vm::JSObject::putNamed_RJS(jsObjectHandle, _runtime, symbolRes.getValue().get(), hermesValueHandle);
    if (![self checkStatus:putRes.getStatus()] || !putRes.getValue()) {
        return NO;
    }

    return YES;
}

- (nullable HMBaseStrongValue *)executeCallWithTarget:(HMBaseValue *)value functionName:(NSString *)functionName arguments:(nullable NSArray *)arguments {
    if (![self valueIsNullOrUndefined:value] && functionName.length > 0) {
        hermes::vm::GCScope gcScope(self.runtime);
        auto hermesValue = ((id <HMHermesValue>) value).hermesValue;

        auto jsObject = hermes::vm::dyn_vmcast_or_null<hermes::vm::JSObject>(hermesValue);
        if (!jsObject) {
            return nil;
        }

        // funcName
        auto funcName = hermes::vm::dyn_vmcast_or_null<hermes::vm::StringPrimitive>([self convertStringToValueRef:functionName]);
        if (!funcName) {
            return nil;
        }
        // funcName symbol
        auto symbolRes = hermes::vm::stringToSymbolID(self.runtime, hermes::vm::createPseudoHandle(funcName));
        if (![self checkStatus:symbolRes.getStatus()]) {
            return nil;
        }

        auto jsObjectHandle = self.runtime->makeHandle(jsObject);

        // func value
        auto valueRes = hermes::vm::JSObject::getNamed_RJS(jsObjectHandle, self.runtime, symbolRes.getValue().get());
        if (![self checkStatus:valueRes.getStatus()]) {
            return nil;
        }

        auto function = hermes::vm::Handle<hermes::vm::Callable>::dyn_vmcast(self.runtime->makeHandle(valueRes.getValue()));
        if (!function) {
            return nil;
        }

        // 参数
        auto argumentsRes = hermes::vm::Arguments::create(self.runtime, static_cast<unsigned int>(arguments.count), hermes::vm::HandleRootOwner::makeNullHandle<hermes::vm::Callable>(), true);
        if (![self checkStatus:argumentsRes.getStatus()]) {
            return nil;
        }
        hermes::vm::Handle<hermes::vm::Arguments> argumentsHandle = argumentsRes.getValue();
        [arguments enumerateObjectsUsingBlock:^(HMBaseValue *obj, NSUInteger idx, BOOL *stop) {
            hermes::vm::HermesValue inlineValueRef = [self convertObjectToValueRef:obj];
            if (!inlineValueRef.getRaw()) {
                return;
            }
            hermes::vm::ArrayImpl::setElementAt(argumentsHandle, self.runtime, static_cast<unsigned int>(idx), self.runtime->makeHandle(inlineValueRef));
        }];

        // 调用函数
        auto callRes = hermes::vm::Callable::executeCall(function, self.runtime, hermes::vm::Runtime::getUndefinedValue(), jsObjectHandle, argumentsHandle);

        if (![self checkStatus:callRes.getStatus()]) {
            return nil;
        }

        return [[HMHermesStrongValue alloc] initWithHermesValue:callRes.getValue() executor:self];
    }

    return nil;
}

- (BOOL)valueRefIsClosure:(const hermes::vm::HermesValue &)valueRef {
    if (!valueRef.getRaw()) {
        return NO;
    }
    auto callable = hermes::vm::dyn_vmcast_or_null<hermes::vm::Callable>(valueRef);

    return (BOOL) callable;
}

- (BOOL)valueRefIsDictionary:(const hermes::vm::HermesValue &)valueRef {
    if (!valueRef.getRaw()) {
        return NO;
    }
    auto object = hermes::vm::dyn_vmcast_or_null<hermes::vm::JSObject>(valueRef);
    if (!object) {
        return NO;
    }
    auto array = hermes::vm::dyn_vmcast_or_null<hermes::vm::JSArray>(valueRef);
    if (array) {
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

@end
