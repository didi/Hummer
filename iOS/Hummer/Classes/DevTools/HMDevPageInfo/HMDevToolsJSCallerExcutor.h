//
//  HMDevToolsJSCallerExcutor.h
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef void(^HMDevToolsJSCallerNativeInfo)(id target, SEL selector);
typedef void(^HMDevToolsJSCallerInfo)(NSString *className, NSString *funtionName);

@interface HMDevToolsJSCallerExcutor : NSObject

@property (nonatomic, copy) HMDevToolsJSCallerNativeInfo callerNativeInfo;
@property (nonatomic, copy) HMDevToolsJSCallerInfo callerInfo;

@end

NS_ASSUME_NONNULL_END
