//
//  UIView+HMDescriptor.m
//  Hummer
//
//  Created by didi on 2021/11/3.
//

#import "UIView+HMDescription.h"
#import <Hummer/NSObject+HMDescription.h>
#import <Hummer/NSObject+Hummer.h>

@implementation UIView (HMDescription)

- (nullable NSString *)hm_content {
    return nil;
}

- (nullable NSArray<UIView *> *)hm_children {
    
    if (!self.subviews) {return nil;}
    return self.subviews;
}

- (nullable NSArray<HMBaseValue *> *)hm_jsChildren {
    
    NSArray *childs = [self hm_children];
    if (!childs) {return nil;}
    
    NSMutableArray<HMBaseValue *> *jsChilds = [NSMutableArray new];
    [childs enumerateObjectsUsingBlock:^(UIView *  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        HMBaseValue *jsValue = obj.hmValue;
        if (jsValue) {
            [jsChilds addObject:jsValue];
        }
    }];
    return jsChilds.copy;
}


@end
