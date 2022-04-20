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



#pragma mark <----------------------- 导出组件优化 -------------------------->

#pragma mark <----- export method ----->

/**
 * HM_DEFINE_HOST_FUNCTION(-(NSNumber *)textToNumber:(NSString *)text){
 *    ...convert  string to number
 *    return number
 * }
 */
/// @param functionName 完整的函数名称。除了'{}'之外的部分
#define HM_DEFINE_HOST_FUNCTION(functionName)


#define HM_DEFINE_REMAP_HOST_FUNCTION(jsFuncName, functionName)\
+ (HMExportMethod *)__hm_export_method_##jsMethod##__ { \
    HMExportMethod *exportMethod = [[HMExportMethod alloc] init]; \
    exportMethod.jsFieldName = @#jsFuncName; \
    exportMethod.unparseToken = @#functionName; \
    return exportMethod; \
}\
functionName



#pragma mark 导出同名无返回值方法
/**
 * HM_EXPORT_METHOD_OPT(getText:(NSString *)text){
 *    ... code
 * }
 */
/// @param funcName ，js 方法名称，对应 OC 省略声明返回值和参数部分。除了'{}' 和 '‘-/+‘()'之外的部分，只能导出无返回值实例方法
/// 运行时自动解析 “getText:(NSString *)text”， 识别 js 方法为 getText()
#define HM_EXPORT_METHOD_OPT(funcName)\
__HM_DEFINE_HOST_FUNCTION_NORET(- ,  , funcName)


/**
 * HM_EXPORT_CLASS_METHOD_OPT(getText:(NSString *)text){
 *    ... code
 * }
 */
/// @param funcName ，js 方法名称，对应 OC 省略声明返回值和参数部分。除了'{}' 和 '‘-/+‘()'之外的部分，只能导出无返回类方法
/// 运行时自动解析 “getText:(NSString *)text”， 识别 js 方法为 getText()
#define HM_EXPORT_CLASS_METHOD_OPT(funcName) \
__HM_DEFINE_HOST_FUNCTION_NORET(+,  , funcName)


#pragma mark 导出重命名无返回值方法
/**
 * HM_EXPORT_REMAP_METHOD_OPT(getName, getText:(NSString *)text){
 *    ... code
 * }
 */
/// @param jsFunctionName ，js 方法名
/// @param funcName ，OC 方法名称，省略声明返回值和参数部分。除了'{}' 和 '‘-/+‘()'之外的部分，只能导出无返回值实例方法
#define HM_EXPORT_REMAP_METHOD_OPT(jsFunctionName, funcName)\
__HM_DEFINE_HOST_FUNCTION_NORET(-, jsFunctionName, funcName)

/**
 * HM_EXPORT_REMAP_CLASS_METHOD_OPT(getName, getText:(NSString *)text){
 *    ... code
 * }
 */
/// @param jsFunctionName ，js 方法名称
/// @param funcName ，OC 方法名称，省略声明返回值和参数部分。除了'{}' 和 '‘-/+‘()'之外的部分，只能导出无返回值类方法
#define HM_EXPORT_REMAP_CLASS_METHOD_OPT(jsFunctionName, funcName)\
__HM_DEFINE_HOST_FUNCTION_NORET(+, jsFunctionName, funcName)

#define __HM_STRINGIFY(s) @#s

#define __HM_DEFINE_HOST_FUNCTION_NORET(flag, jsFunctionName, funcName)\
+ (HMExportMethod *)__hm_export_method_##jsMethod##__ { \
    HMExportMethod *exportMethod = [[HMExportMethod alloc] init]; \
    exportMethod.jsFieldName = @#jsFunctionName; \
    [exportMethod setFlag:@#flag]; \
    exportMethod.unparseToken = __HM_STRINGIFY(flag) __HM_STRINGIFY((void)) __HM_STRINGIFY(funcName); \
    return exportMethod; \
}\
flag(void)funcName


#pragma mark <----- export property ----->

/**
 * HM_DEFINE_CUSTOM_PROPERTY(style, NSDictionrary *, {
 *     set ...code
 * }, {
 *     return ...code
 * })
 */
/// @param jsProp 属性名。
/// @param type 返回值/参数类型。
/// @param setterBody&getterBody setter&getter 方法体：‘{}’ 中的内容。
#define HM_DEFINE_CUSTOM_PROPERTY(jsProp, type, setterBody, getterBody) \
__HM_DEFINE_CUSTOM_PROPERTY(-, jsProp, type, setterBody, getterBody)

#define HM_DEFINE_CUSTOM_CLASS_PROPERTY(jsProp, type, setterBody, getterBody) \
__HM_DEFINE_CUSTOM_PROPERTY(+, jsProp, type, setterBody, getterBody)

#define __HM_DEFINE_CUSTOM_PROPERTY(flag, jsProp, type, setterBody, getterBody)\
flag (void)set##jsProp:(type)jsProp  setterBody \
flag (type)jsProp getterBody \
+ (HMExportProperty *)__hm_export_property__##jsProp##__ { \
    HMExportProperty *exportProperty = [[HMExportProperty alloc] init]; \
    exportProperty.jsFieldName = @#jsProp; \
    exportProperty.unparseToken = @#type; \
    [exportProperty setFlag:@#flag]; \
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

