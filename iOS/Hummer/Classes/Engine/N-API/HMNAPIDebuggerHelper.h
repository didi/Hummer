//
//  HMHermesCppHelper.h
//  Hummer
//
//  Created by didi on 2021/10/12.
//

#import <Foundation/Foundation.h>
#import "HMJSExecutor+Private.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMNAPIDebuggerHelper : NSObject

- (void)napiCall_enableDebuggerAndMessageThread:(NAPIEnv)env title:(nullable NSString *)title;
- (void)napiCall_disableDebugger;
@end

NS_ASSUME_NONNULL_END
