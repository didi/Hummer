//
//  HMExportMethod.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMExportMethodProtocol.h>
NS_ASSUME_NONNULL_BEGIN

@interface HMExportMethod : NSObject <HMExportMethodParsable>

@property (nonatomic, assign, nullable) SEL selector;

@end

NS_ASSUME_NONNULL_END
