//
//  HMExportClass.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>

@class HMExportBaseClass, HMExportMethod, HMExportProperty;

NS_ASSUME_NONNULL_BEGIN

@interface HMExportClass : NSObject

@property (nonatomic, nullable, copy) NSString *className;

@property (nonatomic, nullable, copy) NSString *jsClass;

@property (nonatomic, nullable, weak) HMExportClass *superClassReference;

@property (nonatomic, nullable, copy, readonly) NSDictionary<NSString *, HMExportBaseClass *> *classMethodPropertyList;

@property (nonatomic, nullable, copy, readonly) NSDictionary<NSString *, HMExportBaseClass *> *instanceMethodPropertyList;

- (nullable HMExportProperty *)propertyWithName:(nullable NSString *)name isClass:(BOOL)isClass;

- (nullable HMExportMethod *)methodWithName:(nullable NSString *)name isClass:(BOOL)isClass;

@property (nonatomic, nullable, copy, readonly) NSDictionary<NSString *, HMExportMethod *> *methodList DEPRECATED_MSG_ATTRIBUTE("使用 classMethodPropertyList/instanceMethodPropertyList 替代");

@property (nonatomic, nullable, copy, readonly) NSDictionary<NSString *, HMExportProperty *> *propertyList DEPRECATED_MSG_ATTRIBUTE("使用 classMethodPropertyList/instanceMethodPropertyList 替代");

/**
 * @brief 加载当前类导出内容，然后递归加载父类内容
 */
- (void)loadAllExportMethodAndProperty;

/**
*   按照继承链查找方法，类似 msgSend中lookupIMPOrNil.
*/
- (nullable HMExportBaseClass *)methodOrPropertyWithName:(NSString *)name isClass:(BOOL)isClass;

@end

NS_ASSUME_NONNULL_END
