//
//  HMBaseExecutorProtocol.m
//  Hummer
//
//  Created by 唐佳诚 on 2021/1/13.
//

#import "HMBaseExecutorProtocol.h"
#import "HMUtility.h"
#import "HMExceptionModel.h"

static HMEngineType engineType = HMEngineTypeJSC;

HMEngineType HMGetEngineType(void) {
    return engineType;
}

HMEngineType HMSetEngineType(HMEngineType newEngineType) {
    HMEngineType oldEngineType = engineType;
    engineType = newEngineType;
    
    return oldEngineType;
}

NSArray<HMBaseValue *> *_Nullable HMOtherArguments = nil;

id <HMBaseExecutorProtocol> _Nullable HMCurrentExecutor = nil;

NSMapTable<NSValue *, id <HMBaseExecutorProtocol>> *HMExecutorMap = nil;

NSString *const HUMMER_CALL_NATIVE_SELECTOR_ERROR = @"hummerCallNative() selector == nil";

NSString *const HUMMER_CALL_NATIVE_METHOD_SIGNATURE_ERROR = @"hummerCallNative() methodSignature == nil";

NSString *const HUMMER_UN_SUPPORT_TYPE_TEMPLATE = @"不支持的类型 %s";

NSString *const HUMMER_UN_MATCH_ARGS_TYPE_TEMPLATE = @"参数类型不匹配，OC目标参数类型: %s，js参数类型: %@";

NSString *const HUMMER_CREATE_ERROR = @"严重错误，hummerCreate() 函数必须至少有一个字符串参数，一个 JSValue this 指针";

NSString *const HUMMER_CAN_NOT_CREATE_NATIVE_OBJECT = @"%@ 类无法创建原生对象";

NSString *const HUMMER_CALL_CLOSURE_MUST_HAVE_PARAMETER = @"hummerCallClosure 方法必须有一个参数";

NSString *const HUMMER_FIRST_PARAMETER_NOT_NATIVE_CLOSURE = @"object 参数不是原生闭包";

NSString *const HUMMER_CALL_NATIVE_TARGET_ERROR = @"hummerCallNative() target == nil";

NSString *const HUMMER_RETAIN_TEMPLATE = @"持有 %@";

NSString *const HUMMER_CREATE_TEMPLATE = @"创建 %@";

NSString *const HUMMER_OPAQUE_POINTER_IS_NULL = @"不透明指针为空指针";

NSString *const HUMMER_DESTROY_TEMPLATE = @"销毁 %@";

NSString *const HUMMER_CALL_PARAMETER_ERROR = @"hummerCall 函数必须至少两个参数，一个对象可选，一个类名字符串，一个方法字符串";

NSString *const HUMMER_DOWNGRADE_TO_CLASS_CALL = @"降级到类方法/属性调用";

NSString *const HUMMER_CREATE_CLASS_NOT_FOUND = @"%@ JS 类无法找到";

NSString *const HUMMER_GET_SET_ERROR = @"hummerGet/SetProperty 函数必须 2/3 个参数，一个对象或者方法 this 指针，一个字符串，可选一个值";

void HMAssertMainQueue(void) {
    HMAssert(NSThread.isMainThread, @"This function must be called on the main queue");
}

void HMSafeMainThread(dispatch_block_t block) {
    if (NSThread.isMainThread) {
        block ? block() : nil;
    } else {
        dispatch_async(dispatch_get_main_queue(), block);
    }
}
