//
//  HMAttrManager.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMAttrManager.h"

#import <UIKit/UIKit.h>
#import <objc/runtime.h>
#import <objc/message.h>

@interface HMViewAttribute()

@property (nonatomic, strong) NSString *viewProp;
@property (nonatomic, strong) NSString *cssAttr;
@property (nonatomic, assign) SEL converter;

@end

@implementation HMViewAttribute

- (instancetype)initWithProperty:(NSString *)viewProp
                         cssAttr:(NSString *)cssAttr
                       converter:(SEL)converter {
    self = [super init];
    if (self) {
        _viewProp = viewProp;
        _cssAttr = cssAttr;
        _converter = converter;
    }
    return self;
}

+ (instancetype)viewAttrWithName:(NSString *)viewProp
                         cssAttr:(NSString *)cssAttr
                       converter:(SEL)converter {
    return [[self alloc] initWithProperty:viewProp
                                  cssAttr:cssAttr
                                converter:converter];
}

@end

@interface HMAttrManager()

@property (nonatomic, strong) NSMutableDictionary *attrs;
@property (nonatomic, strong) NSMutableArray * classes;

@end

@implementation HMAttrManager

static HMAttrManager * __sharedInstance = nil;

+ (instancetype)sharedManager {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (__sharedInstance == nil) {
            __sharedInstance = [[self alloc] init];
        }
    });
    return __sharedInstance;
}

+ (instancetype)allocWithZone:(struct _NSZone *)zone {
    @synchronized(self) {
        if (__sharedInstance == nil) {
            __sharedInstance = [super allocWithZone:zone];
        }
    }
    return __sharedInstance;
}

- (NSMutableDictionary *)attrs {
    if (!_attrs) {
        _attrs = [NSMutableDictionary dictionary];
    }
    return _attrs;
}

- (NSMutableArray *)classes {
    if (!_classes) {
        _classes = [NSMutableArray array];
    }
    return _classes;
}

- (void)loadViewAttrForClass:(Class)clazz {
    if (!clazz || ![clazz isSubclassOfClass:[UIView class]]) return;
    
    if (![self.classes containsObject:clazz]) {
        [self.classes addObject:clazz];
        [self loadAllAttrWithClass:clazz];
    }
}

- (void)loadAllAttrWithClass:(Class)cls {
    if (cls != [UIView class]) {
        Class superCls = class_getSuperclass(cls);
        [self loadAllAttrWithClass:superCls];
    }
    [self addViewAttrForClass:cls];
}

- (void)addViewAttrForClass:(Class)clazz {
    if (!clazz || ![clazz isSubclassOfClass:[UIView class]]) return;
    
    unsigned int outCount = 0;
    Method *methods = class_copyMethodList(object_getClass(clazz), &outCount);
    for (NSInteger idx = 0; idx < outCount; idx++) {
        SEL selector = method_getName(methods[idx]);
        NSString *methodName = NSStringFromSelector(selector);
        if ([methodName hasPrefix:@"__hm_view_attribute_"] &&
            [clazz respondsToSelector:selector]) {
            HMViewAttribute *object = ((HMViewAttribute*(*)(id, SEL))objc_msgSend)(clazz, selector);
            if (object && object.cssAttr) self.attrs[object.cssAttr] = object;
        }
    }
    if (methods) free(methods);
}

- (SEL)converterWithCSSAttr:(NSString *)cssAttr {
    if (!cssAttr) return nil;
    
    HMViewAttribute *object = self.attrs[cssAttr];
    return object.converter;
}

- (NSString *)viewPropWithCSSAttr:(NSString *)cssAttr {
    if (!cssAttr) return nil;
    
    HMViewAttribute *object = self.attrs[cssAttr];
    return object.viewProp;
}

@end
