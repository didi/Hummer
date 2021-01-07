//
//  HMBorderModel.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/4/17.
//

#import "HMBorderModel.h"

@implementation HMBorderModel

- (BOOL)isShowBorder {
    return self.borderWidth && self.borderStyle != HMBorderStyleNone;
}

- (id)copyWithZone:(nullable NSZone *)zone {
    HMBorderModel *copy = (HMBorderModel *) [[[self class] allocWithZone:zone] init];

    if (copy != nil) {
        copy.borderStyle = self.borderStyle;
        copy.borderWidth = self.borderWidth;
        copy.borderColor = self.borderColor;
    }

    return copy;
}

- (BOOL)isEqual:(id)other {
    if (other == self)
        return YES;
    if (!other || ![[other class] isEqual:[self class]])
        return NO;

    return [self isEqualToModel:other];
}

- (BOOL)isEqualToModel:(HMBorderModel *)model {
    if (self == model)
        return YES;
    if (model == nil)
        return NO;
    if (self.borderStyle != model.borderStyle)
        return NO;
    if (self.borderWidth != model.borderWidth)
        return NO;
    if (self.borderColor != model.borderColor && ![self.borderColor isEqual:model.borderColor])
        return NO;
    return YES;
}

- (NSUInteger)hash {
    NSUInteger hash = (NSUInteger) self.borderStyle;
    hash = hash * 31u + self.borderWidth;
    hash = hash * 31u + [self.borderColor hash];
    return hash;
}

- (NSString *)description {
    NSMutableString *description = [NSMutableString stringWithFormat:@"<%@: ", NSStringFromClass([self class])];
    [description appendFormat:@"self.borderStyle=%lu", (unsigned long)self.borderStyle];
    [description appendFormat:@", self.borderWidth=%f", self.borderWidth];
    [description appendFormat:@", self.borderColor=%@", self.borderColor];
    [description appendString:@">"];
    return description;
}

@end
