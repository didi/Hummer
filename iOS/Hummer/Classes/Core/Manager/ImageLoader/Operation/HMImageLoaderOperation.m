//
//  HMWebImageOperation.m
//  Hummer
//
//  Created by didi on 2020/11/24.
//

#import "HMImageLoaderOperation.h"


/// NSOperation conform to `HMWebImageOperation`.
@implementation NSOperation (HMImageLoaderOperation)

- (BOOL)isCancel {
    return self.isCancelled;
}
@end


@interface HMImageLoaderOperation()
@property (nonatomic, assign) BOOL isCancelled;
@end

@implementation HMImageLoaderOperation

- (BOOL)isCancel {
    return self.isCancelled;
}

- (void)cancel {
    self.isCancelled = YES;
}
@end

@interface HMImageCombinedOperation()
@property (nonatomic, assign) BOOL isCancelled;
@end

@implementation HMImageCombinedOperation

- (BOOL)isCancel {
    return self.isCancelled;
}

- (void)cancel {

    @synchronized(self) {
        if (self.isCancelled) {
            return;
        }
        self.isCancelled = YES;
        if (self.cacheOperation) {
        
            [self.cacheOperation cancel];
        }
    
        if (self.loaderOperation) {
            [self.loaderOperation cancel];
        }
        
        if(self.coderOperation){
            [self.coderOperation cancel];
        }
    }
}

@end
