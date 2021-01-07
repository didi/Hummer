//
//  HMInvocation.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMInvocation.h"
#import "HMExportManager.h"
#import "HMExportMethod.h"
#import "HMUtility.h"
#import "HMExportClass.h"
#import "JSValue+Hummer.h"
#import "HMJSGlobal.h"

@interface HMInvocation()

@property (nonatomic, strong) id target;
@property (nonatomic, strong) NSArray *arguments;
@property (nonatomic, assign) SEL selector;

@end

@implementation HMInvocation

- (instancetype)initWithTarget:(id)target {
    self = [super init];
    if(self){
        _target = target;
    }
    return self;
}

- (void)setArguments:(NSArray *)arguments {
    _arguments = arguments;
}

- (void)setSelecor:(SEL)selector {
    _selector = selector;
}

- (id)invokeAndReturn {
    if (!self.target || !self.selector) return nil;
    
    NSMethodSignature *signature = [self.target methodSignatureForSelector:self.selector];
    if (!signature) {
        HMLogError(@"unsupport selector:%s", self.selector);
        return nil;
    }
    
    NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
    [invocation setTarget:self.target];
    [invocation setSelector:self.selector];
    [invocation retainArguments];
    
    return [self doInvocation:invocation arguments:self.arguments];
}

#define HM_OBJCTYPE_SKIP(objCType) while(*objCType == 'r' || *objCType == 'n' || *objCType == 'N' || *objCType == 'o' || *objCType == 'O' || *objCType == 'R' || *objCType == 'v') {\
    objCType++; \
}

#define HM_OBJCTYPE_ARGS_NUM(objCType, encode, type, op) \
else if(*objCType == encode){ \
    type value = i < arguments.count ? [[arguments[i] toNumber] op] : 0; \
    [invocation setArgument:(void *)&value atIndex:i + 2]; \
}

#define HM_OBJCTYPE_ARGS_OBJ(objCType, encode, type) \
else if(*objCType == encode){ \
    type value = i < arguments.count ? arguments[i] : 0; \
    if(value == [NSNull null]){ value = nil; }\
    [invocation setArgument:(void *)&value atIndex:i + 2]; \
}

#define HM_OBJCTYPE_ARGS_BLOCK(objCType, encode, type) \
if(strncmp(objCType, encode, sizeof(char) * 2) == 0){ \
    JSValue *callbackFunc = i < arguments.count ? arguments[i] : nil;\
    [[[HMJSGlobal globalObject] currentContext:(callbackFunc.context)] retainedValue:callbackFunc];\
    __weak typeof(callbackFunc) weakCallbackFunc = callbackFunc;\
    type callbackBlock = ^(NSArray *args){ \
        JSValue *value = [weakCallbackFunc callWithArguments:args];\
        return value.isUndefined ? nil : value;\
    }; \
    if (!callbackFunc.isNull) { \
        [invocation setArgument:(void *)&callbackBlock atIndex:i+2]; \
    } \
}

- (id)doInvocation:(NSInvocation *)invocation arguments:(NSArray *)arguments {
    NSMethodSignature *signature = invocation.methodSignature;
    
    for (int i = 0; i < signature.numberOfArguments - 2; i++) {
        const char *objCType = [signature getArgumentTypeAtIndex:i + 2];
        HM_OBJCTYPE_SKIP(objCType);
        HM_OBJCTYPE_ARGS_BLOCK(objCType, "@?", HMFuncCallback)
        HM_OBJCTYPE_ARGS_OBJ(objCType, '@', id)
        HM_OBJCTYPE_ARGS_NUM(objCType, 'c', char, charValue)
        HM_OBJCTYPE_ARGS_NUM(objCType, 'i', int, intValue)
        HM_OBJCTYPE_ARGS_NUM(objCType, 's', short, shortValue)
        HM_OBJCTYPE_ARGS_NUM(objCType, 'l', long, longValue)
        HM_OBJCTYPE_ARGS_NUM(objCType, 'q', long long, longLongValue)
        HM_OBJCTYPE_ARGS_NUM(objCType, 'C', unsigned char, unsignedCharValue)
        HM_OBJCTYPE_ARGS_NUM(objCType, 'I', unsigned int, unsignedIntValue)
        HM_OBJCTYPE_ARGS_NUM(objCType, 'S', unsigned short, unsignedShortValue)
        HM_OBJCTYPE_ARGS_NUM(objCType, 'L', unsigned long, unsignedLongValue)
        HM_OBJCTYPE_ARGS_NUM(objCType, 'Q', unsigned long long, unsignedLongLongValue)
        HM_OBJCTYPE_ARGS_NUM(objCType, 'f', float, floatValue)
        HM_OBJCTYPE_ARGS_NUM(objCType, 'd', double, doubleValue)
        HM_OBJCTYPE_ARGS_NUM(objCType, 'B', bool, boolValue)
        else {
            HMLogError(@"unsupport argument type:%s", objCType);
        }
    }
    [invocation invoke]; id retValue = nil;
    
    if (*signature.methodReturnType == '@') {
        void *retPointer = nil;
        [invocation getReturnValue:&retPointer];
        retValue = (__bridge id)retPointer;
    }
    return retValue;
}

@end
