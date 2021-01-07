//
//  HMActivityIndicatorView.m
//  Hummer
//
//  Copyright © 2019 didi. All rights reserved.
//

#import "HMActivityIndicatorView.h"
#import "HMExportManager.h"
#import "HMAttrManager.h"
#import "HMConverter.h"
#import <JavaScriptCore/JavaScriptCore.h>
#import "HMUtility.h"
#import "UIView+HMRenderObject.h"

@implementation HMActivityIndicatorView

HM_EXPORT_CLASS(Loading, HMActivityIndicatorView)

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        self.activityIndicatorViewStyle = UIActivityIndicatorViewStyleGray;
        [self startAnimating];
    }
    return self;
}

- (void)setFrame:(CGRect)frame {
    [super setFrame:frame];
    if (self.isHmLayoutEnabled && self.hm_renderObject.display == YOGA_TYPE_WRAPPER(YGDisplayNone)) {
        [self stopAnimating];
        self.hidden = YES;
    }else {
        [self startAnimating];
        self.hidden = NO;
    }
}

@end
