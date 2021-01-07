//
//  HMListLayoutAttributes.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMListLayoutAttributes.h"

@implementation HMListLayoutAttributes

- (instancetype)copy {
    HMListLayoutAttributes *attributes = [super copy];
    attributes.scrollDirection = self.scrollDirection;
    return attributes;
}

@end
