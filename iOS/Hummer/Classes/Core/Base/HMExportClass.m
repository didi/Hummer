//
//  HMExportClass.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMExportClass.h"

#import <objc/runtime.h>
#import <objc/message.h>
#import "HMExportMethod.h"
#import "HMUtility.h"
#import "HMExportProperty.h"

@interface HMExportClass ()

@property (nonatomic, strong) NSMutableDictionary *methods;
@property (nonatomic, strong) NSMutableDictionary *variables;

@end

@implementation HMExportClass

- (instancetype)init {
    self = [super init];
    if (self) {
        _methods = [NSMutableDictionary dictionary];
        _variables = [NSMutableDictionary dictionary];
    }
    return self;
}

- (instancetype)initWithClassName:(NSString *)className
                          jsClass:(NSString *)jsClass {
    self = [self init];
    if (self) {
        _jsClass = jsClass; _className = className;
        Class cls = NSClassFromString(self.className);
        [self loadAllExportWithClass:cls];
    }
    return self;
}

- (void)loadAllExportWithClass:(Class)cls {
    NSAssert(cls, @"empty class");
    if (!cls) {
        return;
    }
    
    if (cls != [NSObject class]) {
        Class superCls = class_getSuperclass(cls);
        [self loadAllExportWithClass:superCls];
    }
    [self loadMethodWithClass:cls];
}

- (void)loadMethodWithClass:(Class)cls {
    unsigned int outCount = 0;
    Method *methods = class_copyMethodList(object_getClass(cls), &outCount);
    for (int i = 0; i < outCount; i++) {
        SEL selector = method_getName(methods[i]);
        NSString *mName = NSStringFromSelector(selector);
        if ([mName hasPrefix:@"__hm_export_method_"]) {
            [self loadMethod:cls withSelector:selector];
        } else if ([mName hasPrefix:@"__hm_export_property_"]) {
            [self loadProperty:cls withSelector:selector];
        }
    }
    if (methods) free(methods);
}

- (void)loadMethod:(Class)cls withSelector:(SEL)selector {
    if (!cls || !selector) return;
    
    NSArray *array = ((NSArray *(*)(id, SEL))objc_msgSend)(cls, selector);
    if (array.count < 2) {
        HMLogError(@"export method [%@] error", [NSStringFromSelector(selector) substringFromIndex:@"__hm_export_method_".length]);
        return;
    }
    
    HMExportMethod *method = [HMExportMethod new];
    method.funcName = array[0];
    method.selector = NSSelectorFromString(array[1]);
    if (class_getInstanceMethod(cls, method.selector)) {
        method.methodType = HMInstanceMethod;
    } else if (class_getClassMethod(cls, method.selector)) {
        method.methodType = HMClassMethod;
    } else {
        HMLogError(@"Unknown selector:%@", array[1]);
    }
    self.methods[method.funcName] = method;
}

- (void)loadProperty:(Class)cls withSelector:(SEL)selector {
    if (!cls || !selector) return;
    
    NSArray *array = ((NSArray *(*)(id, SEL))objc_msgSend)(cls, selector);
    if (array.count < 3) {
        HMLogError(@"export property [%@] error", [NSStringFromSelector(selector) substringFromIndex:@"__hm_export_property_".length]);
        return;
    }
    
    HMExportProperty *variable = [HMExportProperty new];
    variable.propName = array[0];
    variable.propGetter = NSSelectorFromString(array[1]);
    variable.propSetter = NSSelectorFromString(array[2]);
    self.variables[variable.propName] = variable;
}

- (HMExportMethod *)methodForFuncName:(NSString *)funcName {
    if (!funcName) return nil;
    
    return self.methods[funcName];
}

- (NSArray *)allExportMethodList {
    return [self.methods allKeys];
}

- (HMExportProperty *)propertyForName:(NSString *)propName {
    if (!propName) return nil;
    
    return self.variables[propName];
}

- (NSArray *)allExportPropertyList {
    return [self.variables allKeys];
}

@end
