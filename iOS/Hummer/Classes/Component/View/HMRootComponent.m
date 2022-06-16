//
//  HMRootComponent.m
//  Hummer
//
//  Created by didi on 2022/6/9.
//

#import "HMRootComponent.h"

@interface HMRootComponent()

@property (nonatomic, strong) UIView *nativeView;
@end

@implementation HMRootComponent

- (instancetype)initWithNativeView:(UIView *)view {
    self = [super init];
    _nativeView = view;
    return self;
}

- (UIView *)view {
    
    return self.nativeView;
}
@end
