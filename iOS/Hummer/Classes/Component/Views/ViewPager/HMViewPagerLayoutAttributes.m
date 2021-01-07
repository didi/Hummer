//
//  HMViewPagerLayoutAttributes.m
//  HummerX
//
//  Created by didi on 2020/10/14.
//

#import "HMViewPagerLayoutAttributes.h"

@implementation HMViewPagerLayoutAttributes

- (instancetype)init
{
    self = [super init];
    if (self) {
        _scrollDirection = UICollectionViewScrollDirectionHorizontal;
        _startOffset = 0;
        _middleOffset = 0;
        _endOffset = 0;
        _position = 0;
    }
    return self;
}

- (id)copyWithZone:(NSZone *)zone
{
    HMViewPagerLayoutAttributes *copy = [super copyWithZone:zone];
    copy.contentView = self.contentView;
    copy.scrollDirection = self.scrollDirection;
    copy.startOffset = self.startOffset;
    copy.middleOffset = self.middleOffset;
    copy.endOffset = self.endOffset;
    copy.position = self.position;
    return copy;
}

- (BOOL)isEqual:(id)object
{
    if (!object || ![object isKindOfClass:HMViewPagerLayoutAttributes.class]) {
        return NO;
    }
    HMViewPagerLayoutAttributes *o = object;
    return
    [super isEqual:o] &&
    [o.contentView isEqual:self.contentView] &&
    o.scrollDirection == self.scrollDirection &&
    [self isEqualValue:self.startOffset with:o.startOffset] &&
    [self isEqualValue:self.middleOffset with:o.middleOffset] &&
    [self isEqualValue:self.endOffset with:o.endOffset] &&
    [self isEqualValue:self.position with:o.position];
}

- (BOOL)isEqualValue:(CGFloat)a with:(CGFloat)b
{
    return a == b || ABS(a - b) < 0.00001;
}

@end
