//
//  HMExportManager.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMExportMethod.h>
#import <Hummer/HMExportProperty.h>

NS_ASSUME_NONNULL_BEGIN

typedef struct {
    const char *const jsClass;
    const char *const objcClass;
} HMExportStruct;

#define HM_EXPORT_CLASS(jsClass, objcClass) \
__attribute__((used, section("__DATA, hm_export_class"))) \
static const HMExportStruct __hm_export_class_##jsClass##__ = {#jsClass, #objcClass};

#define HM_EXPORT_METHOD(jsMethod, sel) \
+ (HMExportMethod *)__hm_export_method_##jsMethod##__ { \
    HMExportMethod *exportMethod = [[HMExportMethod alloc] init]; \
    exportMethod.jsFieldName = @#jsMethod; \
    exportMethod.selector = @selector(sel); \
\
    return exportMethod; \
}

#define HM_EXPORT_PROPERTY(jsProp, getter, setter) \
+ (HMExportProperty *)__hm_export_property_##jsProp##__ { \
    HMExportProperty *exportProperty = [[HMExportProperty alloc] init]; \
    exportProperty.jsFieldName = @#jsProp; \
    exportProperty.propertyGetterSelector = @selector(getter); \
    exportProperty.propertySetterSelector = @selector(setter); \
\
    return exportProperty; \
}

#define HM_EXPORT_CLASS_METHOD(jsMethod, sel) \
+ (HMExportMethod *)__hm_export_method_class_##jsMethod##__ { \
    HMExportMethod *exportMethod = [[HMExportMethod alloc] init]; \
    exportMethod.jsFieldName = @#jsMethod; \
    exportMethod.selector = @selector(sel); \
\
    return exportMethod; \
}

#define HM_EXPORT_CLASS_PROPERTY(jsProp, getter, setter) \
+ (HMExportProperty *)__hm_export_property_class_##jsProp##__ { \
    HMExportProperty *exportProperty = [[HMExportProperty alloc] init]; \
    exportProperty.jsFieldName = @#jsProp; \
    exportProperty.propertyGetterSelector = @selector(getter); \
    exportProperty.propertySetterSelector = @selector(setter); \
\
    return exportProperty; \
}

@class HMExportClass;

@interface HMExportManager : NSObject

@property (nonatomic, copy, nullable, readonly) NSDictionary<NSString *, HMExportClass *> *jsClasses;   // JS 类名作为 key

@property (nonatomic, copy, nullable, readonly) NSDictionary<NSString *, HMExportClass *> *objcClasses; // OBJC 类名作为 key

+ (instancetype)sharedInstance;

- (void)loadAllExportedComponent;

@end

NS_ASSUME_NONNULL_END

