//
//  HMExportProperty.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Hummer/HMExportBaseClass.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMExportProperty : HMExportBaseClass

@property (nonatomic, assign, nullable) SEL propertyGetterSelector;

@property (nonatomic, assign, nullable) SEL propertySetterSelector;

@end

NS_ASSUME_NONNULL_END
