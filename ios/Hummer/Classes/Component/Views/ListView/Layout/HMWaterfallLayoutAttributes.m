//
//  HMWaterfallLayoutAttributes.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMWaterfallLayoutAttributes.h"

@implementation HMWaterfallLayoutAttributes

- (instancetype)copy {
    HMWaterfallLayoutAttributes *attributes = [super copy];
    attributes.rowWidth = self.rowWidth;
    attributes.columnWidth = self.columnWidth;
    return attributes;
}

@end
