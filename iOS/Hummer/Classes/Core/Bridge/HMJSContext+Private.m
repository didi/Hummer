//
//  HMJSContext+Private.m
//  Hummer
//
//  Created by didi on 2022/3/14.
//

#import "HMJSContext+Private.h"
#import "UIView+HMDom.h"
#import "UIView+HMRenderObject.h"
#import "HMJSGlobal.h"
#import <Hummer/HMConfigEntryManager.h>
#ifdef DEBUG
#if __has_include(<HMDevTools/HMDevTools.h>)
#import <HMDevTools/HMDevTools.h>
#endif
#endif

@implementation HMJSContext (Private)
- (void)didRenderPage:(HMBaseValue *)page nativeView:(nonnull UIView *)view{
    
    self.componentView = page;
    [self.rootView addSubview:view];
    self.rootView.isHmLayoutEnabled = YES;
    [self.rootView hm_markDirty];
    if ([self.delegate respondsToSelector:@selector(context:didRenderPage:)]) {
        [self.delegate context:self didRenderPage:page];
    }
    if (self.renderCompletion) {
        self.renderCompletion();
    }
    [UIView hm_reSortFixedView:self];

    struct timespec renderTimespec;
    HMClockGetTime(&renderTimespec);
    struct timespec resultTimespec;
    HMDiffTime(&self->_createTimespec, &renderTimespec, &resultTimespec);
    if (self.nameSpace) {
        [HMConfigEntryManager.manager.configMap[self.nameSpace].trackEventPlugin trackPageSuccessWithPageUrl:self.hummerUrl ?: @""];
        [HMConfigEntryManager.manager.configMap[self.nameSpace].trackEventPlugin trackPageRenderCompletionWithDuration:@(resultTimespec.tv_sec * 1000 + resultTimespec.tv_nsec / 1000000) pageUrl:self.hummerUrl ?: @""];
    }
#ifdef DEBUG
#if __has_include(<HMDevTools/HMDevTools.h>)
    // 兼容部分以 controller.view 作为 rootView 的逻辑。如果后续存在 fixed，则不再考虑。
    // 推荐继承 HMViewConroller
    [HMDevTools showInContext:self];
#endif
#endif
}

+ (NSString *)getNamespace {
    NSString *namespace = [[HMJSGlobal globalObject] currentContext:HMCurrentExecutor].nameSpace;
    namespace = namespace ? namespace : HMDefaultNamespaceUnderline;
    return namespace;
}
@end
