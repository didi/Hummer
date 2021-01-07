//
//  HMExportClass.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>

@class HMExportMethod, HMExportProperty;

@interface HMExportClass : NSObject

@property (nonatomic, readonly) NSString *className;
@property (nonatomic, readonly) NSString *jsClass;

- (instancetype)initWithClassName:(NSString *)className jsClass:(NSString *)jsClass;

- (HMExportMethod *)methodForFuncName:(NSString *)funcName;

- (NSArray <NSString *>*)allExportMethodList;

- (HMExportProperty *)propertyForName:(NSString *)propName;

- (NSArray <NSString *>*)allExportPropertyList;

@end
