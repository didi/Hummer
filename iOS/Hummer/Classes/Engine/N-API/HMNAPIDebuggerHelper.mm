//
//  HMHermesCppHelper.m
//  Hummer
//
//  Created by didi on 2021/10/12.
//


#import "HMNAPIDebuggerHelper.h"

#if __has_include(<Hummer/HMInspectorPackagerConnection.h>)
#import "RCTMessageThread.h"
#import <Hummer/HMDebugService.h>
#import <napi/js_native_api_debugger.h>
#import <napi/js_native_api_debugger_hermes_types.h>

#endif


@interface HMNAPIDebuggerHelper()

#if __has_include(<Hummer/HMInspectorPackagerConnection.h>)

@property (nonatomic, assign) std::shared_ptr<facebook::react::RCTMessageThread> jsThread;
#endif

@end

@implementation HMNAPIDebuggerHelper
- (void)napiCall_enableDebuggerAndMessageThread:(NAPIEnv)env title:(nullable NSString *)title{
    
#if __has_include(<Hummer/HMInspectorPackagerConnection.h>)

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
#endif

}

- (void)napiCall_disableDebugger{
    
}

@end
