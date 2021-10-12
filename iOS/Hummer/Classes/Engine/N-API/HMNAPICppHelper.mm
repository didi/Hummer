//
//  HMHermesCppHelper.m
//  Hummer
//
//  Created by didi on 2021/10/12.
//

#import "HMNAPICppHelper.h"
#import "RCTMessageThread.h"
#import <napi/js_native_api_debugger.h>
#import <napi/js_native_api_debugger_hermes_types.h>

@interface HMNAPICppHelper()
@property (nonatomic, assign) std::shared_ptr<facebook::react::RCTMessageThread> jsThread;

@end

@implementation HMNAPICppHelper
- (void)napiCall_enableDebuggerAndMessageThread:(NAPIEnv)env title:(nullable NSString *)title{
    
    _jsThread = std::make_shared<facebook::react::RCTMessageThread>(NSRunLoop.mainRunLoop, ^(NSError *error) {
        if (error) {
            NSLog(@"%@", error);
        }
    });

    struct OpaqueMessageQueueThreadWrapper {
        std::shared_ptr<facebook::react::RCTMessageThread> jsThread;
    }ss;
    ss.jsThread = _jsThread;
    MessageQueueThreadWrapper ptr = (MessageQueueThreadWrapper)&ss;
    
    CHECK_COMMON(NAPISetMessageQueueThread(env, ptr));
    CHECK_COMMON(NAPIEnableDebugger(env, title.UTF8String))
}

- (void)napiCall_disableDebugger{
    
}

@end
