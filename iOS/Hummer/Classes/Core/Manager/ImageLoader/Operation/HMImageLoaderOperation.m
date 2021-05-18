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
