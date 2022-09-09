//
//  HMJSCExecutor+Internal.m
//  Hummer
//
//  Created by didi on 2021/2/25.
//

#import "HMJSCExecutor+Internal.h"
#import "HMJSCExecutor+Private.h"
#import <objc/runtime.h>

@implementation HMJSCExecutor (Internal)

- (JSContext *)internalCtx {
    if (!self.contextRef) {
        return nil;
    }
    JSContext *ret = objc_getAssociatedObject(self, @selector(internalCtx));
    if (!ret) {
        ret = [JSContext contextWithJSGlobalContextRef:self.contextRef];
        objc_setAssociatedObject(self, @selector(internalCtx), ret, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
        return ret;
    }
    return ret;
}
@end
