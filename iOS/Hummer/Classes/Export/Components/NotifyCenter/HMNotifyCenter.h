//
//  HMNotifyCenter.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 * 通知之间 namespace 隔离，callback 生命周期跟随 HMJSContext，相同 namespace 下可以通信
 *           namespace1            |    namespace2
 *    HMJSContext     HMJSContext  |   HMJSContext
 *  HMNotifyCenter  HMNotifyCenter |  HMNotifyCenter
 *   @[callbacks]    @[callbacks]  |   @[callbacks]
 *       HMNotificationCenter      | HMNotificationCenter
 */
@interface HMNotifyCenter : NSObject


- (void)setNamespace:(NSString *)namespace DEPRECATED_MSG_ATTRIBUTE("HMJSContext namespace 变为构造参数时，该方法失效");
@end
