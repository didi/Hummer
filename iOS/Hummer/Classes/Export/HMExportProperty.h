//
//  HMExportProperty.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMExportMethodProtocol.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMExportProperty : NSObject <HMExportMethodParsable>

@property (nonatomic, assign, nullable) SEL propertyGetterSelector;

@property (nonatomic, assign, nullable) SEL propertySetterSelector;


@property (nonatomic, strong) HMMethodSignature *setterMethodSignature;

@end

NS_ASSUME_NONNULL_END
