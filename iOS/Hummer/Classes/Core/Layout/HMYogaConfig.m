//
//  HMYogaConfig.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMYogaConfig.h"

#import "HMConverter.h"
#import <objc/runtime.h>
#import <objc/message.h>

@interface HMYogaProperty : NSObject

@property (nonatomic, strong) NSString *yogaProp;
@property (nonatomic, strong) NSString *cssAttr;
@property (nonatomic, assign) SEL converter;

@end

@implementation HMYogaProperty

- (instancetype)initWithProperty:(NSString *)yogaProp
                         cssAttr:(NSString *)cssAttr
                       converter:(SEL)converter {
    self = [super init];
    if (self) {
        _yogaProp = yogaProp;
        _cssAttr = cssAttr;
        _converter = converter;
    }
    return self;
}

+ (instancetype)yogaPropertyWithName:(NSString *)yogaProp
                             cssAttr:(NSString *)cssAttr
                           converter:(SEL)converter {
    return [[self alloc] initWithProperty:yogaProp
                                  cssAttr:cssAttr
                                converter:converter];
}

@end

#define HM_YOGA_PROPERTY(style, ygname, conv) \
+ (HMYogaProperty *)__hm_yoga_property_##ygname##__ {\
    return [HMYogaProperty yogaPropertyWithName:@#ygname cssAttr:@#style converter:@selector(conv)];\
}

@interface HMYogaConfig()
@property (nonatomic, strong) NSMutableDictionary *yogaConfig;
@end

@implementation HMYogaConfig

HM_YOGA_PROPERTY(direction, direction, HMStringToYGDirection:);
HM_YOGA_PROPERTY(flexDirection, flexDirection, HMStringToYGFlexDirection:);
HM_YOGA_PROPERTY(justifyContent, justifyContent, HMStringToYGJustify:);
HM_YOGA_PROPERTY(alignContent, alignContent, HMStringToYGAlign:);
HM_YOGA_PROPERTY(alignItems, alignItems, HMStringToYGAlign:);
HM_YOGA_PROPERTY(alignSelf, alignSelf, HMStringToYGAlign:);
HM_YOGA_PROPERTY(position, position, HMStringToYGPosition:);
HM_YOGA_PROPERTY(flexWrap, flexWrap, HMStringToYGFlexWrap:);
HM_YOGA_PROPERTY(overflow, overflow, HMStringToYGOverflow:);
HM_YOGA_PROPERTY(display, display, HMStringToYGDisplay:);

HM_YOGA_PROPERTY(flexGrow, flexGrow, HMNumberToFloat:);
HM_YOGA_PROPERTY(flexShrink, flexShrink, HMNumberToFloat:);
HM_YOGA_PROPERTY(flexBasis, flexBasis, HMNumberToYGPoint:);

HM_YOGA_PROPERTY(left, left, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(top, top, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(right, right, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(bottom, bottom, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(start, start, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(end, end, HMNumberToYGPoint:);

HM_YOGA_PROPERTY(marginLeft, marginLeft, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(marginTop, marginTop, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(marginRight, marginRight, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(marginBottom, marginBottom, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(marginStart, marginStart, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(marginEnd, marginEnd, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(marginHorizontal, marginHorizontal, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(marginVertical, marginVertical, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(margin, margin, HMNumberToYGPoint:);

HM_YOGA_PROPERTY(paddingLeft, paddingLeft, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(paddingTop, paddingTop, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(paddingRight, paddingRight, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(paddingBottom, paddingBottom, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(paddingStart, paddingStart, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(paddingEnd, paddingEnd, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(paddingHorizontal, paddingHorizontal, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(paddingVertical, paddingVertical, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(padding, padding, HMNumberToYGPoint:);

HM_YOGA_PROPERTY(borderLeftWidth, borderLeftWidth, HMNumberToFloat:);
HM_YOGA_PROPERTY(borderTopWidth, borderTopWidth, HMNumberToFloat:);
HM_YOGA_PROPERTY(borderRightWidth, borderRightWidth, HMNumberToFloat:);
HM_YOGA_PROPERTY(borderBottomWidth, borderBottomWidth, HMNumberToFloat:);
HM_YOGA_PROPERTY(borderStartWidth, borderStartWidth, HMNumberToFloat:);
HM_YOGA_PROPERTY(borderEndWidth, borderEndWidth, HMNumberToFloat:);
HM_YOGA_PROPERTY(borderWidth, borderWidth, HMNumberToFloat:);

HM_YOGA_PROPERTY(width, width, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(height, height, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(minWidth, minWidth, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(minHeight, minHeight, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(maxWidth, maxWidth, HMNumberToYGPoint:);
HM_YOGA_PROPERTY(maxHeight, maxHeight, HMNumberToYGPoint:);

static HMYogaConfig *__sharedInstance = nil;

+ (instancetype)defaulfConfig {
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

- (NSDictionary *)yogaConfig {
    if (!_yogaConfig) {
        _yogaConfig = [NSMutableDictionary dictionary];
        [self loadYogaConfig];
    }
    return _yogaConfig;
}

- (void)loadYogaConfig {
    unsigned int outCount = 0;
    Method *methods = class_copyMethodList(object_getClass([self class]), &outCount);
    for (NSInteger idx = 0; idx < outCount; idx++) {
        SEL selector = method_getName(methods[idx]);
        NSString *methodName = NSStringFromSelector(selector);
        if ([methodName hasPrefix:@"__hm_yoga_property_"] &&
            [[self class] respondsToSelector:selector]) {
            HMYogaProperty *object = ((HMYogaProperty*(*)(id, SEL))objc_msgSend)([self class], selector);
            if (object && object.cssAttr) _yogaConfig[object.cssAttr] = object;
        }
    }
    if (methods) free(methods);
}

- (NSString *)ygPropertyWithCSSAttr:(NSString *)cssAttr {
    if (!cssAttr) return nil;
    
    HMYogaProperty *object = self.yogaConfig[cssAttr];
    return object.yogaProp;
}

- (SEL)converterWithCSSAttr:(NSString *)cssAttr {
    if (!cssAttr) return nil;
    
    HMYogaProperty *object = self.yogaConfig[cssAttr];
    return object.converter;
}

- (NSArray *)yogaProperties {
    NSMutableArray *yogaProps = [NSMutableArray array];
    
    NSArray *properties = [self.yogaConfig allValues];
    for (HMYogaProperty *prop in properties) {
        [yogaProps addObject:prop.yogaProp];
    }
    return yogaProps;
}

@end
