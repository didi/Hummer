//
//  HMImageDownLoadToken.m
//  Hummer
//
//  Created by didi on 2020/11/26.
//

#import "HMImageDownLoadToken.h"

@interface HMImageDownLoadToken()

@property (nonatomic, assign) BOOL isCancel;

@end
@implementation HMImageDownLoadToken

- (void)cancel {
    
    @synchronized (self) {
        if (self.isCancel) {
            return;
        }
        self.isCancel = YES;
        [self.downLoadOperation cancel:self.token];
        self.token = nil;
    }
}
- (BOOL)isCancel {
    return _isCancel;
}

@end
