//
//  HMExportManager.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef struct {
    const char *jsClass;
    const char *objcClass;
} HMExportStruct;

#define HM_EXPORT_CLASS(jsClass, objcClass) \
__attribute__((used, section("__DATA , hm_export_class"))) \
static const HMExportStruct __hm_export_class_##jsClass##__ = {#jsClass, #objcClass};

#define HM_EXPORT_METHOD(jsMethod, sel) \
+ (NSArray *)__hm_export_method_##jsMethod##__ {\
    return @[@#jsMethod, NSStringFromSelector(@selector(sel))];\
}

#define HM_EXPORT_PROPERTY(jsProp, getter, setter) \
+ (NSArray *)__hm_export_property_##jsProp##__ {\
    return @[@#jsProp, NSStringFromSelector(@selector(getter)), NSStringFromSelector(@selector(setter))];\
}

typedef id (^HMFuncCallback)(NSArray *args);

@class HMExportClass;
@interface HMExportManager : NSObject

+ (instancetype)sharedInstance;

- (void)loadExportClasses;

- (HMExportClass *)exportClassForJS:(NSString *)jsClass;

- (NSArray *)allExportJSClasses;

- (HMExportClass *)exportClassForObjC:(NSString *)objcClass;

- (NSArray *)allExportObjCClasses;

- (NSString *)jsClassForObjCClass:(Class)objcClass;

@end
