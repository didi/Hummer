//
//  HMDevToolsLogger.h
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import <Foundation/Foundation.h>
#import "HMBaseExecutorProtocol.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMDevToolsLogger : NSObject

@property (nonatomic, copy) NSString *logString;
@property (nonatomic, assign) HMLogLevel logLevel;
@property (nonatomic, assign) BOOL expended;

@end

NS_ASSUME_NONNULL_END
