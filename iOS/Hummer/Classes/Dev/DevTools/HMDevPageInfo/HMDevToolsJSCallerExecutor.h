//
//  HMDevToolsJSCallerExecutor.h
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import <Foundation/Foundation.h>
#import "HMInterceptor.h"

NS_ASSUME_NONNULL_BEGIN

typedef void(^HMDevToolsJSCallerNativeInfo)(NSString *className, NSString *funtionName, NSString *objRef, NSString *args);
typedef void(^HMDevToolsJSCallerJSInfo)(NSString *className, NSString *funtionName, NSString *objRef, NSString *args);

@interface HMDevToolsJSCallerExecutor : NSObject<HMJSCallerProtocol>

@property (nonatomic, copy) HMDevToolsJSCallerNativeInfo callerNativeInfo;
@property (nonatomic, copy) HMDevToolsJSCallerJSInfo callerJSInfo;

@end

NS_ASSUME_NONNULL_END
