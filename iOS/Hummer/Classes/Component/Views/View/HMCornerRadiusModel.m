//
//  HMCornerRadiusModel.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/4/16.
//

#import "HMCornerRadiusModel.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMCornerRadiusModel ()
- (BOOL)isEqualToModel:(HMCornerRadiusModel *)other;
@end

NS_ASSUME_NONNULL_END

@implementation HMCornerRadiusModel

- (id)copyWithZone:(nullable NSZone *)zone {
    HMCornerRadiusModel *copy = (HMCornerRadiusModel *) [[[self class] allocWithZone:zone] init];

    if (copy != nil) {
        copy.topLeft = self.topLeft;
        copy.topRight = self.topRight;
        copy.bottomLeft = self.bottomLeft;
        copy.bottomRight = self.bottomRight;
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

- (BOOL)isEqualToModel:(HMCornerRadiusModel *)model {
    if (self == model)
        return YES;
    if (model == nil)
        return NO;
    if (self.topLeft != model.topLeft)
        return NO;
    if (self.topRight != model.topRight)
        return NO;
    if (self.bottomLeft != model.bottomLeft)
        return NO;
    if (self.bottomRight != model.bottomRight)
        return NO;
    return YES;
}

- (NSUInteger)hash {
    NSUInteger hash = [@(self.topLeft) hash];
    hash = hash * 31u + [@(self.topRight) hash];
    hash = hash * 31u + [@(self.bottomLeft) hash];
    hash = hash * 31u + [@(self.bottomRight) hash];
    return hash;
}

- (NSString *)description {
    NSMutableString *description = [NSMutableString stringWithFormat:@"<%@: ", NSStringFromClass([self class])];
    [description appendFormat:@"self.topLeft=%lf", self.topLeft];
    [description appendFormat:@", self.topRight=%lf", self.topRight];
    [description appendFormat:@", self.bottomLeft=%lf", self.bottomLeft];
    [description appendFormat:@", self.bottomRight=%lf", self.bottomRight];
    [description appendString:@">"];
    return description;
}

@end
