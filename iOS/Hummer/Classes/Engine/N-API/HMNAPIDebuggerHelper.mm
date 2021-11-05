//
//  HMHermesCppHelper.m
//  Hummer
//
//  Created by didi on 2021/10/12.
//

#import "HMNAPIDebuggerHelper.h"
#import "RCTMessageThread.h"
#import <napi/js_native_api_debugger.h>
#import <napi/js_native_api_debugger_hermes_types.h>
#import <Hummer/HMDebugService.h>

@interface HMNAPIDebuggerHelper()
@property (nonatomic, assign) std::shared_ptr<facebook::react::RCTMessageThread> jsThread;

@end

@implementation HMNAPIDebuggerHelper
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
    
    NSArray *devPages = [[HMDebugService sharedService] guessDebugHostWithDevUrl:title autoConnect:true];
    
    CHECK_COMMON(NAPISetMessageQueueThread(env, ptr));
    CHECK_COMMON(NAPIEnableDebugger(env, title.UTF8String, [devPages containsObject:title]));
}

- (void)napiCall_disableDebugger{
    
}

@end
